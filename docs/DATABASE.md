# Database Setup

## Overview

The project uses **PostgreSQL** as the database and **Prisma ORM** (v7) as the data access layer.

Prisma 7 uses a **driver adapter** pattern — the client connects through `@prisma/adapter-pg` instead of a direct connection string.

## Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Next.js     │     │  Prisma      │     │  PostgreSQL  │
│  Server      │────▶│  Client      │────▶│  Database    │
│  Components  │     │  (adapter-pg)│     │              │
└──────────────┘     └──────────────┘     └──────────────┘
```

## Tools Overview

This project uses 3 tools that work together. Each has a different role:

### Postgres.app — Database Engine (required)

The actual database server. Stores all data on your machine. Without it, nothing works.

- **What it is**: A macOS app that runs PostgreSQL
- **Where data lives**: `/opt/homebrew/var/postgresql@17/` (binary files on disk)
- **How to use**: Open the app → click **Start** to run, **Stop** when done
- **Port**: 5432 (runs locally, not exposed to internet)

> Think of it as the **bank vault** — it holds the actual data.

### Prisma — ORM / Translator (required, part of the code)

A JavaScript library inside Next.js that translates TypeScript code into SQL queries.

- **What it is**: npm package, installed in the project
- **What it does**: You write `prisma.post.findMany()` → Prisma converts it to `SELECT * FROM posts` → sends to PostgreSQL
- **Key benefit**: Type-safe queries — TypeScript catches mistakes at compile time, not runtime

> Think of it as the **bank teller** — you speak TypeScript, the vault understands SQL, the teller translates.

### Prisma Studio — Data Viewer (optional)

A web UI to browse and edit database data visually. Does NOT store data — just connects to PostgreSQL to display it.

- **What it is**: Web page on localhost (launched via `npm run db:studio`)
- **What it does**: View, add, edit, delete rows in any table through a browser UI
- **When to use**: When you want to inspect or modify data without writing SQL
- **Alternative**: Double-click a database in Postgres.app to open `psql` (SQL shell in terminal)

> Think of it as the **banking app on your phone** — shows your balance, lets you transfer money, but doesn't hold any money itself.

### How they connect

```
                    ┌──────────────────────┐
                    │    Postgres.app       │
                    │    (stores data)      │
                    │    port 5432          │
                    └──────┬───────┬────────┘
                           │       │
              reads data   │       │   reads/writes data
                           │       │
              ┌────────────┘       └───────────┐
              ▼                                ▼
┌──────────────────────┐         ┌──────────────────────┐
│  Next.js + Prisma    │         │  Prisma Studio       │
│  localhost:3000      │         │  localhost:51212      │
│  Website for users   │         │  Admin UI for you    │
└──────────────────────┘         └──────────────────────┘
```

Both Next.js and Prisma Studio connect **directly** to PostgreSQL via the same `DATABASE_URL` in `.env`. They don't know about each other.

## Data Model (ER Diagram)

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   Author    │       │    Post     │       │  Category   │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id (PK)     │◀──┐   │ id (PK)     │   ┌──▶│ id (PK)     │
│ name        │   │   │ title       │   │   │ name        │
│ slug (UQ)   │   │   │ slug (UQ)   │   │   │ slug (UQ)   │
│ avatar      │   │   │ excerpt     │   │   │ created_at  │
│ bio         │   │   │ content     │   │   │ updated_at  │
│ created_at  │   │   │ image       │   │   └─────────────┘
│ updated_at  │   │   │ read_time   │   │
└─────────────┘   │   │ featured    │   │   ┌─────────────┐
                  │   │ published   │   │   │  Exchange   │
                  │   │ published_at│   │   ├─────────────┤
                  │   │ author_id   │───┘   │ id (PK)     │
                  └───│ category_id │       │ name (UQ)   │
                      │ created_at  │       │ bonus       │
                      │ updated_at  │       │ badge       │
                      └─────────────┘       │ url         │
                                            │ order       │
                                            │ active      │
                                            │ created_at  │
                                            │ updated_at  │
                                            └─────────────┘
```

### Relationships

- **Author → Post**: One-to-many (an author has many posts)
- **Category → Post**: One-to-many (a category has many posts)
- **Exchange**: Standalone table for affiliate partners

### Key Design Decisions

| Decision | Rationale |
|---|---|
| `slug` as unique index | SEO-friendly URLs (`/bai-viet/bitcoin-vuot-70000`) |
| `published` + `publishedAt` | Draft/publish workflow — unpublished posts are hidden |
| `featured` flag on Post | Quickly query the hero post for homepage |
| `order` on Exchange | Control display order in sidebar CTA |
| `active` on Exchange | Soft-disable affiliates without deleting |
| Snake_case `@map` on columns | PostgreSQL convention, camelCase in TypeScript |

## Setup Instructions

### Option A: Local PostgreSQL

1. Install PostgreSQL (macOS):

```bash
brew install postgresql@17
brew services start postgresql@17
echo 'export PATH="/opt/homebrew/opt/postgresql@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

2. Create the database:

```bash
createdb crypto_blog
```

3. Update `.env` (use your macOS username — run `whoami` to check):

```
DATABASE_URL="postgresql://YOUR_MAC_USERNAME@localhost:5432/crypto_blog?schema=public"
```

### Option B: Neon (Free Cloud PostgreSQL) — Recommended

1. Go to [neon.tech](https://neon.tech) and create a free project
2. Copy the connection string
3. Update `.env`:

```
DATABASE_URL="postgresql://user:pass@ep-xxxxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

### Option C: Supabase

1. Go to [supabase.com](https://supabase.com) and create a project
2. Go to Settings → Database → Connection string (URI)
3. Update `.env` with the connection string

## Running Migrations

After configuring `DATABASE_URL`, run:

```bash
# Generate Prisma Client (TypeScript types)
npm run db:generate

# Create tables in the database
npm run db:migrate

# Seed initial data (authors, categories, posts, exchanges)
npm run db:seed
```

## Database Commands

| Command | Description |
|---|---|
| `npm run db:generate` | Regenerate Prisma Client after schema changes |
| `npm run db:migrate` | Create and apply a new migration |
| `npm run db:push` | Push schema directly (no migration file, useful for prototyping) |
| `npm run db:seed` | Populate database with initial data |
| `npm run db:studio` | Open Prisma Studio (visual database browser on localhost) |
| `npm run db:reset` | Reset database and re-run all migrations + seed |

## Data Access Layer

All database queries are centralized in `src/lib/api.ts`:

```typescript
import { getFeaturedPost, getPosts, getCategories } from "@/lib/api";

// In a server component or page:
const featured = await getFeaturedPost();
const { posts, totalPages } = await getPosts({ category: "Trading", page: 2 });
const categories = await getCategories();
```

### Available Functions

| Function | Returns |
|---|---|
| `getFeaturedPost()` | Single featured published post with author & category |
| `getPosts({ category?, search?, page?, pageSize? })` | Paginated posts with total count |
| `getPostBySlug(slug)` | Single post by URL slug |
| `getPopularPosts(limit?)` | Latest posts (default 4) |
| `getCategories()` | All categories |
| `getActiveExchanges()` | Active exchanges sorted by order |

## Workflow: Schema Changes

1. Edit `prisma/schema.prisma`
2. Run `npm run db:migrate` (creates a migration + applies it)
3. Prisma Client auto-regenerates with updated types
4. Update `src/lib/api.ts` if new queries are needed
