"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  TrendingUp,
  LayoutDashboard,
  FilePlus,
  LogOut,
  Home,
} from "lucide-react";
import { logout } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts/new", label: "Tạo Bài Viết", icon: FilePlus },
];

export function AdminSidebar({ username }: { username: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-800/80 border-r border-purple-500/20 flex flex-col min-h-screen">
      <div className="p-6 border-b border-purple-500/20">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-7 h-7 text-purple-400" />
          <span className="text-xl font-bold text-white">Admin</span>
        </div>
        <p className="text-sm text-gray-400 mt-1">Hi, {username}</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin/dashboard" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition",
                isActive
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-slate-700/50 hover:text-white",
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-purple-500/20 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-slate-700/50 hover:text-white transition"
        >
          <Home className="w-5 h-5" />
          Về Trang Chủ
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition w-full"
          >
            <LogOut className="w-5 h-5" />
            Đăng Xuất
          </button>
        </form>
      </div>
    </aside>
  );
}
