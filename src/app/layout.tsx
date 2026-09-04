"use client";

import React, { useState } from "react";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { DepartmentProvider } from "@/context/DepartmentContext";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import GlobalSearchModal from "@/components/common/GlobalSearchModal";
import ToastContainer from "@/components/common/ToastContainer";
import { usePathname } from "next/navigation";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

import { useDepartment } from "@/context/DepartmentContext";

function MainLayoutContent({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { activePortal } = useDepartment();
  const isLoginPage = pathname === "/login";
  const isLandingNoPortal = !activePortal && pathname === "/";

  if (isLoginPage || isLandingNoPortal) {
    return (
      <main className="min-h-screen bg-[#f8fafc]">
        {children}
        <ToastContainer />
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f5f9] text-slate-900">
      {/* Topbar matching exact screenshot header */}
      <Topbar onOpenMobileMenu={() => setMobileOpen(true)} />

      {/* Main app container */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto">
        {children}
      </main>

      <GlobalSearchModal />
      <ToastContainer />
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full ${plusJakartaSans.variable}`}>
      <head>
        <title>CSE Nexus | Computer Science & Engineering Department Management System</title>
        <meta
          name="description"
          content="Digital management platform for an engineering college CSE department with Student, Faculty, HOD, and Administration portals."
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`h-full ${plusJakartaSans.className} font-sans antialiased text-slate-900 bg-[#f1f5f9]`}>
        <DepartmentProvider>
          <MainLayoutContent>{children}</MainLayoutContent>
        </DepartmentProvider>
      </body>
    </html>
  );
}
