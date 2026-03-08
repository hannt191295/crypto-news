"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";

interface MobileMenuProps {
  onClose: () => void;
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <nav className="mt-4 space-y-3 pb-4 md:hidden">
      {siteConfig.nav.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClose}
          className="block text-gray-300 hover:text-purple-400"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
