import Image from "next/image";
import { User, Clock, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { PostWithRelations } from "@/types";

interface FeaturedPostProps {
  post: PostWithRelations;
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="mb-8 overflow-hidden rounded-2xl border border-purple-500/20 bg-slate-800/50 backdrop-blur transition hover:border-purple-500/40">
      <div className="relative h-64 md:h-96">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute left-4 top-4">
          <Badge>{post.category.name}</Badge>
        </div>
      </div>
      <div className="p-6">
        <h2 className="mb-3 cursor-pointer text-2xl font-bold text-white transition hover:text-purple-400 md:text-3xl">
          {post.title}
        </h2>
        <p className="mb-4 leading-relaxed text-gray-300">{post.excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              {post.author.name}
            </span>
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {post.readTime}
            </span>
          </div>
          <span>{formatDate(post.publishedAt)}</span>
        </div>
        <button className="mt-4 flex items-center rounded-lg bg-purple-600 px-6 py-2 text-white transition hover:bg-purple-700">
          Đọc tiếp <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
