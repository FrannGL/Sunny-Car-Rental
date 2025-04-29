import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "./util/auth/getServerSession";

const protectedRoutes = ["/cars"];

const isProtectedRoute = (path: string): boolean => {
  const pathWithoutLocale = path.replace(/^\/[a-z]{2}(?:-[a-z]{2})?/, "");

  return protectedRoutes.some(
    (route) =>
      pathWithoutLocale === route || pathWithoutLocale.startsWith(`${route}/`)
  );
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const locale = request.cookies.get("NEXT_LOCALE")?.value || "en";

  if (isProtectedRoute(path)) {
    const { token } = getServerSession();

    if (!token) {
      const loginPath = `/${locale}/login`;

      const returnUrl = request.nextUrl.href;
      const loginUrl = new URL(loginPath, request.url);
      loginUrl.searchParams.set("returnUrl", returnUrl);

      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas excepto:
     * 1. /api (rutas API)
     * 2. /_next (archivos internos de Next.js)
     * 3. /_vercel (archivos internos de Vercel)
     * 4. /static (carpeta estática si la usas)
     * 5. Archivos con extensiones comunes (.ico, .png, etc.)
     */
    "/((?!api|_next|_vercel|static|.*\\..*|_app|_document|favicon.ico).*)",
  ],
};
