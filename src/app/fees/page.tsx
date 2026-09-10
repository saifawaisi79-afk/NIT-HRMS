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
  QrCode,
  Check,
  Send,
  FileCheck,
  CalendarDays,
  Smartphone,
  Landmark,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";
import { FeeRecord } from "@/lib/data/cse-demo-data";

export default function FeesPage() {
  const {
    activePortal,
    currentUser,
    fees,
    markFeePaid,
    payStudentFee,
    grantFeeClearance,
    showToast,
  } = useDepartment();

  // Search & Filter for Admin & HOD views
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Payment Modal State for Student
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState<number>(50000);
  const [selectedMethod, setSelectedMethod] = useState<"UPI" | "Net Banking" | "Debit Card" | "NEFT">("UPI");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Receipt Modal State
  const [activeReceipt, setActiveReceipt] = useState<{
    receiptNo: string;
    studentName: string;
    usn: string;
    semester: string;
    amount: number;
    date: string;
    paymentMethod: string;
    transactionId: string;
  } | null>(null);

  // Identify Student's own record (default to Saif Awaisi if student)
  const studentFeeRecord: FeeRecord =
    fees.find((f) => f.usn === "1NT23CS042" || f.studentName.toLowerCase().includes("saif")) ||
    fees[0] || {
      id: "fee-saif",
      studentName: "Saif Awaisi",
      usn: "1NT23CS042",
      semester: 5,
      academicYear: "2026-27",
      totalFee: 125000,
      paidAmount: 75000,
      pendingAmount: 50000,
      dueDate: "2026-09-30",
      status: "Partial",
      receiptNo: "NIT-CSE-REC-2026-0942",
      paymentDate: "2026-08-14",
    };

  // Calculations for Admin / HOD
  const totalCollected = fees.reduce((acc, f) => acc + f.paidAmount, 0);
  const totalPending = fees.reduce((acc, f) => acc + f.pendingAmount, 0);
  const totalReceivable = totalCollected + totalPending;
  const clearanceRate = totalReceivable > 0 ? ((totalCollected / totalReceivable) * 100).toFixed(1) : "0";

  const filteredFees = fees.filter((f) => {
    const matchesSearch =
      f.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.usn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || f.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle student payment submission
  const handleConfirmPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      payStudentFee(studentFeeRecord.id, paymentAmount, selectedMethod);
      setIsProcessingPayment(false);
      setShowPaymentModal(false);

      // Open the newly generated receipt
      setActiveReceipt({
        receiptNo: `NIT-CSE-REC-${Date.now().toString().slice(-6)}`,
        studentName: studentFeeRecord.studentName,
        usn: studentFeeRecord.usn,
        semester: "5th Semester B.Tech (CSE)",
        amount: paymentAmount,
        date: new Date().toISOString().split("T")[0],
        paymentMethod: selectedMethod,
        transactionId: `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      });
    }, 1000);
  };

  // =========================================================================
  // VIEW 1: STUDENT PORTAL VIEW
  // =========================================================================
  if (activePortal === "Student") {
    const isCleared = studentFeeRecord.pendingAmount === 0;

    return (
      <div className="space-y-6 animate-fade-in font-sans pb-10">
        {/* Student Fee Header */}
        <div className="p-4 sm:p-7 rounded-2xl sm:rounded-[26px] bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 tracking-tight">
                Fees &amp; Payments Portal
              </h1>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold border ${
                  isCleared
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                }`}
              >
                {isCleared ? "Dues Cleared" : "Installment Pending"}
              </span>
            </div>
            <p className="text-xs font-bold text-slate-700 mt-1">
              {studentFeeRecord.studentName} • USN: <span className="text-[#005f73] font-mono">{studentFeeRecord.usn}</span>
            </p>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
              Academic Year {studentFeeRecord.academicYear} • 5th Semester B.Tech (Computer Science &amp; Engineering)
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
            {studentFeeRecord.receiptNo && (
              <button
                onClick={() =>
                  setActiveReceipt({
                    receiptNo: studentFeeRecord.receiptNo!,
                    studentName: studentFeeRecord.studentName,
                    usn: studentFeeRecord.usn,
                    semester: "5th Semester B.Tech (CSE)",
                    amount: studentFeeRecord.paidAmount,
                    date: studentFeeRecord.paymentDate || "2026-08-14",
                    paymentMethod: "Net Banking (SBI)",
                    transactionId: "TXN-NIT-CSE-89104",
                  })
                }
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-xs text-center"
              >
                <Receipt className="w-3.5 h-3.5 text-[#005f73]" />
                <span>Latest Receipt</span>
              </button>
            )}

            {!isCleared && (
              <button
                onClick={() => {
                  setPaymentAmount(studentFeeRecord.pendingAmount);
                  setShowPaymentModal(true);
                }}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#005f73] hover:bg-[#004e5f] text-white text-xs font-extrabold transition shadow-sm text-center"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay Outstanding Dues</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Summary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">TOTAL SEMESTER FEE</span>
            <p className="text-2xl font-black text-slate-950 mt-1">₹{studentFeeRecord.totalFee.toLocaleString()}</p>
            <span className="text-[11px] text-slate-500 font-bold">5th Sem Fixed Standard Tariff</span>
          </div>

          <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">AMOUNT PAID</span>
            <p className="text-2xl font-black text-emerald-700 mt-1">₹{studentFeeRecord.paidAmount.toLocaleString()}</p>
            <span className="text-[11px] text-emerald-600 font-bold">
              {((studentFeeRecord.paidAmount / studentFeeRecord.totalFee) * 100).toFixed(0)}% Received &amp; Verified
            </span>
          </div>

          <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">OUTSTANDING BALANCE</span>
            <p className={`text-2xl font-black mt-1 ${isCleared ? "text-emerald-700" : "text-rose-600"}`}>
              ₹{studentFeeRecord.pendingAmount.toLocaleString()}
            </p>
            <span className={`text-[11px] font-bold ${isCleared ? "text-emerald-600" : "text-rose-600"}`}>
              {isCleared ? "Zero Balance Due" : `Due by ${studentFeeRecord.dueDate}`}
            </span>
          </div>

          <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">EXAM CLEARANCE STATUS</span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`text-xl font-black ${isCleared ? "text-emerald-700" : "text-amber-700"}`}>
                {isCleared ? "CLEARED" : "PROVISIONAL"}
              </span>
              {isCleared ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <Clock className="w-5 h-5 text-amber-600" />
              )}
            </div>
            <span className="text-[11px] text-slate-500 font-bold">
              {isCleared ? "Hall Ticket Ready for Download" : "Clear dues before CIE-1 for Hall Ticket"}
            </span>
          </div>
        </div>

        {/* Due Notice Banner if pending */}
        {!isCleared && (
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-amber-900 shadow-xs">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-amber-950">
                  SEMESTER 5 INSTALLMENT 2 PENDING: ₹{studentFeeRecord.pendingAmount.toLocaleString()}
                </p>
                <p className="text-amber-800 mt-0.5">
                  Payment is due by <strong>{studentFeeRecord.dueDate}</strong>. Late payment after this date incurs an administrative surcharge of ₹500 and temporary hold on examination hall tickets.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setPaymentAmount(studentFeeRecord.pendingAmount);
                setShowPaymentModal(true);
              }}
              className="shrink-0 px-4 py-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs transition shadow-xs self-start sm:self-auto"
            >
              Pay Now (Instant Clearance)
            </button>
          </div>
        )}

        {/* Main Grid: Fee Breakdown & Payment History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Itemized Fee Schedule */}
          <div className="lg:col-span-7 p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-950 tracking-tight">Itemized Fee Structure</h2>
                <p className="text-xs text-slate-400 font-medium">B.Tech 3rd Year (Odd Semester) Approved Breakdown</p>
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                Semester 5
              </span>
            </div>

            <div className="divide-y divide-slate-100 text-xs font-medium">
              {[
                { item: "Tuition & Academic Instruction Fee", amount: 85000, category: "Core Academic" },
                { item: "Computing Infrastructure & Cloud Labs Fee", amount: 15000, category: "Department Lab" },
                { item: "Digital Library, Journals & IEEE Access", amount: 5000, category: "Central Facility" },
                { item: "Campus Development & Student Amenities", amount: 10000, category: "Institutional" },
                { item: "Continuous Internal Evaluation & Semester Exam", amount: 10000, category: "Examination" },
              ].map((row, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900">{row.item}</p>
                    <p className="text-[10px] text-slate-400">{row.category}</p>
                  </div>
                  <span className="font-bold text-slate-900">₹{row.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-900 font-black">Total B.Tech Semester Tariff</span>
              <span className="text-sm font-black text-[#005f73]">₹{studentFeeRecord.totalFee.toLocaleString()}</span>
            </div>
          </div>

          {/* Right: Payment Ledger & Receipts History */}
          <div className="lg:col-span-5 p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-black text-slate-950 tracking-tight">Receipts &amp; Payments</h2>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                  Verified
                </span>
              </div>

              <div className="space-y-3">
                {studentFeeRecord.paidAmount > 0 && (
                  <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-bold text-slate-900">Installment 1 (Advance)</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Paid on {studentFeeRecord.paymentDate || "2026-08-14"} • Net Banking
                      </p>
                      <p className="text-[10px] font-mono text-[#005f73] mt-0.5">
                        {studentFeeRecord.receiptNo || "NIT-CSE-REC-2026-0942"}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="font-black text-emerald-700 block">
                        ₹{studentFeeRecord.paidAmount.toLocaleString()}
                      </span>
                      <button
                        onClick={() =>
                          setActiveReceipt({
                            receiptNo: studentFeeRecord.receiptNo || "NIT-CSE-REC-2026-0942",
                            studentName: studentFeeRecord.studentName,
                            usn: studentFeeRecord.usn,
                            semester: "5th Semester B.Tech (CSE)",
                            amount: studentFeeRecord.paidAmount,
                            date: studentFeeRecord.paymentDate || "2026-08-14",
                            paymentMethod: "Net Banking (SBI)",
                            transactionId: "TXN-NIT-CSE-89104",
                          })
                        }
                        className="text-[10px] font-bold text-[#005f73] hover:underline mt-1 inline-block"
                      >
                        Download PDF
                      </button>
                    </div>
                  </div>
                )}

                {isCleared ? (
                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                    <p className="text-xs font-bold text-emerald-950">Full Semester Fee Cleared!</p>
                    <p className="text-[10px] text-emerald-700 mt-0.5">
                      No dues pending for Academic Session 2026–27.
                    </p>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl border border-dashed border-slate-200 bg-white flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-700">Installment 2 (Pending)</span>
                      <p className="text-[10px] text-rose-500 mt-0.5">Due date: {studentFeeRecord.dueDate}</p>
                    </div>
                    <span className="font-bold text-rose-600">
                      ₹{studentFeeRecord.pendingAmount.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* No-Dues Clearance Card */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-slate-200">Exam Hall Ticket Clearance</span>
                </div>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    isCleared ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
                  }`}
                >
                  {isCleared ? "ELIGIBLE" : "ON HOLD"}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {isCleared
                  ? "All accounts verified. Digital Hall Ticket for Mid-Semester CIE-1 is unlocked for printing."
                  : "Accounts clearance requires settling outstanding dues before Hall Ticket generation."}
              </p>
            </div>
          </div>
        </div>

        {/* MODAL: Online Fee Payment */}
        {showPaymentModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-[26px] p-6 shadow-2xl border border-slate-200 space-y-5 animate-scale-up">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-950">Pay Semester Dues Online</h3>
                    <p className="text-[10px] text-slate-400">NIT Integrated Payment Gateway</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Student Summary */}
              <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Student:</span>
                  <span className="font-bold text-slate-900">{studentFeeRecord.studentName} ({studentFeeRecord.usn})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Pending Dues:</span>
                  <span className="font-bold text-rose-600">₹{studentFeeRecord.pendingAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Amount Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Amount to Pay (INR)</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    max={studentFeeRecord.pendingAmount}
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2.5 text-sm font-bold bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#005f73]"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Select Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "UPI", label: "UPI / QR", icon: Smartphone },
                    { id: "Net Banking", label: "Net Banking", icon: Landmark },
                    { id: "Debit Card", label: "Debit/Credit Card", icon: CreditCard },
                    { id: "NEFT", label: "NEFT / Challan", icon: Receipt },
                  ].map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedMethod(method.id as any)}
                        className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 transition ${
                          selectedMethod === method.id
                            ? "border-[#005f73] bg-[#005f73]/5 text-[#005f73]"
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Simulated Gateway Note */}
              <p className="text-[10px] text-slate-400 text-center">
                🔒 Secured by 256-bit SSL encryption • Instantly credits into NIT Institute accounts.
              </p>

              {/* CTA */}
              <button
                onClick={handleConfirmPayment}
                disabled={isProcessingPayment || paymentAmount <= 0}
                className="w-full py-3 rounded-xl bg-[#005f73] hover:bg-[#004e5f] text-white font-black text-xs transition shadow-sm flex items-center justify-center gap-2"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm &amp; Pay ₹{paymentAmount.toLocaleString()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* MODAL: Printable NIT Fee Receipt */}
        {activeReceipt && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-[26px] p-7 shadow-2xl border border-slate-200 space-y-5 animate-scale-up">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#005f73] to-[#0a9396] flex items-center justify-center text-white font-bold shadow-xs">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-950">NATIONAL INSTITUTE OF TECHNOLOGY</h3>
                    <p className="text-[10px] font-bold text-slate-500">Official Fee Payment Receipt</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveReceipt(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Receipt Details Box */}
              <div className="border border-slate-200 rounded-2xl p-5 space-y-4 bg-slate-50/50">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">RECEIPT NUMBER</span>
                    <span className="font-mono font-bold text-[#005f73]">{activeReceipt.receiptNo}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">DATE OF ISSUE</span>
                    <span className="font-bold text-slate-800">{activeReceipt.date}</span>
                  </div>
                </div>

                <div className="divide-y divide-slate-200/60 text-xs">
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-500">Student Name:</span>
                    <span className="font-bold text-slate-900">{activeReceipt.studentName}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-500">University Seat No (USN):</span>
                    <span className="font-mono font-bold text-slate-900">{activeReceipt.usn}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-500">Program / Semester:</span>
                    <span className="font-bold text-slate-900">{activeReceipt.semester}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-500">Payment Channel:</span>
                    <span className="font-bold text-slate-900">{activeReceipt.paymentMethod}</span>
                  </div>
                  <div className="py-2 flex justify-between">
                    <span className="text-slate-500">Transaction ID:</span>
                    <span className="font-mono text-[11px] text-slate-700">{activeReceipt.transactionId}</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-center text-sm font-black">
                    <span className="text-slate-900">Total Amount Paid:</span>
                    <span className="text-emerald-700">₹{activeReceipt.amount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Seal Stamp */}
                <div className="pt-3 flex items-center justify-between">
                  <div className="px-3 py-1 rounded-full border-2 border-dashed border-emerald-600 text-emerald-700 text-[10px] font-black uppercase tracking-wider">
                    ✓ VERIFIED &amp; CREDITED
                  </div>
                  <div className="text-right text-[10px] text-slate-400">
                    <p className="font-bold text-slate-700">Accounts &amp; Finance Officer</p>
                    <p>NIT Campus Secretariat</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    window.print();
                    showToast("Receipt Printed", `Receipt ${activeReceipt.receiptNo} sent to printer.`);
                  }}
                  className="flex-1 py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => {
                    showToast("Receipt Downloaded", `Receipt ${activeReceipt.receiptNo} downloaded as PDF.`);
                    setActiveReceipt(null);
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
  // VIEW 2: HOD PORTAL VIEW — DEPARTMENT FEE CLEARANCE & EXAM ELIGIBILITY
  // =========================================================================
  if (activePortal === "HOD") {
    return (
      <div className="space-y-6 animate-fade-in font-sans pb-10">
        {/* Header */}
        <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Department Fee Clearance &amp; Exam Eligibility
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
                HOD Oversight
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              CSE Department Student Dues, Hall Ticket Clearance &amp; Examination Eligibility Ledger
            </p>
          </div>

          <button
            onClick={() => showToast("Clearance Report Generated", "CSE Department Fee Audit CSV downloaded.")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#005f73] hover:bg-[#004e5f] text-white text-xs font-extrabold transition shadow-sm self-start md:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Export Clearance Ledger</span>
          </button>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">TOTAL DEPARTMENT STUDENTS</span>
            <p className="text-2xl font-black text-slate-950 mt-1">748</p>
            <span className="text-[11px] text-indigo-600 font-bold">Semesters 1 through 8</span>
          </div>

          <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">CLEARANCE RATE</span>
            <p className="text-2xl font-black text-emerald-700 mt-1">84.4%</p>
            <span className="text-[11px] text-emerald-600 font-bold">631 / 748 Students Cleared</span>
          </div>

          <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">DEPARTMENT DUES</span>
            <p className="text-2xl font-black text-rose-600 mt-1">₹18.4 Lakhs</p>
            <span className="text-[11px] text-rose-600 font-bold">117 Students Pending</span>
          </div>

          <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">HALL TICKETS ISSUED</span>
            <p className="text-2xl font-black text-[#005f73] mt-1">631</p>
            <span className="text-[11px] text-[#005f73] font-bold">CIE-1 Examination Ready</span>
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
                placeholder="Search CSE student by name or USN..."
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
                  <th className="pb-3">Student Name</th>
                  <th className="pb-3">USN</th>
                  <th className="pb-3">Semester</th>
                  <th className="pb-3">Total Fee</th>
                  <th className="pb-3">Paid</th>
                  <th className="pb-3">Pending</th>
                  <th className="pb-3">Due Date</th>
                  <th className="pb-3">Exam Status</th>
                  <th className="pb-3 text-right">HOD Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredFees.map((fee) => (
                  <tr key={fee.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 font-bold text-slate-900">{fee.studentName}</td>
                    <td className="py-3 font-mono font-bold text-slate-700">{fee.usn}</td>
                    <td className="py-3 text-slate-600">{fee.semester}th Sem</td>
                    <td className="py-3 font-bold text-slate-900">₹{fee.totalFee.toLocaleString()}</td>
                    <td className="py-3 font-bold text-emerald-700">₹{fee.paidAmount.toLocaleString()}</td>
                    <td className="py-3 font-bold text-rose-600">₹{fee.pendingAmount.toLocaleString()}</td>
                    <td className="py-3 text-slate-500">{fee.dueDate}</td>
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
                        {fee.status === "Paid" ? "Hall Ticket Approved" : "Hold - Dues Pending"}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      {fee.status === "Paid" ? (
                        <span className="text-[11px] font-bold text-emerald-700">Clear</span>
                      ) : (
                        <button
                          onClick={() => grantFeeClearance(fee.id)}
                          className="px-3 py-1 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[11px] font-bold transition"
                        >
                          Approve Clearance
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

  // =========================================================================
  // VIEW 3: ADMINISTRATION PORTAL VIEW — CENTRAL COLLEGE FEE MANAGEMENT
  // =========================================================================
  return (
    <div className="space-y-6 animate-fade-in font-sans pb-10">
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
          <p className="text-2xl font-black text-slate-950 mt-1">₹{totalReceivable.toLocaleString()}</p>
          <span className="text-[11px] text-slate-500 font-bold">{fees.length} Enrolled Students</span>
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
          <p className="text-2xl font-black text-indigo-600 mt-1">{clearanceRate}%</p>
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
                  <td className="py-3 text-slate-600">{fee.semester}th Sem</td>
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
                        onClick={() => showToast("Receipt Generated", `Receipt ${fee.receiptNo || "NIT-REC-001"} sent to student.`)}
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
