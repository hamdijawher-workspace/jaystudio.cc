"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { CaseStudy } from "@/lib/content";
import { VideoPlayer } from "@/components/studio-site";
import type { Film } from "@/lib/content";

type Deliverable = {
  type: string;
  item: string;
  kind: "video" | "image";
  src: string;
  poster?: string;
  film?: Film;
};

function getDeliverables(study: CaseStudy): Deliverable[] {
  const rows: Deliverable[] = study.deliverables.map((item) => {
    const matchingFilm = item.toLowerCase().includes("teaser") ? study.films[0] : item.toLowerCase().includes("reveal") ? study.films[1] : undefined;
    return {
    type: "Campaign asset",
    item,
    kind: matchingFilm ? "video" : "image",
    src: matchingFilm?.playbackVideo ?? study.gallery[0] ?? study.cover,
    poster: matchingFilm?.image ?? study.cover,
    film: matchingFilm
    };
  });
  study.films.forEach((film) => rows.push({ type: "Film outcome", item: film.title, kind: "video", src: film.playbackVideo, poster: film.image, film }));
  rows.push({ type: "Photography outcome", item: `${study.gallery.length} campaign stills`, kind: "image", src: study.gallery[0] ?? study.cover });
  return rows;
}

export function DeliverablesTable({ study }: { study: CaseStudy }) {
  const rows = getDeliverables(study);
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (selected === null) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setSelected(null); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", closeOnEscape); };
  }, [selected]);

  const preview = hovered === null ? null : rows[hovered];
  const active = selected === null ? null : rows[selected];

  return <>
    <div className="deliverables-table__rows">
      {rows.map((row, index) => <button className={`deliverables-table__row ${hovered === index ? "is-hovered" : ""}`} type="button" key={`${row.type}-${row.item}`} onMouseEnter={(event) => { setHovered(index); setPointer({ x: event.clientX, y: event.clientY }); }} onMouseMove={(event) => setPointer({ x: event.clientX, y: event.clientY })} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(index)} onBlur={() => setHovered(null)} onClick={() => setSelected(index)}>
        <span>0{index + 1}</span><strong>{row.item}</strong><em>{row.type}</em><i>View</i>
      </button>)}
    </div>
    {preview && <div className="deliverables-hover-preview" style={{ left: `${pointer.x}px`, top: `${pointer.y + 18}px` }} aria-hidden="true">{preview.kind === "video" ? <video src={preview.src} poster={preview.poster} muted autoPlay loop playsInline /> : <img src={preview.src} alt="" />}<span>Click to open</span></div>}
    {active && active.kind === "video" && active.film && <VideoPlayer film={active.film} index={0} onClose={() => setSelected(null)} onChange={() => undefined} />}
    {active && active.kind === "image" && <div className="deliverable-lightbox" role="dialog" aria-modal="true" aria-label={active.item}>
      <button className="deliverable-lightbox__backdrop" type="button" onClick={() => setSelected(null)} aria-label="Close media" />
      <div className="deliverable-lightbox__media"><img src={active.src} alt={active.item} /><button className="deliverable-lightbox__close" type="button" onClick={() => setSelected(null)} aria-label="Close media"><X /></button><strong>{active.item}</strong></div>
    </div>}
  </>;
}
