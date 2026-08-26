"use client";

import { ArrowUpRight, Images, Play, X } from "lucide-react";
import { useState } from "react";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { VideoPlayer } from "@/components/studio-site";
import { films } from "@/lib/content";
import type { Film } from "@/lib/content";

type Filter = "All" | "UGC" | "Production" | "Campaigns" | "Photography";
type Work = { title: string; label: string; image: string; filters: Filter[]; film?: Film; gallery?: string[] };

const gallery = [1, 2, 3, 4, 5, 7, 9].map((number) => `/projects/aurea-event/aurea-event-${String(number).padStart(2, "0")}.jpg`);
const works: Work[] = [
  { title: "Taste the cold", label: "Delishio / UGC + social film", image: films[0].image, film: films[0], filters: ["All", "UGC", "Production", "Campaigns"] },
  { title: "Beyond ordinary", label: "Aurea / Campaign production", image: films[2].image, film: films[2], filters: ["All", "Production", "Campaigns"] },
  { title: "The blue story", label: "Sidi Bou Said / Creator travel story", image: films[3].image, film: films[3], filters: ["All", "UGC", "Production"] },
  { title: "Aurea launch", label: "Aurea / Event photography", image: gallery[3], gallery, filters: ["All", "Photography", "Campaigns"] },
  { title: "The first reveal", label: "Aurea / Teaser film", image: films[1].image, film: films[1], filters: ["All", "Production", "Campaigns"] }
];

export function WorksPage() {
  const filters: Filter[] = ["All", "UGC", "Production", "Campaigns", "Photography"];
  const [filter, setFilter] = useState<Filter>("All");
  const [film, setFilm] = useState<Film | null>(null);
  const [photo, setPhoto] = useState<number | null>(null);
  const visible = works.filter((work) => work.filters.includes(filter));
  return (
    <main className="archive-page"><SiteNav />
      <header className="archive-intro"><span className="eyebrow">The work / 2026</span><h1>Made to be<br />watched, shared<br /><em>and remembered.</em></h1><p>Campaigns, UGC, film and photography—built as connected media, not isolated deliverables.</p></header>
      <nav className="archive-filters" aria-label="Filter work">{filters.map((item) => <button className={filter === item ? "is-active" : ""} type="button" onClick={() => setFilter(item)} key={item}>{item}</button>)}</nav>
      <section className="archive-grid">
        {visible.map((work, index) => <article className={`archive-card archive-card--${index % 3}`} key={work.title}>
          <button type="button" onClick={() => work.film ? setFilm(work.film) : setPhoto(0)} data-cursor="project" data-cursor-label="Take a look">
            <img src={work.image} alt="" /><span className="archive-card__kind">{work.film ? <Play /> : <Images />}</span><span className="archive-card__takeover">Take a look <ArrowUpRight /></span>
          </button>
          <div><span>{work.label}</span><strong>{work.title}</strong></div>
        </article>)}
      </section>
      <section className="archive-cta"><span>Need a content system?</span><a href="/contact" data-cursor="cta" data-cursor-label="Brief us">Bring us the brief.<ArrowUpRight /></a></section>
      <SiteFooter />
      <VideoPlayer film={film} index={Math.max(0, films.findIndex((item) => item.title === film?.title))} onClose={() => setFilm(null)} onChange={(index) => setFilm(films[index])} />
      {photo !== null && <div className="photo-lightbox" role="dialog" aria-modal="true"><button className="photo-lightbox__backdrop" onClick={() => setPhoto(null)} aria-label="Close gallery" /><div className="photo-lightbox__stage"><button className="photo-lightbox__close" onClick={() => setPhoto(null)} aria-label="Close"><X /></button><img src={gallery[photo]} alt={`Aurea campaign photograph ${photo + 1}`} /><div><span>{String(photo + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span><button onClick={() => setPhoto((photo - 1 + gallery.length) % gallery.length)}>Previous</button><button onClick={() => setPhoto((photo + 1) % gallery.length)}>Next</button></div></div></div>}
    </main>
  );
}
