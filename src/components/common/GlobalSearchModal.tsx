"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Users,
  GraduationCap,
  BookOpen,
  BellRing,
  Rocket,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";

export default function GlobalSearchModal() {
  const router = useRouter();
  const { isSearchOpen, setIsSearchOpen, facultyList, studentList, subjects, notices, projects, placements } =
    useDepartment();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();

    const faculty = facultyList.filter(
      (f) => f.name.toLowerCase().includes(q) || f.designation.toLowerCase().includes(q) || f.specialization.toLowerCase().includes(q)
    ).slice(0, 3);

    const students = studentList.filter(
      (s) => s.name.toLowerCase().includes(q) || s.usn.toLowerCase().includes(q)
    ).slice(0, 3);

    const sub = subjects.filter(
      (s) => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)
    ).slice(0, 3);

    const not = notices.filter(
      (n) => n.title.toLowerCase().includes(q) || n.category.toLowerCase().includes(q)
    ).slice(0, 3);

    const proj = projects.filter(
      (p) => p.title.toLowerCase().includes(q) || p.techStack.toLowerCase().includes(q)
    ).slice(0, 2);

    const plc = placements.filter(
      (p) => p.companyName.toLowerCase().includes(q) || p.role.toLowerCase().includes(q)
    ).slice(0, 2);

    const totalMatches = faculty.length + students.length + sub.length + not.length + proj.length + plc.length;

    return { faculty, students, sub, not, proj, plc, totalMatches };
  }, [query, facultyList, studentList, subjects, notices, projects, placements]);

  if (!isSearchOpen) return null;

  const navigateTo = (url: string) => {
    setIsSearchOpen(false);
    setQuery("");
    router.push(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div
        className="fixed inset-0"
        onClick={() => setIsSearchOpen(false)}
      />
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10">
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 bg-white">
          <Search className="w-5 h-5 text-indigo-600 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search faculty, students (USN), courses, circulars, capstone projects..."
            className="w-full text-sm text-slate-800 placeholder-slate-400 bg-transparent border-none outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="px-2 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-3 divide-y divide-slate-100">
          {!query.trim() ? (
            <div className="p-8 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-3">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-700">Quick Navigation & Universal Search</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                Type a faculty name (e.g. &quot;Priya&quot;), USN (&quot;1NT23CS001&quot;), subject code (&quot;CS501&quot;), or company (&quot;Google&quot;).
              </p>
            </div>
          ) : filtered?.totalMatches === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <p className="text-sm font-medium">No results found for &quot;{query}&quot;</p>
              <p className="text-xs mt-1">Try searching by keyword, USN, or department code.</p>
            </div>
          ) : (
            <div className="space-y-4 py-2">
              {/* Faculty Group */}
              {filtered && filtered.faculty.length > 0 && (
                <div>
                  <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> Faculty Members
                  </p>
                  <div className="space-y-1">
                    {filtered.faculty.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => navigateTo(`/faculty`)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/60 transition-colors text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <img src={f.avatar} alt={f.name} className="w-8 h-8 rounded-lg object-cover" />
                          <div>
                            <p className="text-xs font-bold text-slate-800 group-hover:text-indigo-600">{f.name}</p>
                            <p className="text-[11px] text-slate-500">{f.designation} • {f.specialization}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Students Group */}
              {filtered && filtered.students.length > 0 && (
                <div className="pt-2">
                  <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" /> Students
                  </p>
                  <div className="space-y-1">
                    {filtered.students.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => navigateTo(`/students`)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/60 transition-colors text-left group"
                      >
                        <div className="flex items-center gap-3">
                          <img src={s.avatar} alt={s.name} className="w-8 h-8 rounded-lg object-cover" />
                          <div>
                            <p className="text-xs font-bold text-slate-800 group-hover:text-indigo-600">{s.name}</p>
                            <p className="text-[11px] text-slate-500">USN: {s.usn} • Sem {s.semester} (Sec {s.section}) • CGPA: {s.cgpa}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses */}
              {filtered && filtered.sub.length > 0 && (
                <div className="pt-2">
                  <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Courses & Subjects
                  </p>
                  <div className="space-y-1">
                    {filtered.sub.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => navigateTo(`/subjects`)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/60 transition-colors text-left group"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-800 group-hover:text-indigo-600">{s.code}: {s.name}</p>
                          <p className="text-[11px] text-slate-500">Semester {s.semester} • Faculty: {s.facultyName} • {s.credits} Credits</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Notices */}
              {filtered && filtered.not.length > 0 && (
                <div className="pt-2">
                  <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <BellRing className="w-3.5 h-3.5" /> Notices & Circulars
                  </p>
                  <div className="space-y-1">
                    {filtered.not.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => navigateTo(`/notices`)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50/60 transition-colors text-left group"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-800 group-hover:text-indigo-600">{n.title}</p>
                          <p className="text-[11px] text-slate-500">Category: {n.category} • Date: {n.publishedDate}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Navigate with mouse or arrow keys</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
}
