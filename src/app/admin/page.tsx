"use client";

import { useActionState } from "react";
import { login } from "@/lib/actions/auth";
import { TrendingUp, Lock, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <TrendingUp className="w-10 h-10 text-purple-400" />
            <span className="text-3xl font-bold text-white">VN Crypto Hub</span>
          </div>
          <p className="text-gray-400">Admin Panel</p>
        </div>

        <div className="bg-slate-800/60 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Đăng Nhập
          </h2>

          {state?.error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6">
              <p className="text-red-400 text-sm text-center">{state.error}</p>
            </div>
          )}

          <form action={formAction} className="space-y-5">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoComplete="username"
                  className="w-full pl-11 pr-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="Nhập username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  className="w-full pl-11 pr-12 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="Nhập password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white font-semibold rounded-xl transition flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                "Đăng Nhập"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          &copy; 2026 VN Crypto Hub Admin
        </p>
      </div>
    </div>
  );
}
