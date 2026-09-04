import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const leaves = await prisma.leaveRequest.findMany({
      orderBy: { appliedAt: "desc" },
    });
    return NextResponse.json({ success: true, data: leaves });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch leaves" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newLeave = await prisma.leaveRequest.create({
      data: {
        applicantType: body.applicantType || "FACULTY",
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
    return NextResponse.json({ success: false, error: "Failed to submit leave" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const updated = await prisma.leaveRequest.update({
      where: { id: body.id },
      data: {
        status: body.status,
        adminRemarks: body.remarks || null,
        reviewedAt: new Date(),
      },
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update leave status" }, { status: 500 });
  }
}
