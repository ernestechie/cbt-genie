import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface LogoProps {
  className?: string;
  variant?: "full" | "icon";
}

export default function Logo({ className, variant = "full" }: LogoProps) {
  return (
    <Image
      src={
        variant === "full"
          ? "/logo-primary-full.png"
          : "/logo-primary-filled.png"
      }
      alt="CBT Genie Logo"
      width={200}
      height={200}
      className={cn(className)}
    />
  );
}
