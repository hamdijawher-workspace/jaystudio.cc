"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { VideoPlayer } from "@/components/studio-site";
import { films } from "@/lib/content";
import type { Film } from "@/lib/content";
import { PhoneFilm } from "@/components/motion-media";
import { MotionContext } from "@/components/motion-media";

type Filter = "All" | "UGC" | "Production" | "Campaigns";
type Work = { title: string; label: string; image: string; filters: Filter[]; film: Film };

const works: Work[] = [
  { title: "Taste the cold", label: "Delishio / UGC + social film", image: films[0].image, film: films[0], filters: ["All", "UGC", "Production", "Campaigns"] },
  { title: "Beyond ordinary", label: "Aurea / Campaign production", image: films[2].image, film: films[2], filters: ["All", "Production", "Campaigns"] },
  { title: "The blue story", label: "Sidi Bou Said / Creator travel story", image: films[3].image, film: films[3], filters: ["All", "UGC", "Production"] },
  { title: "The first reveal", label: "Aurea / Teaser film", image: films[1].image, film: films[1], filters: ["All", "Production", "Campaigns"] }
];

export function WorksPage() {
  const filters: Filter[] = ["All", "UGC", "Production", "Campaigns"];
  const [filter, setFilter] = useState<Filter>("All");
  const [film, setFilm] = useState<Film | null>(null);
  const visible = works.filter((work) => work.filters.includes(filter));
  return (
    <main className="archive-page"><SiteNav />
      <header className="archive-intro"><span className="eyebrow">MPRV Co. / Selected work</span><h1>The film room<span className="cinema-dot">.</span></h1><p>Campaigns, creator stories and films. Choose a project. Press play.</p></header>
      <nav className="archive-filters" aria-label="Filter work">{filters.map((item) => <button className={filter === item ? "is-active" : ""} type="button" onClick={() => setFilter(item)} key={item}>{item}</button>)}</nav>
      <MotionContext.Provider value={!film}><section className="archive-grid">
        {visible.map((work, index) => <article className={`archive-card archive-card--${index % 3}`} key={work.title}>
          <PhoneFilm film={work.film} onPlay={() => setFilm(work.film)} />
          <div><span>{work.label}</span><strong>{work.title}</strong></div>
        </article>)}
      </section></MotionContext.Provider>
      <section className="archive-cta"><span>Need a content system?</span><a href="/contact" data-cursor="cta" data-cursor-label="Brief us">Bring us the brief.<ArrowUpRight /></a></section>
      <SiteFooter />
      <VideoPlayer film={film} index={Math.max(0, films.findIndex((item) => item.title === film?.title))} onClose={() => setFilm(null)} onChange={(index) => setFilm(films[index])} />
    </main>
  );
}
