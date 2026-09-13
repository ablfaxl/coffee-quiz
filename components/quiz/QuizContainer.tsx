"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { questions } from "@/data/questions";
import { useQuizStore } from "@/store/useQuizStore";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { Button } from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";

export function QuizContainer() {
  const rootRef = useRef<HTMLDivElement>(null);
  const currentStep = useQuizStore((s) => s.currentStep);
  const answers = useQuizStore((s) => s.answers);
  const setAnswer = useQuizStore((s) => s.setAnswer);
  const nextStep = useQuizStore((s) => s.nextStep);
  const prevStep = useQuizStore((s) => s.prevStep);

  const question = questions[currentStep];
  const currentValue = answers[question.id];
  const canContinue = currentValue !== undefined && currentValue !== "";
  const [animKey, setAnimKey] = useState(currentStep);

  useEffect(() => {
    setAnimKey(currentStep);
  }, [currentStep]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const card = rootRef.current?.querySelector(".question-card");
      if (!card) return;

      gsap.fromTo(
        card,
        {
          clipPath: "circle(0% at 50% 50%)",
          opacity: 0.6,
        },
        {
          clipPath: "circle(150% at 50% 50%)",
          opacity: 1,
          duration: 0.8,
          ease: "expo.inOut",
        },
      );

      gsap.fromTo(
        ".option-btn, .scale-btn",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.25,
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, [animKey]);

  const handleNext = () => {
    if (!canContinue) return;
    const card = rootRef.current?.querySelector(".question-card");
    if (!card) {
      nextStep();
      return;
    }

    gsap.to(card, {
      opacity: 0,
      scale: 0.95,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => nextStep(),
    });
  };

  return (
    <section
      ref={rootRef}
      className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col justify-center px-4 py-10 md:px-6"
    >
      <ProgressBar current={currentStep} />

      <div className="mt-8" key={animKey}>
        <QuestionCard
          question={question}
          value={currentValue}
          onSelect={(value) => setAnswer(question.id, value)}
        />
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="gap-1"
        >
          <ChevronRight className="h-4 w-4" />
          قبلی
        </Button>
        <Button size="lg" onClick={handleNext} disabled={!canContinue}>
          {currentStep === questions.length - 1 ? "مشاهده نتیجه" : "بعدی"}
        </Button>
      </div>
    </section>
  );
}
