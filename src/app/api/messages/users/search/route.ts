import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAnyRole } from "@/lib/api-auth";
import { MESSAGING_ALLOWED_RECIPIENTS, MessagingRole } from "@/lib/messaging-permissions";

// Demo contact lists — maps role to available contacts.
// In production: derive from real user data (faculty assignments, student rosters).
const DEMO_CONTACTS: Record<
  string,
  Array<{
    userId: string;
    role: string;
    displayName: string;
    designation: string;
    avatarUrl: string;
    email: string;
    identifier: string;
  }>
> = {
  Faculty: [
    {
      userId: "faculty-CSE-FAC-001",
      role: "Faculty",
      displayName: "Dr. Priya Sharma",
      designation: "Professor — DBMS & Data Systems",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80",
      email: "priya.sharma@nitcampus.ac.in",
      identifier: "CSE-FAC-001",
    },
    {
      userId: "faculty-CSE-FAC-002",
      role: "Faculty",
      displayName: "Prof. Anand Verma",
      designation: "Assoc. Professor — Computer Networks",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
      email: "anand.verma@nitcampus.ac.in",
      identifier: "CSE-FAC-002",
    },
    {
      userId: "faculty-CSE-FAC-003",
      role: "Faculty",
      displayName: "Dr. Meena Iyer",
      designation: "Asst. Professor — Machine Learning",
      avatarUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&auto=format&fit=crop&q=80",
      email: "meena.iyer@nitcampus.ac.in",
      identifier: "CSE-FAC-003",
    },
    {
      userId: "faculty-CSE-FAC-004",
      role: "Faculty",
      displayName: "Dr. Rajesh Nair",
      designation: "Professor — Algorithm Design",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
      email: "rajesh.nair@nitcampus.ac.in",
      identifier: "CSE-FAC-004",
    },
  ],
  HOD: [
    {
      userId: "hod-HOD-CSE-001",
      role: "HOD",
      displayName: "Dr. Ramesh Kumar",
      designation: "Head of Department — CSE",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80",
      email: "hod.cse@nitcampus.ac.in",
      identifier: "HOD-CSE-001",
    },
  ],
  Administration: [
    {
      userId: "administration-ADMIN-001",
      role: "Administration",
      displayName: "Dean Office / NIT Admin",
      designation: "System Administrator",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80",
      email: "admin.cse@nitcampus.ac.in",
      identifier: "ADMIN-001",
    },
    {
      userId: "administration-ADMIN-002",
      role: "Administration",
      displayName: "Academic Section",
      designation: "Academic Administration",
      avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&auto=format&fit=crop&q=80",
      email: "academics@nitcampus.ac.in",
      identifier: "ADMIN-002",
    },
  ],
  Student: [
    {
      userId: "student-1NT23CS042",
      role: "Student",
      displayName: "Saif Awaisi",
      designation: "3rd Year CSE (USN: 1NT23CS042)",
      avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&auto=format&fit=crop&q=80",
      email: "saif.cs23@nitcampus.ac.in",
      identifier: "1NT23CS042",
    },
    {
      userId: "student-1NT23CS018",
      role: "Student",
      displayName: "Arjun Mehta",
      designation: "3rd Year CSE (USN: 1NT23CS018)",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80",
      email: "arjun.cs23@nitcampus.ac.in",
      identifier: "1NT23CS018",
    },
    {
      userId: "student-1NT23CS055",
      role: "Student",
      displayName: "Priya Nandakumar",
      designation: "3rd Year CSE (USN: 1NT23CS055)",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=80",
      email: "priya.cs23@nitcampus.ac.in",
      identifier: "1NT23CS055",
    },
    {
      userId: "student-1NT22CS011",
      role: "Student",
      displayName: "Kiran Raj",
      designation: "4th Year CSE (USN: 1NT22CS011)",
      avatarUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&auto=format&fit=crop&q=80",
      email: "kiran.cs22@nitcampus.ac.in",
      identifier: "1NT22CS011",
    },
  ],
  IT: [
    {
      userId: "it-IT-001",
      role: "IT",
      displayName: "IT Support",
      designation: "IT Department",
      avatarUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=80&auto=format&fit=crop&q=80",
      email: "it@nitcampus.ac.in",
      identifier: "IT-001",
    },
  ],
};

/**
 * GET /api/messages/users/search
 * Search permitted contacts for the current user.
 * SECURITY: Only returns users the current role is authorized to contact.
 * Never exposes the full user database.
 * Query param: ?q=<search term>
 */
export const GET = requireAnyRole(async (req: NextRequest, role) => {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID required." }, { status: 400 });
    }

    const q = (req.nextUrl.searchParams.get("q") || "").toLowerCase().trim();
    const senderRole = role as MessagingRole;

    // SECURITY: get permitted recipient roles based on sender role
    const permittedRoles = MESSAGING_ALLOWED_RECIPIENTS[senderRole] || [];

    // Collect contacts from permitted roles only
    let contacts: (typeof DEMO_CONTACTS)[string][number][] = [];
    for (const permRole of permittedRoles) {
      const roleContacts = DEMO_CONTACTS[permRole] || [];
      contacts.push(...roleContacts);
    }

    // Exclude self
    contacts = contacts.filter((c) => c.userId !== userId);

    // Apply search filter
    if (q) {
      contacts = contacts.filter(
        (c) =>
          c.displayName.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.identifier.toLowerCase().includes(q) ||
          c.designation.toLowerCase().includes(q) ||
          c.role.toLowerCase().includes(q)
      );
    }

    // Limit results to prevent data dumping
    const limited = contacts.slice(0, 20);

    return NextResponse.json({ success: true, data: limited });
  } catch (error) {
    console.error("[users search GET]", error);
    return NextResponse.json({ success: false, error: "Search failed." }, { status: 500 });
  }
});
