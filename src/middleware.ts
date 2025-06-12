import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  // TODO: 보호되야할 URI (난중에 다시 정해야함)
  const protectedPaths = ["/main", "/mypage", "/baropot"];
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // TODO: 보호없이 사용할 수 있는 URI (난중에 다시 정해야함)
  const authPaths = ["/login", "/register"];
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  // TODO: 경로의 보호를 받지만, 토큰(권한)은 없는경우
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // TODO: 로그인 페이지인데, 토큰(권한)이 있는 경우
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/main", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/main/:path*",
    "/mypage/:path*",
    "/baropot/:path*",

    "/login",
    "/register",
  ],
};
