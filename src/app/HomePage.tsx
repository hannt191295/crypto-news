"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  TrendingUp,
  Clock,
  User,
  ChevronRight,
  Newspaper,
  BookOpen,
  ArrowRight,
  Zap,
  BarChart3,
  Shield,
} from "lucide-react";
import { PostCard } from "@/components/blog/PostCard";
import { CategoryFilter, Pagination } from "@/components/blog";
import { PopularPosts, Newsletter } from "@/components/sidebar";
import { AffiliateCTA } from "@/components/sidebar";
import { formatDate } from "@/lib/utils";
import type { PostWithRelations, Category, Exchange } from "@/types";

interface HomePageProps {
  featuredPost: PostWithRelations | null;
  posts: PostWithRelations[];
  totalPages: number;
  popularPosts: PostWithRelations[];
  categories: Category[];
  exchanges: Exchange[];
}

const features = [
  { icon: Zap, label: "Cập nhật realtime", value: "24/7" },
  { icon: BarChart3, label: "Phân tích chuyên sâu", value: "Pro" },
  { icon: Shield, label: "Nguồn tin uy tín", value: "100%" },
];

export function HomePage({
  featuredPost,
  posts,
  totalPages,
  popularPosts,
  categories,
  exchanges,
}: HomePageProps) {
  const [activeCategory, setActiveCategory] = useState("Tất Cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const categoryNames = ["Tất Cả", ...categories.map((c) => c.name)];

  const displayPosts = posts.filter((p) => {
    const matchesCategory =
      activeCategory === "Tất Cả" || p.category.name === activeCategory;
    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden border-b border-purple-500/10 pb-16 pt-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600/15 via-transparent to-transparent" />
        <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-purple-600/5 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-pink-600/5 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm text-purple-300">
              <TrendingUp className="h-4 w-4" />
              Tin tức crypto #1 Việt Nam
            </div>
            <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              Thế Giới{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Crypto
              </span>{" "}
              Trong Tầm Tay
            </h1>
            <p className="mb-8 text-lg text-gray-400">
              Phân tích, tin tức và hướng dẫn giao dịch tiền điện tử cập nhật
              mỗi ngày. Đồng hành cùng bạn từ A đến Z.
            </p>

            {/* Search */}
            <div className="relative mx-auto max-w-xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết, hướng dẫn, phân tích..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-purple-500/20 bg-slate-800/60 py-4 pl-12 pr-4 text-white placeholder-gray-500 backdrop-blur transition focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
          </div>

          {/* Feature Badges */}
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10">
                    <Icon className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {f.value}
                    </div>
                    <div className="text-xs text-gray-500">{f.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Featured Post Hero ── */}
      {featuredPost && (
        <section className="mx-auto max-w-7xl px-4 py-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-gradient-to-b from-purple-400 to-pink-500" />
            <h2 className="text-xl font-bold text-white">Bài Viết Nổi Bật</h2>
          </div>
          <article className="group relative overflow-hidden rounded-2xl border border-purple-500/20">
            <div className="relative h-72 md:h-[420px]">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-full bg-purple-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    {featuredPost.category.name}
                  </span>
                  <span className="rounded-full bg-red-500/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    Nổi Bật
                  </span>
                </div>
                <h2 className="mb-3 max-w-2xl text-2xl font-bold text-white transition group-hover:text-purple-200 md:text-4xl">
                  {featuredPost.title}
                </h2>
                <p className="mb-4 max-w-xl text-gray-300 line-clamp-2 md:line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <User className="h-4 w-4" />
                      {featuredPost.author.name}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {featuredPost.readTime}
                    </span>
                    <span>{formatDate(featuredPost.publishedAt)}</span>
                  </div>
                  <Link
                    href={`/news/${featuredPost.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-600/25 transition hover:bg-purple-500 hover:shadow-purple-500/30"
                  >
                    Đọc ngay <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* ── Quick Nav Cards ── */}
      <section className="mx-auto max-w-7xl px-4 pb-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link
            href="/news"
            className="group flex items-center gap-4 rounded-2xl border border-purple-500/10 bg-slate-800/30 p-5 transition hover:border-purple-500/30 hover:bg-slate-800/50"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-600/15">
              <Newspaper className="h-6 w-6 text-purple-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-white group-hover:text-purple-300">
                Tin Tức Mới Nhất
              </h3>
              <p className="text-sm text-gray-500">
                Bitcoin, Ethereum, Altcoin & phân tích thị trường
              </p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-gray-600 transition group-hover:translate-x-1 group-hover:text-purple-400" />
          </Link>
          <Link
            href="/guides"
            className="group flex items-center gap-4 rounded-2xl border border-emerald-500/10 bg-slate-800/30 p-5 transition hover:border-emerald-500/30 hover:bg-slate-800/50"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600/15">
              <BookOpen className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-white group-hover:text-emerald-300">
                Hướng Dẫn Từng Bước
              </h3>
              <p className="text-sm text-gray-500">
                Từ cơ bản đến nâng cao cho người mới
              </p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-gray-600 transition group-hover:translate-x-1 group-hover:text-emerald-400" />
          </Link>
        </div>
      </section>

      {/* ── Main Content + Sidebar ── */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Section Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-gradient-to-b from-purple-400 to-pink-500" />
                <h2 className="text-xl font-bold text-white">
                  Bài Viết Mới Nhất
                </h2>
              </div>
              <Link
                href="/news"
                className="flex items-center gap-1 text-sm text-purple-400 transition hover:text-purple-300"
              >
                Xem tất cả <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <CategoryFilter
              categories={categoryNames}
              active={activeCategory}
              onChange={setActiveCategory}
            />

            {displayPosts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-700 py-16 text-center">
                <Search className="mx-auto mb-3 h-10 w-10 text-slate-600" />
                <p className="text-gray-400">
                  Không tìm thấy bài viết phù hợp.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {displayPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <PopularPosts posts={popularPosts} />
            <Newsletter />
            <AffiliateCTA exchanges={exchanges} />
          </aside>
        </div>
      </section>
    </main>
  );
}
