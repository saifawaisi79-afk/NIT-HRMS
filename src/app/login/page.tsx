"use client";

import React from "react";
import PortalSelector from "@/components/portal/PortalSelector";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f1f5f9] p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      <div className="max-w-[1400px] w-full mx-auto">
        <PortalSelector />
      </div>
    </div>
  );
}
