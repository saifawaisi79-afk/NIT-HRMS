import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAnyRole, getRoleFromRequest } from "@/lib/api-auth";
import { canMessage, MessagingRole } from "@/lib/messaging-permissions";

/**
 * GET /api/messages/conversations
 * Returns all conversations the current user is a member of.
 * Sorted by lastMessageAt desc.
 */
export const GET = requireAnyRole(async (req: NextRequest, role) => {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID required." }, { status: 400 });
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        members: {
          some: { userId },
        },
      },
      include: {
        members: {
          select: {
            userId: true,
            displayName: true,
            avatarUrl: true,
            role: true,
            lastReadAt: true,
          },
        },
        messages: {
          where: { deletedAt: null },
          orderBy: { createdAt: "desc" },
          take: 1,
          select: {
            id: true,
            content: true,
            senderName: true,
            senderRole: true,
            createdAt: true,
            messageType: true,
          },
        },
      },
      orderBy: { lastMessageAt: "desc" },
    });

    // For each conversation, compute unread count for this user
    const enriched = await Promise.all(
      conversations.map(async (conv) => {
        const member = conv.members.find((m) => m.userId === userId);
        const lastReadAt = member?.lastReadAt;

        const unreadCount = await prisma.message.count({
          where: {
            conversationId: conv.id,
            deletedAt: null,
            senderId: { not: userId }, // Don't count own messages
            ...(lastReadAt
              ? { createdAt: { gt: lastReadAt } }
              : {}),
          },
        });

        const otherMembers = conv.members.filter((m) => m.userId !== userId);
        const lastMsg = conv.messages[0] ?? null;

        return {
          id: conv.id,
          type: conv.type,
          title: conv.title,
          isAnnouncement: conv.isAnnouncement,
          lastMessageAt: conv.lastMessageAt,
          lastMessagePreview: conv.lastMessagePreview,
          createdAt: conv.createdAt,
          updatedAt: conv.updatedAt,
          otherMembers,
          allMembers: conv.members,
          lastMessage: lastMsg,
          unreadCount,
        };
      })
    );

    return NextResponse.json({ success: true, data: enriched });
  } catch (error) {
    console.error("[conversations GET]", error);
    return NextResponse.json({ success: false, error: "Failed to fetch conversations." }, { status: 500 });
  }
});

/**
 * POST /api/messages/conversations
 * Create a new direct or group conversation.
 * Server validates recipient role permissions.
 */
export const POST = requireAnyRole(async (req: NextRequest, role) => {
  try {
    const userId = req.headers.get("x-user-id");
    const displayName = req.headers.get("x-user-name") || "User";
    const avatarUrl = req.headers.get("x-user-avatar") || null;

    if (!userId) {
      return NextResponse.json({ success: false, error: "User ID required." }, { status: 400 });
    }

    const body = await req.json();
    const { type, title, recipientId, recipientRole, recipientName, recipientAvatar, members, isAnnouncement } = body;

    if (!type || !["direct", "group", "announcement"].includes(type)) {
      return NextResponse.json({ success: false, error: "Invalid conversation type." }, { status: 400 });
    }

    const senderRole = role as MessagingRole;

    // For direct messages, validate recipient role permission
    if (type === "direct") {
      if (!recipientId || !recipientRole) {
        return NextResponse.json({ success: false, error: "Recipient info required." }, { status: 400 });
      }

      if (!canMessage(senderRole, recipientRole as MessagingRole)) {
        return NextResponse.json(
          { success: false, error: `Role '${role}' cannot message '${recipientRole}'.` },
          { status: 403 }
        );
      }

      // Check for existing direct conversation between these two users
      const existing = await prisma.conversation.findFirst({
        where: {
          type: "direct",
          members: { every: { userId: { in: [userId, recipientId] } } },
        },
        include: {
          members: { select: { userId: true, displayName: true, role: true, avatarUrl: true, lastReadAt: true } },
        },
      });

      if (existing) {
        return NextResponse.json({ success: true, data: existing, alreadyExists: true });
      }

      // Create new direct conversation
      const conv = await prisma.conversation.create({
        data: {
          type: "direct",
          createdBy: userId,
          createdByRole: role,
          members: {
            create: [
              { userId, role, displayName, avatarUrl },
              {
                userId: recipientId,
                role: recipientRole,
                displayName: recipientName || recipientId,
                avatarUrl: recipientAvatar || null,
              },
            ],
          },
        },
        include: {
          members: { select: { userId: true, displayName: true, role: true, avatarUrl: true, lastReadAt: true } },
        },
      });

      return NextResponse.json({ success: true, data: conv });
    }

    // Group / Announcement conversation
    if (type === "group" || type === "announcement") {
      if (!members || !Array.isArray(members) || members.length === 0) {
        return NextResponse.json({ success: false, error: "Group members required." }, { status: 400 });
      }

      // Validate all recipient roles are permitted
      for (const m of members) {
        if (m.userId !== userId && !canMessage(senderRole, m.role as MessagingRole)) {
          return NextResponse.json(
            { success: false, error: `Cannot add role '${m.role}' to this conversation.` },
            { status: 403 }
          );
        }
      }

      // Ensure creator is in members list
      const hasCreator = members.some((m: { userId: string }) => m.userId === userId);
      const allMembers = hasCreator
        ? members
        : [{ userId, role, displayName, avatarUrl, isAdmin: true }, ...members];

      const conv = await prisma.conversation.create({
        data: {
          type,
          title: title || "Group Conversation",
          createdBy: userId,
          createdByRole: role,
          isAnnouncement: type === "announcement",
          members: {
            create: allMembers.map((m: { userId: string; role: string; displayName: string; avatarUrl?: string; isAdmin?: boolean }) => ({
              userId: m.userId,
              role: m.role,
              displayName: m.displayName,
              avatarUrl: m.avatarUrl || null,
              isAdmin: m.isAdmin || m.userId === userId,
            })),
          },
        },
        include: {
          members: { select: { userId: true, displayName: true, role: true, avatarUrl: true, lastReadAt: true } },
        },
      });

      // Add system message for group creation
      await prisma.message.create({
        data: {
          conversationId: conv.id,
          senderId: userId,
          senderRole: role,
          senderName: displayName,
          content: `${displayName} created "${conv.title}"`,
          messageType: "system",
        },
      });

      return NextResponse.json({ success: true, data: conv });
    }

    return NextResponse.json({ success: false, error: "Invalid request." }, { status: 400 });
  } catch (error) {
    console.error("[conversations POST]", error);
    return NextResponse.json({ success: false, error: "Failed to create conversation." }, { status: 500 });
  }
});
