import type { Metadata } from "next";
import { Playfair_Display, Vazirmatn } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coffeeno | تست انتخاب قهوه",
  description:
    "تجربه لوکس کشف ترکیب ایده‌آل عربیکا و روبوستا — تست انتخاب قهوه کوفینو",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${playfair.variable} ${vazirmatn.variable} bg-atmosphere font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
