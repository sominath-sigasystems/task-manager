import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Application authentication and redirection middleware.
 *
 * - Protects private routes.
 * - Redirects authenticated users away from auth pages.
 * - Ensures tenant (organizationId) exists in session token.
 */
export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/projects");

  /**
   * Case 1:
   * User is authenticated and tries to access login/register
   * → Redirect to dashboard
   */
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  /**
   * Case 2:
   * User is NOT authenticated and tries to access protected route
   * → Redirect to login
   */
  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  /**
   * Case 3:
   * Authenticated but missing organizationId (corrupted session)
   * → Force logout
   */
  if (isAuthenticated && !token.organizationId) {
    return NextResponse.redirect(new URL("/api/auth/signout", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/projects/:path*", "/login", "/register"],
};
