import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/api-auth";

/**
 * GET /api/leaves
 * - Student: can only see their own leaves (scoped by applicantId in real auth)
 * - Faculty: can only see their own leaves
 * - HOD: sees all department leaves (students + faculty)
 * - Admin: sees all leaves
 *
 * NOTE: In a real auth system, for Student/Faculty roles we'd extract
 * the applicantId from the verified JWT and filter server-side.
 * In this demo, students and faculty receive their own subset.
 */
export const GET = requireRole(
  ["Student", "Faculty", "HOD", "Administration"],
  async (req, role) => {
    try {
      // HOD and Admin get everything
      if (role === "HOD" || role === "Administration") {
        const leaves = await prisma.leaveRequest.findMany({
          orderBy: { appliedAt: "desc" },
        });
        return NextResponse.json({ success: true, data: leaves, role });
      }

      // Student: return only student-type leaves
      if (role === "Student") {
        const leaves = await prisma.leaveRequest.findMany({
          where: { applicantType: "STUDENT" },
          orderBy: { appliedAt: "desc" },
        });
        return NextResponse.json({ success: true, data: leaves, role });
      }

      // Faculty: return only faculty-type leaves
      const leaves = await prisma.leaveRequest.findMany({
        where: { applicantType: "FACULTY" },
        orderBy: { appliedAt: "desc" },
      });
      return NextResponse.json({ success: true, data: leaves, role });
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Failed to fetch leaves" },
        { status: 500 }
      );
    }
  }
);

/**
 * POST /api/leaves
 * Students and Faculty can submit leave applications.
 * HOD and Admin can also submit (for their own leaves).
 */
export const POST = requireRole(
  ["Student", "Faculty", "HOD", "Administration"],
  async (req, role) => {
    try {
      const body = await req.json();

      // Enforce applicantType to match the caller's role
      // Prevents a Student from submitting a FACULTY leave etc.
      let enforcedType = body.applicantType;
      if (role === "Student") enforcedType = "STUDENT";
      if (role === "Faculty") enforcedType = "FACULTY";

      const newLeave = await prisma.leaveRequest.create({
        data: {
          applicantType: enforcedType || "FACULTY",
          applicantName: body.applicantName,
          applicantId: body.applicantId,
          leaveType: body.leaveType,
          startDate: body.startDate,
          endDate: body.endDate,
          daysCount: Number(body.daysCount) || 1,
          reason: body.reason,
          status: "Pending",
        },
      });
      return NextResponse.json({ success: true, data: newLeave });
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Failed to submit leave" },
        { status: 500 }
      );
    }
  }
);

/**
 * PATCH /api/leaves
 * Only HOD and Administration can approve/reject leave requests.
 * Students and Faculty CANNOT approve leave (including their own).
 */
export const PATCH = requireRole(["HOD", "Administration"], async (req, role) => {
  try {
    const body = await req.json();
    const updated = await prisma.leaveRequest.update({
      where: { id: body.id },
      data: {
        status: body.status,
        adminRemarks: body.remarks || `${body.status} by ${role}`,
        reviewedAt: new Date(),
      },
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update leave status" },
      { status: 500 }
    );
  }
});
