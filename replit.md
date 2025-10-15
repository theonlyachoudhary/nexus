# Overview

This is a **Payload CMS-powered website template** built with Next.js 15, designed for enterprise-grade content management and publishing. The project provides a full-featured CMS with a modern frontend, suitable for websites, blogs, portfolios, and content platforms. It leverages Payload's headless CMS architecture with PostgreSQL for data persistence and includes a comprehensive layout builder system for flexible page construction.

The template is production-ready with features like draft previews, live previews, SEO optimization, form building, search functionality, and scheduled publishing.

**Deployment Status:** Successfully migrated from Vercel to Replit on October 11, 2025. The application runs on port 5000 and connects to an existing AWS PostgreSQL database.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Content Management System

**Payload CMS (v3.55.1)** serves as the headless CMS layer, providing:
- **Admin Panel**: Full-featured admin interface at `/admin` with custom branding components
- **Collections**: Structured content types including Pages, Posts, Media, Categories, Team Members, Products, Testimonials, and Case Studies
- **Global Configuration**: Header and Footer managed as global singletons
- **Access Control**: Role-based authentication with public read access and authenticated write access
- **Rich Text Editing**: Lexical editor with custom features and link handling

**Database Architecture:**
- PostgreSQL database via `@payloadcms/db-postgres` adapter
- Database migrations managed in `src/migrations/` directory
- Auto-generated TypeScript types in `src/payload-types.ts`

## Frontend Architecture

**Next.js 15 App Router** with server-side rendering:
- **App Directory Structure**: Separates frontend (`(frontend)`) from admin (`(payload)`) routes
- **Layout System**: Reusable blocks and heroes for flexible page composition
- **Theme System**: Custom theme provider with header theme support
- **Styling**: Tailwind CSS with custom IBM design system integration (IBM Plex Sans fonts, IBM color palette)

**Component Architecture:**
- **Blocks System**: Modular content blocks (About, Banner, CTA, Testimonials, Case Studies, etc.) with dedicated configs and components
- **Heroes System**: Multiple hero variants (High Impact, Medium Impact, Low Impact, Design Hero)
- **Reusable UI**: shadcn/ui components in `src/components/ui/`
- **Rich Text Rendering**: Custom RichText component for Lexical content

## Page Building & Content Flow

**Dynamic Page Generation:**
1. Pages built using block-based layout system
2. Each block type has a config file (Payload schema) and Component file (React rendering)
3. `RenderBlocks` component orchestrates block rendering
4. SEO metadata generated per page with OpenGraph support

**Content Types:**
- **Pages**: Landing pages with hero sections and customizable blocks
- **Posts**: Blog posts with categories, authors, and rich content
- **Team Members**: Staff profiles with images and social links
- **Products**: Product catalog with features and descriptions
- **Case Studies**: Client success stories with metrics and testimonials
- **Testimonials**: Customer testimonials for social proof

## Caching & Performance

**Next.js Caching Strategy:**
- `unstable_cache` for global data (header, footer) with tag-based revalidation
- On-demand revalidation via hooks (`revalidateHeader`, `revalidateFooter`, `revalidateRedirects`)
- Static asset optimization with Sharp image processing
- Responsive images with multiple sizes (thumbnail, og, hero variants)

**Cache Tags:**
- Global data: `global_header`, `global_footer`
- Collection data: `{collection}_{slug}` pattern
- Redirects: `redirects` tag

## Authentication & Access Control

**User Management:**
- User collection with email/password authentication
- JWT token-based sessions stored in cookies
- Admin-only access for create/update/delete operations
- Public read access for published content
- Draft/Published workflow with `_status` field

**Access Patterns:**
- `authenticated`: Requires logged-in user
- `anyone`: Public access
- `authenticatedOrPublished`: Public for published content, authenticated for drafts

## External Dependencies

**Core Framework:**
- **Payload CMS** (v3.55.1): Headless CMS with admin panel
- **Next.js** (v15.4.4): React framework with App Router
- **React** (v19.2.0): UI library (aligned with react-dom v19.2.0)
- **PostgreSQL**: Primary database (via `@payloadcms/db-postgres`)

**CMS Plugins:**
- `@payloadcms/plugin-form-builder`: Dynamic form creation
- `@payloadcms/plugin-nested-docs`: Hierarchical document organization
- `@payloadcms/plugin-redirects`: URL redirect management
- `@payloadcms/plugin-search`: Full-text search functionality
- `@payloadcms/plugin-seo`: SEO metadata management
- `@payloadcms/richtext-lexical`: Rich text editor

**UI & Styling:**
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library (Radix UI primitives)
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **IBM Plex Sans/Condensed**: Typography (Google Fonts)

**Additional Services:**
- **Sharp**: Image processing and optimization
- **GraphQL**: API query layer
- **next-sitemap**: XML sitemap generation
- **Payload Cloud**: Deployment platform integration

