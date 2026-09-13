"use client";

import { useMemo, useState } from "react";
import { GameShell } from "@/components/games/GameShell";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type CardItem = {
  id: number;
  pairId: string;
  label: string;
  short: string;
  tone: string;
};

const PAIRS = [
  { pairId: "espresso", label: "اسپرسو", short: "Esp", tone: "#8B4513" },
  { pairId: "latte", label: "لاته", short: "Lat", tone: "#E0C097" },
  { pairId: "arabica", label: "عربیکا", short: "Ara", tone: "#6B8F71" },
  { pairId: "robusta", label: "روبوستا", short: "Rob", tone: "#5c3317" },
  { pairId: "crema", label: "کرما", short: "Cre", tone: "#D4AF37" },
  { pairId: "mocha", label: "موکا", short: "Moc", tone: "#4A2C14" },
];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildDeck(): CardItem[] {
  const doubled = PAIRS.flatMap((p) => [p, p]);
  return shuffle(doubled).map((card, index) => ({
    id: index,
    pairId: card.pairId,
    label: card.label,
    short: card.short,
    tone: card.tone,
  }));
}

export function MemoryGame() {
  const [deck, setDeck] = useState(buildDeck);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [lock, setLock] = useState(false);

  const won = matched.length === PAIRS.length;

  const stars = useMemo(() => {
    if (moves <= 12) return 3;
    if (moves <= 18) return 2;
    return 1;
  }, [moves]);

  const reset = () => {
    setDeck(buildDeck());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setLock(false);
  };

  const onFlip = (id: number) => {
    if (lock || flipped.includes(id) || won) return;
    const card = deck.find((c) => c.id === id);
    if (!card || matched.includes(card.pairId)) return;

    const next = [...flipped, id];
    setFlipped(next);

    if (next.length < 2) return;

    setMoves((m) => m + 1);
    setLock(true);
    const [a, b] = next.map((nid) => deck.find((c) => c.id === nid)!);

    if (a.pairId === b.pairId) {
      setMatched((m) => [...m, a.pairId]);
      setFlipped([]);
      setLock(false);
    } else {
      window.setTimeout(() => {
        setFlipped([]);
        setLock(false);
      }, 700);
    }
  };

  return (
    <GameShell title="حافظه برشته" subtitle="جفت کارت‌های قهوه را پیدا کن">
      <div className="mb-4 flex items-center justify-between text-sm text-foreground/70">
        <span>حرکت: {moves}</span>
        <span>
          جفت: {matched.length}/{PAIRS.length}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {deck.map((card) => {
          const isOpen =
            flipped.includes(card.id) || matched.includes(card.pairId);
          return (
            <button
              key={card.id}
              type="button"
              disabled={isOpen || lock}
              onClick={() => onFlip(card.id)}
              className={cn(
                "aspect-square rounded-xl border text-center transition duration-300",
                isOpen
                  ? "border-gold/50 bg-gold/15"
                  : "border-white/10 bg-surface hover:border-gold/35",
              )}
            >
              {isOpen ? (
                <span className="flex h-full flex-col items-center justify-center gap-1.5 p-2">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full font-display text-xs font-bold text-background"
                    style={{ backgroundColor: card.tone }}
                  >
                    {card.short}
                  </span>
                  <span className="text-[11px] text-foreground/85 sm:text-xs">
                    {card.label}
                  </span>
                </span>
              ) : (
                <span className="font-display text-lg text-gold/70">C</span>
              )}
            </button>
          );
        })}
      </div>

      {won ? (
        <div className="mt-6 rounded-2xl border border-gold/30 bg-gold/10 p-5 text-center">
          <p className="font-display text-xl text-gold">آفرین!</p>
          <p className="mt-1 text-sm text-foreground/70">
            با {moves} حرکت تمام شد — امتیاز: {stars} از ۳
          </p>
          <Button className="mt-4" onClick={reset}>
            دست جدید
          </Button>
        </div>
      ) : (
        <Button variant="outline" className="mt-6" onClick={reset}>
          شروع مجدد
        </Button>
      )}
    </GameShell>
  );
}
