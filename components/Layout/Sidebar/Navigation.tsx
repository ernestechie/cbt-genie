import TooltipBase from "@/components/Misc/TooltipBase";
import { Button } from "@/components/ui/button";
import { NavLinkType } from "@/constants/sidebar";
import { cn } from "@/lib/utils";
import { useDashboardStore } from "@/store/dashboard-store";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavigationProps {
  navLinks: NavLinkType[];
}

export default function Navigation({ navLinks }: NavigationProps) {
  const { toggleSidebarCollapse, sidebarCollapsed } = useDashboardStore();
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 bg-white border-r border-neutral-100 h-full overflow-y-auto duration-500",
        sidebarCollapsed ? "w-20" : "w-52"
      )}
    >
      <div>
        <div className="flex flex-col gap-y-4 p-4 my-8">
          {navLinks.map((navLink) => (
            <Link
              key={navLink.slug}
              href={navLink.url}
              className={cn(
                "capitalize p-2 px-4 hover:bg-neutral-50 rounded-md text-sm flex items-center gap-x-3 text-neutral-500 duration-500",
                pathname === navLink.url
                  ? "bg-primary/10 text-primary font-medium"
                  : "bg-white",
                sidebarCollapsed ? "justify-center" : "justify-start"
              )}
            >
              {sidebarCollapsed ? (
                <TooltipBase
                  content={<div className="capitalize">{navLink.name}</div>}
                  trigger={
                    <span>
                      <span className="text-base">{navLink.icon}</span>
                    </span>
                  }
                />
              ) : (
                <>
                  <span className="text-base">{navLink.icon}</span>
                  {!sidebarCollapsed && <span>{navLink.name}</span>}
                </>
              )}
            </Link>
          ))}
        </div>

        <Button
          onClick={toggleSidebarCollapse}
          size={sidebarCollapsed ? "icon" : "small"}
          variant="ghost"
          className="!mx-auto !block !duration-500 !text-neutral-500"
        >
          {!sidebarCollapsed ? (
            <span className="flex items-center gap-x-6  text-sm">
              <i className="pi pi-chevron-left" />
              Collapse
            </span>
          ) : (
            <i className="pi pi-chevron-right" />
          )}
        </Button>
      </div>
    </aside>
  );
}
