"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  CalendarDays,
  BookOpen,
  Award,
  FileText,
  FolderDown,
  CalendarOff,
  BellRing,
  Sparkles,
  Rocket,
  Briefcase,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  School,
  Clock,
  UserCheck,
  CreditCard,
  UserPlus,
  ScrollText,
  Building2,
  ShieldCheck,
  User,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";

interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export default function Sidebar({ mobileOpen = false, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();
  const { activePortal, currentRole, department, currentUser, exitPortal } = useDepartment();

  const getNavigationSections = () => {
    const portal = activePortal || (currentRole === "Student" ? "Student" : currentRole === "Faculty" ? "Faculty" : currentRole === "Super Admin" ? "Administration" : "HOD");

    if (portal === "Student") {
      return [
        {
          title: "ACADEMIC PORTAL",
          items: [
            { name: "Dashboard", href: "/", icon: LayoutDashboard },
            { name: "My Profile", href: "/settings", icon: User },
            { name: "My Subjects", href: "/subjects", icon: BookOpen, badge: "6" },
            { name: "Timetable", href: "/timetable", icon: CalendarDays },
            { name: "Attendance", href: "/attendance", icon: CalendarCheck, badge: "86%" },
            { name: "Assignments", href: "/assignments", icon: FileText, badge: "2 Pending" },
            { name: "Study Materials", href: "/notes", icon: FolderDown },
            { name: "Examinations", href: "/exams", icon: Award },
            { name: "Results & Grades", href: "/results", icon: BarChart3 },
          ],
        },
        {
          title: "CAMPUS & CAREER",
          items: [
            { name: "Leave / Requests", href: "/leaves", icon: CalendarOff },
            { name: "Capstone Projects", href: "/projects", icon: Rocket },
            { name: "Placements", href: "/placements", icon: Briefcase, badge: "Tier 1" },
            { name: "Notices", href: "/notices", icon: BellRing },
            { name: "Events", href: "/events", icon: Sparkles },
            { name: "Documents", href: "/documents", icon: FileText },
            { name: "Help & Support", href: "/settings", icon: Settings },
          ],
        },
      ];
    }

    if (portal === "Faculty") {
      return [
        {
          title: "TEACHING WORKSPACE",
          items: [
            { name: "Dashboard", href: "/", icon: LayoutDashboard },
            { name: "My Profile", href: "/settings", icon: User },
            { name: "My Classes", href: "/timetable", icon: CalendarDays },
            { name: "Attendance Register", href: "/attendance", icon: CalendarCheck },
            { name: "Enrolled Students", href: "/students", icon: GraduationCap, badge: "128" },
            { name: "Assigned Subjects", href: "/subjects", icon: BookOpen, badge: "2" },
            { name: "Assignments", href: "/assignments", icon: FileText, badge: "14 Submissions" },
            { name: "Study Materials", href: "/notes", icon: FolderDown },
            { name: "Marks / Gradebook", href: "/exams", icon: Award },
          ],
        },
        {
          title: "FACULTY OPERATIONS",
          items: [
            { name: "Leave Applications", href: "/leaves", icon: CalendarOff },
            { name: "Teaching Workload", href: "/workload", icon: Clock, badge: "16 hrs" },
            { name: "Student Mentoring", href: "/mentoring", icon: UserCheck, badge: "4 Mentees" },
            { name: "Projects", href: "/projects", icon: Rocket },
            { name: "Notices", href: "/notices", icon: BellRing },
            { name: "Events", href: "/events", icon: Sparkles },
            { name: "Reports", href: "/reports", icon: BarChart3 },
            { name: "Settings", href: "/settings", icon: Settings },
          ],
        },
      ];
    }

    if (portal === "Administration") {
      return [
        {
          title: "INSTITUTIONAL CORE",
          items: [
            { name: "Admin Dashboard", href: "/", icon: LayoutDashboard },
            { name: "Student Management", href: "/students", icon: GraduationCap, badge: "748" },
            { name: "Faculty Management", href: "/faculty", icon: Users, badge: "34" },
            { name: "Departments", href: "/reports", icon: Building2 },
            { name: "Academic Setup", href: "/subjects", icon: BookOpen },
            { name: "Central Attendance", href: "/attendance", icon: CalendarCheck },
            { name: "Examinations Admin", href: "/exams", icon: Award },
          ],
        },
        {
          title: "CAMPUS OPERATIONS",
          items: [
            { name: "Fee Management", href: "/fees", icon: CreditCard, badge: "5 Records" },
            { name: "B.Tech Admissions", href: "/admissions", icon: UserPlus, badge: "4 Applicants" },
            { name: "Central Documents", href: "/documents", icon: FolderDown },
            { name: "Notices & Circulars", href: "/notices", icon: BellRing },
            { name: "Campus Events", href: "/events", icon: Sparkles },
            { name: "Users & Roles", href: "/settings", icon: ShieldCheck },
            { name: "Reports & Audits", href: "/reports", icon: BarChart3 },
            { name: "System Audit Logs", href: "/audit-logs", icon: ScrollText, badge: "Live" },
            { name: "System Settings", href: "/settings", icon: Settings },
          ],
        },
      ];
    }

    // Default: HOD Portal
    return [
      {
        title: "DEPARTMENT CORE",
        items: [
          { name: "HOD Dashboard", href: "/", icon: LayoutDashboard },
          { name: "Faculty Registry", href: "/faculty", icon: Users, badge: "34" },
          { name: "Student Directory", href: "/students", icon: GraduationCap, badge: "748" },
          { name: "Attendance Monitor", href: "/attendance", icon: CalendarCheck, badge: "84.6%" },
          { name: "Timetable Schedule", href: "/timetable", icon: CalendarDays },
          { name: "Subjects & Curriculum", href: "/subjects", icon: BookOpen, badge: "18" },
        ],
      },
      {
        title: "ACADEMICS & EVALUATION",
        items: [
          { name: "Examinations & CIE", href: "/exams", icon: Award },
          { name: "Semester Results", href: "/results", icon: BarChart3 },
          { name: "Assignments Ledger", href: "/assignments", icon: FileText, badge: "3 Active" },
          { name: "Faculty Workload", href: "/workload", icon: Clock },
          { name: "Student Mentoring", href: "/mentoring", icon: UserCheck },
          { name: "Lecture Resources", href: "/notes", icon: FolderDown },
        ],
      },
      {
        title: "LEADERSHIP & OPERATIONS",
        items: [
          { name: "Leave Approvals", href: "/leaves", icon: CalendarOff, badge: "5 Pending" },
          { name: "Department Notices", href: "/notices", icon: BellRing },
          { name: "Department Events", href: "/events", icon: Sparkles },
          { name: "Capstone Projects", href: "/projects", icon: Rocket },
          { name: "Placement Drives", href: "/placements", icon: Briefcase, badge: "₹44 LPA" },
          { name: "NBA / NAAC Reports", href: "/reports", icon: BarChart3 },
          { name: "Audit Trail", href: "/audit-logs", icon: ScrollText },
          { name: "Settings", href: "/settings", icon: Settings },
        ],
      },
    ];
  };

  const navigationSections = getNavigationSections();

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen && setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-white border-r border-slate-200/80 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#005f73] to-[#0a9396] flex items-center justify-center text-white font-bold shadow-md shadow-[#005f73]/20">
              <School className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-base tracking-tight text-slate-950">CSE</span>
                <span className="font-extrabold text-base text-[#00b4d8] tracking-tight">Nexus</span>
                <span className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 ml-1">
                  NIT
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-semibold truncate max-w-[130px]">
                {activePortal ? `${activePortal} Portal` : "Dept. Management"}
              </p>
            </div>
          </Link>
        </div>

        {/* Institution / Semester Pill */}
        <div className="px-4 pt-3 pb-1">
          <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">Odd Sem 2026-27</p>
                <p className="text-[10px] text-slate-400 font-medium truncate">Computer Science & Engg</p>
              </div>
            </div>
            {activePortal && (
              <button
                onClick={exitPortal}
                className="text-[10px] font-bold text-slate-500 hover:text-slate-900 px-2 py-0.5 rounded bg-white border border-slate-200"
                title="Switch Portal"
              >
                Switch
              </button>
            )}
          </div>
        </div>

        {/* Navigation List */}
        <div className="flex-1 px-3 py-3 overflow-y-auto space-y-5">
          {navigationSections.map((section) => (
            <div key={section.title} className="space-y-1">
              <p className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                {section.title}
              </p>
              <nav className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileOpen && setMobileOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2 text-xs font-medium rounded-xl transition-all duration-150 group ${
                        isActive
                          ? "bg-slate-900 text-white font-semibold shadow-sm"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 transition-colors ${
                            isActive ? "text-white" : "text-slate-400 group-hover:text-slate-700"
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* User Card & Logout (Matching bottom of reference image) */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white border border-slate-200/60 shadow-subtle mb-2">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-lg object-cover ring-1 ring-slate-200"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">{currentUser.name}</p>
              <p className="text-[11px] text-slate-400 truncate">{currentUser.role}</p>
            </div>
          </div>
          <Link
            href="/login"
            className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 rounded-xl hover:bg-rose-50 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            <span>Switch / Sign Out</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
