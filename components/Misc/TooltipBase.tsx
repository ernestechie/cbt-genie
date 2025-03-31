import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

interface TooltipBaseProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
}

export default function TooltipBase({ trigger, content }: TooltipBaseProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="cursor-pointer">{trigger}</TooltipTrigger>
        <TooltipContent align="end">{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
