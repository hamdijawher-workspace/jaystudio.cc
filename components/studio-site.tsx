"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiteFooter, SiteNav, Wordmark } from "@/components/site-chrome";
import { films } from "@/lib/content";
import type { Film } from "@/lib/content";
import { services } from "@/lib/services";

const homeProjects = [
  { title: "Taste the cold", client: "Delishio", type: "UGC & social film", image: films[0].image, href: "/case-studies/delishio-summer-26" },
  { title: "The first reveal", client: "Aurea", type: "Campaign teaser", image: films[1].image, href: "/case-studies/aurea-beyond-ordinary" },
  { title: "Beyond ordinary", client: "Aurea", type: "Production & photography", image: films[2].image, href: "/case-studies/aurea-beyond-ordinary" },
  { title: "The blue story", client: "Sidi Bou Said", type: "Creator travel story", image: films[3].image, href: "/case-studies/sidi-bou-said-the-blue-story" }
];

function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const timeout = window.setTimeout(() => setDone(true), 1050);
    return () => window.clearTimeout(timeout);
  }, []);
  if (done) return null;
  return <div className="mprv-loader"><Wordmark /><span><i /></span><small>MEDIA IN MOTION</small></div>;
}

function Hero() {
  const trailRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const trailTimers = useRef<Array<number | null>>(Array(5).fill(null));
  const nextSlot = useRef(0);
  const nextPhoto = useRef(0);
  const lastPoint = useRef({ x: -200, y: -200 });
  const trailPhotos = [
    "/projects/aurea-event/aurea-event-01.jpg",
    "/projects/mprv-office-hero.jpg",
    "/projects/delishio-cover.jpg",
    "/projects/aurea-event/aurea-event-05.jpg",
    "/projects/sidi-bou-said-cover.jpg"
  ];

  useEffect(() => {
    const timers = trailTimers.current;
    return () => timers.forEach((timer) => { if (timer !== null) window.clearTimeout(timer); });
  }, []);

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    if (Math.hypot(x - lastPoint.current.x, y - lastPoint.current.y) < 72) return;
    lastPoint.current = { x, y };
    const slot = nextSlot.current;
    const node = trailRefs.current[slot];
    if (!node) return;
    const image = node.querySelector("img");
    if (image) image.src = trailPhotos[nextPhoto.current];
    if (trailTimers.current[slot] !== null) window.clearTimeout(trailTimers.current[slot]!);
    node.classList.remove("is-visible", "is-leaving");
    node.style.setProperty("--trail-x", `${x}px`);
    node.style.setProperty("--trail-y", `${y}px`);
    node.style.setProperty("--trail-r", `${[-6, 4, -3, 6, -4][slot]}deg`);
    void node.offsetWidth;
    node.classList.add("is-visible");
    trailTimers.current[slot] = window.setTimeout(() => {
      node.classList.remove("is-visible");
      node.classList.add("is-leaving");
    }, 820);
    nextSlot.current = (slot + 1) % 5;
    nextPhoto.current = (nextPhoto.current + 1) % trailPhotos.length;
  };

  const clearTrail = () => {
    lastPoint.current = { x: -200, y: -200 };
    trailRefs.current.forEach((node) => { node?.classList.remove("is-visible"); node?.classList.add("is-leaving"); });
  };

  return (
    <section className="mprv-hero" onMouseMove={handleMove} onMouseLeave={clearTrail}>
      <div className="mprv-hero__texture" />
      <div className="mprv-hero__grid" aria-hidden="true" />
      <div className="mprv-hero__copy">
        <h1><span>We build media</span><strong>people choose</strong><span>to watch.</span></h1>
        <p>UGC, creative and production working as one focused system for modern brands.</p>
        <a className="mprv-hero__contact" href="/contact" data-cursor="cta" data-cursor-label="Let’s talk"><i />Start a project</a>
      </div>
      <div className="mprv-hero__trail" aria-hidden="true">
        {trailPhotos.map((photo, index) => <span ref={(node) => { trailRefs.current[index] = node; }} key={photo}><img src={photo} alt="" /></span>)}
      </div>
      <div className="mprv-hero__foot"><span>Move your cursor</span><span>UGC / FILM / PHOTO / DIGITAL</span></div>
    </section>
  );
}

