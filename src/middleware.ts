import { NextResponse, NextRequest } from "next/server";

// Role-to-route map
const ROLE_PATH_MAP = {
  user: "/user",
  admin: "/admin",
  "super-admin": "/super",
} as const;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get("role")?.value;

  // Extracts the values from the map then check if the pathname matches one of them
  const isProtectedRoute = Object.values(ROLE_PATH_MAP).some((path) =>
    pathname.startsWith(path)
  );
  // If unauthenticated user and trying to access any protected path
  if (!role && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // User trying to access the unauthorized path
  for (const [allowedRole, allowedPath] of Object.entries(ROLE_PATH_MAP)) {
    if (pathname.startsWith(allowedPath) && role !== allowedRole) {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }
  // if user is logged in they can not visit the login page
  if (pathname === "/login" && role) {
    return NextResponse.redirect(
      new URL(ROLE_PATH_MAP[role as keyof typeof ROLE_PATH_MAP], request.url)
    );
  }
}

// Apply to all routes except internal Next.js paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
