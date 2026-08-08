"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { caseStudies } from "@/lib/content";
import { SiteFooter, SiteNav } from "@/components/site-chrome";

export function CaseStudiesStack() {
  const stageRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const stage = stageRef.current;
      if (!stage) return;
      const bounds = stage.getBoundingClientRect();
      const travel = Math.max(1, stage.offsetHeight - window.innerHeight);
      setProgress(Math.max(0, Math.min(1, -bounds.top / travel)));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  return (
    <main className="case-stack-page">
      <SiteNav dark />
      <header className="case-stack-intro"><span className="eyebrow">Case studies</span><h1>SELECTED<br />WORK</h1><p>Campaigns developed from first thought to final frame.</p></header>
      <section className="case-stack-stage" ref={stageRef}>
        <div className="case-stack-stage__sticky">
          <span className="case-stack-stage__label">Scroll to explore / {String(Math.min(caseStudies.length, Math.floor(progress * caseStudies.length) + 1)).padStart(2, "0")} — 0{caseStudies.length}</span>
          <div className="case-stack-cards">
            {caseStudies.map((study, index) => {
              const position = index - progress * (caseStudies.length - 1);
              const style = { transform: `translate3d(${position * 118}px, ${position * 18}px, ${-Math.abs(position) * 30}px) rotate(${position * 2.2}deg) scale(${1 - Math.min(.08, Math.abs(position) * .025)})`, zIndex: 20 - Math.round(Math.abs(position) * 5) };
              return <a className={`case-stack-card ${Math.abs(position) < .5 ? "is-current" : ""}`} href={`/case-studies/${study.slug}`} style={style} key={study.slug}>
                <img src={study.cover} alt="" />
                <div className="case-stack-card__shade" />
                <span className="case-stack-card__number">0{index + 1}</span>
                <span className="case-stack-card__arrow"><ArrowRight /></span>
                <div className="case-stack-card__copy"><small>{study.client} / {study.season}</small><strong>{study.title}</strong><em>{study.positioning}</em></div>
              </a>;
            })}
          </div>
        </div>
      </section>
      <SiteFooter dark />
    </main>
  );
}
