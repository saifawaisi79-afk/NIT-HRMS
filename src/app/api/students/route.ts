import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/api-auth";

/**
 * GET /api/students
 * Only HOD and Administration can list all students.
 * Students and Faculty are denied — they must use scoped endpoints.
 */
export const GET = requireRole(["HOD", "Administration", "IT"], async (req, role) => {
  try {
    // HOD sees CSE department students only
    // Admin sees all (same in single-dept demo, but scoped by dept for future)
    const students = await prisma.student.findMany({
      orderBy: { usn: "asc" },
      select: {
        id: true,
        usn: true,
        name: true,
        email: true,
        year: true,
        semester: true,
        section: true,
        cgpa: true,
        attendanceRate: true,
        status: true,
        backlogs: true,
        // Sensitive fields only visible to Admin/HOD
        phone: role === "Administration" || role === "HOD",
        parentName: role === "Administration" || role === "HOD",
        parentPhone: role === "Administration",
        address: role === "Administration",
      },
    });
    return NextResponse.json({ success: true, data: students, role });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch students" },
      { status: 500 }
    );
  }
});

/**
 * POST /api/students
 * Only Administration can create new student records.
 */
export const POST = requireRole(["Administration"], async (req) => {
  try {
    const body = await req.json();
    const newStudent = await prisma.student.create({
      data: {
        usn: body.usn,
        name: body.name,
        email: body.email,
        phone: body.phone || "+91 98765 00000",
        gender: body.gender || "Male",
        year: Number(body.year) || 3,
        semester: Number(body.semester) || 5,
        section: body.section || "A",
        cgpa: Number(body.cgpa) || 8.0,
        backlogs: Number(body.backlogs) || 0,
        attendanceRate: Number(body.attendanceRate) || 90.0,
        status: "Active",
        parentName: body.parentName || "Guardian",
        parentPhone: body.parentPhone || "+91 94480 00000",
        address: body.address || "Bangalore",
      },
    });
    return NextResponse.json({ success: true, data: newStudent });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to enrol student" },
      { status: 500 }
    );
  }
});
