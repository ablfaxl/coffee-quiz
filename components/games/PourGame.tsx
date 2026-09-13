"use client";

import { useEffect, useRef, useState } from "react";
import { GameShell } from "@/components/games/GameShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const ZONE_START = 62;
const ZONE_END = 78;

export function PourGame() {
  const [running, setRunning] = useState(false);
  const [level, setLevel] = useState(0);
  const [result, setResult] = useState<"perfect" | "good" | "miss" | null>(
    null,
  );
  const [best, setBest] = useState(0);
  const dirRef = useRef(1);
  const levelRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!running) return;

    const speed = 1.35;
    const loop = () => {
      let next = levelRef.current + dirRef.current * speed;
      if (next >= 100) {
        next = 100;
        dirRef.current = -1;
      } else if (next <= 0) {
        next = 0;
        dirRef.current = 1;
      }
      levelRef.current = next;
      setLevel(next);
      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [running]);

  const start = () => {
    setResult(null);
    setLevel(0);
    levelRef.current = 0;
    dirRef.current = 1;
    setRunning(true);
  };

  const stop = () => {
    if (!running) return;
    setRunning(false);
    cancelAnimationFrame(frameRef.current);
    const v = levelRef.current;
    let verdict: "perfect" | "good" | "miss";
    if (v >= ZONE_START && v <= ZONE_END) {
      verdict = Math.abs(v - 70) <= 4 ? "perfect" : "good";
    } else {
      verdict = "miss";
    }
    setResult(verdict);
    const points = verdict === "perfect" ? 100 : verdict === "good" ? 70 : 20;
    setBest((b) => Math.max(b, points));
  };

  const label =
    result === "perfect"
      ? "شات طلایی!"
      : result === "good"
        ? "اسپرسوی خوب"
        : result === "miss"
          ? "کمی خارج از زون"
          : null;

  return (
    <GameShell
      title="اسپرسوی کامل"
      subtitle="وقتی نشانگر داخل نوار طلایی بود، ضربه بزن"
    >
      <p className="mb-4 text-sm text-foreground/60">
        بهترین امتیاز این جلسه: {best}
      </p>

      <Card className="flex flex-col items-center gap-6 border-gold/20 p-6">
        <div className="relative h-56 w-16 overflow-hidden rounded-full border border-white/15 bg-white/5 sm:h-64 sm:w-20">
          <div
            className="absolute inset-x-0 bg-gold/25"
            style={{
              bottom: `${ZONE_START}%`,
              height: `${ZONE_END - ZONE_START}%`,
            }}
          />
          <div
            className="absolute inset-x-1 rounded-full bg-gradient-to-t from-secondary via-[#5c3317] to-[#c4a484] transition-[height] duration-75"
            style={{ height: `${level}%`, bottom: 0 }}
          />
          <div
            className="absolute inset-x-0 h-0.5 bg-gold"
            style={{ bottom: `${level}%` }}
          />
        </div>

        <div className="flex w-full flex-col gap-3">
          {!running && !result ? (
            <Button size="lg" onClick={start}>
              شروع ریختن
            </Button>
          ) : null}
          {running ? (
            <Button size="lg" onClick={stop}>
              توقف!
            </Button>
          ) : null}
          {result ? (
            <div className="text-center">
              <p
                className={cn(
                  "font-display text-2xl",
                  result === "perfect"
                    ? "text-gold"
                    : result === "good"
                      ? "text-accent"
                      : "text-foreground/70",
                )}
              >
                {label}
              </p>
              <p className="mt-1 text-sm text-foreground/55">
                سطح: {Math.round(level)}٪
              </p>
              <Button className="mt-4" onClick={start}>
                شات بعدی
              </Button>
            </div>
          ) : null}
        </div>
      </Card>
    </GameShell>
  );
}
