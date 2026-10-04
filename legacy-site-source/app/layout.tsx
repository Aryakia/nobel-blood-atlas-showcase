import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nobel Blood Atlas",
  description: "An evidence-graded atlas comparing named Nobel laureate blood-type reports with worldwide and country-matched population baselines.",
  other: { "codex-preview": "development" },
  openGraph: {
    title: "Nobel Blood Atlas",
    description: "Actual person-level blood-type reports, expected population counts, evidence grades, conflicts, and high-school countries.",
    type: "website",
    url: "https://nobel-blood-atlas.aryakia97.chatgpt.site",
    images: [{
      url: "https://nobel-blood-atlas.aryakia97.chatgpt.site/og.png",
      width: 1730,
      height: 909,
      alt: "Nobel Blood Atlas — Prize fields, high-school countries, and verified blood types",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nobel Blood Atlas",
    description: "Actual Nobel blood-type reports versus expected population baselines.",
    images: ["https://nobel-blood-atlas.aryakia97.chatgpt.site/og.png"],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
