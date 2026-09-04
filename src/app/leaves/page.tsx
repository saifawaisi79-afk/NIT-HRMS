"use client";

import React, { useState } from "react";
import {
  CalendarOff,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  X,
  FileText,
  User,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";
import { LeaveItem } from "@/lib/data/cse-demo-data";

export default function LeavesPage() {
  const { leaves, applyLeave, updateLeaveStatus, currentRole } = useDepartment();

  const [activeFilter, setActiveFilter] = useState<"All" | "Pending" | "Approved" | "Rejected">("All");
  const [applicantFilter, setApplicantFilter] = useState<"All" | "Faculty" | "Student">("All");
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Apply Form
  const [formData, setFormData] = useState({
    applicantType: "Faculty" as "Faculty" | "Student",
    applicantName: "Dr. Priya Sharma",
    applicantId: "fac-2",
    applicantRoleOrUsn: "Professor",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    leaveType: "Casual Leave" as LeaveItem["leaveType"],
    startDate: "2026-09-18",
    endDate: "2026-09-19",
    days: 2,
    reason: "",
  });

  const filteredLeaves = leaves.filter((l) => {
    const matchStatus = activeFilter === "All" || l.status === activeFilter;
    const matchType = applicantFilter === "All" || l.applicantType === applicantFilter;
    return matchStatus && matchType;
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.reason) return;
    applyLeave(formData);
    setIsApplyModalOpen(false);
    setFormData({
      applicantType: "Faculty",
      applicantName: "Dr. Priya Sharma",
      applicantId: "fac-2",
      applicantRoleOrUsn: "Professor",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      leaveType: "Casual Leave",
      startDate: "2026-09-18",
      endDate: "2026-09-19",
      days: 2,
      reason: "",
    });
  };

  const pendingCount = leaves.filter((l) => l.status === "Pending").length;
  const approvedCount = leaves.filter((l) => l.status === "Approved").length;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Leave & Absence Approvals</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Faculty duty leaves, medical concessions, student sports OD sanctions, and HOD approvals.
          </p>
        </div>

        <button
          onClick={() => setIsApplyModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Apply for Leave</span>
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-slate-400">Total Applications</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{leaves.length}</p>
          <span className="text-[10px] text-slate-400">This semester</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-slate-400">Pending HOD Review</span>
          <p className="text-2xl font-bold text-amber-600 mt-1">{pendingCount}</p>
          <span className="text-[10px] text-amber-600 font-semibold">Action required</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-slate-400">Sanctioned / Approved</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{approvedCount}</p>
          <span className="text-[10px] text-emerald-600 font-semibold">Processed</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
          <span className="text-[11px] font-medium text-slate-400">Average Turnaround</span>
          <p className="text-2xl font-bold text-indigo-600 mt-1">4.2 Hrs</p>
          <span className="text-[10px] text-slate-400">Quick approvals</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
        <div className="flex items-center gap-1">
          {(["All", "Pending", "Approved", "Rejected"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setActiveFilter(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition ${
                activeFilter === st
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
          {(["All", "Faculty", "Student"] as const).map((ap) => (
            <button
              key={ap}
              onClick={() => setApplicantFilter(ap)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition ${
                applicantFilter === ap
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {ap}
            </button>
          ))}
        </div>
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200/70 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Applicant</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Leave Type</th>
                <th className="py-3.5 px-4">Dates / Duration</th>
                <th className="py-3.5 px-4">Reason</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Sanction Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeaves.map((leave) => {
                const isPending = leave.status === "Pending";
                return (
                  <tr key={leave.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Applicant */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={leave.avatar}
                          alt={leave.applicantName}
                          className="w-8 h-8 rounded-xl object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{leave.applicantName}</p>
                          <p className="text-[10px] text-slate-400">{leave.applicantRoleOrUsn}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-700">{leave.applicantType}</span>
                    </td>

                    {/* Leave Type */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                        {leave.leaveType}
                      </span>
                    </td>

                    {/* Dates */}
                    <td className="py-3.5 px-4 text-slate-600">
                      <p className="font-semibold text-slate-800">
                        {leave.startDate} to {leave.endDate}
                      </p>
                      <p className="text-[10px] text-slate-400">{leave.days} Day{leave.days > 1 ? "s" : ""}</p>
                    </td>

                    {/* Reason */}
                    <td className="py-3.5 px-4 max-w-xs text-slate-600">
                      <p className="line-clamp-2">{leave.reason}</p>
                      {leave.approverRemarks && (
                        <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                          ✓ {leave.approverRemarks}
                        </p>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                          leave.status === "Approved"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : leave.status === "Rejected"
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            leave.status === "Approved"
                              ? "bg-emerald-500"
                              : leave.status === "Rejected"
                              ? "bg-rose-500"
                              : "bg-amber-500"
                          }`}
                        />
                        {leave.status}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="py-3.5 px-4 text-right">
                      {isPending ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => updateLeaveStatus(leave.id, "Approved")}
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition shadow-xs"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateLeaveStatus(leave.id, "Rejected")}
                            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium">Decided</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setIsApplyModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Submit Leave Application</h3>
              <button onClick={() => setIsApplyModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Applicant Category</label>
                  <select
                    value={formData.applicantType}
                    onChange={(e) => setFormData({ ...formData, applicantType: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                  >
                    <option value="Faculty">Faculty Member</option>
                    <option value="Student">Student</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Leave Type</label>
                  <select
                    value={formData.leaveType}
                    onChange={(e) => setFormData({ ...formData, leaveType: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                  >
                    <option value="Casual Leave">Casual Leave</option>
                    <option value="Medical Leave">Medical Leave</option>
                    <option value="On Duty">On Duty (OD) / Conference</option>
                    <option value="Academic Leave">Academic / Research Leave</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Total Days</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.days}
                    onChange={(e) => setFormData({ ...formData, days: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Reason for Absence</label>
                <textarea
                  rows={3}
                  required
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="State the purpose and alternate arrangement for classes/labs..."
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-sm"
                >
                  Submit for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
