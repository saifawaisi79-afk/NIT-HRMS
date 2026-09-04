"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Server,
  Shield,
  Activity,
  Database,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Cpu,
  HardDrive,
  Wifi,
  Lock,
  Terminal,
  GitBranch,
  Bug,
  BarChart3,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Eye,
  Zap,
  Globe,
  Settings,
  ChevronRight,
  Code2,
  MonitorCheck,
  Layers,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";

const services = [
  { name: "CSE Nexus Web App", status: "Operational", uptime: "99.98%", latency: "38ms", env: "Production" },
  { name: "Student Portal API", status: "Operational", uptime: "99.95%", latency: "52ms", env: "Production" },
  { name: "Attendance Service", status: "Operational", uptime: "99.91%", latency: "21ms", env: "Production" },
  { name: "Fee Payment Gateway", status: "Degraded", uptime: "98.20%", latency: "312ms", env: "Production" },
  { name: "Timetable Engine", status: "Operational", uptime: "100%", latency: "14ms", env: "Production" },
  { name: "Document Storage (S3)", status: "Operational", uptime: "99.99%", latency: "88ms", env: "Production" },
  { name: "SMS / Email Notifier", status: "Maintenance", uptime: "—", latency: "—", env: "Maintenance" },
  { name: "Analytics Dashboard", status: "Operational", uptime: "99.80%", latency: "64ms", env: "Production" },
];

const recentDeployments = [
  { id: "dep-001", service: "CSE Nexus Web App", version: "v3.4.2", by: "Saif Awaisi", time: "Today, 08:15 AM", status: "Success", env: "Production" },
  { id: "dep-002", service: "Student Portal API", version: "v2.1.8", by: "Preethi V.", time: "Yesterday, 06:45 PM", status: "Success", env: "Production" },
  { id: "dep-003", service: "Fee Payment Gateway", version: "v1.9.1", by: "Arjun Dev", time: "Yesterday, 02:30 PM", status: "Failed", env: "Production" },
  { id: "dep-004", service: "Attendance Service", version: "v4.0.0", by: "Saif Awaisi", time: "Sep 3, 11:00 AM", status: "Success", env: "Staging" },
  { id: "dep-005", service: "Analytics Dashboard", version: "v2.3.1", by: "Nisha R.", time: "Sep 2, 04:20 PM", status: "Success", env: "Production" },
];

const openIncidents = [
  { id: "INC-2041", title: "Fee Gateway High Latency (>300ms)", severity: "High", service: "Fee Payment Gateway", opened: "3h ago", assignee: "Arjun Dev" },
  { id: "INC-2038", title: "SMS OTP delivery delays (Airtel route)", severity: "Medium", service: "SMS / Email Notifier", opened: "1d ago", assignee: "Nisha R." },
  { id: "INC-2035", title: "Document upload timeout for files >50MB", severity: "Low", service: "Document Storage (S3)", opened: "2d ago", assignee: "Preethi V." },
];

const securityEvents = [
  { time: "08:42 AM", event: "Failed SSH login attempt", ip: "203.88.12.44", severity: "High", resolved: false },
  { time: "07:15 AM", event: "SSL certificate auto-renewed", ip: "—", severity: "Info", resolved: true },
  { time: "Yesterday", event: "Port scan detected from external IP", ip: "45.156.20.11", severity: "Medium", resolved: true },
  { time: "Sep 3", event: "Admin password policy enforced", ip: "Internal", severity: "Info", resolved: true },
];

const systemMetrics = [
  { label: "CPU Usage", value: 42, unit: "%", color: "emerald", icon: Cpu },
  { label: "RAM Usage", value: 67, unit: "%", color: "indigo", icon: HardDrive },
  { label: "Disk Usage", value: 54, unit: "%", color: "amber", icon: Database },
  { label: "Network I/O", value: 89, unit: "Mbps", color: "blue", icon: Wifi },
];

