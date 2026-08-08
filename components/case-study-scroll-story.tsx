"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CaseStudy } from "@/lib/content";

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

export function CaseStudyScrollStory({ study }: { study: CaseStudy }) {
  const storyRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const story = storyRef.current;
      if (!story) return;
      const rect = story.getBoundingClientRect();
      const travel = Math.max(1, story.offsetHeight - window.innerHeight);
      setProgress(clamp(-rect.top / travel));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  const scenes = [
    { label: "The direction", title: "The idea enters the room.", copy: study.direction, image: study.gallery[0], kind: "image" },
    { label: "Visual progression", title: "Anticipation becomes experience.", copy: "", image: study.gallery[1] ?? study.gallery[0], kind: "chapters" },
    { label: "Moodboard / photography", title: "A world made from light, colour and rhythm.", copy: study.note ?? "A reference board assembled from the project's visual language and produced work.", image: study.moodboard ?? study.gallery[2] ?? study.gallery[0], kind: "board" },
    { label: "Deliverables", title: "The idea, brought to life.", copy: "Film, photography and campaign assets directed as one coherent visual world.", image: study.cover, kind: "deliverables" }
  ];

  return (
    <section className="case-story" ref={storyRef}>
      <div className="case-story__sticky">
        <div className="case-story__progress"><span>Scroll story</span><i><b style={{ width: `${progress * 100}%` }} /></i><span>{String(Math.min(scenes.length, Math.floor(progress * scenes.length) + 1)).padStart(2, "0")} / 0{scenes.length}</span></div>
        {scenes.map((scene, index) => {
          const sceneProgress = clamp(progress * scenes.length - index);
          const entering = index === 0 ? clamp(.18 + sceneProgress * 1.7) : clamp(sceneProgress * 2);
          const leaving = clamp((sceneProgress - .58) * 2.4);
          const depth = index === 0 ? 0 : index * -30;
          const style = {
            opacity: entering * (1 - leaving * .92),
            transform: `translate3d(0, ${(1 - entering) * 11 - leaving * 15}%, ${depth + entering * 40}px) rotateX(${(1 - entering) * 5 + leaving * -5}deg) scale(${.92 + entering * .08 - leaving * .04})`
          };
          return <article className={`case-story__scene case-story__scene--${scene.kind}`} style={style} key={scene.label}>
            <div className="case-story__scene-copy"><span className="eyebrow">{scene.label}</span><h2>{scene.title}</h2>{scene.copy && <p>{scene.copy}</p>}</div>
            <div className="case-story__visual">
              {scene.kind === "board" ? <img src={scene.image} alt={`${study.client} moodboard reference`} /> : <img src={scene.image} alt="" />}
              <span className="case-story__visual-index">0{index + 1}</span>
            </div>
            {scene.kind === "chapters" && <div className="case-story__chapter-list">{study.process.map((chapter, chapterIndex) => <span key={chapter}><b>0{chapterIndex + 1}</b>{chapter}</span>)}</div>}
            {scene.kind === "deliverables" && <div className="case-story__deliverable-list">{study.deliverables.map((item) => <span key={item}>{item}<ArrowRight /></span>)}</div>}
          </article>;
        })}
      </div>
    </section>
  );
}
