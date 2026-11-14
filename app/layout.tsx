import type { Metadata } from "next";
import { Pirata_One, IM_Fell_English, Pixelify_Sans } from "next/font/google";
import { SITE } from "@/lib/config";
import MenuBar from "@/components/MenuBar";
import "./globals.css";


const display = Pirata_One({ subsets: ["latin"], weight: "400", variable: "--display" });
const body = IM_Fell_English({ subsets: ["latin"], weight: "400", variable: "--body" });
const ui = Pixelify_Sans({ subsets: ["latin"], variable: "--ui" });

export const metadata: Metadata = {
  title: { default: SITE.name, template: `%s · ${SITE.name}` },
  description: SITE.tagline,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${ui.variable}`}>
      <body>
        <MenuBar />
        {children}
      </body>
    </html>
  );
}