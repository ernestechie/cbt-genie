import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer rounded-lg font-geist font-medium",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 py-3 has-[>svg]:px-3",
        small: "h-9 gap-1.5 px-3 has-[>svg]:px-2.5",
        large: "h-13 px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    block?: boolean;
    asChild?: boolean;
    loading?: boolean;
    rounded?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  block = false,
  loading = false,
  rounded = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  const content = (
    <>
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <i className="pi pi-spinner-dotted animate-spin text-white" />
        </div>
      )}
      <span className={`flex gap-2 ${loading ? "invisible" : ""}`}>
        {children}
      </span>
    </>
  );

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        block && "w-full",
        rounded && "rounded-full"
      )}
      disabled={loading}
      {...props}
    >
      {asChild ? <span>{content}</span> : content}
    </Comp>
  );
}

export { Button, buttonVariants };
