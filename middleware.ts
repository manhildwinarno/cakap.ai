import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuthenticated = !!token;

  // If not authenticated, redirect to landing page with callbackUrl
  if (!isAuthenticated) {
    const callbackUrl = encodeURIComponent(request.url);
    return NextResponse.redirect(
      new URL(`/?callbackUrl=${callbackUrl}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/simulation", "/results/:path*", "/history"],
};
