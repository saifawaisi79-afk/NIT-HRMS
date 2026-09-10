/**
 * Messaging Permission Layer
 * Server-side only. Defines which roles can contact which roles.
 * Never trust client-sent role/userId values — always derive from server session.
 *
 * In this demo, authentication is cookie/header based.
 * Replace with JWT verification when real auth is added.
 */

import { PortalRole } from "@/lib/permissions";

export type MessagingRole = "Student" | "Faculty" | "HOD" | "Administration" | "IT";

/**
 * Who can a given role send direct messages to?
 * Returns allowed RECIPIENT roles.
 */
export const MESSAGING_ALLOWED_RECIPIENTS: Record<MessagingRole, MessagingRole[]> = {
  Student: ["Faculty", "HOD", "Administration"],
  Faculty: ["Student", "Faculty", "HOD", "Administration"],
  HOD: ["Student", "Faculty", "HOD", "Administration"],
  Administration: ["Student", "Faculty", "HOD", "Administration", "IT"],
  IT: ["Administration", "HOD", "Faculty"],
};

/**
 * Who can create groups?
 */
export const GROUP_CREATORS: MessagingRole[] = ["Faculty", "HOD", "Administration", "IT"];

/**
 * Who can create announcements?
 */
export const ANNOUNCEMENT_CREATORS: MessagingRole[] = ["HOD", "Administration", "IT"];

/**
 * Check if a sender role can message a recipient role.
 */
export function canMessage(senderRole: MessagingRole, recipientRole: MessagingRole): boolean {
  const allowed = MESSAGING_ALLOWED_RECIPIENTS[senderRole];
  if (!allowed) return false;
  return allowed.includes(recipientRole);
}

/**
 * Check if a role can create group conversations.
 */
export function canCreateGroup(role: MessagingRole): boolean {
  return GROUP_CREATORS.includes(role);
}

/**
 * Check if a role can create announcements.
 */
export function canCreateAnnouncement(role: MessagingRole): boolean {
  return ANNOUNCEMENT_CREATORS.includes(role);
}

/**
 * Build a stable userId from role + identifier.
 * In demo mode: role-based composite key.
 * Replace with real userId when JWT auth is added.
 */
export function buildUserId(role: MessagingRole, identifier: string): string {
  return `${role.toLowerCase()}-${identifier}`;
}

/**
 * Parse a userId back into role + identifier.
 */
export function parseUserId(userId: string): { role: string; identifier: string } | null {
  const parts = userId.split("-");
  if (parts.length < 2) return null;
  const role = parts[0];
  const identifier = parts.slice(1).join("-");
  return { role, identifier };
}

/**
 * Validate that a conversation member userId has the expected role prefix.
 * Security: prevents a student from spoofing a faculty member's userId.
 */
export function validateUserIdRole(userId: string, claimedRole: string): boolean {
  const parsed = parseUserId(userId);
  if (!parsed) return false;
  return parsed.role === claimedRole.toLowerCase();
}

/**
 * Returns a display-friendly role label.
 */
export function getRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    Student: "Student",
    Faculty: "Faculty",
    HOD: "Head of Department",
    Administration: "Administration",
    IT: "IT Department",
  };
  return labels[role] || role;
}

/**
 * Returns a role badge color class (Tailwind).
 */
export function getRoleBadgeClass(role: string): string {
  const classes: Record<string, string> = {
    Student: "bg-blue-50 text-blue-700 border-blue-200",
    Faculty: "bg-emerald-50 text-emerald-700 border-emerald-200",
    HOD: "bg-purple-50 text-purple-700 border-purple-200",
    Administration: "bg-amber-50 text-amber-700 border-amber-200",
    IT: "bg-slate-50 text-slate-700 border-slate-200",
  };
  return classes[role] || "bg-slate-50 text-slate-700";
}

/**
 * Returns avatar initials from a display name.
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Format a timestamp for message display.
 */
export function formatMessageTime(dateStr: string | Date): string {
  const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) {
    return date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  }
  if (diff < 604_800_000) {
    return date.toLocaleDateString("en-IN", { weekday: "short" });
  }
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}
