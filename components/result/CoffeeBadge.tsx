"use client";

import type { CoffeeType } from "@/types";
import { cn } from "@/lib/utils";

type CoffeeBadgeProps = {
  type: CoffeeType;
  className?: string;
};

export function CoffeeBadge({ type, className }: CoffeeBadgeProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="mb-2 flex justify-between text-xs text-foreground/55">
        <span>عربیکا {type.arabicaPercent}٪</span>
        <span>روبوستا {type.robustaPercent}٪</span>
      </div>
      <div className="flex h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full transition-all duration-700"
          style={{
            width: `${type.arabicaPercent}%`,
            background: `linear-gradient(90deg, ${type.color}, ${type.color}cc)`,
          }}
        />
        <div
          className="h-full bg-secondary/80"
          style={{ width: `${type.robustaPercent}%` }}
        />
      </div>
      <div className="mt-4 flex items-end justify-center gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i < Math.round(type.robustaPercent / 20);
          return (
            <span
              key={i}
              className={cn(
                "inline-block h-8 w-5 rounded-t-full",
                filled ? "bg-secondary" : "bg-gold/30",
              )}
              style={{
                height: `${28 + i * 4}px`,
                opacity: filled ? 1 : 0.35,
              }}
              aria-hidden
            />
          );
        })}
      </div>
    </div>
  );
}
