import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAnyRole } from "@/lib/api-auth";

/**
 * PATCH /api/messages/conversations/[id]/read
 * Mark all messages in a conversation as read for the current user.
 * Only updates messages the user is authorized to see (membership check).
 */
export const PATCH = requireAnyRole(async (req: NextRequest, role) => {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID required." }, { status: 400 });
    }

    const segments = req.nextUrl.pathname.split("/");
    const convId = segments.at(-2); // .../conversations/[id]/read

    if (!convId) {
      return NextResponse.json({ success: false, error: "Conversation ID required." }, { status: 400 });
    }

    // SECURITY: verify membership
    const member = await prisma.conversationMember.findFirst({
      where: { conversationId: convId, userId },
    });

    if (!member) {
      return NextResponse.json({ success: false, error: "Access denied." }, { status: 403 });
    }

    const now = new Date();

    // Get all unread messages in this conversation (not sent by this user)
    const unreadMessages = await prisma.message.findMany({
      where: {
        conversationId: convId,
        deletedAt: null,
        senderId: { not: userId },
        readBy: { none: { userId } },
      },
      select: { id: true },
    });

    if (unreadMessages.length > 0) {
      // Upsert MessageRead records to avoid duplicates
      await Promise.all(
        unreadMessages.map((m) =>
          prisma.messageRead.upsert({
            where: { messageId_userId: { messageId: m.id, userId } },
            update: { readAt: now },
            create: { messageId: m.id, userId, readAt: now },
          })
        )
      );
    }

    // Update lastReadAt for the member
    await prisma.conversationMember.update({
      where: { conversationId_userId: { conversationId: convId, userId } },
      data: { lastReadAt: now },
    });

    return NextResponse.json({
      success: true,
      markedCount: unreadMessages.length,
    });
  } catch (error) {
    console.error("[read PATCH]", error);
    return NextResponse.json({ success: false, error: "Failed to mark messages as read." }, { status: 500 });
  }
});
