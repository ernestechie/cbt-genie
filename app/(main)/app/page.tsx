"use client";
import { Button } from "@/components/ui/button";
import { handleLogout } from "@/lib/api/auth";

import React from "react";

export default function UserDashboardPage() {
  const logout = async () => {
    await handleLogout();
  };

  return (
    <div className="p-4">
      <p className="text-xl font-bold mb-8">User Dashboard </p>

      <Button variant="destructive" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}
