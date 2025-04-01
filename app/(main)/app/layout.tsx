"use client";
import Navbar from "@/components/Layout/Navbar/Navbar";
import SidebarWrapper from "@/components/Layout/Sidebar/Index";
import { cn } from "@/lib/utils";
import { useDashboardStore } from "@/store/dashboard-store";
import React from "react";

interface ProtectedAppLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedAppLayout({
  children,
}: ProtectedAppLayoutProps) {
  const { sidebarCollapsed } = useDashboardStore();

  return (
    <div>
      <Navbar />
      <SidebarWrapper />
      <div className={cn("px-4 py-18", sidebarCollapsed ? "pl-24" : "pl-60")}>
        {children}
      </div>
    </div>
  );
}
