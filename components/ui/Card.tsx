import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "glass-card rounded-2xl border border-white/10 bg-surface/70 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl",
      className,
    )}
    {...props}
  />
));
Card.displayName = "Card";

export { Card };
