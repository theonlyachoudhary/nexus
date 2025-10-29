# Deployment (CI build + VPS run)

This document explains how to build the Docker image in GitLab CI (recommended) and run it on your VPS with `docker compose`, using local `.env.production` files for runtime secrets.

1) GitLab CI: set protected variables

- Go to your GitLab project → Settings → CI / CD → Variables.
- Add these variables (mark them "Protected" and "Masked" where appropriate):
  - BUILD_DATABASE_URL — a database URL for the build (preferably a read-only/test DB).
  - BUILD_PAYLOAD_SECRET — payload secret used during build-time (if your SSG requires it).

Note: GitLab provides `CI_REGISTRY`, `CI_REGISTRY_USER` and `CI_REGISTRY_PASSWORD` automatically for Container Registry access.

2) How the pipeline works

- The included `.gitlab-ci.yml` runs on `main` (and release/* branches). It logs into the registry, builds the image with the build-args `DATABASE_URL` and `PAYLOAD_SECRET` and pushes the image to `$CI_REGISTRY_IMAGE:$CI_COMMIT_REF_SLUG`.
- Keep `BUILD_DATABASE_URL` and `BUILD_PAYLOAD_SECRET` protected. Use a build-only DB user with limited permissions.

3) Manual local build & push (dev alternative)

If you want to build and push from your laptop instead of CI (not recommended for production):

```bash
chmod +x ./scripts/push_to_gitlab.sh
export REGISTRY=registry.gitlab.com
export IMAGE=your-group/your-project
export TAG=main
export GITLAB_PAT="<your_gitlab_pat_with_write_registry_scope>"
# Pass build args (if your build needs DB and secret to generate static pages)
export BUILD_ARGS="--build-arg DATABASE_URL='postgres://user:pass@db-host:5432/db' --build-arg PAYLOAD_SECRET='supersecret'"
./scripts/push_to_gitlab.sh "$REGISTRY" "$IMAGE" "$TAG"
```

4) On the VPS — prepare `.env.production` (do NOT commit this)

Create `/srv/nexus/.env.production` with your runtime secrets (example):

```env
NEXT_PUBLIC_SERVER_URL=https://example.com
PAYLOAD_SECRET=real_production_payload_secret
DATABASE_URL=postgres://user:pass@managed-postgres-host:5432/dbname
NODE_ENV=production
PORT=5000
# Any other secrets your app needs
```

5) Pull & run the image on VPS (no source code on VPS)

```bash
# Login (you can also use a machine account or PAT)
docker login registry.gitlab.com

# Pull the image created by CI
docker pull registry.gitlab.com/your-group/your-project:main

# Ensure docker-compose.production.yml and .env.production are in /srv/nexus
cd /srv/nexus
IMAGE=registry.gitlab.com/your-group/your-project:main docker compose -f docker-compose.production.yml up -d

# Check logs
docker compose -f docker-compose.production.yml logs -f
```

6) Nginx reverse proxy (example)

Create an nginx site config on your VPS (replace example.com):

```nginx
server {
  listen 80;
  listen [::]:80;
  server_name example.com www.example.com;

  location / {
    proxy_pass http://127.0.0.1:5000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_cache_bypass $http_upgrade;
  }
}
```

Reload nginx:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

7) Build-time secrets vs runtime secrets (guidance)

- Build-time: use for things the build must access (e.g. DB for SSG or PAYLOAD_SECRET for payload initialization during build). Provide build-only credentials in GitLab CI variables.
- Runtime: production secrets (DATABASE_URL, PAYLOAD_SECRET) should live in `.env.production` on the VPS or be managed by a secrets manager.
- Avoid exposing server-only secrets as `NEXT_PUBLIC_` variables.

8) If you cannot provide DB access to CI (alternative)

- Add `SKIP_PAYLOAD_DURING_BUILD=true` guard in `generateStaticParams` / SSG helpers and set that as a build arg to skip DB calls during build. Then build without DB access and let runtime handle dynamic requests.

9) Healthchecks & monitoring

- The included `docker-compose.production.yml` contains a basic healthcheck. For production, consider a real health endpoint (e.g. `/healthz`) returning 200.
- Use a monitoring/logging solution (Prometheus, Grafana, centralized logs) for production observability.

10) Troubleshooting

- If the CI build fails during `next build` complaining about missing `PAYLOAD_SECRET`, add `BUILD_PAYLOAD_SECRET` to your protected CI variables.
- If the build fails because it can’t reach the DB, either provide a reachable build DB or implement `SKIP_PAYLOAD_DURING_BUILD` guard.

If you'd like, I can add the pipeline YAML into your repo (done), and optionally add a `deploy` job that SSHs to your VPS and runs `docker compose pull && docker compose -f docker-compose.production.yml up -d` (requires an SSH key in CI). Tell me if you want that next.

### Automated deploy from GitLab CI (added)

I added a `deploy-to-vps` job to `.gitlab-ci.yml` that runs after the build. It uses an SSH private key stored in the CI variable `DEPLOY_SSH_PRIVATE_KEY` to connect to your VPS and run the pull+compose commands.

CI variables required for automated deploy
- `DEPLOY_SSH_PRIVATE_KEY` (masked) — the private SSH key used by CI to SSH to your VPS. Add the corresponding public key to `/home/<user>/.ssh/authorized_keys` on the VPS.
- `DEPLOY_SSH_USER` (protected) — the SSH user on the VPS (e.g. `ubuntu` or `deploy`).
- `DEPLOY_SSH_HOST` (protected) — the VPS host/IP.
- `DEPLOY_SSH_PORT` (optional) — SSH port if not 22.
- `DEPLOY_PATH` (optional) — path on VPS where `docker-compose.production.yml` and `.env.production` live (default `/srv/nexus`).

How the deploy job works (security notes)
- The job runs `ssh` with the private key from `DEPLOY_SSH_PRIVATE_KEY`. For security, mark the variable as "Protected" and "Masked" in GitLab variables.
- Add the matching public key to the VPS user's `~/.ssh/authorized_keys` so the CI runner can log in.
- The job performs the following on the VPS:
  - `docker login` to the GitLab registry using `CI_REGISTRY_USER` / `CI_REGISTRY_PASSWORD` (injected by GitLab)
  - `docker pull $IMAGE`
  - `docker compose -f docker-compose.production.yml pull` (best-effort)
  - `docker compose -f docker-compose.production.yml up -d`
  - `docker system prune -f --filter "until=24h"` (optional cleanup)

How to set it up quickly
1. On the VPS, create a deploy user (if you haven't already) and add the CI public key:

```bash
# on VPS
useradd -m -s /bin/bash deploy
mkdir -p /home/deploy/.ssh
# Paste your CI public key into the authorized_keys file (or use ssh-copy-id)
echo "ssh-rsa AAAA...CI_PUBLIC_KEY... user@runner" >> /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chmod 600 /home/deploy/.ssh/authorized_keys
```

2. In GitLab → Settings → CI/CD → Variables, add the CI variable `DEPLOY_SSH_PRIVATE_KEY` (value = private key, masked & protected), and set `DEPLOY_SSH_USER`, `DEPLOY_SSH_HOST`, and optional `DEPLOY_SSH_PORT` and `DEPLOY_PATH`.

3. Trigger a pipeline (push to `main`) and then run the `deploy-to-vps` job manually in GitLab UI (it's `when: manual` to prevent accidental auto-deploys).

If you prefer automatic deploys on every push to `main`, change `when: manual` to automatic — but keep in mind you should only do that once you're confident the pipeline and rollback procedures are sound.