**Development Tools:**
- **TypeScript**: Type safety
- **ESLint & Prettier**: Code quality and formatting
- **Vitest**: Integration testing
- **Playwright**: End-to-end testing
- **pnpm**: Package manager

**Environment Configuration:**
- Server URL configuration with Replit support (auto-detects Replit domain)
- Database connection via `DATABASE_URI` (AWS PostgreSQL) with fallback to `DATABASE_URL` (Replit PostgreSQL)
- Preview secret for draft mode (`PREVIEW_SECRET`)
- Cron secret for scheduled jobs (`CRON_SECRET`)
- Payload authentication secret (`PAYLOAD_SECRET`)

**Replit-Specific Configuration:**
- **Port & Host**: Application runs on port 5000 with host 0.0.0.0 for Replit compatibility
- **URL Precedence**: `NEXT_PUBLIC_SERVER_URL` → auto-generated Replit URL → `__NEXT_PRIVATE_ORIGIN` → `localhost:5000`
- **Database**: Uses AWS PostgreSQL database via `DATABASE_URI` environment secret (primary connection string configured in `src/payload.config.ts`)
- **Package Manager**: pnpm (v10.12.4)
- **Workflow**: Development server runs with `yes | pnpm run dev` to auto-accept Payload CMS schema push prompts

## Recent Changes

**October 15, 2025 - DesignHero Enhancements:**
- Added image format warning system for non-webp uploads in Media collection
- Created ImageFormatWarning UI component that displays compression benefits notice
- Updated DesignHero text sizing to use viewport-height-based fluid typography
- Title now scales with clamp(2rem, 6vh, 4rem) based on screen height instead of width breakpoints
- Subtitle scales with clamp(1.125rem, 3vh, 1.75rem) for improved readability on various screen heights
- Admin panel now shows helpful notice when uploading JPEG/PNG images suggesting webp conversion
- Added blur placeholder to DesignHero background image for smoother loading experience (eliminates blank space during image load)
- Removed all animations from background image for instant display (SVG overlay animation preserved)
- Applied same viewport-height-based text scaling to SectionHeader component for consistent responsive behavior across all headings

**October 15, 2025 - CTASection Mobile Layout Optimization:**
- Changed CTASection grid from vertical stacking to 2x2 layout on mobile (grid-cols-2)
- Reduced text sizes for mobile: h4 titles use text-sm (vs text-base on md+), descriptions use text-xs (vs text-sm on md+)
- Reduced icon sizes for mobile: w-5 h-5 (vs w-6 h-6 on md+)
- Improved space utilization on small screens while maintaining readability

**October 15, 2025 - Testimonials Carousel Enhancement:**
- Removed all fixed heights (h-[300px], h-[280px], height: 350px) to prevent content from being cut off
- Implemented dynamic height calculation: all testimonials rendered invisibly with visibility:hidden to measure natural heights
- All cards now uniformly sized to match the tallest testimonial card (prevents layout shifts during transitions)
- Replaced react-slick with custom Framer Motion AnimatePresence carousel for smoother animations
- Mobile: Single card with fade + horizontal slide transitions (0.5s duration)
- Desktop: 3-card layout with center card focused (scale 1.05, opacity 1) and side cards faded (scale 0.95, opacity 0.5)
- Added window resize listener to recalculate heights dynamically for responsive behavior
- Autoplay starts after measurement completes (5-second intervals)
- Extracted reusable TestimonialCard component to reduce code duplication

**October 15, 2025 - React Version Alignment Fix:**
- Fixed React version mismatch causing "Invalid hook call" errors
- Updated react-dom from "19.1.0" (locked) to "^19.1.0" (caret) in package.json
- Both React and react-dom now aligned at version 19.2.0
- Cleared Next.js build cache and reinstalled dependencies
- Resolved header and footer rendering issues - components now display AWS database data correctly
- All hydration errors eliminated

**October 12, 2025 - AWS Database Connection:**
- Connected to existing AWS PostgreSQL database via `DATABASE_URI` secret
- Updated workflow command to `yes | pnpm run dev` to auto-accept schema push prompts
- Removed Service Summary block tables (legacy content) during schema synchronization
- Verified successful data persistence and retrieval from AWS database

**October 11, 2025 - Vercel to Replit Migration:**
- Updated Next.js dev and start scripts to bind to port 5000 with host 0.0.0.0
- Modified `next.config.js` to support Replit environment variables (REPL_SLUG, REPL_OWNER)
- Updated database configuration to use `DATABASE_URI` (AWS) with fallback to `DATABASE_URL` (Replit)
- Added comprehensive environment variable type definitions in `src/environment.d.ts`
- Configured workflow to run development server using pnpm
- All required secrets (PAYLOAD_SECRET, CRON_SECRET, PREVIEW_SECRET, DATABASE_URI) configured in Replit Secrets