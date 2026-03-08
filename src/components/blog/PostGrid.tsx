import { PostCard } from "./PostCard";
import type { PostWithRelations } from "@/types";

interface PostGridProps {
  posts: PostWithRelations[];
}

export function PostGrid({ posts }: PostGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
