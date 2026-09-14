"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { Film } from "@/lib/content";
import { Play } from "lucide-react";

export const MotionContext = createContext(true);

/** Only load and run previews near the viewport; keep posters when motion is off. */
export function MotionMedia({ film, className = "" }: { film: Film; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const enabled = useContext(MotionContext);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (visible && enabled && !preference.matches && !document.hidden) {
        setNear(true);
        void video.play().catch(() => {});
      } else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .18 });
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    preference.addEventListener("change", sync);
    return () => { observer.disconnect(); video.pause(); document.removeEventListener("visibilitychange", sync); preference.removeEventListener("change", sync); };
  }, [enabled]);
  return <video ref={ref} className={className} src={near ? film.previewVideo : undefined} poster={film.image} muted loop playsInline preload={near ? "auto" : "none"} onLoadedData={() => { const video = ref.current; if (!video) return; const bounds = video.getBoundingClientRect(); if (enabled && bounds.bottom > 0 && bounds.top < window.innerHeight && !document.hidden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) void video.play().catch(() => {}); }} aria-hidden="true" />;
}

export function PhoneFilm({ film, onPlay, className = "" }: { film: Film; onPlay: () => void; className?: string }) {
  return <button type="button" className={`phone-film ${className}`} onClick={onPlay} aria-label={`Play ${film.title}`} data-cursor="project" data-cursor-label="Watch film">
    <span className="phone-film__screen"><MotionMedia film={film} /><span className="phone-film__island" aria-hidden="true" /><span className="phone-film__status" aria-hidden="true"><span>9:41</span><span>▮▮▮ ▰</span></span><span className="phone-film__caption"><span>{film.category.split(" — ")[0]}</span><strong>{film.title === "DELISHIO" ? "A taste of summer." : film.title === "SIDI BOU SAID" ? "Follow the feeling." : "Beyond the expected."}</strong><span className="phone-film__play"><Play size={13} fill="currentColor" /> Watch film</span></span><span className="phone-film__home" aria-hidden="true" /></span>
  </button>;
}
