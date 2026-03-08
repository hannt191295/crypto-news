import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // ── Admin Users ─────────────────────────────
  const defaultPassword = await bcrypt.hash("admin123", 12);
  await prisma.adminUser.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: defaultPassword,
      name: "Administrator",
      role: "admin",
    },
  });
  console.log("Default admin created (username: admin / password: admin123)");

  // ── Authors ───────────────────────────────
  const minhCrypto = await prisma.author.upsert({
    where: { slug: "minh-crypto" },
    update: {},
    create: { name: "Minh Crypto", slug: "minh-crypto" },
  });

  const admin = await prisma.author.upsert({
    where: { slug: "admin" },
    update: {},
    create: { name: "Admin", slug: "admin" },
  });

  const tuanNguyen = await prisma.author.upsert({
    where: { slug: "tuan-nguyen" },
    update: {},
    create: { name: "Tuấn Nguyen", slug: "tuan-nguyen" },
  });

  const linhCrypto = await prisma.author.upsert({
    where: { slug: "linh-crypto" },
    update: {},
    create: { name: "Linh Crypto", slug: "linh-crypto" },
  });

  // ── Categories ────────────────────────────
  const catMap: Record<string, string> = {};
  const categories = [
    { name: "Hướng Dẫn", slug: "huong-dan" },
    { name: "Phân Tích", slug: "phan-tich" },
    { name: "Trading", slug: "trading" },
    { name: "Đầu Tư", slug: "dau-tu" },
    { name: "NFT", slug: "nft" },
    { name: "DeFi", slug: "defi" },
  ];

  for (const cat of categories) {
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    catMap[cat.name] = record.id;
  }

  // ── Posts ──────────────────────────────────
  const posts = [
    {
      title: "Bitcoin Vượt $70,000 - Phân Tích Chi Tiết Bull Run 2026",
      slug: "bitcoin-vuot-70000-phan-tich-bull-run-2026",
      excerpt:
        "Thị trường crypto bùng nổ với Bitcoin thiết lập ATH mới. Chúng tôi phân tích các yếu tố đằng sau đợt tăng trưởng này và dự đoán xu hướng sắp tới...",
      image:
        "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=500&fit=crop",
      readTime: "8 phút đọc",
      featured: true,
      published: true,
      publishedAt: new Date("2026-03-04"),
      authorId: minhCrypto.id,
      categoryId: catMap["Phân Tích"],
    },
    {
      title: "Top 5 Sàn Giao Dịch Crypto Uy Tín Nhất Việt Nam 2026",
      slug: "top-5-san-giao-dich-crypto-viet-nam-2026",
      excerpt:
        "So sánh chi tiết các sàn giao dịch hàng đầu với phí giao dịch thấp, bảo mật cao và hỗ trợ tiếng Việt...",
      image:
        "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400&h=250&fit=crop",
      readTime: "12 phút đọc",
      featured: false,
      published: true,
      publishedAt: new Date("2026-03-03"),
      authorId: admin.id,
      categoryId: catMap["Hướng Dẫn"],
    },
    {
      title: "Hướng Dẫn Đăng Ký Binance Cho Người Mới [2026]",
      slug: "huong-dan-dang-ky-binance-2026",
      excerpt:
        "Hướng dẫn từng bước đăng ký tài khoản Binance, xác minh KYC và nhận ưu đãi giảm 20% phí giao dịch...",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
      readTime: "6 phút đọc",
      featured: false,
      published: true,
      publishedAt: new Date("2026-03-02"),
      authorId: tuanNguyen.id,
      categoryId: catMap["Hướng Dẫn"],
    },
    {
      title: "Ethereum 2.0 Và Tương Lai Của DeFi",
      slug: "ethereum-2-va-tuong-lai-defi",
      excerpt:
        "Phân tích sâu về những thay đổi quan trọng của Ethereum và tác động đến hệ sinh thái DeFi...",
      image:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
      readTime: "10 phút đọc",
      featured: false,
      published: true,
      publishedAt: new Date("2026-03-01"),
      authorId: linhCrypto.id,
      categoryId: catMap["Phân Tích"],
    },
    {
      title: "Cách Trade Futures An Toàn Cho Người Mới Bắt Đầu",
      slug: "cach-trade-futures-an-toan",
      excerpt:
        "Những nguyên tắc quản lý rủi ro và chiến lược trade futures hiệu quả để bảo vệ vốn...",
      image:
        "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=250&fit=crop",
      readTime: "15 phút đọc",
      featured: false,
      published: true,
      publishedAt: new Date("2026-02-28"),
      authorId: minhCrypto.id,
      categoryId: catMap["Trading"],
    },
    {
      title: "Top 10 Altcoin Tiềm Năng Q2/2026",
      slug: "top-10-altcoin-tiem-nang-q2-2026",
      excerpt:
        "Phân tích kỹ thuật và fundamentals của các altcoin có tiềm năng tăng trưởng mạnh trong quý tới...",
      image:
        "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=400&h=250&fit=crop",
      readTime: "11 phút đọc",
      featured: false,
      published: true,
      publishedAt: new Date("2026-02-27"),
      authorId: admin.id,
      categoryId: catMap["Đầu Tư"],
    },
    {
      title: "NFT Market Rebound - Cơ Hội Hay Bẫy?",
      slug: "nft-market-rebound-co-hoi-hay-bay",
      excerpt:
        "Thị trường NFT có dấu hiệu phục hồi sau thời kỳ đóng băng. Liệu đây có phải thời điểm tốt để tham gia?",
      image:
        "https://images.unsplash.com/photo-1645731505148-e457128f3088?w=400&h=250&fit=crop",
      readTime: "7 phút đọc",
      featured: false,
      published: true,
      publishedAt: new Date("2026-02-26"),
      authorId: tuanNguyen.id,
      categoryId: catMap["NFT"],
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }

  // ── Exchanges ─────────────────────────────
  const exchanges = [
    { name: "Binance", bonus: "20% giảm phí", badge: "Phổ biến nhất", url: "#", order: 1 },
    { name: "Bybit", bonus: "Bonus $30", badge: "Tốt nhất", url: "#", order: 2 },
    { name: "OKX", bonus: "15% cashback", badge: "Mới", url: "#", order: 3 },
  ];

  for (const ex of exchanges) {
    await prisma.exchange.upsert({
      where: { name: ex.name },
      update: {},
      create: ex,
    });
  }

  console.log("Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
