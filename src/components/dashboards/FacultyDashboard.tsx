"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Award,
  BookOpen,
  FileText,
  Clock,
  Users,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  CalendarDays,
  Plus,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";

export default function FacultyDashboard() {
  const { facultyList, studentList, leaves, showToast } = useDepartment();

  const facultyInfo = {
    name: "Dr. Priya Sharma",
    designation: "Associate Professor (CSE)",
    department: "Computer Science & Engineering",
    empId: "CSE-FAC-002",
    classesToday: 3,
    assignedStudents: 128,
    teachingHours: 16,
    avgAttendance: 88.4,
  };

  const todayClasses = [
    {
      id: "cls-1",
      time: "10:00 AM - 11:00 AM",
      subject: "CS501: Database Management Systems",
      semester: "5th Semester",
      section: "Section A",
      room: "Room CS-202",
      attendanceMarked: false,
    },
    {
      id: "cls-2",
      time: "02:00 PM - 04:00 PM",
      subject: "CS505L: Database Systems & SQL Laboratory",
      semester: "5th Semester",
      section: "Section B (Batch 1)",
      room: "Computing Lab 2",
      attendanceMarked: true,
    },
    {
      id: "cls-3",
      time: "04:15 PM - 05:15 PM",
      subject: "CS501: Database Management Systems (Tutorial)",
      semester: "5th Semester",
      section: "Section A",
      room: "Room CS-202",
      attendanceMarked: false,
    },
  ];

  const studentsAtRisk = [
    { name: "Rohan Verma", usn: "1NT23CS003", section: "A", attendance: 71.8, issue: "Attendance < 75% in CS501" },
    { name: "Vikram Malhotra", usn: "1NT23CS005", section: "B", attendance: 64.2, issue: "Chronic Absenteeism (64.2%)" },
    { name: "Sneha Patil", usn: "1NT23CS012", section: "A", attendance: 73.5, issue: "Missed 3 consecutive lectures" },
  ];

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header Profile Section */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full ring-2 ring-[#005f73]/40 bg-slate-100 overflow-hidden shrink-0 shadow-xs">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
              alt="Faculty"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Good Morning, Faculty
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Active Faculty
              </span>
            </div>
            <p className="text-xs font-bold text-slate-700 mt-1">
              {facultyInfo.name} • Emp ID: <span className="text-[#005f73] font-extrabold">{facultyInfo.empId}</span>
            </p>
            <p className="text-xs text-slate-500 font-medium">
              {facultyInfo.designation} • Department of {facultyInfo.department}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/leaves"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-xs"
          >
            <span>Apply Leave</span>
          </Link>
          <Link
            href="/attendance"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#005f73] hover:bg-[#004e5f] text-white text-xs font-bold transition shadow-sm"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Mark Attendance</span>
          </Link>
        </div>
      </div>

      {/* 6 Key KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">CLASSES TODAY</span>
            <CalendarDays className="w-4 h-4 text-[#005f73]" />
          </div>
          <p className="text-2xl font-black text-slate-950">{facultyInfo.classesToday}</p>
          <p className="text-[11px] text-slate-500 font-bold mt-1">1 Lecture Pending</p>
        </div>

        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">STUDENTS</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-slate-950">{facultyInfo.assignedStudents}</p>
          <p className="text-[11px] text-indigo-600 font-bold mt-1">Sem 5 Sec A & B</p>
        </div>

        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">SUBJECTS</span>
            <BookOpen className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-slate-950">2</p>
          <p className="text-[11px] text-purple-600 font-bold mt-1">CS501 & CS505L</p>
        </div>

        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">AVG ATTENDANCE</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-slate-950">{facultyInfo.avgAttendance}%</p>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">Above Dept Target</p>
        </div>

        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">EVALUATIONS</span>
            <FileText className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-black text-slate-950">14</p>
          <p className="text-[11px] text-rose-600 font-bold mt-1">Assignments to Grade</p>
        </div>

        <div className="p-5 rounded-[22px] bg-white border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">WORKLOAD</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-slate-950">{facultyInfo.teachingHours}h</p>
          <p className="text-[11px] text-amber-600 font-bold mt-1">Balanced (Target: 16h)</p>
        </div>
      </div>

      {/* Main Grid: Today's Classes with "Mark Attendance" action */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Today's Classes */}
        <div className="lg:col-span-7 p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950 tracking-tight">Today&apos;s Assigned Classes</h2>
              <p className="text-xs text-slate-400 font-medium">Click Mark Attendance to record daily student presence</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
              Friday Schedule
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {todayClasses.map((cls) => (
              <div key={cls.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 p-2 rounded-2xl transition">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-slate-900">{cls.subject}</h3>
                    {cls.attendanceMarked ? (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ✓ Marked
                      </span>
                    ) : (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        Pending
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {cls.semester} • {cls.section} • {cls.room}
                  </p>
                  <p className="text-[11px] font-bold text-[#005f73] mt-1">
                    {cls.time}
                  </p>
                </div>

                <Link
                  href="/attendance"
                  className={`px-4 py-2 rounded-full text-xs font-bold transition shrink-0 flex items-center justify-center gap-1.5 shadow-xs ${
                    cls.attendanceMarked
                      ? "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      : "bg-[#005f73] hover:bg-[#004e5f] text-white"
                  }`}
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>{cls.attendanceMarked ? "Edit Attendance" : "Mark Attendance"}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Students Requiring Attention */}
        <div className="lg:col-span-5 p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950 tracking-tight">Students Requiring Attention</h2>
              <p className="text-xs text-slate-400 font-medium">Students falling below attendance cutoff</p>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          </div>

          <div className="space-y-3">
            {studentsAtRisk.map((stu) => (
              <div
                key={stu.usn}
                className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-200/80 flex items-center justify-between gap-3"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{stu.name} ({stu.usn})</h4>
                  <p className="text-[11px] text-rose-700 font-semibold mt-0.5">{stu.issue}</p>
                </div>
                <Link
                  href="/mentoring"
                  className="px-3 py-1.5 rounded-full bg-white border border-rose-300 hover:bg-rose-100 text-rose-800 text-xs font-bold transition shrink-0"
                >
                  Counsel Mentee
                </Link>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <Link
              href="/mentoring"
              className="w-full py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold block text-center transition"
            >
              Open Mentoring Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Third Row: Fast Action Drawers: Gradebook, Course Materials & Assignments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 mb-2">
              <Award className="w-5 h-5" />
              <h3 className="font-extrabold text-sm text-slate-950">Continuous Evaluation (CIE)</h3>
            </div>
            <p className="text-xs text-slate-500">
              Bulk enter test marks, quiz scores, and lab practical evaluations for 5th Sem CS501.
            </p>
          </div>
          <Link
            href="/exams"
            className="w-full py-2.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-xs text-center transition"
          >
            Enter Gradebook Marks
          </Link>
        </div>

        <div className="p-6 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#005f73] mb-2">
              <FileText className="w-5 h-5" />
              <h3 className="font-extrabold text-sm text-slate-950">Course Assignments</h3>
            </div>
            <p className="text-xs text-slate-500">
              Create new problem sets, set submission deadlines, and review student code uploads.
            </p>
          </div>
          <Link
            href="/assignments"
            className="w-full py-2.5 rounded-full bg-[#005f73]/10 hover:bg-[#005f73]/20 text-[#005f73] font-extrabold text-xs text-center transition"
          >
            Manage Assignments
          </Link>
        </div>

        <div className="p-6 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 mb-2">
              <BookOpen className="w-5 h-5" />
              <h3 className="font-extrabold text-sm text-slate-950">Lecture Resources & Notes</h3>
            </div>
            <p className="text-xs text-slate-500">
              Upload module-wise lecture slides, reference papers, and lab code skeletons for students.
            </p>
          </div>
          <Link
            href="/notes"
            className="w-full py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-extrabold text-xs text-center transition"
          >
            Upload Study Materials
          </Link>
        </div>
      </div>
    </div>
  );
}
