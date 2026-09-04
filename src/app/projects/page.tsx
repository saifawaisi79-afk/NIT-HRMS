"use client";

import React, { useState } from "react";
import {
  Rocket,
  Plus,
  Github,
  ExternalLink,
  Users,
  Search,
  CheckCircle,
  Filter,
  X,
  Code2,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";
import { ProjectItem } from "@/lib/data/cse-demo-data";

export default function ProjectsPage() {
  const { projects, addProject, facultyList } = useDepartment();

  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    team: "Aarav Sharma, Rohan Verma",
    teamUsns: "1NT23CS001, 1NT23CS003",
    guide: "Dr. Ramesh Kumar (Professor & HOD)",
    domain: "Artificial Intelligence",
    techStack: "PyTorch, Next.js, FastAPI",
    abstract: "",
    status: "Development" as ProjectItem["status"],
    githubUrl: "https://github.com/nit-cse/project",
    demoUrl: "https://demo.nitcampus.ac.in",
    progressPercent: 50,
  });

  const domains = [
    "All",
    "Artificial Intelligence & Robotics",
    "Web3 & Blockchain",
    "Healthcare AI / Computer Vision",
    "Cloud & DevOps",
  ];

  const filteredProjects = projects.filter((p) => {
    const matchDomain = selectedDomain === "All" || p.domain.includes(selectedDomain);
    const matchQuery =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.guide.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDomain && matchQuery;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    addProject({
      ...formData,
      team: formData.team.split(",").map((t) => t.trim()),
      teamUsns: formData.teamUsns.split(",").map((u) => u.trim()),
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Capstone & Research Projects</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Final year major projects, mini-projects, faculty guides, and live software artifacts.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Project</span>
        </button>
      </div>

      {/* Domain Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition whitespace-nowrap ${
                selectedDomain === dom
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {dom === "All" ? "All Domains" : dom}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tech stack, title..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl outline-none"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle hover:shadow-card transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                  {p.domain}
                </span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    p.status === "Completed"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900 mt-3 line-clamp-2">{p.title}</h3>
              <p className="text-xs text-slate-500 mt-1.5 line-clamp-3 leading-relaxed">{p.abstract}</p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Tech Stack:</span>
                  <p className="font-mono text-slate-700 text-[11px] font-semibold mt-0.5">{p.techStack}</p>
                </div>

                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Guide:</span>
                  <p className="text-slate-800 font-semibold">{p.guide}</p>
                </div>

                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Team Members:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {p.team.map((member, idx) => (
                      <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1.5">
                <span>Progress Milestone</span>
                <span className="text-indigo-600 font-bold">{p.progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden mb-3">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${p.progressPercent}%` }}
                />
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                {p.demoUrl && (
                  <a
                    href={p.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Register Capstone Project</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Real-Time Autonomous Fleet Telemetry"
                  className="w-full px-3 py-2 border rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Domain</label>
                  <input
                    type="text"
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    placeholder="e.g. Autonomous AI"
                    className="w-full px-3 py-2 border rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Guide</label>
                  <select
                    value={formData.guide}
                    onChange={(e) => setFormData({ ...formData, guide: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                  >
                    {facultyList.map((f) => (
                      <option key={f.id} value={`${f.name} (${f.designation})`}>{f.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Team Members (comma separated)</label>
                <input
                  type="text"
                  value={formData.team}
                  onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                  placeholder="Aarav Sharma, Rohan Verma"
                  className="w-full px-3 py-2 border rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Tech Stack</label>
                <input
                  type="text"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  placeholder="e.g. Next.js, Python, TensorFlow, Docker"
                  className="w-full px-3 py-2 border rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Abstract</label>
                <textarea
                  rows={3}
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                  placeholder="Project overview, methodology and proposed architecture..."
                  className="w-full px-3 py-2 border rounded-xl outline-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
