"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, Plus, MessageSquare, Users, Megaphone, Filter, Check } from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";
import { formatMessageTime, getInitials, getRoleBadgeClass } from "@/lib/messaging-permissions";

interface ConversationPreview {
  id: string;
  type: string;
  title?: string;
  isAnnouncement: boolean;
  lastMessageAt?: string;
  lastMessagePreview?: string;
  unreadCount: number;
  otherMembers: Array<{
    userId: string;
    displayName: string;
    avatarUrl?: string;
    role: string;
  }>;
  allMembers: Array<{
    userId: string;
    displayName: string;
    role: string;
  }>;
  lastMessage?: {
    content: string;
    senderName: string;
    createdAt: string;
    messageType: string;
  };
}

interface ConversationListProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNewConversation: () => void;
  refreshTrigger: number;
}

export default function ConversationList({
  selectedId,
  onSelect,
  onNewConversation,
  refreshTrigger,
}: ConversationListProps) {
  const { activePortal, currentUser } = useDepartment();
  const [conversations, setConversations] = useState<ConversationPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "direct" | "group">("all");

  const userId = buildUserId(activePortal || "Faculty", currentUser.name);

  function buildUserId(role: string, name: string): string {
    const roleKey = role.toLowerCase();
    const nameKey = name.toLowerCase().replace(/\s+/g, "-");
    // Use consistent IDs matching the demo data
    if (role === "Student") return "student-1NT23CS042";
    if (role === "Faculty") return "faculty-CSE-FAC-001";
    if (role === "HOD") return "hod-HOD-CSE-001";
    if (role === "Administration") return "administration-ADMIN-001";
    if (role === "IT") return "it-IT-001";
    return `${roleKey}-${nameKey}`;
  }

  const fetchConversations = useCallback(async () => {
    try {
      const res = await fetch("/api/messages/conversations", {
        headers: {
          "x-portal-role": activePortal || "Faculty",
          "x-user-id": userId,
          "x-user-name": currentUser.name,
        },
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data.success) setConversations(data.data);
    } catch {
      // Silently fail on poll
    } finally {
      setLoading(false);
    }
  }, [activePortal, userId, currentUser.name]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations, refreshTrigger]);

  // Poll every 5 seconds
  useEffect(() => {
    const interval = setInterval(fetchConversations, 5000);
    return () => clearInterval(interval);
  }, [fetchConversations]);

  const filtered = conversations.filter((c) => {
    const name = getConvName(c);
    const matchesSearch =
      !search ||
      name.toLowerCase().includes(search.toLowerCase()) ||
      c.lastMessagePreview?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && c.unreadCount > 0) ||
      (filter === "direct" && c.type === "direct") ||
      (filter === "group" && (c.type === "group" || c.type === "announcement"));

    return matchesSearch && matchesFilter;
  });

  function getConvName(conv: ConversationPreview): string {
    if (conv.title) return conv.title;
    if (conv.type === "direct") {
      const other = conv.otherMembers[0];
      return other?.displayName || "Unknown";
    }
    return conv.allMembers.map((m) => m.displayName).join(", ");
  }

  function getConvAvatar(conv: ConversationPreview) {
    if (conv.type === "direct") {
      const other = conv.otherMembers[0];
      return { url: other?.avatarUrl, name: other?.displayName || "?" };
    }
    return { url: null, name: conv.title || "Group" };
  }

  function getConvRole(conv: ConversationPreview): string {
    if (conv.type === "direct") return conv.otherMembers[0]?.role || "";
    return "";
  }

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-slate-800 text-sm">Messages</h2>
          <button
            onClick={onNewConversation}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-700 transition-colors"
            title="New Conversation"
          >
            <Plus className="w-3.5 h-3.5" />
            New
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 placeholder-slate-400"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1">
          {(["all", "unread", "direct", "group"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-1 text-[10px] font-semibold rounded-lg capitalize transition-colors ${
                filter === f
                  ? "bg-slate-900 text-white"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="w-10 h-10 rounded-xl bg-slate-200 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 bg-slate-200 rounded w-3/4" />
                  <div className="h-2.5 bg-slate-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12 px-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
              <MessageSquare className="w-7 h-7 text-slate-400" />
            </div>
            <p className="text-sm font-semibold text-slate-700 mb-1">
              {search ? "No results found" : "No conversations yet"}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {search
                ? "Try a different search term."
                : "Click \"New\" to start a conversation with an authorized user."}
            </p>
          </div>
        ) : (
          <div className="py-1">
            {filtered.map((conv) => {
              const { url, name } = getConvAvatar(conv);
              const convRole = getConvRole(conv);
              const isSelected = conv.id === selectedId;
              const isGroup = conv.type === "group" || conv.type === "announcement";
              const memberCount = conv.allMembers.length;

              return (
                <button
                  key={conv.id}
                  onClick={() => onSelect(conv.id)}
                  className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors group ${
                    isSelected
                      ? "bg-slate-900 text-white"
                      : "hover:bg-slate-50"
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    {url ? (
                      <img
                        src={url}
                        alt={name}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-white"
                      />
                    ) : (
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ring-2 ring-white ${
                        conv.isAnnouncement
                          ? "bg-amber-100 text-amber-700"
                          : isGroup
                          ? "bg-blue-100 text-blue-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}>
                        {conv.isAnnouncement ? (
                          <Megaphone className="w-5 h-5" />
                        ) : isGroup ? (
                          <Users className="w-4 h-4" />
                        ) : (
                          getInitials(name)
                        )}
                      </div>
                    )}
                    {conv.unreadCount > 0 && !isSelected && (
                      <span className="absolute -top-1 -right-1 w-4.5 h-4.5 min-w-[18px] flex items-center justify-center bg-[#005f73] text-white text-[9px] font-bold rounded-full px-1">
                        {conv.unreadCount > 9 ? "9+" : conv.unreadCount}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <p className={`text-xs font-semibold truncate ${isSelected ? "text-white" : "text-slate-800"}`}>
                        {getConvName(conv)}
                      </p>
                      <span className={`text-[10px] shrink-0 ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                        {conv.lastMessageAt ? formatMessageTime(conv.lastMessageAt) : ""}
                      </span>
                    </div>

                    {/* Role / Member count */}
                    {(convRole || isGroup) && (
                      <p className={`text-[10px] mb-0.5 truncate ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                        {isGroup ? `${memberCount} members` : convRole}
                      </p>
                    )}

                    {/* Last message preview */}
                    <p className={`text-[11px] truncate leading-relaxed ${
                      isSelected
                        ? conv.unreadCount > 0 ? "text-white font-medium" : "text-slate-300"
                        : conv.unreadCount > 0 ? "text-slate-700 font-medium" : "text-slate-400"
                    }`}>
                      {conv.lastMessage
                        ? conv.lastMessage.messageType === "system"
                          ? `📢 ${conv.lastMessage.content}`
                          : conv.lastMessagePreview || "No messages yet"
                        : "No messages yet"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
