import { Star, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { Exchange } from "@/types";

interface AffiliateCTAProps {
  exchanges: Exchange[];
}

export function AffiliateCTA({ exchanges }: AffiliateCTAProps) {
  return (
    <div className="sticky top-24 overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 p-[1px]">
      <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 p-5">
        <h3 className="mb-1 text-lg font-bold text-white">
          Bắt Đầu Giao Dịch
        </h3>
        <p className="mb-4 text-sm text-purple-100/80">
          Đăng ký sàn uy tín, nhận ưu đãi độc quyền
        </p>
        <div className="space-y-2.5">
          {exchanges.map((exchange) => (
            <div
              key={exchange.name}
              className="rounded-xl bg-white/10 p-3 backdrop-blur transition hover:bg-white/15"
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="font-semibold text-white">
                  {exchange.name}
                </span>
                {exchange.badge && (
                  <Badge variant="yellow">
                    <Star className="mr-1 h-3 w-3" />
                    {exchange.badge}
                  </Badge>
                )}
              </div>
              <p className="mb-2.5 text-xs text-purple-100/70">
                {exchange.bonus}
              </p>
              <a
                href={exchange.url ?? "#"}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-white py-2 text-sm font-bold text-purple-600 transition hover:bg-purple-50"
              >
                Đăng ký <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
