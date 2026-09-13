import type { CoffeeType } from "@/types";

export const coffeeTypes: CoffeeType[] = [
  {
    id: 1,
    title: "تیپ ۱: لطیف و عطری",
    arabicaPercent: 100,
    robustaPercent: 0,
    description:
      "عطر بالا، طعم ملایم و اسیدیته متعادل. انتخابی ظریف برای کسانی که رایحه و لطافت را به تلخی ترجیح می‌دهند.",
    color: "#C45C4A",
  },
  {
    id: 2,
    title: "تیپ ۲: عربیکای متعادل",
    arabicaPercent: 70,
    robustaPercent: 30,
    description:
      "طعم متعادل با عطر خوب و تلخی ملایم. ترکیبی محبوب برای نوشیدن روزمره با شخصیت عربیکا.",
    color: "#D4894A",
  },
  {
    id: 3,
    title: "تیپ ۳: متعادل و محبوب",
    arabicaPercent: 50,
    robustaPercent: 50,
    description:
      "تعادل در طعم، عطر و قدرت. ترکیبی همه‌پسند که هم کرما دارد و هم رایحه.",
    color: "#6B8F71",
  },
  {
    id: 4,
    title: "تیپ ۴: قوی و کرمی",
    arabicaPercent: 30,
    robustaPercent: 70,
    description:
      "تلخی بیشتر، کرمای عالی و قدرت بالا. مناسب اسپرسو و کسانی که بدنه سنگین می‌خواهند.",
    color: "#4A7BA7",
  },
  {
    id: 5,
    title: "تیپ ۵: خیلی قوی و تلخ",
    arabicaPercent: 20,
    robustaPercent: 80,
    description:
      "تلخی و قدرت بالا با ماندگاری طولانی. برای علاقه‌مندان به قهوه سنگین و پرشخصیت.",
    color: "#7B5EA7",
  },
];
