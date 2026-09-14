"use client";

import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { VideoPlayer } from "@/components/video-player";
import { MotionContext, PhoneFilm } from "@/components/motion-media";
import { films } from "@/lib/content";
import type { Film } from "@/lib/content";
import { services } from "@/lib/services";
import { WelcomeIntro } from "@/components/welcome-intro";

const chapters = [
  { film: films[2], name: "Aurea", title: ["Beyond", "ordinary."], category: "Hospitality / Campaign", copy: "A world of anticipation. A poolside reveal. An experience that begins before you arrive.", image: "/projects/aurea-event/aurea-event-01.jpg", tone: "olive" },
  { film: films[0], name: "Delishio", title: ["A taste", "of summer."], category: "Lifestyle / Social film", copy: "Cold in your hand. Summer on your mind. A sensory story made for the small screen.", image: films[0].image, tone: "peach" },
  { film: films[3], name: "Sidi Bou Said", title: ["Follow", "the feeling."], category: "Destination / Creator story", copy: "Some places stay with you. A closer look at the people, colour and rhythm of the blue city.", image: films[3].image, tone: "blue" }
];

export function CinematicHome() {
  const root = useRef<HTMLElement>(null);
  const [motion, setMotion] = useState(true);
  const [activeFilm, setActiveFilm] = useState<Film | null>(null);
  const [service, setService] = useState(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotion(!preference.matches);
    update(); preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element || !motion) return;
    const scenes = Array.from(element.querySelectorAll<HTMLElement>("[data-cinema-scene]"));
    let frame = 0;
    const clamp = (n: number) => Math.max(0, Math.min(1, n));
    const update = () => {
      frame = 0;
      const height = window.innerHeight;
      for (const scene of scenes) {
        const bounds = scene.getBoundingClientRect();
        const travel = Math.max(1, bounds.height - height);
        const progress = clamp(-bounds.top / travel);
        const entrance = clamp((height - bounds.top) / (height * .82));
        scene.style.setProperty("--progress", progress.toFixed(4));
        scene.style.setProperty("--entrance", entrance.toFixed(4));
        scene.style.setProperty("--drift", `${((height / 2 - bounds.top - bounds.height / 2) / height) * 65}px`);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, [motion]);


  return <MotionContext.Provider value={motion && !activeFilm}><main ref={root} className={`cinema-home ${motion ? "motion-on" : "motion-off"} ${entered ? "has-entered" : "is-entering"}`}>
    <WelcomeIntro onComplete={() => setEntered(true)} />
    <SiteNav />
    <section className="cinema-hero" data-cinema-scene>
      <div className="cinema-hero__stage">
        <div className="cinema-hero__picture"><img src="/projects/mprv-pool-hero.jpg" alt="Sunset over a cinematic garden pool overlooking the coast" fetchPriority="high" /><div className="cinema-hero__shade" /></div>
        <div className="cinema-hero__copy"><span className="cinema-kicker">Independent creative studio / MENA + Worldwide</span><h1><span>Welcome to MPRV Co.</span><strong>We make brands felt<span className="cinema-dot">.</span></strong></h1><p>Creative direction, film production, UGC and digital experiences—<br className="cinema-hero__desktop-break" />built for how people watch, share and remember.</p><a href="#selected-work" className="glass-button">View selected work <ArrowDown size={16} /></a></div>
        <div className="cinema-hero__edition"><span>MPRV CO.</span><span>A different point of view.</span></div>
      </div>
    </section>

    <section className="cinema-intro" data-cinema-scene><div className="cinema-section-label"><span>01 / Selected work</span><span>Film. Feeling. Impact.</span></div><h2>A different perspective.</h2></section>

    <div className="cinema-chapters" id="selected-work">{chapters.map((chapter, index) => <section className={`cinema-chapter tone-${chapter.tone}`} data-cinema-scene key={chapter.name} aria-label={`${chapter.name} featured project`}>
      <div className="cinema-chapter__sticky"><div className="cinema-chapter__card">
        <div className="cinema-chapter__ambient"><img src={chapter.image} alt="" loading="lazy" /></div>
        <div className="cinema-chapter__meta"><span>{chapter.category}</span><span>0{index + 1} / 03</span></div>
        <div className="cinema-chapter__copy"><span className="cinema-kicker">{chapter.name}</span><h2>{chapter.title[0]}<br /><em>{chapter.title[1]}</em></h2><p>{chapter.copy}</p><button className="glass-button" onClick={() => setActiveFilm(chapter.film)}>Enter the story <ArrowUpRight size={17} /></button></div>
        <div className="cinema-chapter__device"><PhoneFilm film={chapter.film} onPlay={() => setActiveFilm(chapter.film)} /><span className="cinema-device-note">Made for the way we watch.</span></div>
        <div className="cinema-chapter__line" aria-hidden="true"><i /></div>
      </div></div>
    </section>)}</div>

    <div className="all-work-link"><span>There’s more to the story.</span><a className="cinema-text-link" href="/works/">Enter the film room <ArrowUpRight size={18} /></a></div>

    <section className="cinema-services" id="services" data-cinema-scene><div className="cinema-section-label"><span>02 / From idea to impact</span><span>One studio. Every expression.</span></div><div className="cinema-services__layout"><div className="cinema-services__intro"><h2>A singular vision.<br /><em>Many possibilities.</em></h2><div className="cinema-services__image"><img key={service} src={services[service].image} alt={services[service].title} loading="lazy" /></div></div><div className="cinema-services__list">{services.map((item, index) => <div className={`cinema-service ${service === index ? "is-active" : ""}`} key={item.slug}><button onClick={() => setService(index)} aria-expanded={service === index} aria-controls={`service-${index}`}><span>{item.number}</span><h3>{item.title}</h3><span className="cinema-service__plus">{service === index ? "−" : "+"}</span></button><div id={`service-${index}`} className="cinema-service__detail" hidden={service !== index}><p>{item.copy}</p><a href={`/services/${item.slug}`} className="cinema-text-link">Explore the possibilities <ArrowUpRight size={16} /></a></div></div>)}</div></div></section>
    <SiteFooter />
    <button className="cinema-motion-control" onClick={() => setMotion(!motion)} aria-label={motion ? "Pause background motion" : "Enable background motion"} aria-pressed={!motion}>{motion ? <Pause size={12} /> : <Play size={12} />}<span>{motion ? "Pause motion" : "Motion paused"}</span></button>
    <VideoPlayer film={activeFilm} index={Math.max(0, films.indexOf(activeFilm!))} onClose={() => setActiveFilm(null)} onChange={(index) => setActiveFilm(films[index])} />
  </main></MotionContext.Provider>;
}
