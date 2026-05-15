# VN Crypto Hub

A cryptocurrency blog website targeting the Vietnamese market — news, analysis, trading guides, and exchange comparisons.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up PostgreSQL (macOS — skip if already installed)
brew install --cask postgres-unofficial   # Install Postgres.app
open /Applications/Postgres.app           # Open it → click "Initialize"
export PATH="/Applications/Postgres.app/Contents/Versions/latest/bin:$PATH"
createdb crypto_blog

# 3. Configure environment
cp .env.example .env
# Edit .env → set DATABASE_URL="postgresql://YOUR_MAC_USERNAME@localhost:5432/crypto_blog?schema=public"

# 4. Set up database tables & seed data
npm run db:generate && npm run db:migrate && npm run db:seed

# 5. Start
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — full guide in [docs/GETTING_STARTED.md](./docs/GETTING_STARTED.md)

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | ESLint check |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed initial data |
| `npm run db:studio` | Open Prisma Studio |

## Documentation

See the [`docs/`](./docs) folder for details:

- [**PROJECT_OVERVIEW.md**](./docs/PROJECT_OVERVIEW.md) — Overview, tech stack, features
- [**GETTING_STARTED.md**](./docs/GETTING_STARTED.md) — Setup & running guide
- [**PROJECT_STRUCTURE.md**](./docs/PROJECT_STRUCTURE.md) — Directory structure & code conventions
- [**DATABASE.md**](./docs/DATABASE.md) — Database schema, setup, and query reference
