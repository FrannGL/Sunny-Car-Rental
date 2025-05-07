import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "./util/auth/getServerSession";

const protectedRoutes = ["/cars-details"];

const isProtectedRoute = (path: string): boolean => {
  const pathWithoutLocale = path.replace(/^\/[a-z]{2}(?:-[a-z]{2})?/, "");
  return protectedRoutes.some(
    (route) =>
      pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`)
  );
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const localeMatch = path.match(/^\/([a-z]{2})(?:-[a-z]{2})?(?=\/|$)/);

  if (!localeMatch) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${path}`;
    return NextResponse.redirect(url);
  }

  const locale = localeMatch[1] || "en";

  if (isProtectedRoute(path)) {
    const { token } = getServerSession();

    if (!token) {
      const loginPath = `/${locale}/login`;
      const returnUrl = request.nextUrl.href;
      const loginUrl = new URL(loginPath, request.url);
      loginUrl.searchParams.set("callbackUrl", returnUrl);
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
