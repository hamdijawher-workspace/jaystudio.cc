import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getCaseStudy, caseStudies } from "@/lib/content";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { Parallax, Reveal } from "@/components/motion";
import { CaseStudyScrollStory } from "@/components/case-study-scroll-story";
import { DeliverablesTable } from "@/components/deliverables-table";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const currentIndex = caseStudies.findIndex((item) => item.slug === study.slug);
  const next = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <main className="case-study-page">
      <SiteNav dark />
      <section className="case-study-hero">
        <div className="case-study-hero__copy"><span className="eyebrow">{study.client} / {study.season}</span><div className="case-study-hero__text"><h1>{study.title}</h1><p>{study.positioning}</p></div></div>
        <Parallax className="case-study-hero__media">
          {study.heroVideo ? <video src={study.heroVideo} poster={study.cover} autoPlay muted loop playsInline /> : <img src={study.cover} alt="" />}
        </Parallax>
      </section>
      <Reveal><section className="case-study-intro"><span className="eyebrow">The campaign</span><div><h2>From anticipation<br />to experience.</h2><div><p>{study.brief}</p><p>{study.idea}</p></div></div></section></Reveal>
      <CaseStudyScrollStory study={study} />
      <section className="deliverables-table"><span className="eyebrow">Complete deliverables</span><h2>Everything created<br />for the campaign.</h2><DeliverablesTable study={study} /></section>
      <a className="case-study-next" href={`/case-studies/${next.slug}`}><span>Next case study</span><strong>{next.client} / {next.title}</strong><ArrowRight /></a>
      <SiteFooter dark />
    </main>
  );
}
