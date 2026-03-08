"use client";

import { deletePost } from "@/lib/actions/posts";
import { useTransition } from "react";

export function DeletePostButton({
  postId,
  postTitle,
}: {
  postId: string;
  postTitle: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Bạn có chắc muốn xoá bài viết "${postTitle}"?`)) return;

    startTransition(async () => {
      await deletePost(postId);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-sm text-red-400 hover:text-red-300 font-medium transition disabled:opacity-50"
    >
      {isPending ? "Đang xoá..." : "Xoá"}
    </button>
  );
}
