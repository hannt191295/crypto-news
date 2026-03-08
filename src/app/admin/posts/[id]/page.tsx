import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { PostForm } from "../PostForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [post, authors, categories] = await Promise.all([
    prisma.post.findUnique({ where: { id } }),
    prisma.author.findMany({ orderBy: { name: "asc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!post) notFound();

  return (
    <PostForm
      authors={authors.map((a) => ({ id: a.id, name: a.name }))}
      categories={categories.map((c) => ({ id: c.id, name: c.name }))}
      post={{
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image,
        readTime: post.readTime,
        authorId: post.authorId,
        categoryId: post.categoryId,
        featured: post.featured,
        published: post.published,
      }}
    />
  );
}
