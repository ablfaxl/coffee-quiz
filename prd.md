<!-- @format -->

PRD نهایی: وب‌اپلیکیشن لوکس تست انتخاب قهوه کوفینو (Coffeeno Luxury Quiz)
۱. چشم‌انداز محصول (Product Vision)
تبدیل یک پرسشنامه ساده به یک تجربه تعاملی سینمایی. کاربر باید حس کند در حال کشف یک راز شخصی در دنیای قهوه است. طراحی باید مینیمال، تیره (Dark Mode)، با تایپوگرافی درشت و انیمیشن‌های نرم و واکنش‌گرا باشد.

۲. پشته فناوری پیشرفته (Advanced Tech Stack)
فریم‌ورک: Next.js 14+ (App Router) با TypeScript.

استایل: Tailwind CSS + شیدرهای سفارشی (Shadcn/ui برای کامپوننت‌های پایه).

انیمیشن: GSAP 3 + ScrollTrigger + Flip (برای ترنزیشن‌های پیچیده).

مدیریت State: Zustand (سبک‌تر و سریع‌تر از Context برای این نوع اپلیکیشن‌ها).

فونت: Vazirmatn (متن) + Playfair Display (برای عناوین لوکس).

آیکون‌ها: Lucide React.

ذخیره‌سازی: localStorage برای ذخیره نتیجه تست (اختیاری).

۳. معماری اطلاعات و منطق دقیق (Data & Logic)
۳.۱. ساختار داده‌ها (Data Model)
typescript
// types/index.ts
export type Option = {
id: string;
text: string;
score: number; // 1 to 10
icon?: string; // برای نمایش آیکون کنار گزینه
};

export type Question = {
id: number;
title: string;
subtitle?: string;
options: Option[];
category: 'taste' | 'strength' | 'crema' | 'aroma' | 'acidity' | 'aftertaste' | 'habit' | 'preference';
};

export type CoffeeType = {
id: number;
title: string; // مثلاً "تیپ ۱: لطیف و عطری"
arabicaPercent: number;
robustaPercent: number;
description: string;
color: string; // رنگ اصلی برای تم نتیجه
};
۳.۲. منطق امتیازدهی دقیق (طبق پوستر)
طبق تصویر، امتیازدهی به این صورت است:

امتیاز خام: مجموع امتیازات ۶ سوال اول (هر سوال ۱ تا ۱۰).

امتیاز عربیکا: (S1 + S2 + S3 + S4 + S5 + S6) / 2

امتیاز روبوستا: (S1 + S2 + S3 + S4 + S5 + S6) \* 2

اختلاف: امتیاز روبوستا - امتیاز عربیکا

تشخیص نهایی:

اگر اختلاف < ۰ => تیپ ۱ (۱۰۰٪ عربیکا)

اگر ۰ <= اختلاف < ۵ => تیپ ۲ (۷۰٪ عربیکا، ۳۰٪ روبوستا)

اگر ۵ <= اختلاف < ۱۰ => تیپ ۳ (۵۰٪ عربیکا، ۵۰٪ روبوستا)

اگر ۱۰ <= اختلاف < ۱۵ => تیپ ۴ (۳۰٪ عربیکا، ۷۰٪ روبوستا)

اگر اختلاف >= ۱۵ => تیپ ۵ (۱۰۰٪ روبوستا)

نکته: سوالات ۷ و ۸ (نحوه مصرف و سلیقه) به عنوان فیلتر تعدیل‌کننده عمل می‌کنند. مثلاً اگر کاربر "اسپرسو" را انتخاب کند، ۲ امتیاز به سمت روبوستا اضافه می‌شود.

۴. دیزاین سیستم (Design System) - "Luxury Dark"
پالت رنگی:

Background: #0A0A0A (مشکی عمیق)

Surface: #1A1A1A (خاکستری تیره برای کارت‌ها)

Primary: #D4AF37 (طلایی)

Secondary: #8B4513 (قهوه‌ای سوخته)

Text: #F5F5F5 (سفید شکری)

Accent: #E0C097 (کرم طلایی برای هایلایت)

تایپوگرافی:

عناوین: Playfair Display (وزن ۷۰۰، سایز ۴۸px+)

متن: Vazirmatn (وزن ۴۰۰، سایز ۱۶px، line-height: 1.8)

افکت‌ها:

Glassmorphism ملایم روی کارت‌ها (blur + شفافیت).

سایه‌های نرم و عمیق (box-shadow: 0 20px 40px rgba(0,0,0,0.5)).

بافت Noise بسیار ملایم روی پس‌زمینه برای حس لوکس بودن.

۵. سناریوی انیمیشن با GSAP (GSAP Animation Scenarios)
این بخش قلب پروژه است. Cursor باید دقیقاً این انیمیشن‌ها را پیاده‌سازی کند:

۵.۱. صفحه Hero (ورود)
انیمیشن:

