import type { Metadata } from "next";
import { getActiveExchanges } from "@/lib/api";
import { Star, ExternalLink, Shield, Zap, DollarSign } from "lucide-react";

export const metadata: Metadata = {
  title: "So Sánh Sàn Giao Dịch Crypto",
  description: "So sánh chi tiết các sàn giao dịch crypto uy tín nhất với phí giao dịch, bảo mật và ưu đãi",
};

export const dynamic = "force-dynamic";

export default async function SoSanhSanPage() {
  const exchanges = await getActiveExchanges();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white">So Sánh Sàn Giao Dịch</h1>
        <p className="mx-auto mt-3 max-w-2xl text-gray-400">
          So sánh các sàn giao dịch crypto uy tín nhất. Đăng ký qua link của chúng tôi
          để nhận ưu đãi độc quyền.
        </p>
      </div>

      {/* Exchange Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {exchanges.map((exchange, idx) => (
          <div
            key={exchange.id}
            className={`relative overflow-hidden rounded-2xl border p-6 transition hover:scale-105 ${
              idx === 0
                ? "border-yellow-500/40 bg-gradient-to-br from-yellow-500/10 to-slate-800/60"
                : "border-purple-500/20 bg-slate-800/60"
            }`}
          >
            {idx === 0 && (
              <div className="absolute right-4 top-4">
                <span className="flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-slate-900">
                  <Star className="h-3 w-3" />
                  #1
                </span>
              </div>
            )}

            <h3 className="mb-1 text-2xl font-bold text-white">
              {exchange.name}
            </h3>

            {exchange.badge && (
              <span className="mb-4 inline-block rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-300">
                {exchange.badge}
              </span>
            )}

            <div className="my-5 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <DollarSign className="h-4 w-4 text-green-400" />
                <span>Ưu đãi: <strong className="text-white">{exchange.bonus}</strong></span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Shield className="h-4 w-4 text-blue-400" />
                <span>Bảo mật cao, hỗ trợ 2FA</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span>Giao dịch nhanh, phí thấp</span>
              </div>
            </div>

            <a
              href={exchange.url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
            >
              Đăng ký ngay
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div className="mt-16 rounded-2xl border border-purple-500/20 bg-slate-800/40 p-8">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Cách chọn sàn giao dịch phù hợp?
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-purple-400">
              Phí giao dịch
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              So sánh phí maker/taker giữa các sàn. Phí thấp giúp tối ưu lợi nhuận
              khi giao dịch thường xuyên.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-purple-400">
              Bảo mật
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Ưu tiên sàn có 2FA, cold wallet storage và bảo hiểm tài sản.
              Kiểm tra lịch sử bảo mật của sàn.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-purple-400">
              Hỗ trợ
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Chọn sàn có hỗ trợ tiếng Việt, live chat 24/7 và cộng đồng
              người dùng Việt Nam lớn.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-xs text-gray-500">
        * Các link đăng ký trên là affiliate link. Chúng tôi có thể nhận hoa hồng khi bạn đăng ký qua link này.
      </p>
    </main>
  );
}
