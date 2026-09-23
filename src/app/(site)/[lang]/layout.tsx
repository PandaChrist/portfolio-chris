import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import "../../globals.css";
import { getDict } from "@/content/site";
import { asLang, langs } from "@/lib/i18n";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/layout/Cursor";
import Loader from "@/components/layout/Loader";
import SmoothScroll from "@/components/layout/SmoothScroll";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Syne carries the display type: geometric, slightly odd, and it holds up at the
// sizes the hero uses without looking like a default system stack.
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

/**
 * This is the root layout: it lives under [lang] so that <html lang> is the real
 * language of the page rather than a value patched in on the client.
 */
export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = asLang((await params).lang);
  const dict = getDict(lang);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: lang === "fr" ? "fr_FR" : "en_GB",
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const lang = asLang((await params).lang);

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden bg-ink">
        <SmoothScroll />
        <Cursor />
        <Loader name={getDict(lang).loader.name} hint={getDict(lang).loader.hint} />

        <Nav lang={lang} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} />

        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
