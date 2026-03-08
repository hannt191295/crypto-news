import { prisma } from "@/lib/db";
import { PostForm } from "../PostForm";

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  const [authors, categories] = await Promise.all([
    prisma.author.findMany({ orderBy: { name: "asc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <PostForm
      authors={authors.map((a) => ({ id: a.id, name: a.name }))}
      categories={categories.map((c) => ({ id: c.id, name: c.name }))}
    />
  );
}
