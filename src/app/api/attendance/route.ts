import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/api-auth";

/**
 * GET /api/attendance
 * - Faculty: can read attendance (their assigned subjects in real auth)
 * - HOD: full department attendance
 * - Admin: full attendance
 * - Student: DENIED — must use /api/student/attendance for own records only
 */
export const GET = requireRole(["Faculty", "HOD", "Administration", "IT"], async (req, role) => {
  try {
    const attendance = await prisma.attendance.findMany({
      take: 200,
      include: {
        student: {
          select: {
            id: true,
            name: true,
            usn: true,
            semester: true,
            section: true,
          },
        },
        subject: true,
      },
      orderBy: { date: "desc" },
    });
    return NextResponse.json({ success: true, data: attendance, role });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch attendance" },
      { status: 500 }
    );
  }
});

/**
 * POST /api/attendance
 * Only Faculty, HOD, and Administration can mark attendance.
 * Students cannot mark attendance.
 */
export const POST = requireRole(["Faculty", "HOD", "Administration"], async (req, role) => {
  try {
    const body = await req.json();
    const record = await prisma.attendance.create({
      data: {
        studentId: body.studentId,
        subjectId: body.subjectId,
        date: body.date,
        status: body.status,
        remarks: body.remarks || null,
      },
    });
    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to record attendance" },
      { status: 500 }
    );
  }
});
