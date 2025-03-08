import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = 
    path === "/" || 
    path === "/auth/login" || 
    path === "/auth/sign-up" || 
    path.startsWith("/api/");
  
  // Check if the path is in the app directory
  const isAppPath = path === "/app" || path.startsWith("/app/");
  
  // Get the token
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });
  
  // If the path is in the app directory and there's no token, redirect to login
  if (isAppPath && !token) {
    const url = new URL("/auth/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(url);
  }
  
  // If the path is an auth page and there's a token, redirect to app
  if ((path === "/auth/login" || path === "/auth/sign-up") && token) {
    return NextResponse.redirect(new URL("/app", request.url));
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Match all paths in /app
    "/app/:path*",
    // Match auth paths
    "/auth/:path*",
    // Exclude API routes from the matcher
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}; 