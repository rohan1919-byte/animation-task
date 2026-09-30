import "./globals.css";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", weight: ["500", "700", "800"] });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: "Itzfizz — Scroll-driven hero",
  description: "A GSAP + Next.js scroll animation: the car drives as you scroll.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body text-harbor bg-haze">{children}</body>
    </html>
  );
}
