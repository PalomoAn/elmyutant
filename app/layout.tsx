import type { Metadata } from "next";
import { Pirata_One, IM_Fell_English, Pixelify_Sans } from "next/font/google";
import { SITE } from "@/lib/config";
import MenuBar from "@/components/MenuBar";
import "./globals.css";
import { FX_SCRIPT } from "@/lib/fx";
import DesktopIcons from "@/components/DesktopIcons"

const display = Pirata_One({ subsets: ["latin"], weight: "400", variable: "--display" });
const body = IM_Fell_English({ subsets: ["latin"], weight: "400", variable: "--body" });
const ui = Pixelify_Sans({ subsets: ["latin"], variable: "--ui" });

export const metadata: Metadata = {
  title: { default: SITE.name, template: `%s · ${SITE.name}` },
  description: SITE.tagline,
  metadataBase: new URL("https://elmyutant.vercel.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${ui.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: FX_SCRIPT }} />
      </head>
      <body>
        <MenuBar />
        <DesktopIcons />
        {children}
      </body>
    </html>
  );
}