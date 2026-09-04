import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const faculty = await prisma.faculty.findMany({
      orderBy: { employeeId: "asc" },
      include: {
        subjectsTaught: true,
      },
    });
    return NextResponse.json({ success: true, data: faculty });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch faculty" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
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
    return NextResponse.json({ success: false, error: "Failed to create faculty record" }, { status: 500 });
  }
}
