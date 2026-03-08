import {
  getFeaturedPost,
  getPosts,
  getPopularPosts,
  getCategories,
  getActiveExchanges,
} from "@/lib/api";
import { HomePage } from "./HomePage";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [featuredPost, { posts, totalPages }, popularPosts, categories, exchanges] =
    await Promise.all([
      getFeaturedPost(),
      getPosts(),
      getPopularPosts(),
      getCategories(),
      getActiveExchanges(),
    ]);

  return (
    <HomePage
      featuredPost={featuredPost}
      posts={posts}
      totalPages={totalPages}
      popularPosts={popularPosts}
      categories={categories}
      exchanges={exchanges}
    />
  );
}
