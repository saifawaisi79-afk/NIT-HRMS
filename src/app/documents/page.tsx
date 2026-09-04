"use client";

import React, { useState } from "react";
import {
  FolderDown,
  Download,
  FileText,
  Search,
  CheckCircle2,
  Shield,
  Plus,
  Upload,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";

export default function DocumentsPage() {
  const { documents, addDocument, showToast } = useDepartment();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const filteredDocs = documents.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || d.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      {/* Header */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Central Digital Document Repository
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Department Archives
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Downloadable official certificates, curriculum schemes, institutional compliance reports &amp; student forms
          </p>
        </div>

        <button
          onClick={() => showToast("Upload Prompt", "Select PDF file from device to upload to department vault.")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#005f73] hover:bg-[#004e5f] text-white text-xs font-extrabold transition shadow-sm self-start md:self-auto"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Main Table */}
      <div className="p-7 rounded-[26px] bg-white border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search documents by title..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-full outline-none focus:ring-2 focus:ring-[#005f73]/20"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold flex-wrap">
            {["All", "Student Services", "Curriculum", "Accreditation"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-full transition ${
                  categoryFilter === cat
                    ? "bg-slate-950 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px] font-extrabold">
                <th className="pb-3 font-extrabold">Document Title</th>
                <th className="pb-3 font-extrabold">Category</th>
                <th className="pb-3 font-extrabold">Format</th>
                <th className="pb-3 font-extrabold">File Size</th>
                <th className="pb-3 font-extrabold">Uploaded By</th>
                <th className="pb-3 font-extrabold">Date</th>
                <th className="pb-3 font-extrabold text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#005f73] shrink-0" />
                    <span>{doc.title}</span>
                  </td>
                  <td className="py-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-3 font-mono font-bold text-slate-600">{doc.format}</td>
                  <td className="py-3 text-slate-500">{doc.size}</td>
                  <td className="py-3 text-slate-700">{doc.uploadedBy}</td>
                  <td className="py-3 text-slate-400 text-[11px]">{doc.date}</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => showToast("Downloading Document", `${doc.title} initiated.`)}
                      className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold transition inline-flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
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
