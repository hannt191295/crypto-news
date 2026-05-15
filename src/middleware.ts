import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Chỉ cho phép Dashboard và Tạo bài viết khi đã đăng nhập. /admin là trang login (public). */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin";
  const session = request.cookies.get("admin_session");

  if (isLoginPage && session?.value) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (!isLoginPage && pathname.startsWith("/admin") && !session?.value) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
