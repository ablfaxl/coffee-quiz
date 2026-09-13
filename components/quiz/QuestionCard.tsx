"use client";

import type { Question, QuestionCategory } from "@/types";
import { Card } from "@/components/ui/Card";
import { ScaleSelector } from "@/components/quiz/ScaleSelector";
import { OptionButton } from "@/components/quiz/OptionButton";

const categoryLabels: Record<QuestionCategory, string> = {
  taste: "تلخی",
  strength: "قدرت",
  crema: "کرما",
  aroma: "عطر و رایحه",
  acidity: "اسیدیته",
  aftertaste: "ماندگاری",
  habit: "نحوه مصرف",
  preference: "سلیقه کلی",
};

type QuestionCardProps = {
  question: Question;
  value: number | string | undefined;
  onSelect: (value: number | string) => void;
};

export function QuestionCard({ question, value, onSelect }: QuestionCardProps) {
  return (
    <Card className="question-card w-full max-w-xl overflow-hidden p-6 md:p-8">
      <p className="mb-2 text-xs tracking-wide text-gold/80">
        {categoryLabels[question.category]}
      </p>
      <h2 className="text-xl font-semibold leading-relaxed text-foreground md:text-2xl">
        {question.title}
      </h2>
      {question.subtitle ? (
        <p className="mt-2 text-sm text-foreground/55">{question.subtitle}</p>
      ) : null}

      <div className="mt-8">
        {question.kind === "scale" ? (
          <ScaleSelector
            value={typeof value === "number" ? value : undefined}
            onChange={onSelect}
            minLabel={question.minLabel}
            maxLabel={question.maxLabel}
          />
        ) : (
          <div className="flex flex-col gap-3">
            {question.options?.map((opt) => (
              <OptionButton
                key={opt.id}
                label={opt.text}
                selected={value === opt.id}
                onClick={() => onSelect(opt.id)}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
