import { prisma } from "./db";

// ──────────────────────────────────────────────
// Posts
// ──────────────────────────────────────────────

export async function getFeaturedPost() {
  return prisma.post.findFirst({
    where: { featured: true, published: true },
    include: { author: true, category: true },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getPosts(options?: {
  category?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  const { category, search, page = 1, pageSize = 6 } = options ?? {};

  const where = {
    published: true,
    featured: false,
    ...(category && category !== "Tất Cả"
      ? { category: { name: category } }
      : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            { excerpt: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: { author: true, category: true },
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.post.count({ where }),
  ]);

  return {
    posts,
    total,
    totalPages: Math.ceil(total / pageSize),
    page,
  };
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: { author: true, category: true },
  });
}

export async function getPopularPosts(limit = 4) {
  return prisma.post.findMany({
    where: { published: true },
    include: { author: true, category: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getPostsByCategorySlug(
  categorySlug: string,
  options?: { page?: number; pageSize?: number },
) {
  const { page = 1, pageSize = 9 } = options ?? {};

  const where = {
    published: true,
    category: { slug: categorySlug },
  };

  const [posts, total, category] = await Promise.all([
    prisma.post.findMany({
      where,
      include: { author: true, category: true },
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.post.count({ where }),
    prisma.category.findUnique({ where: { slug: categorySlug } }),
  ]);

  return {
    posts,
    total,
    totalPages: Math.ceil(total / pageSize),
    page,
    category,
  };
}

export async function getAllPublishedPosts(options?: {
  page?: number;
  pageSize?: number;
}) {
  const { page = 1, pageSize = 9 } = options ?? {};

  const where = { published: true };

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      include: { author: true, category: true },
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.post.count({ where }),
  ]);

  return {
    posts,
    total,
    totalPages: Math.ceil(total / pageSize),
    page,
  };
}

// ──────────────────────────────────────────────
// Categories
// ──────────────────────────────────────────────

export async function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}

// ──────────────────────────────────────────────
// Exchanges
// ──────────────────────────────────────────────

export async function getActiveExchanges() {
  return prisma.exchange.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });
}
