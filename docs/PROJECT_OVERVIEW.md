# VN Crypto Hub - Project Overview

## Introduction

**VN Crypto Hub** is a cryptocurrency blog website targeting the Vietnamese market. The site provides news, market analysis, trading guides, and exchange comparisons, combined with an affiliate link system for revenue generation.

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | 16.1.6 | React framework with App Router, SSR/SSG |
| **React** | 19.2.3 | UI library |
| **TypeScript** | ^5 | Type safety |
| **Tailwind CSS** | ^4 | Utility-first CSS framework |
| **Lucide React** | ^0.577.0 | Icon library |
| **clsx** | ^2.1.1 | Conditional CSS class merging |
| **Prisma** | ^7.4 | Type-safe ORM for PostgreSQL |
| **PostgreSQL** | 16+ | Relational database |
| **ESLint** | ^9 | Code linting |

## System Requirements

- **Node.js**: >= 18.x (recommended >= 20.x)
- **npm**: >= 9.x
- **PostgreSQL**: >= 16.x (local or cloud — see [DATABASE.md](./DATABASE.md))
- **OS**: macOS, Linux, or Windows

## Key Features

- **Homepage**: Featured post hero, post grid listing, affiliate sidebar
- **Search**: Filter posts by keyword (title, excerpt, category)
- **Categories**: Filter by category (Guides, Analysis, Trading, Investment, NFT, DeFi)
- **Pagination**: Paginated post listing
- **Affiliate sidebar**: CTA boxes for crypto exchanges (Binance, Bybit, OKX)
- **Newsletter**: Email subscription form
- **Responsive**: Mobile-friendly with hamburger menu
- **SEO-ready**: Next.js metadata API, SSR, Vietnamese font subset
