"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { TOTAL_QUESTIONS } from "@/data/questions";
import { cn } from "@/lib/utils";

type ProgressBarProps = {
  current: number;
  total?: number;
};

export function ProgressBar({
  current,
  total = TOTAL_QUESTIONS,
}: ProgressBarProps) {
  const fillRef = useRef<HTMLDivElement>(null);
  const percent = Math.min(100, ((current + 1) / total) * 100);

  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        width: `${percent}%`,
        duration: 0.5,
        ease: "power2.out",
      });
    });

    return () => ctx.revert();
  }, [percent]);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-xs text-foreground/50">
        <span>
          سؤال {current + 1} از {total}
        </span>
        <span>{Math.round(percent)}٪</span>
      </div>
      <div
        className={cn(
          "h-1.5 w-full overflow-hidden rounded-full bg-white/10",
        )}
      >
        <div
          ref={fillRef}
          className="h-full w-0 rounded-full bg-gradient-to-l from-gold to-accent"
        />
      </div>
    </div>
  );
}
