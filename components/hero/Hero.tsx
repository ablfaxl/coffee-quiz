"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { useQuizStore } from "@/store/useQuizStore";

const HeroScene = dynamic(
  () => import("@/components/hero/HeroScene").then((m) => m.HeroScene),
  { ssr: false },
);

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const startQuiz = useQuizStore((s) => s.startQuiz);
  const openGames = useQuizStore((s) => s.openGames);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-logo",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2 },
      )
        .fromTo(
          ".hero-title",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.7",
        )
        .fromTo(
          ".hero-subtitle",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.5",
        )
        .fromTo(
          ".hero-cta",
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6 },
          "-=0.3",
        );

      gsap.to(".hero-cta", {
        scale: 1.04,
        duration: 1.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const btn = ctaRef.current;
    if (!btn) return;

    const onEnter = () => {
      gsap.to(btn, {
        boxShadow: "0 0 40px rgba(212,175,55,0.55)",
        duration: 0.35,
        ease: "power2.out",
      });
    };
    const onLeave = () => {
      gsap.to(btn, {
        boxShadow: "0 0 24px rgba(212,175,55,0.25)",
        duration: 0.35,
        ease: "power2.out",
      });
    };

    btn.addEventListener("mouseenter", onEnter);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mouseenter", onEnter);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-dvh flex-col items-center justify-start overflow-hidden px-5 pb-8 pt-16 text-center sm:px-6 sm:pt-20 md:justify-center md:pb-16 md:pt-16"
    >
      <HeroScene />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/55 via-background/25 to-background/70 md:from-background/40 md:via-transparent md:to-background/85" />

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center md:max-w-xl">
        <p className="hero-logo font-display text-4xl font-bold tracking-wide text-gold sm:text-5xl md:text-6xl">
          Coffeeno
        </p>
        <p className="hero-logo mt-2 text-[10px] tracking-[0.28em] text-accent/80 uppercase sm:text-xs sm:tracking-[0.35em]">
          Good Coffee, Better Mood
        </p>

        <h1 className="hero-title mt-6 max-w-xl text-balance font-display text-2xl font-bold text-foreground sm:mt-8 sm:text-3xl md:mt-10 md:text-5xl">
          تست انتخاب قهوه
        </h1>
        <p className="hero-subtitle mt-3 max-w-md text-sm text-foreground/70 sm:mt-4 sm:text-base md:text-lg">
          چند سؤال کوتاه تا ترکیب ایده‌آل عربیکا و روبوستای شما کشف شود.
        </p>

        <Button
          ref={ctaRef}
          size="lg"
          className="hero-cta mt-8 w-full max-w-xs font-medium sm:mt-10 sm:w-auto md:mt-12"
          onClick={startQuiz}
        >
          شروع تجربه
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="mt-3 w-full max-w-xs sm:w-auto"
          onClick={openGames}
        >
          بازی‌های سرگرمی
        </Button>
      </div>

      {/* Space for the 3D cup on mobile so content sits above it */}
      <div className="pointer-events-none relative z-0 mt-auto h-[38vh] w-full min-h-[220px] md:hidden" aria-hidden />
    </section>
  );
}
