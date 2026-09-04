"use client";

import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Shield,
  Bell,
  Building,
  Key,
  CheckCircle,
  Save,
  Lock,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";

export default function SettingsPage() {
  const { department, currentUser, currentRole, showToast } = useDepartment();

  const [activeTab, setActiveTab] = useState("profile");
  const [profileForm, setProfileForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: "+91 98450 12345",
    officeRoom: "CS-301 (Visvesvaraya Block)",
    bio: "Head of Computer Science & Engineering Department. Research focusing on Artificial Intelligence, Distributed Cloud Architectures, and Autonomous Systems.",
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Settings Saved", "Profile information updated successfully.");
  };

  const permissionsMatrix = [
    { module: "Department Dashboard & Analytics", hod: true, admin: true, faculty: true, student: true },
    { module: "Faculty Registry & Profiles", hod: true, admin: true, faculty: false, student: false },
    { module: "Student Admissions & Records", hod: true, admin: true, faculty: true, student: false },
    { module: "Lecture Attendance Marking", hod: true, admin: true, faculty: true, student: false },
    { module: "Timetable & Room Scheduling", hod: true, admin: true, faculty: false, student: false },
    { module: "Curriculum & Course Management", hod: true, admin: true, faculty: true, student: false },
    { module: "Examinations & Marks Entry", hod: true, admin: true, faculty: true, student: false },
    { module: "Leave Approval & Sanctioning", hod: true, admin: true, faculty: false, student: false },
    { module: "Publishing Circulars & Notices", hod: true, admin: true, faculty: true, student: false },
    { module: "Placement Drives & Applications", hod: true, admin: true, faculty: true, student: true },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">System Settings & Profile</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage personal credentials, role permissions matrix, and department academic calendar.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: "profile", label: "My Profile", icon: User },
          { id: "permissions", label: "Role Permissions Matrix", icon: Shield },
          { id: "department", label: "Department Configuration", icon: Building },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Profile */}
      {activeTab === "profile" && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-subtle max-w-2xl">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/20 shadow-md"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900">{profileForm.name}</h3>
              <p className="text-xs text-slate-500">{currentUser.designation}</p>
              <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200/60">
                Active Role: {currentRole}
              </span>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="mt-6 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={profileForm.email}
                  className="w-full px-3 py-2 border rounded-xl outline-none bg-slate-50 text-slate-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Office Room</label>
                <input
                  type="text"
                  value={profileForm.officeRoom}
                  onChange={(e) => setProfileForm({ ...profileForm, officeRoom: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Faculty / Staff Biography</label>
              <textarea
                rows={3}
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl outline-none leading-relaxed"
              />
            </div>

            <div className="pt-3 flex items-center justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition shadow-sm"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Permissions Matrix */}
      {activeTab === "permissions" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-subtle overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-sm text-slate-900">Role-Based Access Control (RBAC)</h3>
            <p className="text-xs text-slate-500">Privilege matrix determining actions by role type</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/50 border-b border-slate-200/70 text-slate-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3.5">Module / Feature</th>
                  <th className="p-3.5 text-center">Super Admin</th>
                  <th className="p-3.5 text-center">HOD</th>
                  <th className="p-3.5 text-center">Faculty</th>
                  <th className="p-3.5 text-center">Student</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {permissionsMatrix.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition">
                    <td className="p-3.5 font-semibold text-slate-800">{item.module}</td>
                    <td className="p-3.5 text-center">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </td>
                    <td className="p-3.5 text-center">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </td>
                    <td className="p-3.5 text-center">
                      {item.faculty ? (
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      ) : (
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-200" />
                      )}
                    </td>
                    <td className="p-3.5 text-center">
                      {item.student ? (
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      ) : (
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-200" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Department Configuration */}
      {activeTab === "department" && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-subtle max-w-2xl space-y-4 text-xs">
          <h3 className="font-bold text-sm text-slate-900">Institution & Academic Setup</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-xl bg-slate-50 border">
              <span className="text-slate-400 text-[10px] uppercase font-bold">Department</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{department.name}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border">
              <span className="text-slate-400 text-[10px] uppercase font-bold">Academic Session</span>
              <p className="font-bold text-slate-800 text-sm mt-0.5">{department.academicYear} (Odd Term)</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Premises</span>
            <p className="font-semibold text-slate-800 mt-0.5">{department.building}</p>
          </div>
        </div>
      )}
    </div>
  );
}
