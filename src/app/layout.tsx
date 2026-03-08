import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header, Footer, AffiliateBanner } from "@/components/layout";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <AffiliateBanner />
        {children}
        <Footer />
      </body>
    </html>
  );
}
