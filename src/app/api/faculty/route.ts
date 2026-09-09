import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/api-auth";

/**
 * GET /api/faculty
 * Faculty, HOD, and Admin can view faculty directory.
 * Students cannot access this endpoint.
 */
export const GET = requireRole(["Faculty", "HOD", "Administration", "IT"], async (req, role) => {
  try {
    const faculty = await prisma.faculty.findMany({
      orderBy: { employeeId: "asc" },
      include: {
        subjectsTaught: true,
      },
      // Strip sensitive fields for Faculty role (only see directory info)
    });

    // For Faculty role: mask salary/personal contact of other faculty members
    const sanitized = faculty.map((f) => {
      if (role === "Faculty") {
        // Faculty can only see professional directory info, not personal contacts
        return {
          id: f.id,
          employeeId: f.employeeId,
          name: f.name,
          designation: f.designation,
          department: f.department,
          qualification: f.qualification,
          experienceYears: f.experienceYears,
          specialization: f.specialization,
          officeRoom: f.officeRoom,
          status: f.status,
          subjectsTaught: f.subjectsTaught,
          attendanceRate: f.attendanceRate,
          // email visible to faculty (professional contact)
          email: f.email,
          // phone hidden from other faculty members
          phone: undefined,
        };
      }
      // HOD and Admin see full records
      return f;
    });

    return NextResponse.json({ success: true, data: sanitized, role });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch faculty" },
      { status: 500 }
    );
  }
});

/**
 * POST /api/faculty
 * Only Administration can create faculty records.
 */
export const POST = requireRole(["Administration"], async (req) => {
  try {
    const body = await req.json();
    const count = await prisma.faculty.count();
    const empId = `CSE-FAC-${String(count + 1).padStart(3, "0")}`;

    const newFaculty = await prisma.faculty.create({
      data: {
        employeeId: empId,
        name: body.name,
        email: body.email,
        phone: body.phone || "+91 98450 00000",
        designation: body.designation || "Assistant Professor",
        department: "Computer Science & Engineering",
        qualification: body.qualification || "M.Tech",
        experienceYears: Number(body.experienceYears) || 3,
        specialization: body.specialization || "Computer Systems",
        attendanceRate: 95.0,
        status: "Active",
        officeRoom: body.officeRoom || "CS-310",
      },
    });
    return NextResponse.json({ success: true, data: newFaculty });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create faculty record" },
      { status: 500 }
    );
  }
});
