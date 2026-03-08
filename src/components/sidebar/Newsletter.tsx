"use client";

import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with newsletter service
    setEmail("");
  };

  return (
    <div className="rounded-2xl border border-purple-500/10 bg-gradient-to-br from-slate-800/50 to-purple-900/20 p-5 backdrop-blur">
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-600/15">
          <Mail className="h-4 w-4 text-purple-400" />
        </div>
        <h3 className="text-lg font-bold text-white">Newsletter</h3>
      </div>
      <p className="mb-4 text-sm text-gray-400">
        Nhận tin tức crypto mới nhất mỗi tuần, miễn phí.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-xl border border-purple-500/20 bg-slate-800/60 px-4 py-2.5 text-sm text-white placeholder-gray-500 transition focus:border-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
        />
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition hover:bg-purple-500 hover:shadow-purple-500/25"
        >
          Đăng ký ngay <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
