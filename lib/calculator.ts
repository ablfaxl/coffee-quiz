import { coffeeTypes } from "@/data/coffeeTypes";
import { questions } from "@/data/questions";
import type { CoffeeType, QuizAnswers, ScoreBreakdown } from "@/types";

function asNumber(value: number | string | undefined): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function getModifier(questionId: number, answer: number | string | undefined): number {
  if (answer === undefined) return 0;
  const question = questions.find((q) => q.id === questionId);
  if (!question?.options) return 0;

  const option =
    typeof answer === "string"
      ? question.options.find((o) => o.id === answer)
      : question.options.find((o) => o.score === answer);

  return option?.score ?? 0;
}

export function calculateScores(answers: QuizAnswers): ScoreBreakdown {
  const q1 = asNumber(answers[1]) ?? 5;
  const q2 = asNumber(answers[2]) ?? 5;
  const q3 = asNumber(answers[3]) ?? 5;
  const q4 = asNumber(answers[4]) ?? 5;
  const q5 = asNumber(answers[5]) ?? 5;
  const q6 = asNumber(answers[6]) ?? 5;

  const arabicaScore = (q4 + q5) / 2;
  const robustaScore = (q1 + q2 + q3 + q6) / 4;
  const diff = robustaScore - arabicaScore;

  const habitMod = getModifier(7, answers[7]);
  const preferenceMod = getModifier(8, answers[8]);
  const adjustedDiff = diff + habitMod + preferenceMod;

  return { arabicaScore, robustaScore, diff, adjustedDiff };
}

export function resolveCoffeeType(adjustedDiff: number): CoffeeType {
  if (adjustedDiff <= -3) return coffeeTypes[0];
  if (adjustedDiff <= -1) return coffeeTypes[1];
  if (adjustedDiff < 1) return coffeeTypes[2];
  if (adjustedDiff < 3) return coffeeTypes[3];
  return coffeeTypes[4];
}

export function calculateResult(answers: QuizAnswers): {
  type: CoffeeType;
  scores: ScoreBreakdown;
} {
  const scores = calculateScores(answers);
  return {
    type: resolveCoffeeType(scores.adjustedDiff),
    scores,
  };
}
