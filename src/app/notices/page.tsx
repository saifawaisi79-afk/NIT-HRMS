"use client";

import React, { useState } from "react";
import {
  BellRing,
  Plus,
  Search,
  Filter,
  Calendar,
  AlertCircle,
  FileText,
  Download,
  Users,
  X,
  Sparkles,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";
import { NoticeItem } from "@/lib/data/cse-demo-data";

export default function NoticesPage() {
  const { notices, addNotice, showToast } = useDepartment();

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Notice form
  const [formData, setFormData] = useState({
    title: "",
    category: "Academic" as NoticeItem["category"],
    description: "",
    publishedBy: "HOD Office & Dean",
    targetAudience: "All" as NoticeItem["targetAudience"],
    priority: "Normal" as NoticeItem["priority"],
    attachmentName: "",
  });

  const categories = ["All", "Academic", "Examination", "Placement", "Event", "Holiday", "Urgent"];

  const filteredNotices = notices.filter((n) => {
    const matchCat = selectedCategory === "All" || n.category === selectedCategory;
    const matchQuery =
      !searchQuery ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    addNotice(formData);
    setIsAddModalOpen(false);
    setFormData({
      title: "",
      category: "Academic",
      description: "",
      publishedBy: "HOD Office & Dean",
      targetAudience: "All",
      priority: "Normal",
      attachmentName: "",
    });
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "bg-rose-50 text-rose-700 border-rose-200 animate-pulse";
      case "High":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Official Notice Board</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Department circulars, exam schedules, placement announcements, and AICTE directives.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Circular</span>
        </button>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search circulars..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl outline-none"
          />
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle hover:shadow-card transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getPriorityBadge(
                    notice.priority
                  )}`}
                >
                  {notice.priority}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {notice.category}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  Audience: {notice.targetAudience}
                </span>
              </div>

              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Published {notice.publishedDate}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 mt-2.5">{notice.title}</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{notice.description}</p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Issued by: <strong className="text-slate-700">{notice.publishedBy}</strong>
              </span>

              {notice.attachmentName ? (
                <button
                  onClick={() => showToast("Downloading Attachment", notice.attachmentName || "")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 font-semibold text-[11px] transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{notice.attachmentName}</span>
                </button>
              ) : (
                <span className="text-[11px] text-slate-400">Official Circular</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Notice Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Publish Department Notice</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Notice Headline</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Mandatory Induction Program for M.Tech Scholars"
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Examination">Examination</option>
                    <option value="Placement">Placement</option>
                    <option value="Event">Event</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Target</label>
                  <select
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                  >
                    <option value="All">All</option>
                    <option value="Faculty">Faculty Only</option>
                    <option value="Students">Students Only</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Full Circular Content</label>
                <textarea
                  rows={4}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed notification body..."
                  className="w-full px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Attachment File Name (Optional)</label>
                <input
                  type="text"
                  value={formData.attachmentName}
                  onChange={(e) => setFormData({ ...formData, attachmentName: e.target.value })}
                  placeholder="e.g. Schedule_Circular_Sep2026.pdf"
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
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-sm"
                >
                  Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
