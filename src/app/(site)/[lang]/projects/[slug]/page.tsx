import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/sections/ProjectDetail";
import { getProject, projects } from "@/content/projects";

/** English case-study route; the French tree lives at /fr/projets/[slug]. */
export function generateStaticParams() {
  return projects.map((project) => ({ lang: "en", slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const copy = project.copy.en;
  return {
    title: `${copy.title} — Christian Bakiti Kamga`,
    description: copy.tagline,
    openGraph: { title: copy.title, description: copy.tagline, locale: "en_GB" },
  };
}

export default async function EnglishProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectDetail project={project} lang="en" />;
}
