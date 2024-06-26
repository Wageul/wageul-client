import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const layoutVariants = cva("pt-4 px-[20px] min-h-screen bg-grey-1", {
  variants: {
    background: {
      white: "bg-background",
      grey: "bg-grey-1",
    },
  },
  defaultVariants: {
    background: "white",
  },
});

interface DivProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof layoutVariants> {
  label?: string;
  children?: React.ReactElement | React.ReactElement[];
}

export function BackgroundLayout({ children, background }: DivProps) {
  return <div className={cn(layoutVariants({ background }))}>{children}</div>;
}
