import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { PostWithRelations } from "@/types";

interface PostCardProps {
  post: PostWithRelations;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/news/${post.slug}`}>
      <article className="group overflow-hidden rounded-xl border border-purple-500/10 bg-slate-800/30 backdrop-blur transition-all duration-300 hover:border-purple-500/30 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-purple-500/5">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 transition group-hover:opacity-100" />
        </div>
        <div className="p-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">
            {post.category.name}
          </span>
          <h3 className="mb-2 mt-2 line-clamp-2 text-lg font-bold text-white transition group-hover:text-purple-300">
            {post.title}
          </h3>
          <p className="mb-3 line-clamp-2 text-sm text-gray-400">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
