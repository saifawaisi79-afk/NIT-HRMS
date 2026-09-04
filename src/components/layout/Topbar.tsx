"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronDown,
  HelpCircle,
  X,
  Search,
  CheckCheck,
  User,
  LogOut,
  GraduationCap,
  Users,
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
  UserPlus,
  Activity,
  CreditCard,
  ShieldCheck,
  ScrollText,
  Settings,
  MessageSquare,
  Building2,
  UserCheck,
  Clock,
  TrendingUp,
  LayoutDashboard,
  MapPin,
  GanttChartSquare,
  BookMarked,
  ClipboardList,
  BadgeCheck,
  FileBadge,
  FolderOpen,
  Globe,
  Lock,
  DatabaseZap,
  HeartHandshake,
  School,
  Menu,
  Home,
} from "lucide-react";
import { useDepartment, PortalType } from "@/context/DepartmentContext";

/* ─────────────────────────────────────────────
   NAV CONFIG — configuration-driven navigation
   One entry per portal, drives the entire header.
────────────────────────────────────────────── */
interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  key: string;
  label: string;
  items: NavItem[];
  /* hrefs that mark this group as "active" in the topbar */
  activePaths?: string[];
}

type NavConfig = {
  groups: NavGroup[];
  helpItems: NavItem[];
  profileLabel: string;
  profileItems: NavItem[];
};

