"use client";

import React from "react";
import { useDepartment } from "@/context/DepartmentContext";
import PortalSelector from "@/components/portal/PortalSelector";
import StudentDashboard from "@/components/dashboards/StudentDashboard";
import FacultyDashboard from "@/components/dashboards/FacultyDashboard";
import HODDashboard from "@/components/dashboards/HODDashboard";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import ITDashboard from "@/components/dashboards/ITDashboard";

export default function DashboardPage() {
  const { activePortal } = useDepartment();

  // If no portal is selected, display the initial Portal Selector screen
  if (!activePortal) {
    return <PortalSelector />;
  }

  // Render role-specific portal dashboard
  switch (activePortal) {
    case "Student":
      return <StudentDashboard />;
    case "Faculty":
      return <FacultyDashboard />;
    case "HOD":
      return <HODDashboard />;
    case "Administration":
      return <AdminDashboard />;
    case "IT":
      return <ITDashboard />;
    default:
      return <PortalSelector />;
  }
}
