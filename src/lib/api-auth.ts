/**
 * API Authorization Helper
 * Wraps Next.js API route handlers with role-based access control.
 *
 * In this demo environment the active portal role is communicated via
 * the `x-portal-role` request header (set automatically by the frontend
 * fetch wrapper). When real authentication is added, replace
 * getRoleFromRequest() with a JWT/session verification.
 */

import { NextRequest, NextResponse } from "next/server";
import { PortalRole } from "@/lib/permissions";

export const VALID_ROLES: PortalRole[] = [
  "Student",
  "Faculty",
  "HOD",
  "Administration",
  "IT",
];

/**
 * Extract the portal role from the request.
 * Reads `x-portal-role` header — set by the client on every fetch call.
 * Returns null if missing or invalid.
 */
export function getRoleFromRequest(req: NextRequest | Request): PortalRole | null {
  const role = req.headers.get("x-portal-role") as PortalRole | null;
  if (!role) return null;
  if (!VALID_ROLES.includes(role)) return null;
  return role;
}

/**
 * Deny a request with a standardized 403 response.
 */
export function deny(message = "Access denied. Insufficient permissions."): NextResponse {
  return NextResponse.json(
    { success: false, error: message, code: 403 },
    { status: 403 }
  );
}

/**
 * Return 401 when no role/auth is present.
 */
export function unauthenticated(): NextResponse {
  return NextResponse.json(
    { success: false, error: "Authentication required.", code: 401 },
    { status: 401 }
  );
}

/**
 * Higher-order function: wraps a handler and requires one of the specified roles.
 *
 * Usage:
 *   export const GET = requireRole(["HOD", "Administration"], async (req, role) => { ... });
 */
type RouteHandler = (req: NextRequest, role: PortalRole) => Promise<NextResponse>;

export function requireRole(
  allowedRoles: PortalRole[],
  handler: RouteHandler
): (req: NextRequest) => Promise<NextResponse> {
  return async (req: NextRequest) => {
    const role = getRoleFromRequest(req);

    if (!role) {
      return unauthenticated();
    }

    if (!allowedRoles.includes(role)) {
      return deny(
        `Role '${role}' is not permitted to perform this action. Required: ${allowedRoles.join(", ")}.`
      );
    }

    return handler(req, role);
  };
}

/**
 * Convenience: allow any authenticated role.
 * Still requires a valid role to be present.
 */
export function requireAnyRole(
  handler: RouteHandler
): (req: NextRequest) => Promise<NextResponse> {
  return requireRole(VALID_ROLES, handler);
}
