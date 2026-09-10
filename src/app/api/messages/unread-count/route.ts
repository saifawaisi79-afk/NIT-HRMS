import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAnyRole } from "@/lib/api-auth";

/**
 * GET /api/messages/unread-count
 * Returns total unread message count across all conversations for the current user.
 * Lightweight endpoint polled every 5 seconds to update the badge.
 */
export const GET = requireAnyRole(async (req: NextRequest, role) => {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID required." }, { status: 400 });
    }

    // Get all conversations user is a member of with lastReadAt
    const memberships = await prisma.conversationMember.findMany({
      where: { userId },
      select: { conversationId: true, lastReadAt: true },
    });

    if (memberships.length === 0) {
      return NextResponse.json({ success: true, data: { total: 0, byConversation: {} } });
    }

    // Count unread messages per conversation
    const counts = await Promise.all(
      memberships.map(async (m) => {
        const count = await prisma.message.count({
          where: {
            conversationId: m.conversationId,
            deletedAt: null,
            senderId: { not: userId },
            ...(m.lastReadAt ? { createdAt: { gt: m.lastReadAt } } : {}),
          },
        });
        return { conversationId: m.conversationId, count };
      })
    );

    const byConversation: Record<string, number> = {};
    let total = 0;
    for (const c of counts) {
      byConversation[c.conversationId] = c.count;
      total += c.count;
    }

    return NextResponse.json({ success: true, data: { total, byConversation } });
  } catch (error) {
    console.error("[unread-count GET]", error);
    return NextResponse.json({ success: false, error: "Failed to fetch unread count." }, { status: 500 });
  }
});
