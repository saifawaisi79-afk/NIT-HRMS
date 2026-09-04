import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const attendance = await prisma.attendance.findMany({
      take: 100,
      include: {
        student: true,
        subject: true,
      },
      orderBy: { date: "desc" },
    });
    return NextResponse.json({ success: true, data: attendance });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch attendance" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
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
    return NextResponse.json({ success: false, error: "Failed to record attendance" }, { status: 500 });
  }
}
