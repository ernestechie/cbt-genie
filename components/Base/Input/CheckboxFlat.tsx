import { cn } from "@/lib/utils";
import React from "react";

//The component is used inplaced of the input checkbox for rendering list

interface Props {
  checked?: boolean;
}

export default function CheckboxFlat({ checked }: Props) {
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      aria-label="checkbox"
      className={cn(
        checked
          ? "bg-primary dark:bg-primary-400 text-white"
          : "bg-offwhite  border-secondary-100 border",
        "  w-5 h-5 rounded-md flex items-center justify-center "
      )}
    >
      {checked && <i className="pi pi-check text-xs" />}
    </div>
  );
}
