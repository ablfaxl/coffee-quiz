"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type ScaleSelectorProps = {
  value: number | undefined;
  onChange: (value: number) => void;
  minLabel?: string;
  maxLabel?: string;
};

export function ScaleSelector({
  value,
  onChange,
  minLabel = "۱",
  maxLabel = "۱۰",
}: ScaleSelectorProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".scale-btn",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.05,
          ease: "power2.out",
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="w-full">
      <div className="mb-3 flex justify-between text-xs text-foreground/45">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-10 sm:gap-2.5">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
          const selected = value === n;
          return (
            <button
              key={n}
              type="button"
              className={cn(
                "scale-btn flex min-h-11 min-w-0 items-center justify-center rounded-xl border text-sm font-medium transition-colors aspect-square sm:min-h-12",
                selected
                  ? "border-gold bg-gold/20 text-gold shadow-glow"
                  : "border-white/10 bg-white/5 text-foreground/80 hover:border-gold/40 hover:bg-gold/10 active:bg-gold/15",
              )}
              onClick={() => onChange(n)}
              aria-pressed={selected}
              aria-label={`امتیاز ${n}`}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}