function ServiceRows() {
  const [active, setActive] = useState(0);
  return (
    <section className="home-services" id="services">
      <div className="section-head"><span className="eyebrow">What we do</span><h2>One creative system.<br />Every screen.</h2><p>We plan, make and adapt the work. Fewer handoffs. More useful content.</p></div>
      <div className="home-services__body">
        <div className="home-services__preview"><img src={services[active].image} alt="" /><span>{services[active].number}</span></div>
        <div className="home-services__rows">
          {services.map((service, index) => (
            <a href={`/services/${service.slug}`} className={active === index ? "is-active" : ""} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} key={service.title} data-cursor="cta" data-cursor-label="Explore">
              <span>{service.number}</span><h3>{service.title}</h3><p>{service.copy}</p><ArrowUpRight />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkGrid() {
  return (
    <section className="home-work">
      <div className="home-work__top"><span>Our work use cases</span><a href="/case-studies" data-cursor="cta" data-cursor-label="See all">See all</a></div>
      <div className="home-work__grid">
        {homeProjects.map((project) => (
          <a className="compact-work-card" href={project.href} key={project.title} data-cursor="project" data-cursor-label="Take a look" onMouseMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            event.currentTarget.style.setProperty("--tilt-x", `${((event.clientY - bounds.top) / bounds.height - .5) * -5}deg`);
            event.currentTarget.style.setProperty("--tilt-y", `${((event.clientX - bounds.left) / bounds.width - .5) * 7}deg`);
          }} onMouseLeave={(event) => { event.currentTarget.style.setProperty("--tilt-x", "0deg"); event.currentTarget.style.setProperty("--tilt-y", "0deg"); }}>
            <div className="compact-work-card__media"><img src={project.image} alt="" /><strong className="compact-work-card__brand">{project.client}</strong><i>Take a look</i></div>
            <div className="compact-work-card__caption"><strong>{project.title}</strong><span>{project.client} / {project.type}</span></div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function VideoPlayer({ film, index, onClose, onChange }: { film: Film | null; index: number; onClose: () => void; onChange: (index: number) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    if (!film) return;
    document.body.style.overflow = "hidden";
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onChange((index - 1 + films.length) % films.length);
      if (event.key === "ArrowRight") onChange((index + 1) % films.length);
    };
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", key); };
  }, [film, index, onChange, onClose]);
  if (!film) return null;
  const toggle = () => { const video = videoRef.current; if (!video) return; if (video.paused) void video.play(); else video.pause(); };
  return (
    <div className="project-player" role="dialog" aria-modal="true">
      <button className="project-player__backdrop" onClick={onClose} aria-label="Close video" />
      <div className={`project-player__media is-${film.orientation}`}>
        <div className="project-player__top"><strong>{film.title}</strong><div><button onClick={() => { setMuted(!muted); if (videoRef.current) videoRef.current.muted = !muted; }} aria-label="Toggle sound">{muted ? <VolumeX /> : <Volume2 />}</button><button onClick={onClose} aria-label="Close"><X /></button></div></div>
        <video ref={videoRef} src={film.playbackVideo} poster={film.image} autoPlay muted={muted} playsInline onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onClick={toggle} />
        <button className="project-player__toggle" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>{playing ? <Pause /> : <Play />}</button>
        <button className="project-player__arrow is-left" onClick={() => onChange((index - 1 + films.length) % films.length)} aria-label="Previous"><ArrowLeft /></button>
        <button className="project-player__arrow is-right" onClick={() => onChange((index + 1) % films.length)} aria-label="Next"><ArrowRight /></button>
      </div>
    </div>
  );
}

export function StudioSite() {
  return (
    <><Loader /><main className="mprv-home"><SiteNav /><Hero />
      <section className="home-manifesto"><span className="eyebrow">MPRV Co. / Media in motion</span><h2>Culture moves fast.<br />Your content should too.</h2><div><p>We connect creators, production and design into a responsive media system—lean enough to move quickly, structured enough to stay consistent.</p><a href="/about" data-cursor="cta" data-cursor-label="About us">How we work <ArrowUpRight /></a></div></section>
      <ServiceRows />
      <WorkGrid />
      <SiteFooter />
    </main></>
  );
}
