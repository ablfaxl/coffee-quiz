import type { Question } from "@/types";

export const questions: Question[] = [
  {
    id: 1,
    title: "تلخی قهوه چقدر برای شما جذاب است؟",
    subtitle: "از ۱ (اصلاً) تا ۱۰ (خیلی تلخ و قوی)",
    category: "taste",
    kind: "scale",
    minLabel: "اصلاً",
    maxLabel: "خیلی تلخ",
  },
  {
    id: 2,
    title: "قهوه باید چقدر قوی و سنگین باشد؟",
    subtitle: "از ۱ (ملایم و سبک) تا ۱۰ (خیلی قوی و سنگین)",
    category: "strength",
    kind: "scale",
    minLabel: "ملایم",
    maxLabel: "سنگین",
  },
  {
    id: 3,
    title: "وجود کرمای غلیظ روی اسپرسو چقدر برایتان مهم است؟",
    subtitle: "از ۱ (مهم نیست) تا ۱۰ (خیلی مهم)",
    category: "crema",
    kind: "scale",
    minLabel: "مهم نیست",
    maxLabel: "خیلی مهم",
  },
  {
    id: 4,
    title: "عطر و رایحه متنوع و میوه‌ای را چقدر دوست دارید؟",
    subtitle: "از ۱ (کم) تا ۱۰ (خیلی زیاد)",
    category: "aroma",
    kind: "scale",
    minLabel: "کم",
    maxLabel: "خیلی زیاد",
  },
  {
    id: 5,
    title: "ترشی ملایم و اسیدیته قهوه چقدر برایتان قابل قبول است؟",
    subtitle: "از ۱ (دوست ندارم) تا ۱۰ (خیلی می‌پسندم)",
    category: "acidity",
    kind: "scale",
    minLabel: "دوست ندارم",
    maxLabel: "می‌پسندم",
  },
  {
    id: 6,
    title: "ماندگاری مزه بعد از نوشیدن چقدر برایتان مهم است؟",
    subtitle: "از ۱ (مهم نیست) تا ۱۰ (خیلی مهم)",
    category: "aftertaste",
    kind: "scale",
    minLabel: "مهم نیست",
    maxLabel: "خیلی مهم",
  },
  {
    id: 7,
    title: "معمولاً قهوه را چگونه می‌نوشید؟",
    category: "habit",
    kind: "choice",
    options: [
      { id: "espresso", text: "اسپرسوی خالص", score: 0.5 },
      { id: "espresso_milk", text: "اسپرسو با شیر", score: 0.25 },
      { id: "latte", text: "لاته / کاپوچینو", score: -0.5 },
      { id: "macchiato", text: "ماکیاتو", score: 0.15 },
      { id: "french", text: "قهوه فرانسه", score: -0.25 },
      { id: "turkish", text: "قهوه ترک", score: 0.35 },
    ],
  },
  {
    id: 8,
    title: "کدام به سلیقه شما نزدیک‌تر است؟",
    category: "preference",
    kind: "choice",
    options: [
      {
        id: "mild",
        text: "لطیف، عطری و متعادل",
        score: -0.5,
      },
      {
        id: "bold",
        text: "تلخ، قوی و سنگین",
        score: 0.5,
      },
    ],
  },
];

export const TOTAL_QUESTIONS = questions.length;
