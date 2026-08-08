import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/content";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { Parallax, Reveal } from "@/components/motion";

export function CaseStudiesIndex() {
  return (
    <main className="editorial-page case-index">
      <SiteNav />
      <section className="case-index__intro">
        <span className="eyebrow">Selected case studies</span>
        <h1>Campaigns with<br />a point of view.</h1>
        <p>Creative direction, film, photography and digital experiences developed around an idea.</p>
      </section>
      <section className="case-index__list">
        {caseStudies.map((study, index) => (
          <Reveal className="case-index__reveal" key={study.slug}>
            <a className="case-index__card" href={`/case-studies/${study.slug}`}>
            <Parallax className="case-index__media">
              <img src={study.cover} alt="" />
              <span className="case-index__number">0{index + 1}</span>
              <span className="case-index__enter"><ArrowRight /></span>
            </Parallax>
            <div className="case-index__caption">
              <div><span>{study.client} / {study.season}</span><h2>{study.title}</h2></div>
              <p>{study.positioning}</p>
            </div>
            </a>
          </Reveal>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
