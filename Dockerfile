# Production multi-stage Dockerfile for Next.js + Payload project (pnpm, Node 22)
# - Builder: installs deps, builds Next.js
# - Runner: small runtime image with only production deps and build output

FROM node:22-slim AS base
WORKDIR /app

FROM base AS builder
# enable corepack/pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# copy lockfile first for efficient cache
COPY package.json pnpm-lock.yaml ./

# Install system deps needed for sharp and building native modules
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    build-essential \
    python3 \
    ca-certificates \
    pkg-config \
    libvips-dev \
  && rm -rf /var/lib/apt/lists/*

# install all deps (dev + prod) for build
RUN pnpm install --frozen-lockfile

# copy rest of the sources
COPY . .

# build the Next app
ENV NODE_OPTIONS=--no-deprecation
# provide harmless build-time defaults so Payload initialization during next build
# (used for collecting page data) does not fail. These are overwritten at runtime
# by real secrets passed via env files or docker-compose on the VPS.
ENV PAYLOAD_SECRET=build_secret
ENV NEXT_PUBLIC_SERVER_URL=http://localhost:5000
RUN pnpm build

# remove dev dependencies to shrink size
RUN pnpm prune --prod

FROM node:22-slim AS runner
WORKDIR /app

# create non-root user
RUN addgroup --system app && adduser --system --ingroup app app

ENV NODE_ENV=production

# copy built assets and production node_modules
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/next.config.js next.config.js
COPY --from=builder /app/payload.config.ts payload.config.ts

# Expose the port the app will run on
EXPOSE 5000

USER app

# Use the installed next binary to start
CMD ["node_modules/.bin/next", "start", "-p", "5000", "-H", "0.0.0.0"]
# To use this Dockerfile, you have to set `output: 'standalone'` in your next.config.js file.
# From https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

FROM node:22.17.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Remove this line if you do not have this folder
COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD HOSTNAME="0.0.0.0" node server.js
