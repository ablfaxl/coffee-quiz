"use client";

import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useQuizStore } from "@/store/useQuizStore";

type GameShellProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
  onBack?: () => void;
};

export function GameShell({
  title,
  subtitle,
  children,
  onBack,
}: GameShellProps) {
  const backToGames = useQuizStore((s) => s.backToGames);

  return (
    <section className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-start justify-between gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 shrink-0"
          onClick={onBack ?? backToGames}
        >
          <ChevronRight className="h-4 w-4" />
          بازگشت
        </Button>
        <div className="text-left">
          <h1 className="font-display text-xl font-bold text-gold sm:text-2xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-1 text-xs text-foreground/55 sm:text-sm">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </section>
  );
}
