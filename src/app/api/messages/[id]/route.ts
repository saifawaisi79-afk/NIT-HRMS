import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAnyRole } from "@/lib/api-auth";

/**
 * PATCH /api/messages/[id]
 * Edit own message. Only the original sender can edit.
 * Only text messages can be edited.
 */
export const PATCH = requireAnyRole(async (req: NextRequest, role) => {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID required." }, { status: 400 });
    }

    const msgId = req.nextUrl.pathname.split("/").at(-1);
    if (!msgId) {
      return NextResponse.json({ success: false, error: "Message ID required." }, { status: 400 });
    }

    const body = await req.json();
    const { content } = body;

    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Content is required." }, { status: 400 });
    }

    if (content.length > 5000) {
      return NextResponse.json({ success: false, error: "Message too long." }, { status: 400 });
    }

    // Load message to verify ownership
    const message = await prisma.message.findFirst({
      where: {
        id: msgId,
        senderId: userId, // SECURITY: only own messages
        deletedAt: null,  // Cannot edit deleted messages
        messageType: "text", // System/announcement messages not editable
      },
    });

    if (!message) {
      return NextResponse.json(
        { success: false, error: "Message not found or you don't have permission to edit it." },
        { status: 403 }
      );
    }

    // Enforce edit window: 15 minutes
    const ageMins = (Date.now() - message.createdAt.getTime()) / 60_000;
    if (ageMins > 15) {
      return NextResponse.json(
        { success: false, error: "Messages can only be edited within 15 minutes of sending." },
        { status: 400 }
      );
    }

    const updated = await prisma.message.update({
      where: { id: msgId },
      data: {
        content: content.trim(),
        isEdited: true,
        editedAt: new Date(),
        updatedAt: new Date(),
      },
      include: { readBy: { select: { userId: true, readAt: true } } },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("[message PATCH]", error);
    return NextResponse.json({ success: false, error: "Failed to edit message." }, { status: 500 });
  }
});

/**
 * DELETE /api/messages/[id]
 * Soft-delete a message. The sender can always delete their own messages.
 * HOD/Admin can delete any message in their conversations.
 * Messages are never physically deleted — deletedAt is set.
 */
export const DELETE = requireAnyRole(async (req: NextRequest, role) => {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID required." }, { status: 400 });
    }

    const msgId = req.nextUrl.pathname.split("/").at(-1);
    if (!msgId) {
      return NextResponse.json({ success: false, error: "Message ID required." }, { status: 400 });
    }

    // Load message
    const message = await prisma.message.findFirst({
      where: { id: msgId, deletedAt: null },
      include: {
        conversation: {
          include: { members: { where: { userId }, select: { isAdmin: true } } },
        },
      },
    });

    if (!message) {
      return NextResponse.json({ success: false, error: "Message not found." }, { status: 404 });
    }

    // SECURITY: user can delete if:
    // 1. They are the sender, OR
    // 2. They are a group admin AND have a management role (HOD/Admin)
    const isOwner = message.senderId === userId;
    const isGroupAdmin = message.conversation.members[0]?.isAdmin === true;
    const isManager = role === "HOD" || role === "Administration";

    if (!isOwner && !(isGroupAdmin && isManager)) {
      return NextResponse.json(
        { success: false, error: "You don't have permission to delete this message." },
        { status: 403 }
      );
    }

    const deleted = await prisma.message.update({
      where: { id: msgId },
      data: {
        deletedAt: new Date(),
        deletedBy: userId,
        content: isOwner ? "[Message deleted]" : "[Message removed by admin]",
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, data: { id: deleted.id, deletedAt: deleted.deletedAt } });
  } catch (error) {
    console.error("[message DELETE]", error);
    return NextResponse.json({ success: false, error: "Failed to delete message." }, { status: 500 });
  }
});
