import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: { usn: "asc" },
    });
    return NextResponse.json({ success: true, data: students });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch students" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
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
    return NextResponse.json({ success: false, error: "Failed to enrol student" }, { status: 500 });
  }
}
