import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAnyRole } from "@/lib/api-auth";

/**
 * GET /api/messages/conversations/[id]
 * Returns a single conversation with members.
 * Security: Only members of the conversation can access it.
 */
export const GET = requireAnyRole(async (req: NextRequest, role) => {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID required." }, { status: 400 });
    }

    const id = req.nextUrl.pathname.split("/").at(-1);
    if (!id) {
      return NextResponse.json({ success: false, error: "Conversation ID required." }, { status: 400 });
    }

    // Load conversation and verify membership in one query
    const conversation = await prisma.conversation.findFirst({
      where: {
        id,
        members: { some: { userId } }, // SECURITY: membership check
      },
      include: {
        members: {
          select: {
            id: true,
            userId: true,
            role: true,
            displayName: true,
            avatarUrl: true,
            isAdmin: true,
            joinedAt: true,
            lastReadAt: true,
          },
          orderBy: { joinedAt: "asc" },
        },
      },
    });

    if (!conversation) {
      // Return 403 (not 404) to prevent enumeration attacks
      return NextResponse.json(
        { success: false, error: "Conversation not found or access denied." },
        { status: 403 }
      );
    }

    const currentMember = conversation.members.find((m) => m.userId === userId);

    return NextResponse.json({
      success: true,
      data: {
        ...conversation,
        currentMember,
      },
    });
  } catch (error) {
    console.error("[conversation GET by id]", error);
    return NextResponse.json({ success: false, error: "Failed to fetch conversation." }, { status: 500 });
  }
});

/**
 * PATCH /api/messages/conversations/[id]
 * Update conversation title (group admin only).
 */
export const PATCH = requireAnyRole(async (req: NextRequest, role) => {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID required." }, { status: 400 });
    }

    const id = req.nextUrl.pathname.split("/").at(-1);
    const body = await req.json();
    const { title } = body;

    // Check membership and admin status
    const member = await prisma.conversationMember.findFirst({
      where: { conversationId: id, userId, isAdmin: true },
    });

    if (!member) {
      return NextResponse.json({ success: false, error: "Only group admins can edit this conversation." }, { status: 403 });
    }

    const updated = await prisma.conversation.update({
      where: { id },
      data: { title, updatedAt: new Date() },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("[conversation PATCH]", error);
    return NextResponse.json({ success: false, error: "Failed to update conversation." }, { status: 500 });
  }
});
