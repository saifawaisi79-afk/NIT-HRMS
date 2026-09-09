import { NextRequest, NextResponse } from "next/server";

/**
 * Next.js Edge Middleware — Route Protection
 *
 * Reads the `csex_active_portal` cookie to determine which portal
 * is currently active, and enforces route-level access control.
 *
 * Cookie is set by DepartmentContext when a portal is selected.
 * When real authentication is added, replace cookie check with JWT verification.
 */

const PUBLIC_PATHS = ["/", "/login", "/unauthorized"];

/** Pages that require a portal to be selected */
const PROTECTED_PATHS = [
  "/students",
  "/faculty",
  "/attendance",
  "/timetable",
  "/subjects",
  "/assignments",
  "/notes",
  "/exams",
  "/results",
  "/leaves",
  "/workload",
  "/mentoring",
  "/projects",
  "/notices",
  "/events",
  "/placements",
  "/fees",
  "/admissions",
  "/documents",
  "/reports",
  "/audit-logs",
  "/settings",
];

/**
 * Route → minimum allowed roles
 * Any role NOT in this list will receive 403 when accessing that path.
 */
const ROUTE_ROLE_MAP: Record<string, string[]> = {
  "/students": ["HOD", "Administration", "IT"],
  "/faculty": ["Faculty", "HOD", "Administration", "IT"],
  "/fees": ["Administration"],
  "/admissions": ["Administration"],
  "/audit-logs": ["Administration", "IT"],
  "/reports": ["Faculty", "HOD", "Administration"],
  "/workload": ["Faculty", "HOD", "Administration"],
  "/attendance": ["Student", "Faculty", "HOD", "Administration"],
  "/timetable": ["Student", "Faculty", "HOD", "Administration"],
  "/subjects": ["Student", "Faculty", "HOD", "Administration"],
  "/assignments": ["Student", "Faculty", "HOD"],
  "/notes": ["Student", "Faculty", "HOD"],
  "/exams": ["Student", "Faculty", "HOD", "Administration"],
  "/results": ["Student", "HOD", "Administration"],
  "/leaves": ["Student", "Faculty", "HOD", "Administration"],
  "/mentoring": ["Student", "Faculty", "HOD"],
  "/projects": ["Student", "Faculty", "HOD", "Administration"],
  "/notices": ["Student", "Faculty", "HOD", "Administration"],
  "/events": ["Student", "Faculty", "HOD", "Administration"],
  "/placements": ["Student", "HOD", "Administration"],
  "/documents": ["Student", "HOD", "Administration"],
  "/settings": ["Student", "Faculty", "HOD", "Administration", "IT"],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip Next.js internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const activePortal = req.cookies.get("csex_active_portal")?.value;

  // If on public path, allow through
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // If no portal selected and accessing a protected path → redirect to home (portal selector)
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  if (isProtected && !activePortal) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Check route-level role permissions
  if (activePortal && isProtected) {
    const matchedRoute = Object.keys(ROUTE_ROLE_MAP).find((route) =>
      pathname.startsWith(route)
    );

    if (matchedRoute) {
      const allowedRoles = ROUTE_ROLE_MAP[matchedRoute];
      if (!allowedRoles.includes(activePortal)) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static
     * - _next/image
     * - favicon.ico
     * - api routes (handled by api-auth.ts independently)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
