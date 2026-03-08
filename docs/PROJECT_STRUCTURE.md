# Project Structure

```
crypto-blog/
├── docs/                             # Project documentation
│   ├── PROJECT_OVERVIEW.md           # Overview & tech stack
│   ├── GETTING_STARTED.md            # Setup & running guide
│   ├── PROJECT_STRUCTURE.md          # Directory structure (this file)
│   └── DATABASE.md                   # Database schema, setup, queries
│
├── prisma/
│   ├── schema.prisma                 # Database schema (models, relations, indexes)
│   ├── migrations/                   # Auto-generated migration files
│   └── seed.ts                       # Seed script for initial data
│
├── public/                           # Static assets (favicon, images, SVGs)
│
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout — Header, Footer, metadata, font
│   │   ├── page.tsx                  # Route "/" — server component, fetches data from DB
│   │   ├── HomePage.tsx              # Client component with interactive logic
│   │   └── globals.css               # Global styles + Tailwind import
│   │
│   ├── components/                   # React components organized by feature
│   │   ├── layout/                   # Page chrome / shell
│   │   │   ├── Header.tsx            # Sticky navigation bar + mobile toggle
│   │   │   ├── MobileMenu.tsx        # Responsive mobile menu
│   │   │   ├── AffiliateBanner.tsx   # Top promotional banner
│   │   │   ├── Footer.tsx            # 4-column footer
│   │   │   └── index.ts             # Barrel export
│   │   │
│   │   ├── blog/                     # Blog post related components
│   │   │   ├── SearchBar.tsx         # Search input
│   │   │   ├── FeaturedPost.tsx      # Featured article hero
│   │   │   ├── PostCard.tsx          # Individual post card
│   │   │   ├── PostGrid.tsx          # Grid of PostCard components
│   │   │   ├── CategoryFilter.tsx    # Category tab filter
│   │   │   ├── Pagination.tsx        # Page navigation
│   │   │   └── index.ts             # Barrel export
│   │   │
│   │   ├── sidebar/                  # Sidebar widgets
│   │   │   ├── AffiliateCTA.tsx      # Exchange affiliate CTA box
│   │   │   ├── PopularPosts.tsx      # Popular articles list
│   │   │   ├── Newsletter.tsx        # Email subscription form
│   │   │   └── index.ts             # Barrel export
│   │   │
│   │   └── ui/                       # Reusable primitives
│   │       ├── Button.tsx            # Button with primary / ghost variants
│   │       └── Badge.tsx             # Badge with purple / yellow variants
│   │
│   ├── generated/
│   │   └── prisma/                   # Auto-generated Prisma Client (gitignored)
│   │
│   ├── types/
│   │   └── index.ts                  # App-level types built on Prisma models
│   │
│   ├── config/
│   │   └── site.ts                   # Site config: name, description, nav links
│   │
│   └── lib/
│       ├── db.ts                     # Prisma Client singleton (with adapter-pg)
│       ├── api.ts                    # Data access layer (all DB queries)
│       └── utils.ts                  # Utility functions: cn(), formatDate()
│
├── prisma.config.ts                  # Prisma CLI config (datasource URL)
├── next.config.ts                    # Next.js config (image remote patterns)
├── tsconfig.json                     # TypeScript config with @/* path alias
├── postcss.config.mjs                # PostCSS + Tailwind plugin
├── eslint.config.mjs                 # ESLint config
├── package.json                      # Dependencies & scripts
├── .env                              # Environment variables (gitignored)
└── .gitignore
```

## Conventions

### Components are grouped by feature, not by type

```
# Correct — grouped by feature
components/blog/PostCard.tsx
components/blog/PostGrid.tsx
components/sidebar/Newsletter.tsx

# Wrong — grouped by component type
components/cards/PostCard.tsx
components/forms/Newsletter.tsx
```

### Barrel exports

Each component directory has an `index.ts` file for centralized re-exports:

```typescript
// src/components/blog/index.ts
export { SearchBar } from "./SearchBar";
export { FeaturedPost } from "./FeaturedPost";
export { PostCard } from "./PostCard";
```

This enables clean imports:

```typescript
import { SearchBar, FeaturedPost, PostGrid } from "@/components/blog";
```

### Minimal "use client"

Only mark components with `"use client"` when they genuinely need state or event handlers:

| Client Component | Reason |
|---|---|
| `Header.tsx` | useState for mobile menu toggle |
| `HomePage.tsx` | useState for search, category, pagination |
| `SearchBar.tsx` | Controlled input |
| `CategoryFilter.tsx` | onClick handler |
| `Pagination.tsx` | onClick handler |
| `Newsletter.tsx` | Form state |

All other components (PostCard, Footer, Badge, etc.) remain server components for faster rendering and better SEO.

### Data flow: Server → Client

```
page.tsx (server)          HomePage.tsx (client)         Components
─────────────────          ────────────────────          ──────────
Fetch from DB via     →    Receive as props,        →    Pure rendering
src/lib/api.ts             manage UI state               from props
```

`page.tsx` is a **server component** that fetches data from PostgreSQL via Prisma, then passes it as props to `HomePage.tsx` (client component) which manages interactive state (search, filters, pagination).

### Database layer

| File | Responsibility |
|---|---|
| `prisma/schema.prisma` | Define tables, columns, relations, indexes |
| `prisma/seed.ts` | Populate initial data |
| `src/lib/db.ts` | Prisma Client singleton (one connection per process) |
| `src/lib/api.ts` | All database queries (getFeaturedPost, getPosts, etc.) |
| `src/types/index.ts` | Re-export Prisma types with relations for component use |

### Path alias

The TypeScript alias `@/*` maps to `./src/*`:

```typescript
import type { PostWithRelations } from "@/types";
import { siteConfig } from "@/config/site";
import { prisma } from "@/lib/db";
```
