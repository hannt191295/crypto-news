"use client";

import { useState } from "react";
import { createPost, updatePost } from "@/lib/actions/posts";
import { Save, ArrowLeft, ImageIcon, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

interface Author {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

interface PostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string | null;
  image: string;
  readTime: string;
  authorId: string;
  categoryId: string;
  featured: boolean;
  published: boolean;
}

interface PostFormProps {
  authors: Author[];
  categories: Category[];
  post?: PostData;
}

export function PostForm({ authors, categories, post }: PostFormProps) {
  const isEditing = !!post;
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [imagePreview, setImagePreview] = useState(post?.image ?? "");
  const [submitting, setSubmitting] = useState(false);

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!isEditing) {
      setSlug(generateSlug(value));
    }
  }

  async function handleSubmit(formData: FormData) {
    setSubmitting(true);
    try {
      if (isEditing && post) {
        await updatePost(post.id, formData);
      } else {
        await createPost(formData);
      }
    } catch {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full px-4 py-3 bg-slate-800/80 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition";
  const selectClass =
    "w-full px-4 py-3 bg-slate-800/80 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition appearance-none";
  const labelClass = "block text-sm font-medium text-gray-300 mb-2";

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/dashboard"
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800/60 border border-slate-600/30 text-gray-400 hover:text-white hover:border-purple-500/40 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">
              {isEditing ? "Sửa Bài Viết" : "Tạo Bài Viết Mới"}
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {isEditing
                ? "Cập nhật thông tin bài viết"
                : "Điền thông tin để tạo bài viết mới"}
            </p>
          </div>
        </div>

        <form action={handleSubmit} className="space-y-8">
          {/* Basic Info Section */}
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-6">
            <h2 className="text-lg font-semibold text-white border-b border-slate-700/50 pb-3">
              Thông tin cơ bản
            </h2>

            {/* Title */}
            <div>
              <label htmlFor="title" className={labelClass}>
                Tiêu đề <span className="text-red-400">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className={inputClass}
                placeholder="Nhập tiêu đề bài viết"
              />
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="slug" className={labelClass}>
                Slug (URL)
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className={`${inputClass} font-mono text-sm`}
                placeholder="tu-dong-tao-tu-tieu-de"
              />
            </div>

            {/* Author & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="authorId" className={labelClass}>
                  Tác giả <span className="text-red-400">*</span>
                </label>
                <select
                  id="authorId"
                  name="authorId"
                  required
                  defaultValue={post?.authorId ?? ""}
                  className={selectClass}
                >
                  <option value="" disabled>
                    Chọn tác giả
                  </option>
                  {authors.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="categoryId" className={labelClass}>
                  Danh mục <span className="text-red-400">*</span>
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  required
                  defaultValue={post?.categoryId ?? ""}
                  className={selectClass}
                >
                  <option value="" disabled>
                    Chọn danh mục
                  </option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-6">
            <h2 className="text-lg font-semibold text-white border-b border-slate-700/50 pb-3">
              Nội dung
            </h2>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className={labelClass}>
                Tóm tắt <span className="text-red-400">*</span>
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                required
                rows={3}
                defaultValue={post?.excerpt ?? ""}
                className={`${inputClass} resize-none`}
                placeholder="Viết tóm tắt ngắn gọn về bài viết"
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className={labelClass}>
                Nội dung bài viết
              </label>
              <textarea
                id="content"
                name="content"
                rows={16}
                defaultValue={post?.content ?? ""}
                className={`${inputClass} resize-y font-mono text-sm leading-relaxed`}
                placeholder="Viết nội dung bài viết (hỗ trợ markdown)..."
              />
            </div>
          </div>

          {/* Media & Settings Section */}
          <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl p-6 space-y-6">
            <h2 className="text-lg font-semibold text-white border-b border-slate-700/50 pb-3">
              Media & Cài đặt
            </h2>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className={labelClass}>
                Ảnh bìa (URL) <span className="text-red-400">*</span>
              </label>
              <input
                id="image"
                name="image"
                type="url"
                required
                defaultValue={post?.image ?? ""}
                onChange={(e) => setImagePreview(e.target.value)}
                className={inputClass}
                placeholder="https://images.unsplash.com/..."
              />
              {imagePreview ? (
                <div className="mt-4 relative rounded-xl overflow-hidden border border-slate-600/30 max-w-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-52 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              ) : (
                <div className="mt-4 flex items-center justify-center h-52 max-w-lg rounded-xl border-2 border-dashed border-slate-600/40 bg-slate-800/30">
                  <div className="text-center text-gray-500">
                    <ImageIcon className="w-10 h-10 mx-auto mb-2" />
                    <p className="text-sm">Nhập URL ảnh để xem preview</p>
                  </div>
                </div>
              )}
            </div>

            {/* Read Time */}
            <div className="max-w-xs">
              <label htmlFor="readTime" className={labelClass}>
                Thời gian đọc <span className="text-red-400">*</span>
              </label>
              <input
                id="readTime"
                name="readTime"
                type="text"
                required
                defaultValue={post?.readTime ?? ""}
                className={inputClass}
                placeholder="5 phút đọc"
              />
            </div>

            {/* Toggles */}
            <div className="flex items-center gap-8 pt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="featured"
                    defaultChecked={post?.featured ?? false}
                    className="peer sr-only"
                  />
                  <div className="w-11 h-6 bg-slate-700 rounded-full peer-checked:bg-yellow-500 transition" />
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition" />
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition">
                  Bài viết nổi bật
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    name="published"
                    defaultChecked={post?.published ?? false}
                    className="peer sr-only"
                  />
                  <div className="w-11 h-6 bg-slate-700 rounded-full peer-checked:bg-green-500 transition" />
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-5 transition" />
                </div>
                <div className="flex items-center gap-1.5 text-sm text-gray-300 group-hover:text-white transition">
                  {post?.published ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                  Xuất bản
                </div>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white px-8 py-3 rounded-xl font-semibold transition shadow-lg shadow-purple-500/20"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {isEditing ? "Cập Nhật Bài Viết" : "Tạo Bài Viết"}
                </>
              )}
            </button>

            <Link
              href="/admin/dashboard"
              className="px-8 py-3 rounded-xl text-gray-300 hover:text-white bg-slate-800/60 hover:bg-slate-700/60 border border-slate-600/30 font-medium transition"
            >
              Huỷ
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
