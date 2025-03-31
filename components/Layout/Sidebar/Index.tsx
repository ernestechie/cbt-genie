"use client";
import { navLinks } from "@/constants/sidebar";
import React from "react";
import Navigation from "./Navigation";

export default function SidebarWrapper() {
  // TODO: Fetch nav links for admin or user based on session

  return (
    <div>
      <Navigation navLinks={navLinks} />
    </div>
  );
}
