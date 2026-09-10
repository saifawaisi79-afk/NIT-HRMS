"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Search, Loader2, UserPlus, Check, Users } from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";
import { getInitials, getRoleBadgeClass } from "@/lib/messaging-permissions";

interface Contact {
  userId: string;
  role: string;
  displayName: string;
  designation: string;
  avatarUrl?: string;
  email: string;
  identifier: string;
}

interface NewConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (convId: string) => void;
  currentUserId: string;
}

export default function NewConversationModal({
  isOpen,
  onClose,
  onCreated,
  currentUserId,
}: NewConversationModalProps) {
  const { activePortal, currentUser } = useDepartment();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Contact[]>([]);
  const [searching, setSearching] = useState(false);
  const [creating, setCreating] = useState(false);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (q: string) => {
    setSearching(true);
    try {
      const res = await fetch(
        `/api/messages/users/search?q=${encodeURIComponent(q)}`,
        {
          headers: {
            "x-portal-role": activePortal || "Faculty",
            "x-user-id": currentUserId,
            "x-user-name": currentUser.name,
          },
        }
      );
      const data = await res.json();
      if (data.success) setResults(data.data);
    } catch {}
    finally { setSearching(false); }
  }, [activePortal, currentUserId, currentUser.name]);

  useEffect(() => {
    const t = setTimeout(() => search(query), 250);
    return () => clearTimeout(t);
  }, [query, search]);

  // Load all permitted contacts on open
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelected(null);
      setError(null);
      search("");
    }
  }, [isOpen, search]);

  const handleSelect = (contact: Contact) => {
    setSelected(selected?.userId === contact.userId ? null : contact);
    setError(null);
  };

  const handleStart = async () => {
    if (!selected) return;
    setCreating(true);
    setError(null);
    try {
      const res = await fetch("/api/messages/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-portal-role": activePortal || "Faculty",
          "x-user-id": currentUserId,
          "x-user-name": currentUser.name,
          "x-user-avatar": currentUser.avatar || "",
        },
        body: JSON.stringify({
          type: "direct",
          recipientId: selected.userId,
          recipientRole: selected.role,
          recipientName: selected.displayName,
          recipientAvatar: selected.avatarUrl,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onCreated(data.data.id);
        onClose();
      } else {
        setError(data.error || "Failed to start conversation.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-sm">New Conversation</h2>
              <p className="text-[11px] text-slate-400">Select an authorized contact</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pt-4 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              autoFocus
              type="text"
              placeholder="Search by name, email, ID, or role..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300"
            />
          </div>
        </div>

        {/* Results */}
        <div className="overflow-y-auto max-h-72 px-2 pb-2">
          {searching && results.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-slate-400 gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Searching...</span>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-400">No users found</p>
              <p className="text-xs text-slate-300 mt-1">
                Only authorized contacts are shown
              </p>
            </div>
          ) : (
            results.map((contact) => {
              const isSelected = selected?.userId === contact.userId;
              return (
                <button
                  key={contact.userId}
                  onClick={() => handleSelect(contact)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors mb-0.5 ${
                    isSelected
                      ? "bg-slate-900 text-white"
                      : "hover:bg-slate-50"
                  }`}
                >
                  {contact.avatarUrl ? (
                    <img
                      src={contact.avatarUrl}
                      alt={contact.displayName}
                      className="w-9 h-9 rounded-xl object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-xl bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                      {getInitials(contact.displayName)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${isSelected ? "text-white" : "text-slate-800"}`}>
                      {contact.displayName}
                    </p>
                    <p className={`text-[11px] truncate ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                      {contact.designation}
                    </p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium shrink-0 ${
                    isSelected ? "bg-white/20 text-white border-white/30" : getRoleBadgeClass(contact.role)
                  }`}>
                    {contact.role}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                </button>
              );
            })
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mx-4 mb-2 text-xs text-rose-600 bg-rose-50 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[11px] text-slate-400">
            {selected ? `Selected: ${selected.displayName}` : "Showing authorized contacts only"}
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleStart}
              disabled={!selected || creating}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {creating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UserPlus className="w-3.5 h-3.5" />}
              Start Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
