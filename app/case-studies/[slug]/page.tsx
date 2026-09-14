import { WorksPage } from "@/components/works-page";
import { caseStudies } from "@/lib/content";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export default function LegacyCaseStudyPage() {
  return <WorksPage />;
}
