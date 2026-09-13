"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type OptionButtonProps = {
  label: string;
  selected?: boolean;
  onClick: () => void;
};

export function OptionButton({ label, selected, onClick }: OptionButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = ref.current;
    if (!btn) return;

    const onEnter = () => {
      gsap.to(btn, {
        scale: 1.02,
        borderColor: "rgba(212,175,55,0.55)",
        duration: 0.25,
        ease: "power2.out",
      });
    };
    const onLeave = () => {
      gsap.to(btn, {
        scale: 1,
        borderColor: selected
          ? "rgba(212,175,55,0.8)"
          : "rgba(255,255,255,0.1)",
        duration: 0.25,
        ease: "power2.out",
      });
    };

    btn.addEventListener("mouseenter", onEnter);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mouseenter", onEnter);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, [selected]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={cn(
        "option-btn w-full rounded-xl border px-4 py-3.5 text-right text-sm transition-colors md:text-base",
        selected
          ? "border-gold bg-gold/15 text-gold"
          : "border-white/10 bg-white/5 text-foreground/85 hover:bg-gold/10",
      )}
      aria-pressed={selected}
    >
      {label}
    </button>
  );
}
