"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useQuizStore } from "@/store/useQuizStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CoffeeBadge } from "@/components/result/CoffeeBadge";

export function ResultCard() {
  const rootRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const arabicaRef = useRef<HTMLSpanElement>(null);
  const robustaRef = useRef<HTMLSpanElement>(null);
  const result = useQuizStore((s) => s.result);
  const reset = useQuizStore((s) => s.reset);
  const openGames = useQuizStore((s) => s.openGames);

  useEffect(() => {
    if (!result) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".reveal-circle",
        { scale: 0, opacity: 0.9 },
        { scale: 12, opacity: 0, duration: 1.1, ease: "power2.inOut" },
      )
        .fromTo(
          cardRef.current,
          { rotationX: 90, opacity: 0, transformOrigin: "center center" },
          { rotationX: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          "-=0.45",
        );

      const counters = { a: 0, r: 0 };
      tl.to(
        counters,
        {
          a: result.arabicaPercent,
          r: result.robustaPercent,
          duration: 1.4,
          ease: "power2.out",
          onUpdate: () => {
            if (arabicaRef.current) {
              arabicaRef.current.textContent = `${Math.round(counters.a)}٪`;
            }
            if (robustaRef.current) {
              robustaRef.current.textContent = `${Math.round(counters.r)}٪`;
            }
          },
        },
        "-=0.2",
      );

      const words = rootRef.current?.querySelectorAll(".reveal-word");
      if (words?.length) {
        tl.fromTo(
          words,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            stagger: 0.045,
            ease: "power2.out",
          },
          "-=0.8",
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, [result]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotY = ((x / rect.width) - 0.5) * -14;
      const rotX = ((y / rect.height) - 0.5) * 12;
      gsap.to(card, {
        rotateX: rotX,
        rotateY: rotY,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 900,
      });
    };

    const onLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, [result]);

  if (!result) return null;

  const words = result.description.split(" ");

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-16"
    >
      <div
        className="reveal-circle pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
        aria-hidden
      />

      <div className="perspective-1000 w-full max-w-lg">
        <Card
          ref={cardRef}
          className="transform-style-3d relative border-gold/20 p-8 md:p-10"
          style={{ borderColor: `${result.color}55` }}
        >
          <p className="font-display text-sm tracking-[0.2em] text-gold uppercase">
            Your Blend
          </p>
          <h2
            className="mt-3 font-display text-3xl font-bold md:text-4xl"
            style={{ color: result.color }}
          >
            {result.title}
          </h2>

          <div className="mt-8 grid grid-cols-2 gap-4 text-center">
            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-xs text-foreground/50">عربیکا</p>
              <span
                ref={arabicaRef}
                className="mt-1 block font-display text-3xl font-bold text-gold"
              >
                0٪
              </span>
            </div>
            <div className="rounded-xl bg-white/5 p-4">
              <p className="text-xs text-foreground/50">روبوستا</p>
              <span
                ref={robustaRef}
                className="mt-1 block font-display text-3xl font-bold text-accent"
              >
                0٪
              </span>
            </div>
          </div>

          <CoffeeBadge type={result} className="mt-8" />

          <p className="mt-8 text-sm leading-relaxed text-foreground/75 md:text-base">
            {words.map((word, i) => (
              <span key={`${word}-${i}`} className="reveal-word inline-block opacity-0">
                {word}
                {i < words.length - 1 ? "\u00A0" : ""}
              </span>
            ))}
          </p>

          <Button size="lg" className="mt-10 w-full" onClick={reset}>
            شروع مجدد
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="mt-3 w-full"
            onClick={openGames}
          >
            بازی‌های سرگرمی
          </Button>
        </Card>
      </div>
    </section>
  );
}
