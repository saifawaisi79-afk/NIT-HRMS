"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Plus,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle,
  X,
  Award,
} from "lucide-react";
import { useDepartment } from "@/context/DepartmentContext";
import { EventItem } from "@/lib/data/cse-demo-data";

export default function EventsPage() {
  const { events, registerForEvent } = useDepartment();
  const [eventList, setEventList] = useState(events);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    type: "Hackathon" as EventItem["type"],
    date: "2026-10-15",
    time: "10:00 AM - 04:00 PM",
    venue: "CSE Seminar Hall",
    organizer: "ACM Student Chapter",
    description: "",
    maxCapacity: 120,
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const newEv: EventItem = {
      ...formData,
      id: `evt-${Date.now()}`,
      registrations: 0,
      status: "Upcoming",
    };

    setEventList([newEv, ...eventList]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Department Events & Hackathons</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            National hackathons, industry workshops, FDP conferences, and guest speaker symposiums.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Host New Event</span>
        </button>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {eventList.map((ev) => {
          const fillPercentage = Math.round((ev.registrations / ev.maxCapacity) * 100);
          return (
            <div
              key={ev.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-subtle hover:shadow-card transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${ev.badgeColor}`}>
                    {ev.type}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {ev.status}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 mt-3 line-clamp-2">{ev.title}</h3>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-3">{ev.description}</p>

                <div className="mt-4 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{ev.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                    <span>Organized by: <strong className="text-slate-700">{ev.organizer}</strong></span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1.5">
                  <span>Seats Booked</span>
                  <span className="text-indigo-600 font-bold">
                    {ev.registrations} / {ev.maxCapacity} ({fillPercentage}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden mb-3">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all"
                    style={{ width: `${fillPercentage}%` }}
                  />
                </div>

                <button
                  onClick={() => registerForEvent(ev.id)}
                  className="w-full py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm"
                >
                  Register for Pass
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Host Event Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="fixed inset-0" onClick={() => setIsAddModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Host Department Event</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. AI Agents & LLM Hackathon"
                  className="w-full px-3 py-2 border rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Event Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl outline-none bg-white"
                  >
                    <option value="Hackathon">Hackathon</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar / Keynote</option>
                    <option value="FDP">Faculty Dev Program (FDP)</option>
                    <option value="Contest">Coding Contest</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Capacity</label>
                  <input
                    type="number"
                    value={formData.maxCapacity}
                    onChange={(e) => setFormData({ ...formData, maxCapacity: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Date</label>
                  <input
                    type="text"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g. Oct 15, 2026"
                    className="w-full px-3 py-2 border rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Time</label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="09:00 AM - 05:00 PM"
                    className="w-full px-3 py-2 border rounded-xl outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Venue</label>
                  <input
                    type="text"
                    required
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    placeholder="e.g. Visvesvaraya Hall"
                    className="w-full px-3 py-2 border rounded-xl outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-semibold mb-1">Organizer Club / Body</label>
                  <input
                    type="text"
                    value={formData.organizer}
                    onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                    placeholder="e.g. IEEE Student Chapter"
                    className="w-full px-3 py-2 border rounded-xl outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Description & Agenda</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Outline topics, mentors, prizes, and requirements..."
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
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
