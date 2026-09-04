"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  Receipt,
  Filter,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";

export default function FeesPage() {
  const { fees, markFeePaid, showToast } = useDepartment();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const totalCollected = fees.reduce((acc, f) => acc + f.paidAmount, 0);
  const totalPending = fees.reduce((acc, f) => acc + f.pendingAmount, 0);

  const filteredFees = fees.filter((f) => {
    const matchesSearch =
      f.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.usn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || f.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Fee Management &amp; Collections
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Accounts &amp; Finance
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Tuition fee records, installment receipts, clearance status &amp; semester dues
          </p>
        </div>

        <button
          onClick={() => showToast("Exporting Ledger", "Fee audit report CSV generated.")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#005f73] hover:bg-[#004e5f] text-white text-xs font-extrabold transition shadow-sm self-start md:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Fee Ledger</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">TOTAL RECEIVABLE</span>
          <p className="text-2xl font-black text-slate-950 mt-1">₹6,25,000</p>
          <span className="text-[11px] text-slate-500 font-bold">5 Enrolled Students</span>
        </div>

        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">TOTAL COLLECTED</span>
          <p className="text-2xl font-black text-emerald-700 mt-1">₹{totalCollected.toLocaleString()}</p>
          <span className="text-[11px] text-emerald-600 font-bold">Cleared via Net Banking / UPI</span>
        </div>

        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">OUTSTANDING DUES</span>
          <p className="text-2xl font-black text-rose-600 mt-1">₹{totalPending.toLocaleString()}</p>
          <span className="text-[11px] text-rose-600 font-bold">Pending Clearance</span>
        </div>

        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">CLEARANCE RATE</span>
          <p className="text-2xl font-black text-indigo-600 mt-1">
            {((totalCollected / (totalCollected + totalPending)) * 100).toFixed(1)}%
          </p>
          <span className="text-[11px] text-indigo-600 font-bold">Semester 5 Target Met</span>
        </div>
      </div>

      {/* Main Fee Ledger Table */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by student name or USN..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-full outline-none focus:ring-2 focus:ring-[#005f73]/20"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold">
            {["All", "Paid", "Partial", "Pending", "Overdue"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-full transition ${
                  statusFilter === st
                    ? "bg-slate-950 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px] font-extrabold">
                <th className="pb-3 font-extrabold">Student Name</th>
                <th className="pb-3 font-extrabold">USN</th>
                <th className="pb-3 font-extrabold">Semester</th>
                <th className="pb-3 font-extrabold">Total Fee</th>
                <th className="pb-3 font-extrabold">Paid</th>
                <th className="pb-3 font-extrabold">Pending</th>
                <th className="pb-3 font-extrabold">Due Date</th>
                <th className="pb-3 font-extrabold">Status</th>
                <th className="pb-3 font-extrabold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredFees.map((fee) => (
                <tr key={fee.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 font-bold text-slate-900">{fee.studentName}</td>
                  <td className="py-3 font-mono font-bold text-slate-700">{fee.usn}</td>
                  <td className="py-3 text-slate-600">5th Sem</td>
                  <td className="py-3 font-bold text-slate-900">₹{fee.totalFee.toLocaleString()}</td>
                  <td className="py-3 font-bold text-emerald-700">₹{fee.paidAmount.toLocaleString()}</td>
                  <td className="py-3 font-bold text-rose-600">₹{fee.pendingAmount.toLocaleString()}</td>
                  <td className="py-3 text-slate-500 font-medium">{fee.dueDate}</td>
                  <td className="py-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        fee.status === "Paid"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : fee.status === "Partial"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {fee.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    {fee.status === "Paid" ? (
                      <button
                        onClick={() => showToast("Receipt Generated", `Receipt ${fee.receiptNo} sent to student.`)}
                        className="px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-700 text-[11px] font-bold transition"
                      >
                        Receipt
                      </button>
                    ) : (
                      <button
                        onClick={() => markFeePaid(fee.id)}
                        className="px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition"
                      >
                        Record Payment
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
