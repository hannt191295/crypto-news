"use server";

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const excerpt = formData.get("excerpt") as string;
  const content = (formData.get("content") as string) || null;
  const image = formData.get("image") as string;
  const readTime = formData.get("readTime") as string;
  const authorId = formData.get("authorId") as string;
  const categoryId = formData.get("categoryId") as string;
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";

  await prisma.post.create({
    data: {
      title,
      slug,
      excerpt,
      content,
      image,
      readTime,
      authorId,
      categoryId,
      featured,
      published,
      publishedAt: published ? new Date() : null,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}

export async function updatePost(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = (formData.get("content") as string) || null;
  const image = formData.get("image") as string;
  const readTime = formData.get("readTime") as string;
  const authorId = formData.get("authorId") as string;
  const categoryId = formData.get("categoryId") as string;
  const featured = formData.get("featured") === "on";
  const published = formData.get("published") === "on";

  const existing = await prisma.post.findUnique({ where: { id } });

  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug,
      excerpt,
      content,
      image,
      readTime,
      authorId,
      categoryId,
      featured,
      published,
      publishedAt: published && !existing?.publishedAt ? new Date() : existing?.publishedAt,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}

export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/dashboard");
}
