import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:brightness-[0.95]",
        primaryRed:
          "bg-primary-red text-primary-foreground hover:brightness-[0.95] shadow-light",
        primaryBlue:
          "bg-primary-blue text-primary-foreground hover:brightness-[0.95] shadow-light",
        primaryYellow:
          "bg-primary-yellow text-primary-foreground hover:brightness-[0.95] shadow-light",
        white:
          "bg-background text-foreground shadow-light hover:brightness-[0.98]",
        grey:
          "bg-grey-2 text-foreground hover:brightness-[0.98] shadow-light"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "px-[14px] py-[8px]",
        lg: "px-[23px] py-[13px]",
        icon: "h-10 w-10",
        xl: "w-[317px] py-[10.5px]",
      },
      textStyle: {
        subtitle2: "text-[12px]",
        default: "text-[16px]",
        body1: "text-[18px]"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      textStyle: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, textStyle, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, textStyle, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
