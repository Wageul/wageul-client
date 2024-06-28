import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const layoutVariants = cva("pt-4 px-[20px] min-h-screen bg-grey-1", {
  variants: {
    background: {
      white: "bg-background",
      grey: "bg-grey-1",
    },
    bottomNav: {
      yes: "pb-[83px]",
      no: "",
    },
  },
  defaultVariants: {
    background: "white",
    bottomNav: "no",
  },
});

interface DivProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof layoutVariants> {
  label?: string;
  children?: React.ReactElement | React.ReactElement[];
}

export function BackgroundLayout({
  children,
  background,
  bottomNav,
}: DivProps) {
  return (
    <div className={cn(layoutVariants({ background, bottomNav }))}>
      {children}
    </div>
  );
}
