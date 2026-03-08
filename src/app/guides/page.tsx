import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  User,
  ChevronRight,
  GraduationCap,
  Lightbulb,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { getPostsByCategorySlug, getPopularPosts } from "@/lib/api";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Hướng Dẫn Crypto",
  description:
    "Hướng dẫn chi tiết về giao dịch crypto, đăng ký sàn, và kiến thức cơ bản cho người mới",
};

export const dynamic = "force-dynamic";

const difficultyLevels = [
  { label: "Cơ bản", color: "emerald", icon: Lightbulb },
  { label: "Trung bình", color: "amber", icon: BookOpen },
  { label: "Nâng cao", color: "rose", icon: Rocket },
];

function getDifficulty(index: number) {
  return difficultyLevels[index % difficultyLevels.length];
}

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page ?? "1");

  const [{ posts, totalPages }, popularPosts] = await Promise.all([
    getPostsByCategorySlug("huong-dan", { page: currentPage }),
    getPopularPosts(4),
  ]);

  return (
    <main className="min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden border-b border-emerald-500/10 bg-gradient-to-b from-emerald-950/30 via-slate-900/50 to-transparent pb-16 pt-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-600/10 via-transparent to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-teal-500/5 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400">
                <GraduationCap className="h-4 w-4" />
                Trung Tâm Học Tập
              </div>
              <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-5xl">
                Hướng Dẫn{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  Crypto
                </span>
              </h1>
              <p className="mb-6 max-w-lg text-lg text-gray-400">
                Từng bước tiếp cận thế giới tiền điện tử. Phù hợp cho cả người
                mới bắt đầu và trader có kinh nghiệm.
              </p>
              <div className="flex flex-wrap gap-4">
                {difficultyLevels.map((level) => {
                  const Icon = level.icon;
                  const colorMap: Record<string, string> = {
                    emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
                    amber: "border-amber-500/20 bg-amber-500/10 text-amber-400",
                    rose: "border-rose-500/20 bg-rose-500/10 text-rose-400",
                  };
                  return (
                    <div
                      key={level.label}
                      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${colorMap[level.color]}`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {level.label}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-emerald-500/10 blur-3xl" />
                <div className="relative grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-emerald-500/20 bg-slate-800/60 p-4 backdrop-blur">
                      <div className="mb-2 text-3xl font-bold text-emerald-400">
                        {posts.length}+
                      </div>
                      <div className="text-xs text-gray-400">Bài hướng dẫn</div>
                    </div>
                    <div className="rounded-2xl border border-teal-500/20 bg-slate-800/60 p-4 backdrop-blur">
                      <div className="mb-2 text-3xl font-bold text-teal-400">
                        3
                      </div>
                      <div className="text-xs text-gray-400">Cấp độ</div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="rounded-2xl border border-cyan-500/20 bg-slate-800/60 p-4 backdrop-blur">
                      <div className="mb-2 text-3xl font-bold text-cyan-400">
                        24/7
                      </div>
                      <div className="text-xs text-gray-400">Truy cập</div>
                    </div>
                    <div className="rounded-2xl border border-emerald-500/20 bg-slate-800/60 p-4 backdrop-blur">
                      <div className="mb-2 text-2xl">🇻🇳</div>
                      <div className="text-xs text-gray-400">Tiếng Việt</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Guide List ── */}
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-teal-500" />
            <h2 className="text-xl font-bold text-white">
              Tất Cả Hướng Dẫn
            </h2>
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
              {posts.length} bài
            </span>
          </div>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-emerald-500/20 py-20 text-center">
            <GraduationCap className="mx-auto mb-4 h-12 w-12 text-slate-600" />
            <p className="text-lg text-gray-400">
              Chưa có bài hướng dẫn nào.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post, idx) => {
              const difficulty = getDifficulty(idx);
              const DiffIcon = difficulty.icon;
              const badgeColor: Record<string, string> = {
                emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
                amber: "border-amber-500/30 bg-amber-500/10 text-amber-400",
                rose: "border-rose-500/30 bg-rose-500/10 text-rose-400",
              };
              const numColor: Record<string, string> = {
                emerald: "from-emerald-600 to-teal-600",
                amber: "from-amber-600 to-orange-600",
                rose: "from-rose-600 to-pink-600",
              };

              return (
                <article
                  key={post.id}
                  className="group grid overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/30 transition hover:border-emerald-500/30 hover:bg-slate-800/50 md:grid-cols-[auto_1fr]"
                >
                  {/* Step Number + Image */}
                  <div className="relative flex md:w-72">
                    <div className="relative h-48 w-full md:h-full">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent" />
                      <div
                        className={`absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${numColor[difficulty.color]} text-lg font-bold text-white shadow-lg`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center p-5 md:p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${badgeColor[difficulty.color]}`}
                      >
                        <DiffIcon className="h-3 w-3" />
                        {difficulty.label}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="mb-2 text-lg font-bold text-white transition group-hover:text-emerald-300 md:text-xl">
                      {post.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm text-gray-400">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author.name}
                        </span>
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <Link
                        href={`/news/${post.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-emerald-400 transition hover:text-emerald-300"
                      >
                        Đọc ngay
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {currentPage > 1 && (
              <Link
                href={`/guides?page=${currentPage - 1}`}
                className="rounded-lg bg-slate-800/50 px-4 py-2 text-sm text-gray-400 transition hover:bg-slate-700"
              >
                Trước
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/guides?page=${p}`}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  p === currentPage
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25"
                    : "bg-slate-800/50 text-gray-400 hover:bg-slate-700"
                }`}
              >
                {p}
              </Link>
            ))}
            {currentPage < totalPages && (
              <Link
                href={`/guides?page=${currentPage + 1}`}
                className="rounded-lg bg-slate-800/50 px-4 py-2 text-sm text-gray-400 transition hover:bg-slate-700"
              >
                Sau
              </Link>
            )}
          </div>
        )}

        {/* Suggested Reading from other categories */}
        {popularPosts.length > 0 && (
          <section className="mt-16">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-gradient-to-b from-purple-400 to-pink-500" />
              <h2 className="text-xl font-bold text-white">
                Bài Viết Liên Quan
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {popularPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/news/${post.slug}`}
                  className="group rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 transition hover:border-purple-500/30"
                >
                  <div className="relative mb-3 h-32 overflow-hidden rounded-lg">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <span className="text-xs font-medium text-purple-400">
                    {post.category.name}
                  </span>
                  <h4 className="mt-1 line-clamp-2 text-sm font-semibold text-gray-200 transition group-hover:text-purple-300">
                    {post.title}
                  </h4>
                  <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
