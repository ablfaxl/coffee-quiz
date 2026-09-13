"use client";

import { useQuizStore } from "@/store/useQuizStore";
import { GamesHub } from "@/components/games/GamesHub";
import { BeanCatchGame } from "@/components/games/BeanCatchGame";
import { MemoryGame } from "@/components/games/MemoryGame";
import { PourGame } from "@/components/games/PourGame";

export function GamesRouter() {
  const phase = useQuizStore((s) => s.phase);
  const activeGame = useQuizStore((s) => s.activeGame);

  if (phase === "gamesHub") return <GamesHub />;

  if (phase === "game") {
    if (activeGame === "beanCatch") return <BeanCatchGame />;
    if (activeGame === "memory") return <MemoryGame />;
    if (activeGame === "pour") return <PourGame />;
    return <GamesHub />;
  }

  return null;
}
