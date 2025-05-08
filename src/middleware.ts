import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const localeMatch = path.match(/^\/([a-z]{2})(?:-[a-z]{2})?(?=\/|$)/);

  if (!localeMatch) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${path}`;
    return NextResponse.redirect(url);
  }

  const locale = localeMatch[1] || "en";

  const loginPath = `/${locale}/login`;
  const isLoginPage = path === loginPath;
  const searchParams = request.nextUrl.searchParams;
  const hasCallback = searchParams.has("callbackUrl");

  if (isLoginPage && !hasCallback) {
    const referer = request.headers.get("referer") || "/";
    const isRefererLogin = referer.includes(loginPath);

    if (!isRefererLogin) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.searchParams.set("callbackUrl", referer);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|static|.*\\..*|_app|_document|favicon.ico).*)",
  ],
};
