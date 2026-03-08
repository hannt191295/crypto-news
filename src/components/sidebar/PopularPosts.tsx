import Image from "next/image";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { PostWithRelations } from "@/types";

interface PopularPostsProps {
  posts: PostWithRelations[];
}

export function PopularPosts({ posts }: PopularPostsProps) {
  return (
    <div className="rounded-2xl border border-purple-500/10 bg-slate-800/30 p-5 backdrop-blur">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600/15">
          <TrendingUp className="h-4 w-4 text-purple-400" />
        </div>
        <h3 className="text-lg font-bold text-white">Đọc Nhiều Nhất</h3>
      </div>
      <div className="space-y-3">
        {posts.map((post, idx) => (
          <Link
            key={post.id}
            href={`/news/${post.slug}`}
            className="group flex gap-3 rounded-xl p-2 transition hover:bg-slate-700/30"
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 text-xs font-bold text-white">
                {String(idx + 1).padStart(2, "0")}
              </div>
            </div>
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
  );
}
