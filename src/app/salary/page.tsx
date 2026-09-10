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
  ArrowRight,
  ShieldCheck,
  Building2,
  Printer,
  X,
  FileText,
  Landmark,
  TrendingUp,
  UserCheck,
  Sparkles,
  Calendar,
  DollarSign,
  ChevronDown,
  Lock,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";
import { SalaryRecord } from "@/lib/data/cse-demo-data";

export default function SalaryPage() {
  const {
    activePortal,
    currentUser,
    salaries,
    disburseSalary,
    disburseAllDepartmentSalaries,
    showToast,
  } = useDepartment();

  // Selected month for Faculty view
  const [selectedMonth, setSelectedMonth] = useState<string>("August 2026");

  // Filter & Search for Admin & HOD views
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Payslip Modal State
  const [activePayslip, setActivePayslip] = useState<SalaryRecord | null>(null);

  // Faculty demo user records (Dr. Priya Sharma)
  const facultySalaries = salaries.filter(
    (s) => s.empId === "CSE-FAC-002" || s.facultyName.toLowerCase().includes("priya")
  );

  const currentFacultySalary =
    facultySalaries.find((s) => s.month === selectedMonth) || facultySalaries[0] || salaries[0];

  // Calculations for Admin / HOD
  const totalGrossPayroll = salaries.reduce((acc, s) => acc + s.grossSalary, 0);
  const totalNetPayroll = salaries.reduce((acc, s) => acc + s.netSalary, 0);
  const totalDeductionsAll = salaries.reduce((acc, s) => acc + s.totalDeductions, 0);
  const disbursedCount = salaries.filter((s) => s.status === "Disbursed").length;

  const filteredSalaries = salaries.filter((s) => {
    const matchesSearch =
      s.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.empId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Helper to convert number to words (simple Indian currency style)
  const amountInWords = (num: number) => {
    if (num === 142850) return "One Lakh Forty-Two Thousand Eight Hundred Fifty Only";
    if (num === 200000) return "Two Lakh Only";
    if (num === 85000) return "Eighty-Five Thousand Only";
    if (num === 138000) return "One Lakh Thirty-Eight Thousand Only";
    if (num === 99000) return "Ninety-Nine Thousand Only";
    return `Rupees ${num.toLocaleString()} Only`;
  };

  // =========================================================================
  // VIEW 1: FACULTY PORTAL VIEW — MY SALARY & PAYSLIPS
  // =========================================================================
  if (activePortal === "Faculty") {
    const isDisbursed = currentFacultySalary.status === "Disbursed";

    return (
      <div className="space-y-6 animate-fade-in font-sans pb-10">
        {/* Header Profile Section */}
        <div className="p-4 sm:p-7 rounded-2xl sm:rounded-[26px] bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 tracking-tight">
                Salary &amp; Compensation
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                7th Pay Commission Scale
              </span>
            </div>
            <p className="text-xs font-bold text-slate-700 mt-1">
              {currentFacultySalary.facultyName} • Emp ID: <span className="text-[#005f73] font-mono">{currentFacultySalary.empId}</span>
            </p>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
              {currentFacultySalary.designation} • {currentFacultySalary.payLevel} • {currentFacultySalary.department}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            {/* Month Switcher Dropdown */}
            <div className="relative w-full sm:w-auto">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full sm:w-auto appearance-none pl-4 pr-9 py-2 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 outline-none cursor-pointer shadow-xs text-center"
              >
                {facultySalaries.map((s) => (
                  <option key={s.id} value={s.month}>
                    {s.month}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button
              onClick={() => setActivePayslip(currentFacultySalary)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#005f73] hover:bg-[#004e5f] text-white text-xs font-extrabold transition shadow-sm text-center"
            >
              <FileText className="w-4 h-4" />
              <span>Official Payslip</span>
            </button>
          </div>
        </div>

        {/* 4 Summary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">GROSS SALARY</span>
            <p className="text-2xl font-black text-slate-950 mt-1">₹{currentFacultySalary.grossSalary.toLocaleString()}</p>
            <span className="text-[11px] text-slate-500 font-bold">Basic + DA (50%) + HRA + Allowances</span>
          </div>

          <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">TOTAL DEDUCTIONS</span>
            <p className="text-2xl font-black text-rose-600 mt-1">₹{currentFacultySalary.totalDeductions.toLocaleString()}</p>
            <span className="text-[11px] text-rose-600 font-bold">NPS (₹15.2k) + TDS (₹34.3k) + PT</span>
          </div>

          <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">NET TAKE-HOME PAY</span>
            <p className="text-2xl font-black text-emerald-700 mt-1">₹{currentFacultySalary.netSalary.toLocaleString()}</p>
            <span className="text-[11px] text-emerald-600 font-bold">
              {isDisbursed ? `Credited on ${currentFacultySalary.disbursementDate}` : "Processing Transfer"}
            </span>
          </div>

          <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">ANNUAL CTC PROJECTED</span>
            <p className="text-2xl font-black text-indigo-600 mt-1">₹23.12 Lakhs</p>
            <span className="text-[11px] text-indigo-600 font-bold">Academic Session 2026–27</span>
          </div>
        </div>

        {/* Salary Credit Status Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-emerald-950 shadow-xs">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-extrabold">
                {currentFacultySalary.month} SALARY CREDITED: ₹{currentFacultySalary.netSalary.toLocaleString()}
              </p>
              <p className="text-emerald-800 text-[11px] mt-0.5">
                Transferred via NEFT to <strong>{currentFacultySalary.bankName}</strong> (A/C {currentFacultySalary.accountMasked}) on {currentFacultySalary.disbursementDate}. UTR Reference: <code>UTR-NIT-SAL-20260831-002</code>
              </p>
            </div>
          </div>
          <button
            onClick={() => setActivePayslip(currentFacultySalary)}
            className="shrink-0 px-4 py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs transition shadow-xs self-start sm:self-auto"
          >
            Download Slip
          </button>
        </div>

        {/* Two Columns: Earnings vs Deductions Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Earnings (Left) */}
          <div className="lg:col-span-6 p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-950 tracking-tight">Earnings &amp; Allowances</h2>
                <p className="text-xs text-slate-400 font-medium">Approved 7th CPC Level 12 Structure</p>
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Gross Components
              </span>
            </div>

            <div className="divide-y divide-slate-100 text-xs font-medium">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Basic Pay</p>
                  <p className="text-[10px] text-slate-400">Level 12 Index 1 (7th Pay Commission)</p>
                </div>
                <span className="font-bold text-slate-900">₹{currentFacultySalary.basicPay.toLocaleString()}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Dearness Allowance (DA)</p>
                  <p className="text-[10px] text-slate-400">Central Govt Rate: 50% of Basic</p>
                </div>
                <span className="font-bold text-slate-900">₹{currentFacultySalary.da.toLocaleString()}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">House Rent Allowance (HRA)</p>
                  <p className="text-[10px] text-slate-400">Category X/Y City: 27% of Basic</p>
                </div>
                <span className="font-bold text-slate-900">₹{currentFacultySalary.hra.toLocaleString()}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Special Academic Allowance</p>
                  <p className="text-[10px] text-slate-400">Teaching &amp; Department Responsibility</p>
                </div>
                <span className="font-bold text-slate-900">₹{currentFacultySalary.specialAllowance.toLocaleString()}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Research &amp; Innovation Grant</p>
                  <p className="text-[10px] text-slate-400">Monthly Research Fellowship Allowance</p>
                </div>
                <span className="font-bold text-slate-900">₹{currentFacultySalary.researchAllowance.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-black">
              <span className="text-slate-900">Total Gross Earnings</span>
              <span className="text-sm text-emerald-700">₹{currentFacultySalary.grossSalary.toLocaleString()}</span>
            </div>
          </div>

          {/* Deductions (Right) */}
          <div className="lg:col-span-6 p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-950 tracking-tight">Statutory Deductions</h2>
                <p className="text-xs text-slate-400 font-medium">Mandatory Provident Fund &amp; Taxes</p>
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                Withholdings
              </span>
            </div>

            <div className="divide-y divide-slate-100 text-xs font-medium">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">National Pension Scheme (NPS / PF)</p>
                  <p className="text-[10px] text-slate-400">Employee Tier-1 Contribution (10% of Basic+DA)</p>
                </div>
                <span className="font-bold text-rose-600">₹{currentFacultySalary.pfDeduction.toLocaleString()}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Income Tax (TDS)</p>
                  <p className="text-[10px] text-slate-400">Monthly Tax Deducted at Source (Old Regime)</p>
                </div>
                <span className="font-bold text-rose-600">₹{currentFacultySalary.tdsDeduction.toLocaleString()}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Professional Tax (PT)</p>
                  <p className="text-[10px] text-slate-400">State Statutory Standard Withholding</p>
                </div>
                <span className="font-bold text-rose-600">₹{currentFacultySalary.professionalTax.toLocaleString()}</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Campus Medical &amp; Group Insurance</p>
                  <p className="text-[10px] text-slate-400">NIT Contributory Health Scheme</p>
                </div>
                <span className="font-bold text-slate-400">₹0 (NIT Subsidized)</span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Staff Benevolent Fund</p>
                  <p className="text-[10px] text-slate-400">Faculty Welfare Association</p>
                </div>
                <span className="font-bold text-slate-400">₹0</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-black">
              <span className="text-slate-900">Total Monthly Deductions</span>
              <span className="text-sm text-rose-600">₹{currentFacultySalary.totalDeductions.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Bank & Tax Declarations Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bank Disbursement Details */}
          <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-[#005f73]" />
              <h3 className="text-sm font-black text-slate-950">Disbursement Bank Account</h3>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Bank Name:</span>
                <span className="font-bold text-slate-900">{currentFacultySalary.bankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Account Number:</span>
                <span className="font-mono font-bold text-slate-900">{currentFacultySalary.accountMasked}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">IFSC Code:</span>
                <span className="font-mono font-bold text-[#005f73]">{currentFacultySalary.ifsc}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">PAN Number:</span>
                <span className="font-mono font-bold text-slate-900">{currentFacultySalary.panNumber}</span>
              </div>
            </div>
          </div>

          {/* Tax & Form 16 Card */}
          <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <h3 className="text-sm font-black text-slate-950">Tax Declarations &amp; Form 16</h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                FY 2026–27 (AY 2027–28) Tax Regime: <strong>Old Tax Regime</strong> with Section 80C &amp; 80CCD declarations submitted.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => showToast("Form 16 Generated", "Form 16 Part A & B downloaded.")}
                className="flex-1 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Form 16 (FY 25–26)</span>
              </button>
              <button
                onClick={() => showToast("Declaration Active", "Your 80C declaration of ₹1.5L is approved.")}
                className="flex-1 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Tax Proofs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* MODAL: Printable Official NIT Payslip */}
        {activePayslip && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-[26px] p-7 shadow-2xl border border-slate-200 space-y-5 animate-scale-up max-h-[92vh] overflow-y-auto">
              {/* Slip Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#005f73] to-[#0a9396] flex items-center justify-center text-white font-bold shadow-xs">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-950">NATIONAL INSTITUTE OF TECHNOLOGY (NIT)</h3>
                    <p className="text-[11px] font-bold text-slate-500">
                      Monthly Salary Slip • {activePayslip.month}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActivePayslip(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Employee Bio Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">EMPLOYEE NAME</span>
                  <span className="font-bold text-slate-900">{activePayslip.facultyName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">EMPLOYEE ID</span>
                  <span className="font-mono font-bold text-slate-900">{activePayslip.empId}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">DESIGNATION</span>
                  <span className="font-bold text-slate-900">{activePayslip.designation}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">PAY LEVEL</span>
                  <span className="font-mono font-bold text-[#005f73]">{activePayslip.payLevel}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">BANK &amp; BRANCH</span>
                  <span className="font-bold text-slate-900">SBI NIT Campus</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">ACCOUNT NO.</span>
                  <span className="font-mono font-bold text-slate-900">{activePayslip.accountMasked}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">PAN NUMBER</span>
                  <span className="font-mono font-bold text-slate-900">{activePayslip.panNumber}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">PAYSLIP NO.</span>
                  <span className="font-mono font-bold text-slate-900">{activePayslip.payslipNo}</span>
                </div>
              </div>

              {/* Tables: Earnings vs Deductions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-100 p-2.5 font-black text-slate-900 flex justify-between">
                    <span>EARNINGS</span>
                    <span>AMOUNT (₹)</span>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Basic Pay:</span>
                      <span className="font-bold">₹{activePayslip.basicPay.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Dearness Allowance (50%):</span>
                      <span className="font-bold">₹{activePayslip.da.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">House Rent Allowance:</span>
                      <span className="font-bold">₹{activePayslip.hra.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Special Allowance:</span>
                      <span className="font-bold">₹{activePayslip.specialAllowance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Research Fellowship:</span>
                      <span className="font-bold">₹{activePayslip.researchAllowance.toLocaleString()}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-200 flex justify-between font-black">
                      <span>Gross Earnings:</span>
                      <span className="text-emerald-700">₹{activePayslip.grossSalary.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-100 p-2.5 font-black text-slate-900 flex justify-between">
                    <span>DEDUCTIONS</span>
                    <span>AMOUNT (₹)</span>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">NPS / Employee PF:</span>
                      <span className="font-bold">₹{activePayslip.pfDeduction.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Income Tax (TDS):</span>
                      <span className="font-bold">₹{activePayslip.tdsDeduction.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Professional Tax:</span>
                      <span className="font-bold">₹{activePayslip.professionalTax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Medical / Other:</span>
                      <span className="font-bold">₹0</span>
                    </div>
                    <div className="pt-8 border-t border-slate-200 flex justify-between font-black">
                      <span>Total Deductions:</span>
                      <span className="text-rose-600">₹{activePayslip.totalDeductions.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Net Salary Highlight */}
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-bold text-emerald-950 block">NET TAKE-HOME SALARY</span>
                  <span className="text-[11px] text-emerald-800 italic">
                    {amountInWords(activePayslip.netSalary)}
                  </span>
                </div>
                <div className="text-2xl font-black text-emerald-700">
                  ₹{activePayslip.netSalary.toLocaleString()}
                </div>
              </div>

              {/* Digital Seal Stamp */}
              <div className="pt-2 flex items-center justify-between text-[11px]">
                <div className="px-3 py-1 rounded-full border-2 border-dashed border-emerald-600 text-emerald-700 font-bold">
                  ✓ DIGITALLY AUTHENTICATED • NIT PAYROLL CELL
                </div>
                <div className="text-right text-slate-400">
                  <p className="font-bold text-slate-700">Registrar &amp; Accounts Officer</p>
                  <p>National Institute of Technology</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    window.print();
                    showToast("Payslip Sent to Printer", `Slip ${activePayslip.payslipNo} printed.`);
                  }}
                  className="flex-1 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Slip</span>
                </button>
                <button
                  onClick={() => {
                    showToast("Payslip Downloaded", `Slip ${activePayslip.payslipNo} downloaded.`);
                    setActivePayslip(null);
                  }}
                  className="flex-1 py-2.5 rounded-full bg-[#005f73] hover:bg-[#004e5f] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: HOD PORTAL VIEW — DEPARTMENT FACULTY PAYROLL & COMPENSATION
  // =========================================================================
  if (activePortal === "HOD") {
    return (
      <div className="space-y-6 animate-fade-in font-sans pb-10">
        {/* Header */}
        <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Faculty Payroll &amp; Budget
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
                Department Executive
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              CSE Department Faculty Compensation, 7th CPC Scales, Research Grants &amp; Monthly Bill Endorsement
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast("Payroll Endorsed", "CSE Department August Payroll endorsed to Dean Accounts.")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#005f73] hover:bg-[#004e5f] text-white text-xs font-extrabold transition shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Endorse Monthly Bill</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">TOTAL DEPARTMENT FACULTY</span>
            <p className="text-2xl font-black text-slate-950 mt-1">34</p>
            <span className="text-[11px] text-indigo-600 font-bold">6 Profs • 12 Assoc • 16 Asst</span>
          </div>

          <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">MONTHLY SALARY BILL</span>
            <p className="text-2xl font-black text-emerald-700 mt-1">₹58.42 Lakhs</p>
            <span className="text-[11px] text-emerald-600 font-bold">Gross Department Allocation</span>
          </div>

          <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">ANNUAL PAYROLL BUDGET</span>
            <p className="text-2xl font-black text-slate-950 mt-1">₹7.01 Cr</p>
            <span className="text-[11px] text-slate-500 font-bold">AY 2026–27 Sanctioned</span>
          </div>

          <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">DISBURSEMENT STATUS</span>
            <p className="text-2xl font-black text-[#005f73] mt-1">32 / 34</p>
            <span className="text-[11px] text-[#005f73] font-bold">2 Guest Faculty Processing</span>
          </div>
        </div>

        {/* Filter & Table */}
        <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search faculty by name, emp ID or designation..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-full outline-none focus:ring-2 focus:ring-[#005f73]/20"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold">
              {["All", "Disbursed", "Processing", "On Hold"].map((st) => (
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
                  <th className="pb-3">Faculty Name</th>
                  <th className="pb-3">Emp ID</th>
                  <th className="pb-3">Designation</th>
                  <th className="pb-3">Pay Scale</th>
                  <th className="pb-3">Gross Salary</th>
                  <th className="pb-3">Deductions</th>
                  <th className="pb-3">Net Salary</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredSalaries.map((sal) => (
                  <tr key={sal.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 font-bold text-slate-900">{sal.facultyName}</td>
                    <td className="py-3 font-mono font-bold text-slate-700">{sal.empId}</td>
                    <td className="py-3 text-slate-600">{sal.designation}</td>
                    <td className="py-3 font-mono text-[11px] text-[#005f73]">{sal.payLevel}</td>
                    <td className="py-3 font-bold text-slate-900">₹{sal.grossSalary.toLocaleString()}</td>
                    <td className="py-3 font-bold text-rose-600">₹{sal.totalDeductions.toLocaleString()}</td>
                    <td className="py-3 font-bold text-emerald-700">₹{sal.netSalary.toLocaleString()}</td>
                    <td className="py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          sal.status === "Disbursed"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {sal.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => setActivePayslip(sal)}
                        className="px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-700 text-[11px] font-bold transition"
                      >
                        View Slip
                      </button>
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

  // =========================================================================
  // VIEW 3: ADMINISTRATION PORTAL VIEW — CENTRAL COLLEGE PAYROLL DISBURSEMENT
  // =========================================================================
  return (
    <div className="space-y-6 animate-fade-in font-sans pb-10">
      {/* Header */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Payroll &amp; Salary Administration
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Dean Office &amp; Accounts
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Institutional Faculty &amp; Staff Monthly Payroll Processing, Bank Batch Transmissions &amp; Statutory Compliance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => showToast("NEFT Batch Exported", "Bank transmission file (TXT/CSV) generated for SBI Corporate Portal.")}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export Bank Batch</span>
          </button>
          <button
            onClick={disburseAllDepartmentSalaries}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#005f73] hover:bg-[#004e5f] text-white text-xs font-extrabold transition shadow-sm"
          >
            <CreditCard className="w-4 h-4" />
            <span>Disburse Monthly Payroll</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">TOTAL CAMPUS PAYROLL</span>
          <p className="text-2xl font-black text-slate-950 mt-1">₹1.24 Cr</p>
          <span className="text-[11px] text-slate-500 font-bold">142 Teaching &amp; Staff Members</span>
        </div>

        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">DISBURSED TO DATE</span>
          <p className="text-2xl font-black text-emerald-700 mt-1">₹1.18 Cr</p>
          <span className="text-[11px] text-emerald-600 font-bold">95.2% Disbursed via SBI NEFT</span>
        </div>

        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">PENDING PROCESSING</span>
          <p className="text-2xl font-black text-amber-600 mt-1">₹6.5 Lakhs</p>
          <span className="text-[11px] text-amber-600 font-bold">Visiting &amp; Ad-hoc Staff</span>
        </div>

        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">TOTAL TDS &amp; PF WITHHELD</span>
          <p className="text-2xl font-black text-indigo-600 mt-1">₹31.8 Lakhs</p>
          <span className="text-[11px] text-indigo-600 font-bold">Remitted to ITD &amp; EPFO</span>
        </div>
      </div>

      {/* Main Ledger Table */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search faculty or staff by name or ID..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-full outline-none focus:ring-2 focus:ring-[#005f73]/20"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold">
            {["All", "Disbursed", "Processing", "On Hold"].map((st) => (
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
                <th className="pb-3">Employee Name</th>
                <th className="pb-3">Emp ID</th>
                <th className="pb-3">Designation</th>
                <th className="pb-3">Bank A/C</th>
                <th className="pb-3">Gross Pay</th>
                <th className="pb-3">Deductions</th>
                <th className="pb-3">Net Disbursed</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredSalaries.map((sal) => (
                <tr key={sal.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 font-bold text-slate-900">{sal.facultyName}</td>
                  <td className="py-3 font-mono font-bold text-slate-700">{sal.empId}</td>
                  <td className="py-3 text-slate-600">{sal.designation}</td>
                  <td className="py-3 font-mono text-slate-600">{sal.accountMasked}</td>
                  <td className="py-3 font-bold text-slate-900">₹{sal.grossSalary.toLocaleString()}</td>
                  <td className="py-3 font-bold text-rose-600">₹{sal.totalDeductions.toLocaleString()}</td>
                  <td className="py-3 font-bold text-emerald-700">₹{sal.netSalary.toLocaleString()}</td>
                  <td className="py-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        sal.status === "Disbursed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {sal.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    {sal.status === "Disbursed" ? (
                      <button
                        onClick={() => setActivePayslip(sal)}
                        className="px-3 py-1 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-700 text-[11px] font-bold transition"
                      >
                        Payslip
                      </button>
                    ) : (
                      <button
                        onClick={() => disburseSalary(sal.id)}
                        className="px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold transition"
                      >
                        Release Pay
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
