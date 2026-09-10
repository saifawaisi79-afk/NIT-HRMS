"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, Search, Loader2, Users, Check, Plus, Megaphone } from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";
import { canCreateGroup, canCreateAnnouncement, getInitials, getRoleBadgeClass, MessagingRole } from "@/lib/messaging-permissions";

interface Contact {
  userId: string;
  role: string;
  displayName: string;
  designation: string;
  avatarUrl?: string;
  email: string;
}

interface GroupCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (convId: string) => void;
  currentUserId: string;
  mode: "group" | "announcement";
}

export default function GroupCreateModal({
  isOpen,
  onClose,
  onCreated,
  currentUserId,
  mode,
}: GroupCreateModalProps) {
  const { activePortal, currentUser } = useDepartment();
  const [title, setTitle] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Contact[]>([]);
  const [selected, setSelected] = useState<Contact[]>([]);
  const [searching, setSearching] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const role = activePortal as MessagingRole;
  const canCreate = mode === "group" ? canCreateGroup(role) : canCreateAnnouncement(role);

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

  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setQuery("");
      setSelected([]);
      setError(null);
      search("");
    }
  }, [isOpen, search]);

  const toggleContact = (contact: Contact) => {
    setSelected((prev) =>
      prev.some((c) => c.userId === contact.userId)
        ? prev.filter((c) => c.userId !== contact.userId)
        : [...prev, contact]
    );
  };

  const handleCreate = async () => {
    if (!title.trim()) { setError("Please enter a group name."); return; }
    if (selected.length === 0) { setError("Please select at least one member."); return; }
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
          type: mode,
          title: title.trim(),
          members: selected.map((c) => ({
            userId: c.userId,
            role: c.role,
            displayName: c.displayName,
            avatarUrl: c.avatarUrl,
          })),
          isAnnouncement: mode === "announcement",
        }),
      });
      const data = await res.json();
      if (data.success) {
        onCreated(data.data.id);
        onClose();
      } else {
        setError(data.error || "Failed to create group.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  if (!isOpen) return null;

  if (!canCreate) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center mx-auto mb-3">
            <X className="w-6 h-6 text-rose-600" />
          </div>
          <p className="font-semibold text-slate-800 mb-1">Permission Denied</p>
          <p className="text-sm text-slate-400 mb-4">
            Your role is not permitted to create {mode === "announcement" ? "announcements" : "groups"}.
          </p>
          <button onClick={onClose} className="px-4 py-2 bg-slate-900 text-white text-sm rounded-xl">
            Close
          </button>
        </div>
      </div>
    );
  }

  const isAnnouncement = mode === "announcement";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              isAnnouncement ? "bg-amber-500" : "bg-blue-600"
            }`}>
              {isAnnouncement ? (
                <Megaphone className="w-4 h-4 text-white" />
              ) : (
                <Users className="w-4 h-4 text-white" />
              )}
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-sm">
                {isAnnouncement ? "New Announcement Channel" : "New Group"}
              </h2>
              <p className="text-[11px] text-slate-400">
                {isAnnouncement ? "Only you can post; others can read" : "Add members from permitted contacts"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Group Name */}
        <div className="px-4 pt-4">
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            {isAnnouncement ? "Announcement Channel Name" : "Group Name"} *
          </label>
          <input
            autoFocus
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={isAnnouncement ? "e.g. HOD → CSE Faculty" : "e.g. CSE 3rd Year — Section A"}
            className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300"
          />
        </div>

        {/* Selected chips */}
        {selected.length > 0 && (
          <div className="px-4 pt-3 flex flex-wrap gap-1.5">
            {selected.map((c) => (
              <button
                key={c.userId}
                onClick={() => toggleContact(c)}
                className="flex items-center gap-1.5 px-2 py-1 bg-slate-900 text-white text-xs rounded-full"
              >
                {getInitials(c.displayName)}
                <X className="w-3 h-3 opacity-70" />
              </button>
            ))}
          </div>
        )}

        {/* Search */}
        <div className="px-4 pt-3 pb-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search contacts to add..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />
          </div>
        </div>

        {/* Results */}
        <div className="overflow-y-auto max-h-52 px-2 pb-2">
          {searching && results.length === 0 ? (
            <div className="flex items-center justify-center py-6 text-slate-400 gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-sm text-slate-400">No contacts found</p>
            </div>
          ) : (
            results.map((contact) => {
              const isChosen = selected.some((c) => c.userId === contact.userId);
              return (
                <button
                  key={contact.userId}
                  onClick={() => toggleContact(contact)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors mb-0.5 ${
                    isChosen ? "bg-slate-900 text-white" : "hover:bg-slate-50"
                  }`}
                >
                  {contact.avatarUrl ? (
                    <img src={contact.avatarUrl} alt={contact.displayName} className="w-8 h-8 rounded-lg object-cover shrink-0" />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                      {getInitials(contact.displayName)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${isChosen ? "text-white" : "text-slate-800"}`}>
                      {contact.displayName}
                    </p>
                    <p className={`text-[11px] truncate ${isChosen ? "text-slate-300" : "text-slate-400"}`}>
                      {contact.designation}
                    </p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isChosen ? "bg-white border-white" : "border-slate-300"
                  }`}>
                    {isChosen && <Check className="w-3 h-3 text-slate-900" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {error && (
          <div className="mx-4 mb-2 text-xs text-rose-600 bg-rose-50 px-3 py-2 rounded-lg">{error}</div>
        )}

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-[11px] text-slate-400">{selected.length} selected</p>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl">
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={creating || !title.trim() || selected.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white rounded-xl hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {creating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
              {isAnnouncement ? "Create Channel" : "Create Group"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
