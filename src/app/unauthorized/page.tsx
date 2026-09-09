"use client";

import React from "react";
import Link from "next/link";
import { ShieldX, ArrowLeft, Home } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <ShieldX className="w-10 h-10 text-rose-500" />
        </div>

        {/* Status */}
        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-700 border border-rose-200 mb-4">
          403 — Access Denied
        </span>

        {/* Title */}
        <h1 className="text-3xl font-black text-slate-950 tracking-tight mb-3">
          Not Authorized
        </h1>

        {/* Message */}
        <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 max-w-sm mx-auto">
          Your current portal role does not have permission to access this page.
          Please switch to an authorized portal or contact your administrator.
        </p>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 text-white text-sm font-semibold hover:bg-slate-800 transition shadow-sm"
          >
            <Home className="w-4 h-4" />
            Portal Selector
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-[11px] text-slate-400 mt-8 font-medium">
          If you believe this is an error, please contact your system administrator.
        </p>
      </div>
    </div>
  );
}
