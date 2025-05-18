import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const response = await intlMiddleware(request);

  if (response.status === 307) {
    return response;
  }

  const localeMatch = path.match(/^\/([a-z]{2})(?:-[a-z]{2})?(?=\/|$)/);
  const locale = localeMatch?.[1] || routing.defaultLocale;

  if (path.startsWith(`/${locale}/backoffice`)) {
    const userSessionCookie = request.cookies.get("user-session")?.value;

    if (!userSessionCookie) {
      const loginUrl = new URL(`/${locale}/login`, request.url);
      loginUrl.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const decodedCookie = decodeURIComponent(userSessionCookie);
      const sessionData = JSON.parse(decodedCookie);

      if (sessionData?.user?.role?.id !== 2) {
        return NextResponse.redirect(new URL(`/${locale}/403`, request.url));
      }
    } catch (error) {
      console.error("Error procesando sesión:", error);
      const response = NextResponse.redirect(
        new URL(`/${locale}/login`, request.url)
      );
      response.cookies.delete("user-session");
      return response;
    }
  }

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

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|static|.*\\..*|_app|_document|favicon.ico).*)",
  ],
};
