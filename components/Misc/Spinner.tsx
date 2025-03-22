import { cn } from "@/lib/utils";
import React from "react";
import { ClipLoader } from "react-spinners";

interface Props {
  className?: string;
  containerStyle?: string;
  classic?: boolean;
}
export default function Spinner({
  className,
  containerStyle,
  classic = true,
}: Props) {
  return (
    <div
      className={cn(
        "mx-auto p-4 flex items-center justify-center",
        containerStyle
      )}
    >
      {classic ? (
        <ClipLoader size={30} color="var(--color-primary)" />
      ) : (
        <i
          className={cn(
            "pi pi-spinner-dotted animate-spin text-primary text-lg",
            className
          )}
        />
      )}
    </div>
  );
}
