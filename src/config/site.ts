import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Crypto News",
  description: "Cổng thông tin crypto hàng đầu Việt Nam",
  url: "https://vncryptohub.com",
  nav: [
    { label: "Trang Chủ", href: "/" },
    { label: "Tin Tức", href: "/news" },
    { label: "Hướng Dẫn", href: "/guides" },
    { label: "So Sánh Sàn", href: "/exchanges" },
    { label: "Liên Hệ", href: "/contact" },
  ],
};
