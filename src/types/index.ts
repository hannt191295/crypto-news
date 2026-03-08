import type {
  Post as PrismaPost,
  Author as PrismaAuthor,
  Category as PrismaCategory,
  Exchange as PrismaExchange,
} from "@/generated/prisma/client";

export type PostWithRelations = PrismaPost & {
  author: PrismaAuthor;
  category: PrismaCategory;
};

export type { PrismaAuthor as Author };
export type { PrismaCategory as Category };
export type { PrismaExchange as Exchange };

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  nav: NavLink[];
}
