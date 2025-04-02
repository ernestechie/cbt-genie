"use client";
import Logo from "@/components/Logo";
import { navLinks } from "@/constants/sidebar";
import { cn } from "@/lib/utils";
import { useDashboardStore } from "@/store/dashboard-store";
import React from "react";
import Navigation from "./Navigation";

export default function SidebarWrapper() {
  // TODO: Fetch nav links for admin or user based on session
  const { sidebarCollapsed } = useDashboardStore();

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 bg-white border-r border-neutral-100 h-full overflow-y-auto duration-300",
        sidebarCollapsed ? "w-20" : "w-52"
      )}
    >
      <div className="p-4 py-8">
        <div className="mb-16">
          <Logo
            className="w-32 mx-auto"
            variant={sidebarCollapsed ? "icon" : "full"}
          />
        </div>
        <Navigation navLinks={navLinks} />
      </div>
    </aside>
  );
}
