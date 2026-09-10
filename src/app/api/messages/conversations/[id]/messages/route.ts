import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAnyRole } from "@/lib/api-auth";

const PAGE_SIZE = 30;

/**
 * GET /api/messages/conversations/[id]/messages
 * Returns paginated messages for a conversation.
 * Security: Only members can access. Soft-deleted messages hidden.
 * Supports cursor-based pagination via ?before=<messageId>
 */
export const GET = requireAnyRole(async (req: NextRequest, role) => {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID required." }, { status: 400 });
    }

    const segments = req.nextUrl.pathname.split("/");
    const convId = segments.at(-2); // .../conversations/[id]/messages
    if (!convId) {
      return NextResponse.json({ success: false, error: "Conversation ID required." }, { status: 400 });
    }

    // SECURITY: verify membership
    const member = await prisma.conversationMember.findFirst({
      where: { conversationId: convId, userId },
    });

    if (!member) {
      return NextResponse.json(
        { success: false, error: "Access denied." },
        { status: 403 }
      );
    }

    const before = req.nextUrl.searchParams.get("before"); // cursor

    const messages = await prisma.message.findMany({
      where: {
        conversationId: convId,
        deletedAt: null,
        ...(before ? { createdAt: { lt: new Date(before) } } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: PAGE_SIZE,
      include: {
        readBy: {
          select: { userId: true, readAt: true },
        },
      },
    });

    // Reverse to chronological order for display
    const ordered = messages.reverse();
    const hasMore = messages.length === PAGE_SIZE;
    const nextCursor = hasMore ? ordered[0]?.createdAt?.toISOString() ?? null : null;

    return NextResponse.json({
      success: true,
      data: ordered,
      hasMore,
      nextCursor,
    });
  } catch (error) {
    console.error("[messages GET]", error);
    return NextResponse.json({ success: false, error: "Failed to fetch messages." }, { status: 500 });
  }
});

/**
 * POST /api/messages/conversations/[id]/messages
 * Send a new message. Only conversation members can send.
 * For announcements: only admins/creators can post.
 */
export const POST = requireAnyRole(async (req: NextRequest, role) => {
  try {
    const userId = req.headers.get("x-user-id");
    const displayName = req.headers.get("x-user-name") || "User";
    const avatarUrl = req.headers.get("x-user-avatar") || null;

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID required." }, { status: 400 });
    }

    const segments = req.nextUrl.pathname.split("/");
    const convId = segments.at(-2);
    if (!convId) {
      return NextResponse.json({ success: false, error: "Conversation ID required." }, { status: 400 });
    }

    // SECURITY: verify membership
    const member = await prisma.conversationMember.findFirst({
      where: { conversationId: convId, userId },
      include: { conversation: { select: { isAnnouncement: true, type: true } } },
    });

    if (!member) {
      return NextResponse.json({ success: false, error: "Access denied." }, { status: 403 });
    }

    // Announcement: only admins can post
    if (member.conversation.isAnnouncement && !member.isAdmin) {
      return NextResponse.json(
        { success: false, error: "Only admins can post in announcement channels." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { content, replyToId, messageType } = body;

    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json({ success: false, error: "Message content is required." }, { status: 400 });
    }

    if (content.length > 5000) {
      return NextResponse.json({ success: false, error: "Message too long (max 5000 chars)." }, { status: 400 });
    }

    // If replying, get preview of replied message
    let replyToPreview: string | null = null;
    if (replyToId) {
      const replyTarget = await prisma.message.findFirst({
        where: { id: replyToId, conversationId: convId, deletedAt: null },
        select: { content: true, senderName: true },
      });
      if (replyTarget) {
        replyToPreview = `${replyTarget.senderName}: ${replyTarget.content.substring(0, 80)}`;
      }
    }

    const now = new Date();

    // Create message + update conversation in a transaction
    const [message] = await prisma.$transaction([
      prisma.message.create({
        data: {
          conversationId: convId,
          senderId: userId,
          senderRole: role,
          senderName: displayName,
          senderAvatar: avatarUrl,
          content: content.trim(),
          messageType: messageType || "text",
          replyToId: replyToId || null,
          replyToPreview,
        },
        include: {
          readBy: { select: { userId: true, readAt: true } },
        },
      }),
      prisma.conversation.update({
        where: { id: convId },
        data: {
          lastMessageAt: now,
          lastMessagePreview: `${displayName}: ${content.trim().substring(0, 60)}`,
          updatedAt: now,
        },
      }),
      // Mark as read for sender automatically
      prisma.conversationMember.update({
        where: { conversationId_userId: { conversationId: convId, userId } },
        data: { lastReadAt: now },
      }),
    ]);

    return NextResponse.json({ success: true, data: message }, { status: 201 });
  } catch (error) {
    console.error("[messages POST]", error);
    return NextResponse.json({ success: false, error: "Failed to send message." }, { status: 500 });
  }
});
