"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  MessageSquare,
  Users,
  Megaphone,
  ChevronDown,
  ArrowLeft,
  Info,
  MoreVertical,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";
import ConversationList from "@/components/messages/ConversationList";
import MessageThread from "@/components/messages/MessageThread";
import MessageInput from "@/components/messages/MessageInput";
import NewConversationModal from "@/components/messages/NewConversationModal";
import GroupCreateModal from "@/components/messages/GroupCreateModal";
import { getInitials, getRoleBadgeClass, canCreateGroup, canCreateAnnouncement, MessagingRole } from "@/lib/messaging-permissions";

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
  createdAt: string;
  readBy: Array<{ userId: string; readAt: string }>;
}

// Build stable userId from portal context
function buildUserId(role: string): string {
  if (role === "Student") return "student-1NT23CS042";
  if (role === "Faculty") return "faculty-CSE-FAC-001";
  if (role === "HOD") return "hod-HOD-CSE-001";
  if (role === "Administration") return "administration-ADMIN-001";
  if (role === "IT") return "it-IT-001";
  return `unknown-${role}`;
}

export default function MessagingLayout() {
  const { activePortal, currentUser } = useDepartment();
  const currentUserId = buildUserId(activePortal || "Faculty");
  const roleType = (activePortal || "Faculty") as MessagingRole;

  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [conversation, setConversation] = useState<ConversationInfo | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupModalMode, setGroupModalMode] = useState<"group" | "announcement">("group");
  const [replyTarget, setReplyTarget] = useState<MessageData | null>(null);
  const [sendTrigger, setSendTrigger] = useState(0);
  const [convRefreshTrigger, setConvRefreshTrigger] = useState(0);
  const [showMobileThread, setShowMobileThread] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [newDropOpen, setNewDropOpen] = useState(false);

  // Load conversation details when selected
  useEffect(() => {
    if (!selectedConvId) {
      setConversation(null);
      return;
    }
    const load = async () => {
      try {
        const res = await fetch(`/api/messages/conversations/${selectedConvId}`, {
          headers: {
            "x-portal-role": activePortal || "Faculty",
            "x-user-id": currentUserId,
            "x-user-name": currentUser.name,
          },
        });
        const data = await res.json();
        if (data.success) setConversation(data.data);
      } catch {}
    };
    load();
  }, [selectedConvId, activePortal, currentUserId, currentUser.name]);

  const handleSelectConversation = (id: string) => {
    setSelectedConvId(id);
    setShowMobileThread(true);
    setReplyTarget(null);
  };

  const handleConvCreated = (id: string) => {
    setSelectedConvId(id);
    setShowMobileThread(true);
    setConvRefreshTrigger((p) => p + 1);
  };

  const handleMessageSent = useCallback(() => {
    setSendTrigger((p) => p + 1);
    setConvRefreshTrigger((p) => p + 1);
    setReplyTarget(null);
  }, []);

  function getConvDisplayName(): string {
    if (!conversation) return "";
    if (conversation.title) return conversation.title;
    if (conversation.type === "direct") {
      const other = conversation.members.find((m) => m.userId !== currentUserId);
      return other?.displayName || "Unknown";
    }
    return conversation.members.map((m) => m.displayName).join(", ");
  }

  function getConvSubtitle(): string {
    if (!conversation) return "";
    if (conversation.isAnnouncement) return "📢 Announcement Channel";
    if (conversation.type === "direct") {
      const other = conversation.members.find((m) => m.userId !== currentUserId);
      return other?.role || "";
    }
    return `${conversation.members.length} members`;
  }

  function getConvAvatarData() {
    if (!conversation) return { url: undefined, name: "" };
    if (conversation.type === "direct") {
      const other = conversation.members.find((m) => m.userId !== currentUserId);
      return { url: other?.avatarUrl, name: other?.displayName || "" };
    }
    return { url: undefined, name: conversation.title || "Group" };
  }

  const { url: convAvatarUrl, name: convAvatarName } = getConvAvatarData();
  const isCurrentAdmin = conversation?.currentMember?.isAdmin ?? false;

  const canGroup = canCreateGroup(roleType);
  const canAnnounce = canCreateAnnouncement(roleType);

  return (
    <div className="h-[calc(100vh-80px)] flex bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

      {/* ─── LEFT: Conversation List ─────────────────── */}
      <div className={`w-full lg:w-80 xl:w-96 flex-shrink-0 border-r border-slate-200 flex flex-col ${
        showMobileThread ? "hidden lg:flex" : "flex"
      }`}>
        {/* "New" dropdown for group/announcement */}
        {(canGroup || canAnnounce) && (
          <div className="relative">
            {newDropOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setNewDropOpen(false)}
                />
                <div className="absolute top-12 right-4 z-20 bg-white border border-slate-200 rounded-xl shadow-lg py-1 min-w-[170px] animate-fade-in">
                  <button
                    onClick={() => { setShowNewModal(true); setNewDropOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 text-left"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Direct Message
                  </button>
                  {canGroup && (
                    <button
                      onClick={() => { setGroupModalMode("group"); setShowGroupModal(true); setNewDropOpen(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 text-left"
                    >
                      <Users className="w-3.5 h-3.5" />
                      New Group
                    </button>
                  )}
                  {canAnnounce && (
                    <button
                      onClick={() => { setGroupModalMode("announcement"); setShowGroupModal(true); setNewDropOpen(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-amber-600 hover:bg-amber-50 text-left"
                    >
                      <Megaphone className="w-3.5 h-3.5" />
                      Announcement
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        <ConversationList
          selectedId={selectedConvId}
          onSelect={handleSelectConversation}
          onNewConversation={() => setShowNewModal(true)}
          refreshTrigger={convRefreshTrigger}
        />
      </div>

      {/* ─── CENTER + RIGHT: Message Area ─────────────── */}
      <div className={`flex-1 flex flex-col min-w-0 ${
        showMobileThread ? "flex" : "hidden lg:flex"
      }`}>
        {!selectedConvId ? (
          // Empty state
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-slate-900 to-slate-700 flex items-center justify-center mb-5 shadow-lg">
              <MessageSquare className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Select a conversation</h3>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              Choose a conversation from the list, or start a new one with an authorized user.
            </p>
            <button
              onClick={() => setShowNewModal(true)}
              className="mt-5 flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-700 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Start New Conversation
            </button>
          </div>
        ) : (
          <>
            {/* ── Conversation Header ── */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 bg-white">
              {/* Mobile back button */}
              <button
                onClick={() => setShowMobileThread(false)}
                className="lg:hidden p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* Avatar */}
              {convAvatarUrl ? (
                <img
                  src={convAvatarUrl}
                  alt={convAvatarName}
                  className="w-9 h-9 rounded-xl object-cover"
                />
              ) : (
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${
                  conversation?.isAnnouncement
                    ? "bg-amber-100 text-amber-700"
                    : conversation?.type === "group"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-emerald-100 text-emerald-700"
                }`}>
                  {conversation?.isAnnouncement ? (
                    <Megaphone className="w-4.5 h-4.5" />
                  ) : conversation?.type === "group" ? (
                    <Users className="w-4 h-4" />
                  ) : (
                    getInitials(convAvatarName)
                  )}
                </div>
              )}

              {/* Name + subtitle */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 truncate">{getConvDisplayName()}</p>
                <p className="text-[11px] text-slate-400 truncate">{getConvSubtitle()}</p>
              </div>

              {/* Right actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowInfoPanel((p) => !p)}
                  className={`p-1.5 rounded-xl transition-colors ${
                    showInfoPanel ? "bg-slate-900 text-white" : "text-slate-400 hover:bg-slate-100"
                  }`}
                  title="Conversation Info"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 flex min-h-0">
              {/* ── Message Thread ── */}
              <div className="flex-1 flex flex-col min-w-0">
                <MessageThread
                  conversationId={selectedConvId}
                  conversation={conversation}
                  currentUserId={currentUserId}
                  onReply={(msg) => setReplyTarget(msg)}
                  sendTrigger={sendTrigger}
                  onMessageSent={handleMessageSent}
                />

                <MessageInput
                  conversationId={selectedConvId}
                  currentUserId={currentUserId}
                  currentUserName={currentUser.name}
                  currentUserAvatar={currentUser.avatar}
                  activePortal={activePortal || "Faculty"}
                  isAnnouncement={conversation?.isAnnouncement}
                  isAdmin={isCurrentAdmin}
                  replyTarget={replyTarget ? {
                    id: replyTarget.id,
                    senderName: replyTarget.senderName,
                    content: replyTarget.content,
                  } : null}
                  onClearReply={() => setReplyTarget(null)}
                  onSent={handleMessageSent}
                />
              </div>

              {/* ── Right Info Panel ── */}
              {showInfoPanel && conversation && (
                <div className="hidden xl:flex flex-col w-64 border-l border-slate-200 bg-slate-50/50">
                  <div className="px-4 py-4 border-b border-slate-200">
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                      {conversation.isAnnouncement ? "Announcement" : conversation.type === "group" ? "Group" : "Contact"} Info
                    </p>
                  </div>

                  {/* Members */}
                  <div className="flex-1 overflow-y-auto p-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2">
                      Members ({conversation.members.length})
                    </p>
                    <div className="space-y-2">
                      {conversation.members.map((m) => (
                        <div key={m.userId} className="flex items-center gap-2.5">
                          {m.avatarUrl ? (
                            <img src={m.avatarUrl} alt={m.displayName} className="w-7 h-7 rounded-lg object-cover shrink-0" />
                          ) : (
                            <div className="w-7 h-7 rounded-lg bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600 shrink-0">
                              {getInitials(m.displayName)}
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-slate-700 truncate">{m.displayName}</p>
                            <p className="text-[10px] text-slate-400 truncate">{m.role}</p>
                          </div>
                          {m.isAdmin && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 bg-slate-900 text-white rounded">
                              ADMIN
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* ─── Modals ─────────────────────────────────── */}
      <NewConversationModal
        isOpen={showNewModal}
        onClose={() => setShowNewModal(false)}
        onCreated={handleConvCreated}
        currentUserId={currentUserId}
      />

      <GroupCreateModal
        isOpen={showGroupModal}
        onClose={() => setShowGroupModal(false)}
        onCreated={handleConvCreated}
        currentUserId={currentUserId}
        mode={groupModalMode}
      />
    </div>
  );
}
