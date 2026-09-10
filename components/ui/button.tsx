import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium outline-none transition-[background-color,border-color,color,box-shadow,transform] duration-150 ease-out select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 active:translate-y-px motion-reduce:transform-none motion-reduce:transition-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md",
        secondary:
          "border border-border/60 bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 hover:shadow-sm",
        destructive:
          "bg-destructive text-white shadow-sm hover:bg-destructive/90 hover:shadow-md",
        outline:
          "border border-input bg-background shadow-xs hover:border-foreground/20 hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "h-auto rounded-sm px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-8 gap-1.5 rounded-md px-2.5 text-xs",
        sm: "h-9 px-3.5 text-xs",
        lg: "h-11 px-5 text-base",
        icon: "size-10",
        "icon-sm": "size-9",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