لوگو با scale از ۰.۸ به ۱ و opacity از ۰ به ۱ (مدت: ۱.۲s، ease: power3.out).

عنوان با y از ۵۰ به ۰ و opacity (تاخیر: ۰.۳s).

دکمه شروع با scale پالس ملایم (تکرار بی‌نهایت).

تعامل: با هاور روی دکمه، یک افکت درخشش طلایی (Glow) با GSAP ایجاد شود.

۵.۲. ترنزیشن بین سوالات (Core Experience)
ورود سوال جدید:

کارت سوال با clip-path از یک دایره کوچک به مربع کامل باز شود (مدت: ۰.۸s، ease: expo.inOut).

گزینه‌ها یکی‌یکی با stagger: 0.1 و y: 20 وارد شوند.

خروج سوال قبلی:

کارت با opacity: 0 و scale: 0.95 محو شود.

نوار پیشرفت: با هر پاسخ، نوار با width انیمیت شود (مدت: ۰.۵s، ease: power2.out).

۵.۳. صفحه نتیجه (The Reveal)
انیمیشن:

ابتدا یک دایره طلایی از مرکز صفحه باز می‌شود (مثل باز شدن یک پرده).

سپس کارت نتیجه با rotationX: 90 به rotationX: 0 بچرخد (افکت 3D).

درصد عربیکا و روبوستا با شمارنده عددی (Number Counter) از ۰ تا مقدار نهایی انیمیت شوند.

توضیحات با text-reveal (کلمه به کلمه) ظاهر شوند.

تعامل: با هاور روی کارت نتیجه، یک افکت tilt سه‌بعدی (3D Tilt) با GSAP اعمال شود.

۶. ساختار کامپوننت‌ها (Component Structure)
text
/app
layout.tsx # RTL, Fonts, Global Styles
page.tsx # Main Orchestrator (Zustand Store)
/components
/hero
Hero.tsx # GSAP Entry Animation
/quiz
QuizContainer.tsx # GSAP Transition Logic
QuestionCard.tsx # Single Question UI
OptionButton.tsx # Animated Button
ProgressBar.tsx # GSAP Width Animation
/result
ResultCard.tsx # 3D Flip & Counter Animation
CoffeeBadge.tsx # Visual Representation of Blend
/ui
Button.tsx # Shadcn based
Card.tsx # Glassmorphism Card
/store
useQuizStore.ts # Zustand Store (State, Actions)
/lib
gsap.ts # GSAP Configuration & Custom Eases
calculator.ts # Logic Functions
/data
questions.ts # Static Data
۷. پیاده‌سازی Zustand Store (نمونه)
typescript
// store/useQuizStore.ts
import { create } from 'zustand';

interface QuizState {
currentStep: number;
answers: Record<number, number>; // questionId -> score
result: CoffeeType | null;
setAnswer: (questionId: number, score: number) => void;
nextStep: () => void;
calculateResult: () => void;
reset: () => void;
}
۸. بهینه‌سازی پرفورمنس (Performance Optimization)
GSAP: استفاده از gsap.context() برای مدیریت و پاکسازی انیمیشن‌ها در useEffect.

Next.js: استفاده از dynamic import برای کامپوننت‌های سنگین (مثل ResultCard) با ssr: false.

تصاویر: استفاده از next/image با فرمت WebP و priority برای تصاویر Hero.

فونت: استفاده از next/font برای بارگذاری بهینه فونت‌ها.

کد: عدم استفاده از کتابخانه‌های سنگین اضافی. همه چیز با GSAP و Tailwind مدیریت شود.

۹. پرامپت نهایی برای Cursor (کپی کنید)
"You are an expert Next.js and GSAP developer. Build a luxury coffee quiz app called 'Coffeeno' with the following specs:

Tech: Next.js 14 (App Router), TypeScript, Tailwind CSS, Zustand, GSAP 3, Shadcn/ui.
Design: Dark mode, Luxury feel. Colors: Background #0A0A0A, Primary Gold #D4AF37, Text #F5F5F5. Fonts: Vazirmatn (Persian) + Playfair Display (English). Use Glassmorphism on cards.

Structure:

Data: Create data/questions.ts with 8 questions based on the Coffeeno poster. Each option has a score (1-10).

Logic: In lib/calculator.ts, implement the scoring logic: Sum of Q1-Q6. Arabica = Sum/2, Robusta = Sum\*2. Difference determines 5 types (100% Arabica to 100% Robusta).

State: Use Zustand for currentStep, answers, and result.

UI Components:

Hero: GSAP entry animation (fade + scale).

QuizContainer: GSAP transition between questions using clip-path and stagger for options.

ProgressBar: GSAP width animation.

ResultCard: 3D Flip animation, Number counter for percentages, and text reveal.

Performance: Use gsap.context() for cleanup. Lazy load ResultCard.

Make it feel like a premium experience. Add subtle hover effects on buttons. Ensure RTL layout works perfectly."
