# Getting Started

Run this project from scratch in **6 steps**.

## What You Need

- [Node.js](https://nodejs.org) >= 18
- [Postgres.app](https://postgresapp.com) (installed in Step 2)

---

## Step 1 — Clone & Install

```bash
git clone <repo-url>
cd crypto-blog
npm install
```

## Step 2 — Install PostgreSQL

Install [Postgres.app](https://postgresapp.com) — a simple macOS app with a Start/Stop button:

```bash
brew install --cask postgres-unofficial
```

Then open **Postgres.app** → click **Initialize**.

Finally, add the command-line tools to your terminal (run once):

```bash
echo 'export PATH="/Applications/Postgres.app/Contents/Versions/latest/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Check it works:

```bash
pg_isready          # should say "accepting connections"
psql --version      # should show a version number
```

## Step 3 — Create the Database

```bash
createdb crypto_blog
```

This creates an empty database called `crypto_blog` inside PostgreSQL.

## Step 4 — Connect the Project to the Database

```bash
cp .env.example .env
```

Open `.env` and replace `YOUR_MAC_USERNAME` with your username (run `whoami` to find it):

```
DATABASE_URL="postgresql://YOUR_MAC_USERNAME@localhost:5432/crypto_blog?schema=public"
```

## Step 5 — Create Tables & Add Sample Data

The table structure is already defined in `prisma/schema.prisma`. This step reads that file and creates the actual tables in PostgreSQL:

```bash
npm run db:generate    # Generate TypeScript types from the schema
npm run db:migrate     # Create tables (authors, posts, categories, exchanges)
npm run db:seed        # Insert sample data (7 posts, 4 authors, etc.)
```

Check it worked:

```bash
psql crypto_blog -c "SELECT title FROM posts;"
```

## Step 6 — Start the Website

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — done!

---

## Daily Workflow

```bash
# 1. Open Postgres.app → click Start
# 2. Run:
npm run dev
# 3. When done: Ctrl+C, then Stop in Postgres.app
```

## Adding Data

### Prisma Studio (easiest — web UI)

```bash
npm run db:studio
```

Opens a visual editor in your browser. Click a table → **Add record** → fill in fields → **Save**. Changes appear on the website immediately after refresh.

### Seed script (bulk data for the whole team)

Edit `prisma/seed.ts` to add new records, then run:

```bash
npm run db:seed
```

Good for sample data that every developer should have after cloning the project.

### psql (SQL in terminal)

```bash
psql crypto_blog
```

```sql
INSERT INTO authors (id, name, slug, created_at, updated_at)
VALUES ('abc123', 'Huy Crypto', 'huy-crypto', NOW(), NOW());
```

## Viewing Data

**Prisma Studio** (web UI):

```bash
npm run db:studio
```

**psql** (terminal):

```bash
psql crypto_blog
```

```sql
\dt                    -- list tables
SELECT * FROM posts;   -- view posts
\q                     -- quit
```

## All Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server — auto-reloads when you edit code |
| `npm run build` | Compile & optimize code for production (no server) |
| `npm run start` | Serve the production build (run `build` first) |
| `npm run lint` | Check code quality |
| `npm run db:generate` | Regenerate types after schema changes |
| `npm run db:migrate` | Create/update database tables |
| `npm run db:seed` | Insert sample data |
| `npm run db:studio` | Open visual database editor |
| `npm run db:reset` | Wipe database and start fresh |

## Common Errors

| Error | Fix |
|---|---|
| `command not found: psql` | Run: `echo 'export PATH="/Applications/Postgres.app/Contents/Versions/latest/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc` |
| `ECONNREFUSED` | PostgreSQL is not running → open Postgres.app → click **Start** |
| `P1010 Access denied` | Wrong username in `.env` → run `whoami` and update `DATABASE_URL` |
| `database "crypto_blog" does not exist` | Run: `createdb crypto_blog` |
| `relation "posts" does not exist` | Run: `npm run db:migrate` |
| Dev server shows stale error | Restart: `Ctrl+C` then `npm run dev` |
