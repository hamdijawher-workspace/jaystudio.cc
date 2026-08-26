"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { caseStudies } from "@/lib/content";
import { SiteFooter, SiteNav } from "@/components/site-chrome";

export function CaseStudiesStack() {
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const cards = stage.current?.querySelectorAll<HTMLElement>(".case-feature");
    if (!cards) return;
    const onScroll = () => cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, (window.innerHeight * 0.5 - (rect.top + rect.height * 0.5)) / window.innerHeight));
      card.style.setProperty("--case-shift", `${progress * (index % 2 ? -22 : 22)}px`);
    });
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <main className="case-index-page"><SiteNav />
      <header className="case-index-hero"><span className="eyebrow">Selected case studies</span><h1>Ideas with<br /><em>somewhere to go.</em></h1><div><p>We connect the thinking, the making and the rollout so each project works as a complete media system.</p><span>03 projects</span></div></header>
      <div className="case-feature-list" ref={stage}>
        {caseStudies.map((study) => <a className="case-feature" href={`/case-studies/${study.slug}`} key={study.slug} data-cursor="project" data-cursor-label="Take a look">
          <div className="case-feature__media"><img src={study.cover} alt="" /><div>Take a look <ArrowUpRight /></div></div>
          <div className="case-feature__copy"><span>{study.client} / {study.season}</span><h2>{study.title}</h2><p>{study.positioning}</p><ul>{study.role.slice(0, 3).map((role) => <li key={role}>{role}</li>)}</ul></div>
        </a>)}
      </div>
      <section className="case-index-end"><span>Different brief?</span><a href="/contact">Let’s build the right system.<ArrowUpRight /></a></section>
      <SiteFooter />
    </main>
  );
}
