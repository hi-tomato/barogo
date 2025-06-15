import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  // TODO: 보호되어야 할 경로들 (앞으로 추가될 수 있음)
  const protectedPaths = ["/mypage"];
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // TODO: 인증된 유저가 접근하면 안되는 URI (앞으로 추가될 수 있음)
  const authPaths = ["/login", "/register"];
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  // TODO: 공개 경로들 (앞으로 추가될 수 있음)
  const publicPaths = ["/", "/main", "/map", "/search"];
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // 공개 경로는 항상 허용
  if (isPublicPath) {
    return NextResponse.next();
  }

  // TODO: 보호된 경로인데 토큰이 없는 경우
  if (isProtectedPath && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // TODO: 인증 페이지인데 토큰이 있는 경우
  if (isAuthPath && token) {
    const redirectTo = request.nextUrl.searchParams.get("redirect") || "/main";
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // 보호된 경로들
    "/main/:path*",
    "/mypage/:path*",
    "/baropot/:path*",
    "/map/:path*",
    "/search/:path*",
    // 인증 경로들
    "/login",
    "/register",
    // 기타 (API, static 파일 제외)
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
