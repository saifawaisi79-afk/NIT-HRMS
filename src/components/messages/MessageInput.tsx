"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, X, Reply, Loader2, Smile } from "lucide-react";

interface ReplyTarget {
  id: string;
  senderName: string;
  content: string;
}

interface MessageInputProps {
  conversationId: string;
  currentUserId: string;
  currentUserName: string;
  currentUserAvatar?: string;
  activePortal: string;
  isAnnouncement?: boolean;
  isAdmin?: boolean;
  replyTarget?: ReplyTarget | null;
  onClearReply: () => void;
  onSent: () => void;
  disabled?: boolean;
}

export default function MessageInput({
  conversationId,
  currentUserId,
  currentUserName,
  currentUserAvatar,
  activePortal,
  isAnnouncement = false,
  isAdmin = false,
  replyTarget,
  onClearReply,
  onSent,
  disabled = false,
}: MessageInputProps) {
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [content]);

  // Focus input on reply
  useEffect(() => {
    if (replyTarget) textareaRef.current?.focus();
  }, [replyTarget]);

  const handleSend = async () => {
    const trimmed = content.trim();
    if (!trimmed || sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch(`/api/messages/conversations/${conversationId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-portal-role": activePortal,
          "x-user-id": currentUserId,
          "x-user-name": currentUserName,
          "x-user-avatar": currentUserAvatar || "",
        },
        body: JSON.stringify({
          content: trimmed,
          replyToId: replyTarget?.id || null,
          messageType: isAnnouncement ? "announcement" : "text",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Failed to send.");
      } else {
        setContent("");
        onClearReply();
        onSent();
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Announcements: only admins can send
  const isBlocked = isAnnouncement && !isAdmin;
  const isDisabled = disabled || isBlocked || sending;

  return (
    <div className="border-t border-slate-200 bg-white px-4 py-3">
      {/* Reply Preview */}
      {replyTarget && (
        <div className="flex items-center gap-2 mb-2 px-3 py-2 bg-slate-50 rounded-xl border-l-4 border-[#005f73]">
          <Reply className="w-3.5 h-3.5 text-[#005f73] shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-[#005f73]">{replyTarget.senderName}</p>
            <p className="text-[11px] text-slate-500 truncate">{replyTarget.content}</p>
          </div>
          <button
            onClick={onClearReply}
            className="p-0.5 text-slate-400 hover:text-slate-600 shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-2 text-xs text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg">
          {error}
        </div>
      )}

      {/* Announcement block message */}
      {isBlocked ? (
        <div className="flex items-center gap-2 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
          <span>📢</span>
          <span>Only administrators can post in announcement channels.</span>
        </div>
      ) : (
        <div className={`flex items-end gap-2 bg-slate-50 rounded-2xl border transition-colors ${
          disabled ? "border-slate-100 opacity-60" : "border-slate-200 focus-within:border-slate-400 focus-within:bg-white"
        }`}>
          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isAnnouncement
                ? "Write an announcement..."
                : "Type a message... (Enter to send, Shift+Enter for newline)"
            }
            disabled={isDisabled}
            rows={1}
            className="flex-1 px-4 py-3 text-sm bg-transparent resize-none focus:outline-none placeholder-slate-400 min-h-[44px] max-h-[120px] leading-relaxed disabled:cursor-not-allowed"
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={isDisabled || !content.trim()}
            className={`m-1.5 p-2 rounded-xl transition-all ${
              content.trim() && !isDisabled
                ? "bg-slate-900 text-white hover:bg-slate-700 shadow-sm"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
            title="Send (Enter)"
          >
            {sending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      )}

      {!isBlocked && (
        <p className="text-[10px] text-slate-300 mt-1.5 px-1">
          Press Enter to send · Shift+Enter for new line
        </p>
      )}
    </div>
  );
}
