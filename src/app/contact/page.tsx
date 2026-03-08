import type { Metadata } from "next";
import { Mail, MessageCircle, Send, ArrowUpRight, Clock, Globe, HeadphonesIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Liên Hệ",
  description: "Liên hệ với VN Crypto Hub - Email, Telegram, Twitter",
};

const channels = [
  {
    name: "Email",
    description: "Gửi email cho đội ngũ hỗ trợ",
    info: "contact@vncryptohub.com",
    href: "mailto:contact@vncryptohub.com",
    icon: Mail,
    color: "from-violet-600 to-purple-600",
    shadow: "shadow-violet-500/25",
  },
  {
    name: "Telegram",
    description: "Tham gia group cộng đồng",
    info: "@vncryptohub",
    href: "https://t.me/vncryptohub",
    icon: Send,
    color: "from-blue-600 to-cyan-600",
    shadow: "shadow-blue-500/25",
  },
  {
    name: "Twitter / X",
    description: "Theo dõi tin tức mới nhất",
    info: "@vncryptohub",
    href: "https://twitter.com/vncryptohub",
    icon: Globe,
    color: "from-slate-600 to-slate-500",
    shadow: "shadow-slate-500/25",
  },
];

const features = [
  { icon: Clock, title: "Phản hồi nhanh", desc: "Trả lời trong vòng 24h" },
  { icon: HeadphonesIcon, title: "Hỗ trợ tiếng Việt", desc: "Đội ngũ người Việt" },
  { icon: Globe, title: "Đa kênh", desc: "Email, Telegram, Twitter" },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative px-4 pb-8 pt-16 md:pt-24">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-purple-600/8 blur-3xl" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Hãy kết nối
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              với chúng tôi
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">
            Bạn cần tư vấn về crypto, muốn hợp tác quảng cáo, hay góp ý cho website? 
            Đội ngũ VN Crypto Hub luôn sẵn sàng lắng nghe.
          </p>
        </div>
      </section>

      {/* Stats Row */}
      <section className="mx-auto max-w-4xl px-4 pb-16">
        <div className="grid grid-cols-3 divide-x divide-purple-500/10 rounded-2xl border border-purple-500/10 bg-slate-800/30 backdrop-blur">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="flex flex-col items-center px-4 py-6 text-center md:flex-row md:gap-3 md:px-8 md:text-left">
                <Icon className="mb-2 h-5 w-5 text-purple-400 md:mb-0" />
                <div>
                  <p className="text-sm font-semibold text-white">{f.title}</p>
                  <p className="hidden text-xs text-gray-500 md:block">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Channel Cards */}
      <section className="mx-auto max-w-4xl px-4 pb-16">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {channels.map((ch) => {
            const Icon = ch.icon;
            return (
              <a
                key={ch.name}
                href={ch.href}
                target={ch.href.startsWith("http") ? "_blank" : undefined}
                rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-white/[0.06]"
              >
                <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${ch.color} shadow-lg ${ch.shadow}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>

                <h3 className="text-lg font-bold text-white">{ch.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{ch.description}</p>
                <p className="mt-3 text-sm font-medium text-gray-300">{ch.info}</p>

                <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-gray-400 transition group-hover:border-purple-500/30 group-hover:text-purple-300">
                  Mở
                  <ArrowUpRight className="h-3 w-3 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Contact Form */}
      <section className="mx-auto max-w-4xl px-4 pb-24">
        <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-1">
          <div className="grid grid-cols-1 overflow-hidden rounded-[1.35rem] lg:grid-cols-5">
            {/* Left Panel */}
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-pink-700 p-8 md:p-10 lg:col-span-2">
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white md:text-3xl">
                  Gửi tin nhắn
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Điền thông tin bên cạnh, chúng tôi sẽ liên hệ lại bạn sớm nhất.
                </p>

                <div className="mt-10 space-y-5">
                  {[
                    { icon: Mail, label: "contact@vncryptohub.com" },
                    { icon: Send, label: "t.me/vncryptohub" },
                    { icon: Globe, label: "twitter.com/vncryptohub" },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="flex items-center gap-3">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                          <Icon className="h-4 w-4 text-white/80" />
                        </div>
                        <span className="text-sm text-white/80">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Decorative circles */}
              <div className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-white/[0.06]" />
              <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-white/[0.04]" />
              <div className="absolute bottom-10 left-6 h-3 w-3 rounded-full bg-white/20" />
              <div className="absolute bottom-24 left-16 h-2 w-2 rounded-full bg-white/15" />
            </div>

            {/* Right - Form */}
            <div className="bg-slate-900/80 p-8 md:p-10 lg:col-span-3">
              <form className="space-y-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-500">
                      Họ tên
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-600 transition focus:border-purple-500/40 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-500">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-600 transition focus:border-purple-500/40 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-500">
                    Chủ đề
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-600 transition focus:border-purple-500/40 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                    placeholder="Tôi muốn hỏi về..."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-gray-500">
                    Nội dung
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-600 transition focus:border-purple-500/40 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-purple-500/30"
                    placeholder="Nội dung tin nhắn của bạn..."
                  />
                </div>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-600/20 transition-all hover:shadow-xl hover:shadow-purple-600/30 md:w-auto md:px-8"
                >
                  <MessageCircle className="h-4 w-4" />
                  Gửi tin nhắn
                  <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
