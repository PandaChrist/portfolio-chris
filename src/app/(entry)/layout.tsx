import type { Metadata } from "next";
import "../globals.css";

/**
 * Second root layout, for the `/` entry page only.
 *
 * Next allows one root layout per route group as long as there is no
 * `app/layout.tsx`. That is what lets the real site keep its root layout under
 * `(site)/[lang]`, where `<html lang>` can be the page's actual language,
 * while `/` still resolves to a page instead of a 404.
 */
export const metadata: Metadata = {
  title: "Christian Bakiti Kamga — Ingénieur Full Stack & DevOps",
  description:
    "Ingénieur full stack et DevOps à Yaoundé. Portfolio disponible en français et en anglais.",
};

export default function EntryLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-ink">{children}</body>
    </html>
  );
}