export default function ITDashboard() {
  const { auditLogs, department, studentList, facultyList } = useDepartment();
  const [selectedTab, setSelectedTab] = useState<"services" | "deployments">("services");

  const operationalCount = services.filter((s) => s.status === "Operational").length;
  const degradedCount = services.filter((s) => s.status === "Degraded").length;
  const maintenanceCount = services.filter((s) => s.status === "Maintenance").length;
  const totalUsers = studentList.length + facultyList.length;

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* IT Dev Header */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-violet-100 border border-violet-200 flex items-center justify-center">
              <Terminal className="w-4 h-4 text-violet-700" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              IT Dev Portal
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-violet-50 text-violet-700 border border-violet-200">
              Infrastructure Command
            </span>
          </div>
          <p className="text-xs font-bold text-slate-700 mt-1">
            CSE Nexus Platform Engineering • Academic System Operations
          </p>
          <p className="text-xs text-slate-500 font-medium">
            Saif Awaisi • Lead Developer & System Architect • IT Operations Team
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/audit-logs"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Audit Logs</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-violet-700 hover:bg-violet-800 text-white text-xs font-bold transition shadow-sm"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>System Config</span>
          </Link>
        </div>
      </div>

      {/* Service Health Summary */}
      <div className="p-4 sm:p-5 rounded-2xl flex flex-wrap items-center gap-4 bg-white border border-slate-200/80 shadow-xs">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Platform Health</span>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-bold text-emerald-700">{operationalCount} Operational</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-xs font-bold text-amber-700">{degradedCount} Degraded</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-400" />
          <span className="text-xs font-bold text-slate-600">{maintenanceCount} Maintenance</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
          <RefreshCw className="w-3 h-3" />
          Last checked: Just now
        </div>
      </div>

      {/* 8 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">SERVICES</span>
          <p className="text-xl font-black text-slate-950 mt-1">{services.length}</p>
          <span className="text-[10px] text-emerald-600 font-bold">{operationalCount} Online</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">OPEN INCIDENTS</span>
          <p className="text-xl font-black text-rose-600 mt-1">{openIncidents.length}</p>
          <span className="text-[10px] text-rose-600 font-bold">Needs Action</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">DEPLOYMENTS</span>
          <p className="text-xl font-black text-slate-950 mt-1">{recentDeployments.length}</p>
          <span className="text-[10px] text-indigo-600 font-bold">Last 7 Days</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">SYSTEM UPTIME</span>
          <p className="text-xl font-black text-emerald-700 mt-1">99.8%</p>
          <span className="text-[10px] text-emerald-600 font-bold">SLA: 99.5%</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">ACTIVE USERS</span>
          <p className="text-xl font-black text-slate-950 mt-1">{totalUsers}</p>
          <span className="text-[10px] text-slate-500 font-bold">Students + Faculty</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">SECURITY ALERTS</span>
          <p className="text-xl font-black text-amber-600 mt-1">2</p>
          <span className="text-[10px] text-amber-600 font-bold">Unresolved</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">AUDIT LOGS</span>
          <p className="text-xl font-black text-slate-950 mt-1">{auditLogs.length}</p>
          <span className="text-[10px] text-violet-600 font-bold">Today's Actions</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">AVG LATENCY</span>
          <p className="text-xl font-black text-slate-950 mt-1">46ms</p>
          <span className="text-[10px] text-emerald-600 font-bold">↓ 12ms vs Prev</span>
        </div>
      </div>

      {/* Main Grid: System Metrics + Incidents */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: System Resource Metrics */}
        <div className="lg:col-span-5 p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-5">
          <div>
            <h2 className="text-lg font-black text-slate-950 tracking-tight">System Resource Monitor</h2>
            <p className="text-xs text-slate-400 font-medium">Live infrastructure utilization metrics</p>
          </div>

          <div className="space-y-5">
            {systemMetrics.map((m) => {
              const Icon = m.icon;
              const colorMap: Record<string, { bar: string; text: string; bg: string }> = {
                emerald: { bar: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
                indigo: { bar: "bg-indigo-500", text: "text-indigo-700", bg: "bg-indigo-50" },
                amber: { bar: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50" },
                blue: { bar: "bg-blue-500", text: "text-blue-700", bg: "bg-blue-50" },
              };
              const c = colorMap[m.color] || colorMap.emerald;
              return (
                <div key={m.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg ${c.bg} flex items-center justify-center`}>
                        <Icon className={`w-3.5 h-3.5 ${c.text}`} />
                      </div>
                      <span className="text-xs font-extrabold text-slate-800">{m.label}</span>
                    </div>
                    <span className={`text-xs font-black ${c.text}`}>
                      {m.value}{m.unit}
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${c.bar}`}
                      style={{ width: `${m.label === "Network I/O" ? Math.min((m.value / 200) * 100, 100) : m.value}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Server Region</p>
              <p className="text-xs font-black text-slate-900 mt-0.5">Asia/Kolkata</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Instance Type</p>
              <p className="text-xs font-black text-slate-900 mt-0.5">t3.xlarge</p>
            </div>
          </div>
        </div>

        {/* Right: Open Incidents */}
        <div className="lg:col-span-7 p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-950 tracking-tight">Open Incidents</h2>
              <p className="text-xs text-slate-400 font-medium">Active issues requiring engineering intervention</p>
            </div>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-extrabold">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              {openIncidents.length} Active
            </span>
          </div>

          <div className="space-y-3">
            {openIncidents.map((inc) => (
              <div
                key={inc.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 mt-0.5 ${
                        inc.severity === "High"
                          ? "bg-rose-500"
                          : inc.severity === "Medium"
                          ? "bg-amber-500"
                          : "bg-blue-400"
                      }`}
                    />
                    <h4 className="text-xs font-bold text-slate-900">{inc.title}</h4>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold shrink-0 ${
                      inc.severity === "High"
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : inc.severity === "Medium"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}
                  >
                    {inc.severity}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>
                    <span className="font-bold text-violet-700">{inc.id}</span> • {inc.service}
                  </span>
                  <span>{inc.opened} • Assigned: {inc.assignee}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button className="w-full py-2.5 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition">
              View All Incidents & Runbook
            </button>
          </div>
        </div>
      </div>

      {/* Services & Deployments Tabs */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-slate-950 tracking-tight">Platform Services & Deployments</h2>
            <p className="text-xs text-slate-400 font-medium">Live status of all CSE Nexus microservices and recent CI/CD pipeline runs</p>
          </div>
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100">
            <button
              onClick={() => setSelectedTab("services")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedTab === "services" ? "bg-white shadow-xs text-slate-900" : "text-slate-500"
              }`}
            >
              Services
            </button>
            <button
              onClick={() => setSelectedTab("deployments")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedTab === "deployments" ? "bg-white shadow-xs text-slate-900" : "text-slate-500"
              }`}
            >
              Deployments
            </button>
          </div>
        </div>

        {selectedTab === "services" && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px] font-extrabold">
                  <th className="pb-3 font-extrabold">Service Name</th>
                  <th className="pb-3 font-extrabold">Environment</th>
                  <th className="pb-3 font-extrabold text-center">Uptime</th>
                  <th className="pb-3 font-extrabold text-center">Latency</th>
                  <th className="pb-3 font-extrabold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {services.map((s, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 font-bold text-slate-900 flex items-center gap-2">
                      <Server className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {s.name}
                    </td>
                    <td className="py-3">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                        {s.env}
                      </span>
                    </td>
                    <td className="py-3 text-center font-extrabold text-slate-800">{s.uptime}</td>
                    <td className="py-3 text-center text-slate-600">{s.latency}</td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          s.status === "Operational"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : s.status === "Degraded"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedTab === "deployments" && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px] font-extrabold">
                  <th className="pb-3 font-extrabold">Service</th>
                  <th className="pb-3 font-extrabold">Version</th>
                  <th className="pb-3 font-extrabold">Deployed By</th>
                  <th className="pb-3 font-extrabold">Time</th>
                  <th className="pb-3 font-extrabold">Env</th>
                  <th className="pb-3 font-extrabold text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {recentDeployments.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 font-bold text-slate-900 flex items-center gap-2">
                      <GitBranch className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                      {d.service}
                    </td>
                    <td className="py-3 font-mono text-violet-700 font-bold">{d.version}</td>
                    <td className="py-3 text-slate-700">{d.by}</td>
                    <td className="py-3 text-slate-500">{d.time}</td>
                    <td className="py-3">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
                        {d.env}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          d.status === "Success"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Security Events & Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Security Events */}
        <div className="lg:col-span-6 p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-950 tracking-tight">Security Events</h2>
                <p className="text-xs text-slate-400 font-medium">Intrusion detection & access logs</p>
              </div>
            </div>
            <Link href="/audit-logs" className="text-xs font-bold text-[#005f73] hover:underline">
              Full Log
            </Link>
          </div>

          <div className="space-y-3">
            {securityEvents.map((ev, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl flex items-center justify-between gap-3 border ${
                  !ev.resolved
                    ? "bg-rose-50/60 border-rose-200"
                    : "bg-slate-50 border-slate-200/70"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <Lock
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      ev.severity === "High"
                        ? "text-rose-600"
                        : ev.severity === "Medium"
                        ? "text-amber-600"
                        : "text-slate-400"
                    }`}
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{ev.event}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {ev.ip !== "—" ? `IP: ${ev.ip} • ` : ""}{ev.time}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      ev.severity === "High"
                        ? "bg-rose-100 text-rose-700"
                        : ev.severity === "Medium"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {ev.severity}
                  </span>
                  <p className={`text-[10px] font-bold mt-1 ${ev.resolved ? "text-emerald-600" : "text-rose-600"}`}>
                    {ev.resolved ? "✓ Resolved" : "⚠ Open"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent System Audit Logs */}
        <div className="lg:col-span-6 p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-violet-50 border border-violet-200 flex items-center justify-center text-violet-600">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-950 tracking-tight">System Audit Trail</h2>
                <p className="text-xs text-slate-400 font-medium">Chronological log of system-level actions</p>
              </div>
            </div>
            <Link href="/audit-logs" className="text-xs font-bold text-[#005f73] hover:underline">
              All Logs
            </Link>
          </div>

          <div className="space-y-2.5">
            {auditLogs.slice(0, 5).map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 truncate">{log.action}</p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {log.user} • {log.module}
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-mono text-[10px] text-slate-400">{log.ipAddress}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{log.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Dev Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="p-6 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-violet-600 mb-2">
              <Code2 className="w-5 h-5" />
              <h3 className="font-extrabold text-sm text-slate-950">Deploy New Build</h3>
            </div>
            <p className="text-xs text-slate-500">Trigger a new CI/CD pipeline run and deploy the latest build to staging or production.</p>
          </div>
          <button className="w-full py-2.5 rounded-full bg-violet-50 hover:bg-violet-100 text-violet-700 font-extrabold text-xs text-center transition">
            Trigger Pipeline
          </button>
        </div>

        <div className="p-6 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-600 mb-2">
              <Bug className="w-5 h-5" />
              <h3 className="font-extrabold text-sm text-slate-950">Bug Tracker</h3>
            </div>
            <p className="text-xs text-slate-500">View, assign, and resolve reported bugs from faculty, students, and the admin team.</p>
          </div>
          <button className="w-full py-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 font-extrabold text-xs text-center transition">
            Open Bug Tracker
          </button>
        </div>

        <div className="p-6 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <MonitorCheck className="w-5 h-5" />
              <h3 className="font-extrabold text-sm text-slate-950">Uptime Monitor</h3>
            </div>
            <p className="text-xs text-slate-500">Configure health-check endpoints, alert thresholds, and on-call escalation paths.</p>
          </div>
          <button className="w-full py-2.5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-extrabold text-xs text-center transition">
            View Monitoring
          </button>
        </div>

        <div className="p-6 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 mb-2">
              <Database className="w-5 h-5" />
              <h3 className="font-extrabold text-sm text-slate-950">DB Backups</h3>
            </div>
            <p className="text-xs text-slate-500">Schedule automated database snapshots, verify restore integrity, and manage retention.</p>
          </div>
          <button className="w-full py-2.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-extrabold text-xs text-center transition">
            Manage Backups
          </button>
        </div>
      </div>
    </div>
  );
}
