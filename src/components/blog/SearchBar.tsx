"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="mb-8">
      <div className="relative mx-auto max-w-2xl">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm kiếm bài viết, hướng dẫn..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-purple-500/30 bg-slate-800/50 py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
    </div>
  );
}
