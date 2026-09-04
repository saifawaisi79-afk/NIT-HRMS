"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings,
  MessageSquare,
  Bell,
  ChevronDown,
  HelpCircle,
  Menu,
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
  TrendingUp,
  ClipboardList,
  Activity,
  Star,
  Video,
  CreditCard,
  FileCheck,
  ShieldCheck,
  Headphones,
} from "lucide-react";
import { useDepartment, UserRole } from "@/context/DepartmentContext";

export default function Topbar({ onOpenMobileMenu }: { onOpenMobileMenu?: () => void }) {
  const pathname = usePathname();
  const {
    activePortal,
    selectPortal,
    exitPortal,
    currentRole,
    setCurrentRole,
    currentUser,
    notifications,
    markNotificationsAsRead,
    showToast,
    setIsSearchOpen,
  } = useDepartment();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chattingWith, setChattingWith] = useState<string>("Saif Awaisi");
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "Saif Awaisi", text: "Dr. Ramesh, the server deployment for the CSE department portal is complete and live.", time: "10:14 AM" },
    { sender: "You", text: "Excellent work Saif. Let's make sure the attendance and marks modules are verified.", time: "10:16 AM" },
  ]);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const roles: { role: UserRole; label: string; desc: string; initials: string }[] = [
    { role: "HOD", label: "Dr. Ramesh Kumar (HOD)", desc: "Department Executive Access", initials: "RK" },
    { role: "Faculty", label: "Dr. Priya Sharma (Faculty)", desc: "Attendance & Gradebook", initials: "PS" },
    { role: "Student", label: "Aarav Sharma (Student)", desc: "Student Portal & Notes", initials: "AS" },
    { role: "Super Admin", label: "NIT Admin (Management)", desc: "System Configuration", initials: "MM" },
  ];

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatHistory([...chatHistory, { sender: "You", text: chatMessage, time: "Just now" }]);
    setChatMessage("");
    showToast("Message Sent", `Dispatched to ${chattingWith}.`);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200/70 px-4 lg:px-8 py-2.5 transition-all shadow-[0_2px_15px_rgba(0,0,0,0.03)]">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        {/* Left: Brand Logo (CSE Nexus) & Portal Indicator */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 group">
            <span className="text-xl lg:text-2xl font-black tracking-tight text-slate-950 font-sans">
              CSE
            </span>
            <span className="text-xl lg:text-2xl font-black text-[#00b4d8] tracking-tight">
              Nexus
            </span>
            <span className="hidden sm:inline-block ml-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
              Department of CSE
            </span>
          </Link>

          {/* Active Portal Indicator & Quick Switcher */}
          {activePortal ? (
            <div className="hidden xl:flex items-center gap-2 pl-3 border-l border-slate-200">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-slate-900 text-white shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {activePortal === "Student"
                  ? "Student Portal"
                  : activePortal === "Faculty"
                  ? "Faculty Portal"
                  : activePortal === "HOD"
                  ? "HOD Portal"
                  : activePortal === "IT"
                  ? "IT Dev Portal"
                  : "Administration Portal"}
              </span>
              <button
                onClick={exitPortal}
                className="text-[11px] px-2.5 py-1 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-600 font-bold transition shadow-2xs"
                title="Switch to another portal"
              >
                Switch Portal
              </button>
            </div>
          ) : (
            <span className="hidden xl:inline-block pl-3 border-l border-slate-200 text-xs font-bold text-slate-400">
              Portal Selector
            </span>
          )}
        </div>

        {/* Center: Navigation Bar with Pills and Dropdowns matching screenshot layout */}
        <nav ref={navRef} className="hidden md:flex items-center gap-2 lg:gap-3 text-sm font-medium">
          {/* Academic Core Dropdown (Active dark teal pill as in screenshot) */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === "main" ? null : "main")}
              className={`flex items-center gap-1.5 px-5 py-2 rounded-full font-bold text-xs transition-all ${
                activeDropdown === "main" || pathname === "/" || pathname === "/attendance" || pathname === "/timetable"
                  ? "bg-[#005f73] text-white shadow-sm ring-2 ring-[#005f73]/20"
                  : "bg-[#005f73] text-white hover:bg-[#004e5f] shadow-sm"
              }`}
            >
              <span>Academic Core</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 opacity-90 ${activeDropdown === "main" ? "rotate-180" : ""}`} />
            </button>

            {/* Floating Dropdown Menu matching reference layout */}
            {activeDropdown === "main" && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-slate-100/90 py-3 px-2 z-50 animate-fade-in text-xs space-y-0.5">
                {[
                  { label: "Dashboard Overview", href: "/", icon: BarChart3 },
                  { label: "Attendance Register", href: "/attendance", icon: CalendarCheck },
                  { label: "Timetable & Schedule", href: "/timetable", icon: CalendarDays },
                  { label: "Curriculum & Courses", href: "/subjects", icon: BookOpen },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[13px] font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors group"
                    >
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors stroke-[1.75]" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Faculty & Students Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === "campaign" ? null : "campaign")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-xs text-slate-700 hover:text-slate-950 transition-colors ${
                activeDropdown === "campaign" || pathname === "/faculty" || pathname === "/students" || pathname === "/placements"
                  ? "bg-slate-100 font-bold text-slate-950"
                  : "hover:bg-slate-50"
              }`}
            >
              <span>Faculty & Students</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 ${activeDropdown === "campaign" ? "rotate-180" : ""}`} />
            </button>

            {activeDropdown === "campaign" && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-slate-100/90 py-3 px-2 z-50 animate-fade-in text-xs space-y-0.5">
                {[
                  { label: "Faculty & Staff Registry", href: "/faculty", icon: Users },
                  { label: "Student Directory", href: "/students", icon: GraduationCap },
                  { label: "Campus Placement Drives", href: "/placements", icon: Briefcase },
                  { label: "Mentoring & Guidance", href: "/mentoring", icon: Activity },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[13px] font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors group"
                    >
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors stroke-[1.75]" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Academic Operations Dropdown */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === "billing" ? null : "billing")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-xs text-slate-700 hover:text-slate-950 transition-colors ${
                activeDropdown === "billing" || pathname === "/leaves" || pathname === "/exams" || pathname === "/assignments" || pathname === "/reports" || pathname === "/fees"
                  ? "bg-slate-100 font-bold text-slate-950"
                  : "hover:bg-slate-50"
              }`}
            >
              <span>Academic Operations</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-400 ${activeDropdown === "billing" ? "rotate-180" : ""}`} />
            </button>

            {activeDropdown === "billing" && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-slate-100/90 py-3 px-2 z-50 animate-fade-in text-xs space-y-0.5">
                {[
                  { label: "Faculty & Student Leaves", href: "/leaves", icon: CalendarOff },
                  { label: "Examinations & CIE", href: "/exams", icon: Award },
                  { label: "Coursework & Assignments", href: "/assignments", icon: FileText },
                  { label: "Accreditation Reports", href: "/reports", icon: BarChart3 },
                  { label: "Fee & Dues Management", href: "/fees", icon: CreditCard },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-[13px] font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-50 transition-colors group"
                    >
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors stroke-[1.75]" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Campus IT Support pill matching layout */}
          <Link
            href="/settings"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-xs text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Campus IT Support</span>
          </Link>
        </nav>

        {/* Right Action Icons matching screenshot */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Command / Global Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200/80 bg-slate-50/80 hover:bg-slate-100/80 text-slate-500 hover:text-slate-900 transition text-xs font-medium shadow-2xs"
            title="Search records (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search...</span>
            <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-white border border-slate-200 text-slate-400 font-mono shadow-2xs">⌘K</kbd>
          </button>

          {/* Settings Button */}
          <Link
            href="/settings"
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition shadow-xs"
            title="System Settings"
          >
            <Settings className="w-4 h-4" />
          </Link>

          {/* Messages Button with Red Badge '2' */}
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

          {/* Notifications Button with Red Badge '4' */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition shadow-xs"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center ring-2 ring-white">
                4
              </span>
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

          {/* User Profile Avatar with Initials (e.g. MM / RK) matching screenshot */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="w-10 h-10 rounded-full bg-slate-950 text-white font-extrabold text-xs flex items-center justify-center ring-2 ring-slate-200 hover:opacity-90 transition shadow-xs"
              title="User Persona Switcher"
            >
              {currentRole === "HOD" ? "RK" : currentRole === "Faculty" ? "PS" : currentRole === "Student" ? "AS" : "MM"}
            </button>

            {showRoleMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowRoleMenu(false)} />
                <div className="absolute right-0 mt-2 w-72 p-2 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 animate-fade-in text-xs">
                  <div className="p-3 border-b border-slate-100 mb-1">
                    <p className="font-extrabold text-slate-900">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-400">{currentUser.role}</p>
                    <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                      Active: {currentRole}
                    </span>
                  </div>

                  <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Switch Persona
                  </p>
                  <div className="space-y-1">
                    {roles.map((r) => (
                      <button
                        key={r.role}
                        onClick={() => {
                          setCurrentRole(r.role);
                          setShowRoleMenu(false);
                          showToast("Switched Persona", `Active profile updated to ${r.role}.`);
                        }}
                        className={`w-full text-left p-2 rounded-xl transition flex items-center justify-between ${
                          currentRole === r.role ? "bg-slate-100 font-bold" : "hover:bg-slate-50"
                        }`}
                      >
                        <div>
                          <p className="text-slate-800">{r.label}</p>
                          <p className="text-[10px] text-slate-400">{r.desc}</p>
                        </div>
                        <span className="w-6 h-6 rounded-full bg-slate-200 font-bold text-[10px] flex items-center justify-center text-slate-700">
                          {r.initials}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 mt-1">
                    <Link
                      href="/login"
                      onClick={() => setShowRoleMenu(false)}
                      className="flex items-center gap-2 p-2 rounded-xl text-rose-600 hover:bg-rose-50 font-semibold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out / Switch Account</span>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Live Messenger Modal Drawer */}
      {showChatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setShowChatModal(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 flex flex-col h-[520px]">
            {/* Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#005f73] flex items-center justify-center font-bold text-xs">
                  SA
                </div>
                <div>
                  <h3 className="font-bold text-sm">{chattingWith}</h3>
                  <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online • Developer & System Architect
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowChatModal(false)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
              {chatHistory.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === "You" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                      msg.sender === "You"
                        ? "bg-[#005f73] text-white rounded-br-none"
                        : "bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs"
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder={`Message ${chattingWith}...`}
                className="flex-1 px-4 py-2 text-xs bg-slate-100 rounded-full outline-none focus:ring-2 focus:ring-[#005f73]/20"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#005f73] hover:bg-[#004e5f] text-white text-xs font-bold rounded-full transition shadow-sm"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
