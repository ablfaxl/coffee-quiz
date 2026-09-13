"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GameShell } from "@/components/games/GameShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

type Bean = { id: number; x: number; y: number; speed: number };

const DURATION = 30;
const CUP_WIDTH = 18;

export function BeanCatchGame() {
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [beans, setBeans] = useState<Bean[]>([]);
  const [cupX, setCupX] = useState(41);
  const [done, setDone] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const cupXRef = useRef(41);
  const scoreRef = useRef(0);

  const reset = () => {
    setPlaying(false);
    setScore(0);
    setMissed(0);
    setTimeLeft(DURATION);
    setBeans([]);
    setCupX(41);
    cupXRef.current = 41;
    scoreRef.current = 0;
    setDone(false);
    idRef.current = 0;
  };

  const start = () => {
    reset();
    setPlaying(true);
  };

  const moveCup = useCallback((clientX: number) => {
    const area = areaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    const next = Math.max(0, Math.min(100 - CUP_WIDTH, pct - CUP_WIDTH / 2));
    cupXRef.current = next;
    setCupX(next);
  }, []);

  useEffect(() => {
    if (!playing) return;

    const spawn = window.setInterval(() => {
      idRef.current += 1;
      setBeans((prev) => [
        ...prev,
        {
          id: idRef.current,
          x: 8 + Math.random() * 76,
          y: -8,
          speed: 0.55 + Math.random() * 0.75,
        },
      ]);
    }, 520);

    const tick = window.setInterval(() => {
      setBeans((prev) => {
        const next: Bean[] = [];
        let missDelta = 0;
        let scoreDelta = 0;
        const cupLeft = cupXRef.current;
        const cupRight = cupLeft + CUP_WIDTH;

        for (const bean of prev) {
          const y = bean.y + bean.speed * 3.2;
          if (y >= 86 && y <= 94 && bean.x >= cupLeft && bean.x <= cupRight) {
            scoreDelta += 1;
            continue;
          }
          if (y > 100) {
            missDelta += 1;
            continue;
          }
          next.push({ ...bean, y });
        }

        if (scoreDelta) {
          scoreRef.current += scoreDelta;
          setScore(scoreRef.current);
        }
        if (missDelta) setMissed((m) => m + missDelta);
        return next;
      });
    }, 32);

    const timer = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setPlaying(false);
          setDone(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(spawn);
      window.clearInterval(tick);
      window.clearInterval(timer);
    };
  }, [playing]);

  const rank =
    score >= 25 ? "استاد برشته‌کاری" : score >= 15 ? "باریستای خوب" : "تازه‌کار";

  return (
    <GameShell
      title="صید دانه"
      subtitle="فنجان را حرکت بده و دانه‌ها را بگیر"
    >
      <div className="mb-4 flex items-center justify-between text-sm text-foreground/70">
        <span>امتیاز: {score}</span>
        <span>از دست‌رفته: {missed}</span>
        <span>زمان: {timeLeft}ث</span>
      </div>

      <Card
        ref={areaRef}
        className="relative h-[52vh] min-h-[280px] touch-none overflow-hidden border-gold/20 p-0 select-none"
        onPointerMove={(e) => {
          if (!playing) return;
          moveCup(e.clientX);
        }}
        onPointerDown={(e) => {
          if (!playing) return;
          (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
          moveCup(e.clientX);
        }}
      >
        {!playing && !done ? (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-background/50 p-6 text-center">
            <p className="text-sm text-foreground/70">
              انگشت یا موس را بکش تا فنجان حرکت کند.
            </p>
            <Button onClick={start}>شروع</Button>
          </div>
        ) : null}

        {done ? (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/70 p-6 text-center">
            <p className="font-display text-2xl text-gold">{score} دانه</p>
            <p className="text-sm text-foreground/70">{rank}</p>
            <Button onClick={start}>دوباره</Button>
          </div>
        ) : null}

        {beans.map((bean) => (
          <span
            key={bean.id}
            className="pointer-events-none absolute h-4 w-3 -translate-x-1/2 rounded-full bg-secondary shadow-sm"
            style={{
              left: `${bean.x}%`,
              top: `${bean.y}%`,
              transform: "translateX(-50%) rotate(25deg)",
              background:
                "radial-gradient(circle at 30% 30%, #8b5a2b, #3d2314)",
            }}
          />
        ))}

        <div
          className={cn(
            "absolute bottom-3 h-10 rounded-b-2xl rounded-t-md border-2 border-gold/60 bg-gradient-to-b from-foreground/15 to-surface",
          )}
          style={{ left: `${cupX}%`, width: `${CUP_WIDTH}%` }}
        >
          <div className="absolute -top-1 right-1/2 h-1 w-[70%] translate-x-1/2 rounded-full bg-gold/50" />
        </div>
      </Card>
    </GameShell>
  );
}
