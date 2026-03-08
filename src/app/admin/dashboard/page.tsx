import { prisma } from "@/lib/db";
import Link from "next/link";
import { FileText, Eye, Star, Plus } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { DeletePostButton } from "@/components/admin/DeletePostButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [posts, totalPosts, publishedPosts, featuredPosts] = await Promise.all([
    prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: { author: true, category: true },
    }),
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.post.count({ where: { featured: true } }),
  ]);

  const stats = [
    { label: "Tổng bài viết", value: totalPosts, icon: FileText, color: "text-blue-400" },
    { label: "Đã xuất bản", value: publishedPosts, icon: Eye, color: "text-green-400" },
    { label: "Nổi bật", value: featuredPosts, icon: Star, color: "text-yellow-400" },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl font-medium transition"
        >
          <Plus className="w-5 h-5" />
          Tạo Bài Viết
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-slate-800/60 border border-purple-500/20 rounded-xl p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <Icon className={`w-10 h-10 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-800/60 border border-purple-500/20 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-purple-500/20">
          <h2 className="text-xl font-bold text-white">Tất Cả Bài Viết</h2>
        </div>

        {posts.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">Chưa có bài viết nào</p>
            <Link
              href="/admin/posts/new"
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Tạo bài viết đầu tiên
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-400 border-b border-purple-500/10">
                  <th className="px-6 py-4 font-medium">Tiêu đề</th>
                  <th className="px-6 py-4 font-medium">Danh mục</th>
                  <th className="px-6 py-4 font-medium">Tác giả</th>
                  <th className="px-6 py-4 font-medium">Trạng thái</th>
                  <th className="px-6 py-4 font-medium">Ngày tạo</th>
                  <th className="px-6 py-4 font-medium text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/10">
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-slate-700/30 transition"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {post.featured && (
                          <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                        )}
                        <span className="text-white font-medium line-clamp-1">
                          {post.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-purple-500/20 text-purple-300 text-xs px-2.5 py-1 rounded-full">
                        {post.category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-sm">
                      {post.author.name}
                    </td>
                    <td className="px-6 py-4">
                      {post.published ? (
                        <span className="bg-green-500/20 text-green-400 text-xs px-2.5 py-1 rounded-full">
                          Published
                        </span>
                      ) : (
                        <span className="bg-gray-500/20 text-gray-400 text-xs px-2.5 py-1 rounded-full">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-sm">
                      {formatDate(post.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/posts/${post.id}`}
                          className="text-sm text-purple-400 hover:text-purple-300 font-medium transition"
                        >
                          Sửa
                        </Link>
                        <DeletePostButton postId={post.id} postTitle={post.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
