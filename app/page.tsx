"use client";

import dynamic from "next/dynamic";
import { useQuizStore } from "@/store/useQuizStore";
import { Hero } from "@/components/hero/Hero";
import { QuizContainer } from "@/components/quiz/QuizContainer";

const ResultCard = dynamic(
  () =>
    import("@/components/result/ResultCard").then((m) => m.ResultCard),
  { ssr: false },
);

export default function Home() {
  const phase = useQuizStore((s) => s.phase);

  return (
    <main className="relative min-h-dvh">
      {phase === "hero" && <Hero />}
      {phase === "quiz" && <QuizContainer />}
      {phase === "result" && <ResultCard />}
    </main>
  );
}
