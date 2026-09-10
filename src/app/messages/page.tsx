"use client";

import React from "react";
import { useDepartment } from "@/context/DepartmentContext";
import MessagingLayout from "@/components/messages/MessagingLayout";
import { MessageSquare } from "lucide-react";

export default function MessagesPage() {
  const { activePortal } = useDepartment();

  if (!activePortal) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
          <MessageSquare className="w-8 h-8 text-slate-400" />
        </div>
        <p className="text-slate-600 font-semibold">Select a portal to access Messages</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#005f73]" />
            Messages
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {activePortal} Portal — Secure departmental communications
          </p>
        </div>
      </div>

      {/* Messaging Interface */}
      <MessagingLayout />
    </div>
  );
}