const NAV_CONFIG: Record<PortalType, NavConfig> = {
  Student: {
    groups: [
      {
        key: "dept",
        label: "CSE Department",
        activePaths: ["/faculty", "/notices"],
        items: [
          { label: "Department Overview", href: "/", icon: LayoutDashboard },
          { label: "Faculty", href: "/faculty", icon: Users },
          { label: "Programs", href: "/subjects", icon: BookOpen },
          { label: "Academic Calendar", href: "/events", icon: CalendarDays },
          { label: "Department Notices", href: "/notices", icon: BellRing },
        ],
      },
      {
        key: "academics",
        label: "Academics",
        activePaths: ["/subjects", "/timetable", "/attendance", "/assignments", "/notes"],
        items: [
          { label: "My Subjects", href: "/subjects", icon: BookOpen },
          { label: "Timetable", href: "/timetable", icon: CalendarDays },
          { label: "Attendance", href: "/attendance", icon: CalendarCheck },
          { label: "Assignments", href: "/assignments", icon: FileText },
          { label: "Study Materials", href: "/notes", icon: FolderDown },
        ],
      },
      {
        key: "learning",
        label: "My Learning",
        activePaths: ["/projects", "/mentoring", "/results"],
        items: [
          { label: "Courses", href: "/subjects", icon: BookMarked },
          { label: "Projects", href: "/projects", icon: Rocket },
          { label: "Mentoring", href: "/mentoring", icon: HeartHandshake },
          { label: "Academic Progress", href: "/results", icon: TrendingUp },
        ],
      },
      {
        key: "exams",
        label: "Examinations",
        activePaths: ["/exams", "/results"],
        items: [
          { label: "Exam Schedule", href: "/exams", icon: CalendarCheck },
          { label: "Results", href: "/results", icon: BarChart3 },
          { label: "Grades", href: "/results", icon: Award },
        ],
      },
      {
        key: "campus",
        label: "Campus",
        activePaths: ["/placements", "/events"],
        items: [
          { label: "Notices", href: "/notices", icon: BellRing },
          { label: "Events", href: "/events", icon: Sparkles },
          { label: "Placements", href: "/placements", icon: Briefcase },
        ],
      },
    ],
    helpItems: [
      { label: "Help Center", href: "/settings", icon: HelpCircle },
      { label: "Contact Department", href: "/notices", icon: MessageSquare },
      { label: "Raise Request", href: "/leaves", icon: ClipboardList },
    ],
    profileLabel: "Student Profile",
    profileItems: [
      { label: "My Profile", href: "/settings", icon: User },
      { label: "Account Settings", href: "/settings", icon: Settings },
    ],
  },

  Faculty: {
    groups: [
      {
        key: "dept",
        label: "CSE Department",
        activePaths: ["/notices"],
        items: [
          { label: "Department Overview", href: "/", icon: LayoutDashboard },
          { label: "Faculty Directory", href: "/faculty", icon: Users },
          { label: "Academic Calendar", href: "/events", icon: CalendarDays },
          { label: "Department Notices", href: "/notices", icon: BellRing },
        ],
      },
      {
        key: "teaching",
        label: "Teaching",
        activePaths: ["/timetable", "/attendance", "/assignments", "/notes"],
        items: [
          { label: "My Classes", href: "/timetable", icon: CalendarDays },
          { label: "Timetable", href: "/timetable", icon: GanttChartSquare },
          { label: "Attendance", href: "/attendance", icon: CalendarCheck },
          { label: "Assignments", href: "/assignments", icon: FileText },
          { label: "Study Materials", href: "/notes", icon: FolderDown },
        ],
      },
      {
        key: "students",
        label: "Students",
        activePaths: ["/students", "/mentoring"],
        items: [
          { label: "Student Directory", href: "/students", icon: GraduationCap },
          { label: "My Mentees", href: "/mentoring", icon: HeartHandshake },
          { label: "Student Performance", href: "/results", icon: TrendingUp },
          { label: "Attendance Overview", href: "/attendance", icon: CalendarCheck },
        ],
      },
      {
        key: "academics",
        label: "Academics",
        activePaths: ["/subjects", "/exams", "/results"],
        items: [
          { label: "Subjects", href: "/subjects", icon: BookOpen },
          { label: "Marks / Gradebook", href: "/exams", icon: Award },
          { label: "Examinations", href: "/exams", icon: FileBadge },
          { label: "Results", href: "/results", icon: BarChart3 },
        ],
      },
      {
        key: "admin",
        label: "Administration",
        activePaths: ["/leaves", "/workload", "/reports"],
        items: [
          { label: "Leave", href: "/leaves", icon: CalendarOff },
          { label: "Workload", href: "/workload", icon: Clock },
          { label: "Notices", href: "/notices", icon: BellRing },
          { label: "Reports", href: "/reports", icon: BarChart3 },
        ],
      },
    ],
    helpItems: [
      { label: "Help Center", href: "/settings", icon: HelpCircle },
      { label: "Contact HOD", href: "/notices", icon: MessageSquare },
      { label: "Raise Request", href: "/leaves", icon: ClipboardList },
    ],
    profileLabel: "Faculty Profile",
    profileItems: [
      { label: "My Profile", href: "/settings", icon: User },
      { label: "Account Settings", href: "/settings", icon: Settings },
    ],
  },

  HOD: {
    groups: [
      {
        key: "dept",
        label: "CSE Department",
        activePaths: ["/notices"],
        items: [
          { label: "Department Overview", href: "/", icon: LayoutDashboard },
          { label: "Academic Calendar", href: "/events", icon: CalendarDays },
          { label: "Department Information", href: "/subjects", icon: BookOpen },
          { label: "Department Notices", href: "/notices", icon: BellRing },
        ],
      },
      {
        key: "academics",
        label: "Academics",
        activePaths: ["/subjects", "/timetable", "/attendance", "/exams", "/results"],
        items: [
          { label: "Subjects", href: "/subjects", icon: BookOpen },
          { label: "Course Allocation", href: "/workload", icon: GanttChartSquare },
          { label: "Timetable", href: "/timetable", icon: CalendarDays },
          { label: "Attendance", href: "/attendance", icon: CalendarCheck },
          { label: "Examinations", href: "/exams", icon: Award },
          { label: "Results", href: "/results", icon: BarChart3 },
        ],
      },
      {
        key: "faculty",
        label: "Faculty",
        activePaths: ["/faculty", "/workload", "/leaves"],
        items: [
          { label: "Faculty Directory", href: "/faculty", icon: Users },
          { label: "Faculty Workload", href: "/workload", icon: Clock },
          { label: "Faculty Attendance", href: "/attendance", icon: CalendarCheck },
          { label: "Leave Approvals", href: "/leaves", icon: CalendarOff },
        ],
      },
      {
        key: "students",
        label: "Students",
        activePaths: ["/students", "/mentoring", "/projects"],
        items: [
          { label: "Student Directory", href: "/students", icon: GraduationCap },
          { label: "Attendance", href: "/attendance", icon: CalendarCheck },
          { label: "Student Performance", href: "/results", icon: TrendingUp },
          { label: "At-Risk Students", href: "/mentoring", icon: Activity },
          { label: "Projects", href: "/projects", icon: Rocket },
        ],
      },
      {
        key: "department",
        label: "Department",
        activePaths: ["/events", "/placements"],
        items: [
          { label: "Notices", href: "/notices", icon: BellRing },
          { label: "Events", href: "/events", icon: Sparkles },
          { label: "Projects", href: "/projects", icon: Rocket },
          { label: "Placements", href: "/placements", icon: Briefcase },
          { label: "Academic Calendar", href: "/events", icon: CalendarDays },
        ],
      },
      {
        key: "reports",
        label: "Reports",
        activePaths: ["/reports", "/audit-logs"],
        items: [
          { label: "Attendance Reports", href: "/reports", icon: CalendarCheck },
          { label: "Result Analysis", href: "/reports", icon: BarChart3 },
          { label: "Faculty Workload", href: "/workload", icon: Clock },
          { label: "Placement Reports", href: "/reports", icon: Briefcase },
          { label: "Department Reports", href: "/reports", icon: FolderOpen },
        ],
      },
    ],
    helpItems: [
      { label: "Help Center", href: "/settings", icon: HelpCircle },
      { label: "System Support", href: "/settings", icon: MessageSquare },
      { label: "Raise Request", href: "/leaves", icon: ClipboardList },
    ],
    profileLabel: "HOD Profile",
    profileItems: [
      { label: "My Profile", href: "/settings", icon: User },
      { label: "Department Settings", href: "/settings", icon: Building2 },
      { label: "Account Settings", href: "/settings", icon: Settings },
    ],
  },

  Administration: {
    groups: [
      {
        key: "college",
        label: "College Administration",
        activePaths: ["/reports"],
        items: [
          { label: "College Overview", href: "/", icon: LayoutDashboard },
          { label: "Departments", href: "/reports", icon: Building2 },
          { label: "Programs", href: "/subjects", icon: BookOpen },
          { label: "Academic Calendar", href: "/events", icon: CalendarDays },
          { label: "Notices", href: "/notices", icon: BellRing },
        ],
      },
      {
        key: "academics",
        label: "Academics",
        activePaths: ["/subjects", "/exams"],
        items: [
          { label: "Departments", href: "/reports", icon: Building2 },
          { label: "Programs", href: "/subjects", icon: GraduationCap },
          { label: "Academic Years", href: "/events", icon: CalendarDays },
          { label: "Semesters", href: "/timetable", icon: GanttChartSquare },
          { label: "Subjects", href: "/subjects", icon: BookOpen },
          { label: "Examinations", href: "/exams", icon: Award },
        ],
      },
      {
        key: "people",
        label: "People",
        activePaths: ["/students", "/faculty"],
        items: [
          { label: "Students", href: "/students", icon: GraduationCap },
          { label: "Faculty", href: "/faculty", icon: Users },
          { label: "Users & Roles", href: "/settings", icon: ShieldCheck },
        ],
      },
      {
        key: "operations",
        label: "Operations",
        activePaths: ["/admissions", "/fees", "/documents", "/leaves", "/events"],
        items: [
          { label: "Admissions", href: "/admissions", icon: UserPlus },
          { label: "Fees", href: "/fees", icon: CreditCard },
          { label: "Documents", href: "/documents", icon: FolderDown },
          { label: "Notices", href: "/notices", icon: BellRing },
          { label: "Events", href: "/events", icon: Sparkles },
          { label: "Requests", href: "/leaves", icon: ClipboardList },
        ],
      },
      {
        key: "reports",
        label: "Reports",
        activePaths: ["/reports"],
        items: [
          { label: "Student Reports", href: "/reports", icon: GraduationCap },
          { label: "Faculty Reports", href: "/reports", icon: Users },
          { label: "Attendance Reports", href: "/reports", icon: CalendarCheck },
          { label: "Results Reports", href: "/reports", icon: BarChart3 },
          { label: "Fees Reports", href: "/fees", icon: CreditCard },
          { label: "Placement Reports", href: "/placements", icon: Briefcase },
        ],
      },
      {
        key: "system",
        label: "System",
        activePaths: ["/audit-logs", "/settings"],
        items: [
          { label: "Permissions", href: "/settings", icon: Lock },
          { label: "Audit Logs", href: "/audit-logs", icon: ScrollText },
          { label: "System Settings", href: "/settings", icon: Settings },
        ],
      },
    ],
    helpItems: [
      { label: "Help Center", href: "/settings", icon: HelpCircle },
      { label: "Technical Support", href: "/settings", icon: MessageSquare },
      { label: "Security", href: "/settings", icon: ShieldCheck },
    ],
    profileLabel: "Administrator Profile",
    profileItems: [
      { label: "My Profile", href: "/settings", icon: User },
      { label: "Account Settings", href: "/settings", icon: Settings },
      { label: "Security", href: "/settings", icon: Lock },
    ],
  },

  // IT portal shares Administration nav for now (IT Dev is infra-focused)
  IT: {
    groups: [
      {
        key: "system",
        label: "System",
        activePaths: ["/audit-logs", "/settings"],
        items: [
          { label: "IT Dashboard", href: "/", icon: LayoutDashboard },
          { label: "Permissions", href: "/settings", icon: Lock },
          { label: "Audit Logs", href: "/audit-logs", icon: ScrollText },
          { label: "System Settings", href: "/settings", icon: Settings },
        ],
      },
      {
        key: "operations",
        label: "Operations",
        activePaths: ["/students", "/faculty", "/fees"],
        items: [
          { label: "Students", href: "/students", icon: GraduationCap },
          { label: "Faculty", href: "/faculty", icon: Users },
          { label: "Fees", href: "/fees", icon: CreditCard },
          { label: "Documents", href: "/documents", icon: FolderDown },
        ],
      },
      {
        key: "reports",
        label: "Reports",
        activePaths: ["/reports"],
        items: [
          { label: "System Reports", href: "/reports", icon: BarChart3 },
          { label: "Audit Trail", href: "/audit-logs", icon: ScrollText },
        ],
      },
    ],
    helpItems: [
      { label: "Documentation", href: "/settings", icon: FolderOpen },
      { label: "System Support", href: "/settings", icon: HelpCircle },
    ],
    profileLabel: "IT Dev Profile",
    profileItems: [
      { label: "My Profile", href: "/settings", icon: User },
      { label: "Account Settings", href: "/settings", icon: Settings },
    ],
  },
};

