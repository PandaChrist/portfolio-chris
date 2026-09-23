import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";
import { asLang, langs } from "@/lib/i18n";

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);

  return (
    <>
      <Hero lang={lang} />
      <About lang={lang} />
      <Skills lang={lang} />
      <Experience lang={lang} />
      <Work lang={lang} />
      <Contact lang={lang} />
    </>
  );
}
