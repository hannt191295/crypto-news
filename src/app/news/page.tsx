import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  User,
  ChevronRight,
  TrendingUp,
  Newspaper,
} from "lucide-react";
import {
  getAllPublishedPosts,
  getCategories,
  getFeaturedPost,
  getPopularPosts,
} from "@/lib/api";
import { PostCard } from "@/components/blog/PostCard";
import { Newsletter } from "@/components/sidebar/Newsletter";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tin Tức Crypto",
  description:
    "Cập nhật tin tức crypto mới nhất - Bitcoin, Ethereum, Altcoin và thị trường tiền điện tử",
};

export const dynamic = "force-dynamic";

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const currentCategory = params.category ?? null;
  const currentPage = Number(params.page ?? "1");

  const [{ posts, totalPages }, categories, featuredPost, popularPosts] =
    await Promise.all([
      getAllPublishedPosts({ page: currentPage }),
      getCategories(),
      getFeaturedPost(),
      getPopularPosts(5),
    ]);

  return (
    <main className="min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden border-b border-purple-500/10 bg-gradient-to-b from-purple-950/40 to-transparent pb-12 pt-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600/20">
              <Newspaper className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white md:text-4xl">
                Tin Tức Crypto
              </h1>
              <p className="text-sm text-gray-400">
                Cập nhật mới nhất về thị trường tiền điện tử
              </p>
            </div>
          </div>

          {/* Featured Article */}
          {featuredPost && (
            <article className="group grid gap-0 overflow-hidden rounded-2xl border border-purple-500/20 bg-slate-800/40 backdrop-blur md:grid-cols-2">
              <div className="relative h-64 md:h-full md:min-h-[320px]">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/60 md:block hidden" />
                <div className="absolute left-4 top-4 rounded-full bg-red-500/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Nổi Bật
                </div>
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <span className="mb-3 text-xs font-semibold uppercase tracking-wider text-purple-400">
                  {featuredPost.category.name}
                </span>
                <h2 className="mb-3 text-2xl font-bold leading-tight text-white transition group-hover:text-purple-300 md:text-3xl">
                  {featuredPost.title}
                </h2>
                <p className="mb-4 line-clamp-3 text-gray-400">
                  {featuredPost.excerpt}
                </p>
                <div className="mb-4 flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    {featuredPost.author.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {featuredPost.readTime}
                  </span>
                  <span>{formatDate(featuredPost.publishedAt)}</span>
                </div>
                <Link
                  href={`/news/${featuredPost.slug}`}
                  className="inline-flex w-fit items-center gap-1 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500"
                >
                  Đọc ngay <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* ── Category Tabs ── */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 scrollbar-hide">
          <Link
            href="/news"
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              !currentCategory
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                : "text-gray-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            Tất Cả
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/news?category=${cat.slug}`}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                currentCategory === cat.slug
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                  : "text-gray-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Main Content + Sidebar ── */}
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Posts Grid */}
          <div className="lg:col-span-2">
            {posts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 py-20 text-center">
                <Newspaper className="mx-auto mb-4 h-12 w-12 text-slate-600" />
                <p className="text-lg text-gray-400">
                  Chưa có bài viết nào.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                {currentPage > 1 && (
                  <Link
                    href={`/news?page=${currentPage - 1}${currentCategory ? `&category=${currentCategory}` : ""}`}
                    className="rounded-lg bg-slate-800/50 px-4 py-2 text-sm text-gray-400 transition hover:bg-slate-700"
                  >
                    Trước
                  </Link>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <Link
                      key={p}
                      href={`/news?page=${p}${currentCategory ? `&category=${currentCategory}` : ""}`}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                        p === currentPage
                          ? "bg-purple-600 text-white shadow-lg shadow-purple-600/25"
                          : "bg-slate-800/50 text-gray-400 hover:bg-slate-700"
                      }`}
                    >
                      {p}
                    </Link>
                  ),
                )}
                {currentPage < totalPages && (
                  <Link
                    href={`/news?page=${currentPage + 1}${currentCategory ? `&category=${currentCategory}` : ""}`}
                    className="rounded-lg bg-slate-800/50 px-4 py-2 text-sm text-gray-400 transition hover:bg-slate-700"
                  >
                    Sau
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Trending Posts */}
            <div className="rounded-2xl border border-purple-500/10 bg-slate-800/30 p-5 backdrop-blur">
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-400" />
                <h3 className="text-lg font-bold text-white">Xu Hướng</h3>
              </div>
              <div className="space-y-3">
                {popularPosts.map((post, idx) => (
                  <Link
                    key={post.id}
                    href={`/news/${post.slug}`}
                    className="group flex gap-3 rounded-xl p-2 transition hover:bg-slate-700/30"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-600/20 text-sm font-bold text-purple-400">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h4 className="line-clamp-2 text-sm font-semibold text-gray-200 transition group-hover:text-purple-300">
                        {post.title}
                      </h4>
                      <p className="mt-1 text-xs text-gray-500">
                        {formatDate(post.publishedAt)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <Newsletter />

            {/* Quick Stats */}
            <div className="rounded-2xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-5 backdrop-blur">
              <h3 className="mb-3 text-lg font-bold text-white">
                Thống Kê Nhanh
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Tổng bài viết</span>
                  <span className="font-semibold text-purple-300">
                    {posts.length}+
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Danh mục</span>
                  <span className="font-semibold text-purple-300">
                    {categories.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Cập nhật</span>
                  <span className="font-semibold text-purple-300">
                    Hàng ngày
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
