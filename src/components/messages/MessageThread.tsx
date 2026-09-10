"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  MoreVertical,
  Reply,
  Pencil,
  Trash2,
  Check,
  CheckCheck,
  Loader2,
  ChevronUp,
  Megaphone,
  Users,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";
import { formatMessageTime, getInitials } from "@/lib/messaging-permissions";

interface MessageData {
  id: string;
  senderId: string;
  senderRole: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  messageType: string;
  replyToId?: string;
  replyToPreview?: string;
  isEdited: boolean;
  editedAt?: string;
  deletedAt?: string;
  createdAt: string;
  readBy: Array<{ userId: string; readAt: string }>;
}

interface ConversationInfo {
  id: string;
  type: string;
  title?: string;
  isAnnouncement: boolean;
  members: Array<{
    userId: string;
    displayName: string;
    role: string;
    avatarUrl?: string;
    isAdmin: boolean;
    lastReadAt?: string;
  }>;
  currentMember?: {
    userId: string;
    isAdmin: boolean;
  };
}

interface MessageThreadProps {
  conversationId: string;
  conversation: ConversationInfo | null;
  currentUserId: string;
  onReply: (msg: MessageData) => void;
  sendTrigger: number;
  onMessageSent: () => void;
}

export default function MessageThread({
  conversationId,
  conversation,
  currentUserId,
  onReply,
  sendTrigger,
  onMessageSent,
}: MessageThreadProps) {
  const { activePortal, currentUser } = useDepartment();
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevScrollHeight = useRef(0);

  const fetchMessages = useCallback(async (cursor?: string, append = false) => {
    try {
      const url = `/api/messages/conversations/${conversationId}/messages${cursor ? `?before=${encodeURIComponent(cursor)}` : ""}`;
      const res = await fetch(url, {
        headers: {
          "x-portal-role": activePortal || "Faculty",
          "x-user-id": currentUserId,
          "x-user-name": currentUser.name,
        },
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.success) {
        if (append) {
          setMessages((prev) => [...data.data, ...prev]);
        } else {
          setMessages(data.data);
        }
        setHasMore(data.hasMore);
        setNextCursor(data.nextCursor);
      }
    } catch {
      // Silently fail
    } finally {
      setLoading(false);
      setLoadingOlder(false);
    }
  }, [conversationId, activePortal, currentUserId, currentUser.name]);

  useEffect(() => {
    setLoading(true);
    setMessages([]);
    setNextCursor(null);
    fetchMessages();
  }, [conversationId, fetchMessages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // Re-fetch on send
  useEffect(() => {
    if (sendTrigger > 0) fetchMessages();
  }, [sendTrigger, fetchMessages]);

  // Poll for new messages every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => fetchMessages(), 5000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  // Mark as read when thread is visible
  useEffect(() => {
    const markRead = async () => {
      try {
        await fetch(`/api/messages/conversations/${conversationId}/read`, {
          method: "PATCH",
          headers: {
            "x-portal-role": activePortal || "Faculty",
            "x-user-id": currentUserId,
            "x-user-name": currentUser.name,
          },
        });
        onMessageSent(); // Trigger unread count refresh in parent
      } catch {}
    };
    markRead();
  }, [conversationId, messages.length]);

  const loadOlder = async () => {
    if (!nextCursor || loadingOlder) return;
    if (containerRef.current) {
      prevScrollHeight.current = containerRef.current.scrollHeight;
    }
    setLoadingOlder(true);
    await fetchMessages(nextCursor, true);
    // Restore scroll position after loading older
    setTimeout(() => {
      if (containerRef.current) {
        const newScrollHeight = containerRef.current.scrollHeight;
        containerRef.current.scrollTop = newScrollHeight - prevScrollHeight.current;
      }
    }, 50);
  };

  const handleEdit = async (msgId: string) => {
    if (!editContent.trim()) return;
    try {
      const res = await fetch(`/api/messages/${msgId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-portal-role": activePortal || "Faculty",
          "x-user-id": currentUserId,
          "x-user-name": currentUser.name,
        },
        body: JSON.stringify({ content: editContent }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) =>
          prev.map((m) => (m.id === msgId ? { ...m, content: data.data.content, isEdited: true } : m))
        );
        setEditingId(null);
        setEditContent("");
      }
    } catch {}
  };

  const handleDelete = async (msgId: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      const res = await fetch(`/api/messages/${msgId}`, {
        method: "DELETE",
        headers: {
          "x-portal-role": activePortal || "Faculty",
          "x-user-id": currentUserId,
          "x-user-name": currentUser.name,
        },
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId
              ? { ...m, content: "[Message deleted]", deletedAt: new Date().toISOString() }
              : m
          )
        );
      }
    } catch {}
    setMenuOpenId(null);
  };

  const getReadStatus = (msg: MessageData) => {
    const memberCount = conversation?.members.length || 1;
    if (msg.readBy.length === 0) return "sent";
    if (msg.readBy.length >= memberCount - 1) return "read";
    return "delivered";
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center gap-2 text-slate-400">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Loading messages...</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-1" onClick={() => setMenuOpenId(null)}>
      {/* Load Older Button */}
      {hasMore && (
        <div className="flex justify-center mb-4">
          <button
            onClick={loadOlder}
            disabled={loadingOlder}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            {loadingOlder ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <ChevronUp className="w-3 h-3" />
            )}
            Load older messages
          </button>
        </div>
      )}

      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full py-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
            {conversation?.isAnnouncement ? (
              <Megaphone className="w-7 h-7 text-amber-500" />
            ) : (
              <Users className="w-7 h-7 text-slate-400" />
            )}
          </div>
          <p className="text-sm font-semibold text-slate-700 mb-1">No messages yet</p>
          <p className="text-xs text-slate-400">
            {conversation?.isAnnouncement
              ? "Announcements from administrators will appear here."
              : "Send the first message to start the conversation."}
          </p>
        </div>
      ) : (
        <>
          {messages.map((msg, idx) => {
            const isMine = msg.senderId === currentUserId;
            const isSystem = msg.messageType === "system";
            const isDeleted = !!msg.deletedAt;
            const showAvatar = !isMine && (idx === 0 || messages[idx - 1]?.senderId !== msg.senderId);
            const readStatus = isMine ? getReadStatus(msg) : null;
            const isEditing = editingId === msg.id;
            const menuOpen = menuOpenId === msg.id;
            const canEdit = isMine && !isDeleted && msg.messageType === "text";
            const canDelete = isMine || conversation?.currentMember?.isAdmin;

            // System messages — centered
            if (isSystem) {
              return (
                <div key={msg.id} className="flex justify-center my-3">
                  <span className="text-[11px] text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                    {msg.content}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={`flex gap-2 group ${isMine ? "flex-row-reverse" : "flex-row"} ${
                  idx > 0 && messages[idx - 1]?.senderId === msg.senderId ? "mt-0.5" : "mt-3"
                }`}
              >
                {/* Avatar (only for others, only on first message in group) */}
                {!isMine && (
                  <div className="w-8 shrink-0">
                    {showAvatar ? (
                      msg.senderAvatar ? (
                        <img
                          src={msg.senderAvatar}
                          alt={msg.senderName}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center text-[11px] font-bold text-slate-600">
                          {getInitials(msg.senderName)}
                        </div>
                      )
                    ) : null}
                  </div>
                )}

                {/* Bubble */}
                <div className={`relative max-w-[70%] ${isMine ? "items-end" : "items-start"} flex flex-col`}>
                  {/* Sender name (only for others, only on first bubble in group) */}
                  {!isMine && showAvatar && (
                    <p className="text-[10px] font-semibold text-slate-500 mb-1 px-1">
                      {msg.senderName}
                    </p>
                  )}

                  {/* Reply preview */}
                  {msg.replyToPreview && (
                    <div className={`text-[11px] px-3 py-1.5 rounded-t-xl border-l-2 mb-0.5 ${
                      isMine
                        ? "bg-slate-700 text-slate-300 border-slate-400 self-end"
                        : "bg-slate-100 text-slate-500 border-slate-300 self-start"
                    }`}>
                      <Reply className="inline w-3 h-3 mr-1" />
                      {msg.replyToPreview}
                    </div>
                  )}

                  {/* Message bubble */}
                  <div className={`relative px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                    isMine
                      ? "bg-slate-900 text-white rounded-tr-sm"
                      : isDeleted
                      ? "bg-slate-100 text-slate-400 italic rounded-tl-sm"
                      : conversation?.isAnnouncement
                      ? "bg-amber-50 border border-amber-200 text-slate-800 rounded-tl-sm"
                      : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm"
                  }`}>
                    {isEditing ? (
                      <div className="flex flex-col gap-2">
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="text-sm bg-transparent resize-none outline-none w-full min-w-[200px]"
                          rows={2}
                          autoFocus
                        />
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => { setEditingId(null); setEditContent(""); }}
                            className="text-xs text-slate-300 hover:text-white"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleEdit(msg.id)}
                            className="text-xs bg-white text-slate-900 px-2 py-0.5 rounded font-semibold"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p>{msg.content}</p>
                    )}

                    {/* Edited indicator */}
                    {msg.isEdited && !isEditing && (
                      <span className="text-[10px] opacity-60 ml-1">(edited)</span>
                    )}
                  </div>

                  {/* Timestamp + Read status */}
                  <div className={`flex items-center gap-1 mt-0.5 px-1 ${isMine ? "flex-row-reverse" : ""}`}>
                    <span className="text-[10px] text-slate-400">
                      {formatMessageTime(msg.createdAt)}
                    </span>
                    {isMine && readStatus && (
                      <span className="text-[10px]">
                        {readStatus === "read" ? (
                          <CheckCheck className="w-3 h-3 text-[#0a9396]" />
                        ) : readStatus === "delivered" ? (
                          <CheckCheck className="w-3 h-3 text-slate-400" />
                        ) : (
                          <Check className="w-3 h-3 text-slate-300" />
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons — appear on hover */}
                {!isDeleted && !isEditing && (
                  <div className={`flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity self-center ${
                    isMine ? "order-first" : "order-last"
                  }`}>
                    <button
                      onClick={(e) => { e.stopPropagation(); onReply(msg); }}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                      title="Reply"
                    >
                      <Reply className="w-3.5 h-3.5" />
                    </button>
                    {(canEdit || canDelete) && (
                      <div className="relative">
                        <button
                          onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpen ? null : msg.id); }}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                          title="More"
                        >
                          <MoreVertical className="w-3.5 h-3.5" />
                        </button>
                        {menuOpen && (
                          <div className={`absolute z-20 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg py-1 min-w-[120px] ${
                            isMine ? "right-0" : "left-0"
                          }`}>
                            {canEdit && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingId(msg.id);
                                  setEditContent(msg.content);
                                  setMenuOpenId(null);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 text-left"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                                Edit
                              </button>
                            )}
                            {canDelete && (
                              <button
                                onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 text-left"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
