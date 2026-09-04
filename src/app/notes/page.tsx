"use client";

import React, { useState } from "react";
import {
  FolderDown,
  Plus,
  Search,
  FileText,
  Download,
  Video,
  FileCode,
  BookOpen,
  Filter,
  X,
  ExternalLink,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";
import { StudyMaterialItem } from "@/lib/data/cse-demo-data";

export default function NotesPage() {
  const { materials, addStudyMaterial, subjects, showToast } = useDepartment();

  const [selectedSem, setSelectedSem] = useState<number | "All">("All");
  const [selectedModule, setSelectedModule] = useState<number | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subjectCode: "CS501",
    subjectName: "Database Management Systems",
    semester: 5,
    module: 1,
    fileType: "PDF" as StudyMaterialItem["fileType"],
    fileSize: "3.5 MB",
    facultyName: "Dr. Priya Sharma",
    downloadUrl: "#",
  });

  const filteredMaterials = materials.filter((m) => {
    const matchSem = selectedSem === "All" || m.semester === selectedSem;
    const matchMod = selectedModule === "All" || m.module === selectedModule;
    const matchQuery =
      !searchQuery ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.facultyName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSem && matchMod && matchQuery;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    addStudyMaterial(formData);
    setIsAddModalOpen(false);
  };

  const handleDownload = (title: string) => {
    showToast("Download Started", `Downloading: ${title}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Department Study Repository</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Module-wise lecture slides, lab handbooks, question banks, and reference video lectures.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Study Material</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-subtle">
        <div className="flex flex-wrap items-center gap-2">
          {/* Semester Filter */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
            <span>Semester:</span>
            <select
              value={selectedSem}
              onChange={(e) => setSelectedSem(e.target.value === "All" ? "All" : Number(e.target.value))}
              className="px-2.5 py-1 bg-slate-100 rounded-lg outline-none font-bold"
            >
              <option value="All">All Semesters</option>
              <option value={3}>Semester 3</option>
              <option value={5}>Semester 5</option>
              <option value={7}>Semester 7</option>
            </select>
          </div>

          {/* Module Filter */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 ml-2">
            <span>Module:</span>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value === "All" ? "All" : Number(e.target.value))}
              className="px-2.5 py-1 bg-slate-100 rounded-lg outline-none font-bold"
            >
              <option value="All">All Modules</option>
              {[1, 2, 3, 4, 5].map((m) => (
                <option key={m} value={m}>Module {m}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search material title or course..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none"
          />
        </div>
      </div>

      {/* Grid of Materials */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMaterials.map((mat) => (
          <div
            key={mat.id}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle hover:shadow-card transition flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 font-bold text-xs">
                {mat.fileType === "PDF" && <FileText className="w-5 h-5" />}
                {mat.fileType === "PPT" && <BookOpen className="w-5 h-5" />}
                {mat.fileType === "Video" && <Video className="w-5 h-5" />}
                {mat.fileType === "Code" && <FileCode className="w-5 h-5" />}
                {mat.fileType === "DOC" && <FileText className="w-5 h-5" />}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-indigo-600">
                    {mat.subjectCode}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                    Module {mat.module}
                  </span>
                  <span className="text-[10px] text-slate-400">Sem {mat.semester}</span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 mt-1 line-clamp-2">{mat.title}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Uploaded by {mat.facultyName} • {mat.fileSize} • {mat.uploadDate}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleDownload(mat.title)}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 shrink-0 transition"
              title="Download File"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Upload Learning Resource</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Document / Material Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Module 2: Deadlock Prevention & Bank's Algorithm"
                  className="w-full px-3 py-2 border rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Subject</label>
                  <select
                    value={formData.subjectCode}
                    onChange={(e) => {
                      const code = e.target.value;
                      const sub = subjects.find((s) => s.code === code);
                      setFormData({
                        ...formData,
                        subjectCode: code,
                        subjectName: sub?.name || "",
                        facultyName: sub?.facultyName || formData.facultyName,
                        semester: sub?.semester || 5,
                      });
                    }}
                    className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.code}>{s.code}: {s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Module</label>
                  <select
                    value={formData.module}
                    onChange={(e) => setFormData({ ...formData, module: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                  >
                    {[1, 2, 3, 4, 5].map((m) => (
                      <option key={m} value={m}>Module {m}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Resource Type</label>
                  <select
                    value={formData.fileType}
                    onChange={(e) => setFormData({ ...formData, fileType: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="PPT">Presentation (PPT)</option>
                    <option value="Video">Video Lecture Link</option>
                    <option value="Code">Source Code / Lab Manual</option>
                    <option value="DOC">Word Document</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Approx Size</label>
                  <input
                    type="text"
                    value={formData.fileSize}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl outline-none"
                  />
                </div>
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
                  Upload Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
