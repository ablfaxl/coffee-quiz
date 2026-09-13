export type QuestionCategory =
  | "taste"
  | "strength"
  | "crema"
  | "aroma"
  | "acidity"
  | "aftertaste"
  | "habit"
  | "preference";

export type Option = {
  id: string;
  text: string;
  /** Used for Q7/Q8 modifiers; scale questions store the 1–10 value directly */
  score?: number;
  icon?: string;
};

export type QuestionKind = "scale" | "choice";

export type Question = {
  id: number;
  title: string;
  subtitle?: string;
  category: QuestionCategory;
  kind: QuestionKind;
  /** For scale questions: min/max labels */
  minLabel?: string;
  maxLabel?: string;
  options?: Option[];
};

export type CoffeeType = {
  id: number;
  title: string;
  arabicaPercent: number;
  robustaPercent: number;
  description: string;
  color: string;
};

export type QuizPhase = "hero" | "quiz" | "result";

export type QuizAnswers = Record<number, number | string>;

export type ScoreBreakdown = {
  arabicaScore: number;
  robustaScore: number;
  diff: number;
  adjustedDiff: number;
};