/* ─────────────────────────────────────────────
   MAIN TOPBAR COMPONENT
────────────────────────────────────────────── */
export default function Topbar({ onOpenMobileMenu }: { onOpenMobileMenu?: () => void }) {
  const pathname = usePathname();
  const {
    activePortal,
    exitPortal,
    currentRole,
    currentUser,
    notifications,
    markNotificationsAsRead,
    showToast,
    setIsSearchOpen,
  } = useDepartment();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "Saif Awaisi", text: "Dr. Ramesh, the server deployment for the CSE department portal is complete and live.", time: "10:14 AM" },
    { sender: "You", text: "Excellent work Saif. Let's make sure the attendance and marks modules are verified.", time: "10:16 AM" },
  ]);

  const navRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  // Get the nav config for the active portal
  const portal = activePortal ?? "HOD";
  const config = NAV_CONFIG[portal];
  const { groups, helpItems, profileLabel, profileItems } = config;

  // Helper: is any path in the group currently active?
  const isGroupActive = (group: NavGroup): boolean => {
    if (!group.activePaths) return false;
    return group.activePaths.some(
      (p) => pathname === p || (p !== "/" && pathname.startsWith(p))
    );
  };

  // Helper: is a specific href active?
  const isPathActive = (href: string): boolean =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  // Close all menus on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ESC closes all dropdowns
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setShowProfileMenu(false);
        setShowNotifications(false);
        setShowMobileNav(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatHistory([...chatHistory, { sender: "You", text: chatMessage, time: "Just now" }]);
    setChatMessage("");
    showToast("Message Sent", "Message dispatched.");
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Initials for avatar
  const initials =
    currentRole === "HOD" ? "RK"
    : currentRole === "Faculty" ? "PS"
    : currentRole === "Student" ? "AS"
    : "MM";

  const [showLogoMenu, setShowLogoMenu] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200/70 px-4 lg:px-8 py-2.5 transition-all shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">

          {/* ── LEFT: Brand Logo ── */}
          <div className="flex items-center gap-3 shrink-0 relative">
            <button
              onClick={() => setShowLogoMenu(!showLogoMenu)}
              className="flex items-center gap-2.5 group"
              title="CSE Nexus — NIT"
            >
              {/* NIT CSE logo tile */}
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#005f73] to-[#0a9396] flex flex-col items-center justify-center shadow-md shadow-[#005f73]/20 shrink-0">
                <span className="text-[8px] font-black text-white leading-none tracking-wider">NIT</span>
                <span className="text-[8px] font-black text-white/80 leading-none tracking-wider">CSE</span>
              </div>
              {/* Word mark */}
              <div className="flex items-baseline gap-1">
                <span className="text-xl lg:text-2xl font-black tracking-tight text-slate-950 font-sans">CSE</span>
                <span className="text-xl lg:text-2xl font-black text-[#00b4d8] tracking-tight">Nexus</span>
              </div>
            </button>

            {/* Logo click dropdown — only back to portals + sign out */}
            {showLogoMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowLogoMenu(false)} />
                <div className="absolute left-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 px-2 z-50 animate-fade-in">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-[11px] font-extrabold text-slate-900">CSE Nexus</p>
                    <p className="text-[10px] text-slate-400">NIT — Computer Science & Engg.</p>
                  </div>
                  <button
                    onClick={() => { exitPortal(); setShowLogoMenu(false); }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition"
                  >
                    <Home className="w-4 h-4 text-slate-400" />
                    <span>Back to Portal Selection</span>
                  </button>
                  <Link
                    href="/login"
                    onClick={() => setShowLogoMenu(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium text-rose-600 hover:bg-rose-50 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* ── CENTER: Portal Navigation (desktop) ── */}
          <nav ref={navRef} className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-sm font-medium flex-1 justify-center">
            {groups.map((group) => {
              const isActive = isGroupActive(group);
              const isOpen = activeDropdown === group.key;
              return (
                <div key={group.key} className="relative">
                  <button
                    onClick={() => setActiveDropdown(isOpen ? null : group.key)}
                    className={`flex items-center gap-1.5 px-3.5 xl:px-4 py-2 rounded-full font-semibold text-xs transition-all whitespace-nowrap ${
                      isActive
                        ? "bg-[#005f73] text-white shadow-sm ring-2 ring-[#005f73]/20"
                        : isOpen
                        ? "bg-slate-100 text-slate-950 font-bold"
                        : "text-slate-700 hover:text-slate-950 hover:bg-slate-50"
                    }`}
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""} ${isActive ? "opacity-90" : "text-slate-400"}`}
                    />
                  </button>

                  {/* Dropdown */}
                  {isOpen && (
                    <div className="absolute left-0 top-full mt-2 w-60 bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-slate-100/90 py-2 px-2 z-50 animate-fade-in">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const active = isPathActive(item.href);
                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-colors group ${
                              active
                                ? "bg-slate-100 text-slate-950 font-semibold"
                                : "text-slate-700 hover:text-slate-950 hover:bg-slate-50"
                            }`}
                          >
                            <Icon
                              className={`w-4 h-4 shrink-0 transition-colors stroke-[1.75] ${
                                active ? "text-[#005f73]" : "text-slate-400 group-hover:text-slate-700"
                              }`}
                            />
                            <span>{item.label}</span>
                            {active && (
                              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#005f73]" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Help & Support — static link with dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === "help" ? null : "help")}
                className={`flex items-center gap-1.5 px-3.5 xl:px-4 py-2 rounded-full font-semibold text-xs transition-all ${
                  activeDropdown === "help"
                    ? "bg-slate-100 text-slate-950 font-bold"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-50"
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                <span>Help & Support</span>
              </button>

              {activeDropdown === "help" && (
                <div className="absolute left-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-slate-100/90 py-2 px-2 z-50 animate-fade-in">
                  {helpItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors group"
                      >
                        <Icon className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors stroke-[1.75]" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* ── RIGHT: Actions ── */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Global Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200/80 bg-slate-50/80 hover:bg-slate-100/80 text-slate-500 hover:text-slate-900 transition text-xs font-medium shadow-2xs"
              title="Search records (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search...</span>
              <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-white border border-slate-200 text-slate-400 font-mono shadow-2xs">⌘K</kbd>
            </button>

            {/* Messages */}
            <button
              onClick={() => setShowChatModal(true)}
              className="relative w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition shadow-xs"
              title="Team Messenger"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center ring-2 ring-white">
                2
              </span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className="relative w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition shadow-xs"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <div className="absolute right-0 mt-2 w-80 p-3 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 animate-fade-in text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                      <span className="font-bold text-slate-800">Notifications</span>
                      <button
                        onClick={markNotificationsAsRead}
                        className="text-[11px] text-[#005f73] font-semibold hover:underline flex items-center gap-1"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        Mark read
                      </button>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                          <p className="font-bold text-slate-800">{n.title}</p>
                          <p className="text-[11px] text-slate-500">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile Avatar + Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 px-2 py-1 rounded-full border border-slate-200 hover:bg-slate-50 transition shadow-xs group"
                title={profileLabel}
              >
                <span className="w-7 h-7 rounded-full bg-slate-950 text-white font-extrabold text-xs flex items-center justify-center">
                  {initials}
                </span>
                <span className="hidden xl:block text-xs font-bold text-slate-700 group-hover:text-slate-950 max-w-[110px] truncate">
                  {currentUser.name.split(" ").slice(0, 2).join(" ")}
                </span>
                <ChevronDown className={`hidden xl:block w-3 h-3 text-slate-400 transition-transform duration-200 ${showProfileMenu ? "rotate-180" : ""}`} />
              </button>

              {showProfileMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
                  <div className="absolute right-0 mt-2 w-64 p-2 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 animate-fade-in text-xs">
                    {/* Profile Header */}
                    <div className="p-3 border-b border-slate-100 mb-1 flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-slate-950 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                        {initials}
                      </span>
                      <div className="min-w-0">
                        <p className="font-extrabold text-slate-900 truncate">{currentUser.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{currentUser.designation}</p>
                        <span className="inline-block mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                          {portal === "IT" ? "IT Dev Portal" : `${portal} Portal`}
                        </span>
                      </div>
                    </div>

                    {/* Profile Navigation Items */}
                    <div className="space-y-0.5 mb-1">
                      {profileItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setShowProfileMenu(false)}
                            className="flex items-center gap-2.5 p-2.5 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-slate-950 font-medium transition"
                          >
                            <Icon className="w-4 h-4 text-slate-400" />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Switch Portal */}
                    <div className="pt-1 border-t border-slate-100 space-y-0.5">
                      <button
                        onClick={() => { exitPortal(); setShowProfileMenu(false); }}
                        className="w-full flex items-center gap-2.5 p-2.5 rounded-xl text-slate-600 hover:bg-slate-50 font-medium transition"
                      >
                        <Home className="w-4 h-4 text-slate-400" />
                        <span>Switch Portal</span>
                      </button>
                      <Link
                        href="/login"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-2.5 p-2.5 rounded-xl text-rose-600 hover:bg-rose-50 font-semibold transition"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setShowMobileNav(!showMobileNav)}
              className="lg:hidden w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition"
              title="Menu"
            >
              {showMobileNav ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* ── MOBILE NAV DRAWER ── */}
        {showMobileNav && (
          <>
            <div className="fixed inset-0 z-30 bg-slate-900/30 backdrop-blur-sm lg:hidden" onClick={() => setShowMobileNav(false)} />
            <div
              ref={mobileNavRef}
              className="absolute top-full left-0 right-0 z-40 bg-white border-b border-slate-200 shadow-xl lg:hidden animate-fade-in max-h-[80vh] overflow-y-auto"
            >
              <div className="p-4 space-y-1">
                {/* Portal badge */}
                {activePortal && (
                  <div className="flex items-center justify-between mb-3 px-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-slate-900 text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {activePortal} Portal
                    </span>
                    <button
                      onClick={() => { exitPortal(); setShowMobileNav(false); }}
                      className="text-[11px] px-3 py-1 rounded-full border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition"
                    >
                      Switch Portal
                    </button>
                  </div>
                )}

                {/* Nav groups collapsed */}
                {groups.map((group) => (
                  <div key={group.key} className="rounded-xl overflow-hidden border border-slate-100">
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === group.key ? null : group.key)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold transition ${
                        isGroupActive(group) ? "bg-[#005f73] text-white" : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span>{group.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === group.key ? "rotate-180" : ""} ${isGroupActive(group) ? "text-white/70" : "text-slate-400"}`}
                      />
                    </button>
                    {activeDropdown === group.key && (
                      <div className="bg-white border-t border-slate-100 py-1 px-1">
                        {group.items.map((item) => {
                          const Icon = item.icon;
                          const active = isPathActive(item.href);
                          return (
                            <Link
                              key={item.label}
                              href={item.href}
                              onClick={() => { setActiveDropdown(null); setShowMobileNav(false); }}
                              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                                active ? "text-[#005f73] font-semibold bg-slate-50" : "text-slate-700 hover:bg-slate-50"
                              }`}
                            >
                              <Icon className={`w-4 h-4 shrink-0 stroke-[1.75] ${active ? "text-[#005f73]" : "text-slate-400"}`} />
                              <span>{item.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}

                {/* Help */}
                <div className="pt-2 border-t border-slate-100">
                  {helpItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setShowMobileNav(false)}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
                      >
                        <Icon className="w-4 h-4 text-slate-400 stroke-[1.75]" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      {/* ── LIVE MESSENGER MODAL ── */}
      {showChatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setShowChatModal(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col h-[520px]">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#005f73] flex items-center justify-center font-bold text-xs">SA</div>
                <div>
                  <h3 className="font-bold text-sm">Saif Awaisi</h3>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online • Developer & System Architect
                  </p>
                </div>
              </div>
              <button onClick={() => setShowChatModal(false)} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.sender === "You" ? "items-end" : "items-start"}`}>
                  <div className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    msg.sender === "You"
                      ? "bg-[#005f73] text-white rounded-br-none"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs"
                  }`}>
                    <p>{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Message Saif Awaisi..."
                className="flex-1 px-4 py-2 text-xs bg-slate-100 rounded-full outline-none focus:ring-2 focus:ring-[#005f73]/20"
              />
              <button type="submit" className="px-4 py-2 bg-[#005f73] hover:bg-[#004e5f] text-white text-xs font-bold rounded-full transition shadow-sm">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
