"use client";

import { useState } from "react";
import Link from "next/link";
import { TrendingUp, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-purple-500/20 bg-slate-900/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">
              {siteConfig.name}
            </span>
          </Link>

          <nav className="hidden items-center space-x-6 md:flex">
            {siteConfig.nav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 transition hover:text-purple-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </div>
    </header>
  );
}
