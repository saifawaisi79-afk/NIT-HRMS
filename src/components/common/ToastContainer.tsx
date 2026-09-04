"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";

export default function ToastContainer() {
  const { toasts } = useDepartment();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
          info: <Info className="w-5 h-5 text-indigo-600 shrink-0" />,
          error: <XCircle className="w-5 h-5 text-rose-600 shrink-0" />,
        };

        const borders = {
          success: "border-emerald-200 bg-emerald-50/95",
          warning: "border-amber-200 bg-amber-50/95",
          info: "border-indigo-200 bg-indigo-50/95",
          error: "border-rose-200 bg-rose-50/95",
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl border shadow-float backdrop-blur transition-all duration-200 animate-fade-in ${borders[toast.type]}`}
          >
            {icons[toast.type]}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800">{toast.title}</p>
              <p className="text-[11px] text-slate-600 mt-0.5">{toast.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
