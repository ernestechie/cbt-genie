import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDashboardStore } from "@/store/dashboard-store";
import React from "react";

export default function Navbar() {
  const { toggleSidebarCollapse, sidebarCollapsed } = useDashboardStore();

  return (
    <nav
      className={cn(
        "flex items-center justify-between fixed top-0 right-0 border-b border-b-neutral-100 p-4 w-screen bg-white",
        sidebarCollapsed ? "left-20" : "left-52"
      )}
    >
      <Button size="icon" onClick={toggleSidebarCollapse} variant="ghost">
        <i className="pi pi-bars" />
      </Button>
      <p>Navbar</p>
    </nav>
  );
}
