import { jwtDecode } from "jwt-decode";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { CBT_GENIE_COOKIE_KEY } from "./constants/auth";
import { tokenHasExpired } from "./lib/utils";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get(CBT_GENIE_COOKIE_KEY);

  // Validates user session token to keep user logged in
  if (request.nextUrl.pathname.startsWith("/app")) {
    // TODO: More validation here, check for expired token, admin/user roles
    if (!cookie) return NextResponse.redirect(new URL("/auth", request.url));

    const token = cookie.value;
    const decodedTokenValue = jwtDecode(token);
    const tokenExpired = tokenHasExpired(decodedTokenValue?.exp);

    if (!decodedTokenValue || tokenExpired)
      return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Validate if the user has a token, when user try to access outside the app while logged in
  if (request.nextUrl.pathname.startsWith("/auth")) {
    if (cookie) return NextResponse.redirect(new URL("/app", request.url));
  }

  // return NextResponse.redirect(new URL("/auth", request.url));
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: "/app/:path*",
};
