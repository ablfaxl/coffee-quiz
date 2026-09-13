"use client";

import { create } from "zustand";
import { calculateResult } from "@/lib/calculator";
import { TOTAL_QUESTIONS } from "@/data/questions";
import type {
  CoffeeType,
  GameId,
  QuizAnswers,
  QuizPhase,
  ScoreBreakdown,
} from "@/types";

const STORAGE_KEY = "coffeeno-quiz-result";

type QuizState = {
  phase: QuizPhase;
  currentStep: number;
  answers: QuizAnswers;
  result: CoffeeType | null;
  scores: ScoreBreakdown | null;
  activeGame: GameId | null;
  startQuiz: () => void;
  openGames: () => void;
  openGame: (id: GameId) => void;
  backToGames: () => void;
  backToHero: () => void;
  setAnswer: (questionId: number, value: number | string) => void;
  nextStep: () => void;
  prevStep: () => void;
  calculateResult: () => void;
  reset: () => void;
  hydrateFromStorage: () => void;
};

function persistResult(result: CoffeeType, scores: ScoreBreakdown) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ result, scores, savedAt: Date.now() }),
    );
  } catch {
    // ignore quota / private mode
  }
}

export const useQuizStore = create<QuizState>((set, get) => ({
  phase: "hero",
  currentStep: 0,
  answers: {},
  result: null,
  scores: null,
  activeGame: null,

  startQuiz: () => set({ phase: "quiz", currentStep: 0, activeGame: null }),

  openGames: () => set({ phase: "gamesHub", activeGame: null }),

  openGame: (id) => set({ phase: "game", activeGame: id }),

  backToGames: () => set({ phase: "gamesHub", activeGame: null }),

  backToHero: () => set({ phase: "hero", activeGame: null }),

  setAnswer: (questionId, value) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: value },
    })),

  nextStep: () => {
    const { currentStep, answers } = get();
    if (currentStep < TOTAL_QUESTIONS - 1) {
      set({ currentStep: currentStep + 1 });
      return;
    }
    const { type, scores } = calculateResult(answers);
    persistResult(type, scores);
    set({ result: type, scores, phase: "result" });
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep > 0) set({ currentStep: currentStep - 1 });
  },

  calculateResult: () => {
    const { answers } = get();
    const { type, scores } = calculateResult(answers);
    persistResult(type, scores);
    set({ result: type, scores, phase: "result" });
  },

  reset: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    set({
      phase: "hero",
      currentStep: 0,
      answers: {},
      result: null,
      scores: null,
      activeGame: null,
    });
  },

  hydrateFromStorage: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        result: CoffeeType;
        scores: ScoreBreakdown;
      };
      if (parsed?.result) {
        set({ result: parsed.result, scores: parsed.scores ?? null });
      }
    } catch {
      // ignore corrupt storage
    }
  },
}));
