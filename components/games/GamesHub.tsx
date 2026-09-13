/** @format */

"use client";

import { Coffee, Droplets, LayoutGrid } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useQuizStore } from "@/store/useQuizStore";
import type { GameId } from "@/types";

const games: {
  id: GameId;
  title: string;
  description: string;
  icon: typeof Coffee;
}[] = [
  {
    id: "beanCatch",
    title: "صید دانه",
    description: "با فنجان دانه‌های در حال سقوط را بگیر؛ ۳۰ ثانیه فرصت داری.",
    icon: Coffee,
  },
  {
    id: "memory",
    title: "حافظه برشته",
    description: "کارت‌های مشابه قهوه را جفت کن و حافظه‌ات را محک بزن.",
    icon: LayoutGrid,
  },
  {
    id: "pour",
    title: "اسپرسوی کامل",
    description: "نوار ریختن را در لحظه طلایی متوقف کن تا شات عالی بگیری.",
    icon: Droplets,
  },
];

export function GamesHub() {
  const openGame = useQuizStore((s) => s.openGame);
  const backToHero = useQuizStore((s) => s.backToHero);

  return (
    <section className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4 py-10 sm:px-6">
      <p className="font-display text-sm tracking-[0.2em] text-gold uppercase">
        Playground
      </p>
      <h1 className="mt-2 font-display text-3xl font-bold text-foreground">
        بازی‌های کافینو
      </h1>
      <p className="mt-2 text-sm text-foreground/60">
        چند سرگرمی کوتاه بین یک فنجان قهوه — سبک و فوری.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {games.map((game) => {
          const Icon = game.icon;
          return (
            <button
              key={game.id}
              type="button"
              onClick={() => openGame(game.id)}
              className="text-right transition hover:scale-[1.01] active:scale-[0.99]"
            >
              <Card className="flex items-start gap-4 border-gold/20 p-5 hover:border-gold/45">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-semibold text-foreground">
                    {game.title}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-foreground/55">
                    {game.description}
                  </span>
                </span>
              </Card>
            </button>
          );
        })}
      </div>

      <Button variant="outline" className="mt-10" onClick={backToHero}>
        بازگشت به خانه
      </Button>
    </section>
  );
}
