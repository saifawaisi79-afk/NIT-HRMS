"use client";

import React, { useState } from "react";
import {
  ScrollText,
  Search,
  ShieldCheck,
  Download,
  Clock,
  Filter,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";

export default function AuditLogsPage() {
  const { auditLogs, showToast } = useDepartment();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.module.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "All" || log.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Institutional Audit Trail &amp; Security Logs
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-slate-950 text-white">
              Immutable Log
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Tamper-evident record of administrative changes, attendance entries, marks submission &amp; approvals
          </p>
        </div>

        <button
          onClick={() => showToast("Audit Logs Exported", "Compliance audit log CSV downloaded.")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#005f73] hover:bg-[#004e5f] text-white text-xs font-extrabold transition shadow-sm self-start md:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Security Audit</span>
        </button>
      </div>

      {/* Main Table */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search audit trail by user, action or module..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-full outline-none focus:ring-2 focus:ring-[#005f73]/20"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold">
            {["All", "HOD", "Faculty", "Super Admin"].map((rf) => (
              <button
                key={rf}
                onClick={() => setRoleFilter(rf)}
                className={`px-3 py-1.5 rounded-full transition ${
                  roleFilter === rf
                    ? "bg-slate-950 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {rf}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px] font-extrabold">
                <th className="pb-3 font-extrabold">Timestamp</th>
                <th className="pb-3 font-extrabold">Acting User</th>
                <th className="pb-3 font-extrabold">Role</th>
                <th className="pb-3 font-extrabold">Action Performed</th>
                <th className="pb-3 font-extrabold">System Module</th>
                <th className="pb-3 font-extrabold text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 text-slate-400 font-mono text-[11px]">{log.timestamp}</td>
                  <td className="py-3 font-bold text-slate-900">{log.user}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      {log.role}
                    </span>
                  </td>
                  <td className="py-3 text-slate-800">{log.action}</td>
                  <td className="py-3 font-bold text-[#005f73]">{log.module}</td>
                  <td className="py-3 text-right font-mono text-slate-400 text-[11px]">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
