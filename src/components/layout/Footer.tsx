import Link from "next/link";
import { siteConfig } from "@/config/site";

const footerSections = [
  {
    title: "Danh Mục",
    links: [
      { label: "Tin Tức", href: "/news" },
      { label: "Hướng Dẫn", href: "/guides" },
      { label: "So Sánh Sàn", href: "/exchanges" },
    ],
  },
  {
    title: "Sàn Giao Dịch",
    links: [
      { label: "Binance", href: "#" },
      { label: "Bybit", href: "#" },
      { label: "OKX", href: "#" },
    ],
  },
  {
    title: "Liên Hệ",
    links: [
      { label: "Email", href: "#" },
      { label: "Telegram", href: "#" },
      { label: "Twitter", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-purple-500/20 bg-slate-900/80 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h4 className="mb-3 font-bold text-white">{siteConfig.name}</h4>
            <p className="text-sm text-gray-400">{siteConfig.description}</p>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-3 font-semibold text-white">
                {section.title}
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-purple-400">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-purple-500/20 pt-6 text-center text-sm text-gray-400">
          <p>© 2026 {siteConfig.name}. Bản quyền thuộc về chúng tôi.</p>
          <p className="mt-2">
            <strong>Disclaimer:</strong> Đầu tư crypto có rủi ro cao. Luôn
            nghiên cứu kỹ trước khi đầu tư.
          </p>
        </div>
      </div>
    </footer>
  );
}
