"use client";

import { ArrowLeft, ArrowRight, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { films } from "@/lib/content";
import type { Film } from "@/lib/content";

export function VideoPlayer({ film, index, onClose, onChange }: { film: Film | null; index: number; onClose: () => void; onChange: (index: number) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const callbacks = useRef({ onClose, onChange, index });
  callbacks.current = { onClose, onChange, index };
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [failed, setFailed] = useState(false);
  const open = Boolean(film);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const key = (event: KeyboardEvent) => {
      const { onClose, onChange, index } = callbacks.current;
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && !(event.target instanceof HTMLInputElement)) onChange((index - 1 + films.length) % films.length);
      if (event.key === "ArrowRight" && !(event.target instanceof HTMLInputElement)) onChange((index + 1) % films.length);
      if (event.key === "Tab") {
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input, a[href]');
        if (!controls?.length) return;
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && (document.activeElement === first || !dialogRef.current?.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", key);
    return () => { document.body.style.overflow = overflow; window.removeEventListener("keydown", key); previous?.focus({ preventScroll: true }); };
  }, [open]);
  useEffect(() => { setProgress(0); setFailed(false); setPlaying(true); }, [film]);
  if (!film) return null;
  const toggle = () => { const video = videoRef.current; if (!video) return; if (video.paused) void video.play().catch(() => setPlaying(false)); else video.pause(); };
  return <div ref={dialogRef} className="project-player" role="dialog" aria-modal="true" aria-label={`${film.title} film player`}>
    <button className="project-player__backdrop" onClick={onClose} aria-label="Close video" tabIndex={-1} />
    <div className={`project-player__media is-${film.orientation}`}>
      <div className="project-player__top"><span>mprv co.</span><div><button onClick={() => setMuted(!muted)} aria-label={muted ? "Unmute film" : "Mute film"}>{muted ? <VolumeX /> : <Volume2 />}</button><button ref={closeRef} onClick={onClose} aria-label="Close film"><X /></button></div></div>
      <video key={film.playbackVideo} ref={videoRef} src={film.playbackVideo} poster={film.image} autoPlay muted={muted} playsInline onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => setFailed(true)} onTimeUpdate={() => { const v = videoRef.current; if (v?.duration) setProgress(v.currentTime / v.duration * 100); }} onClick={toggle} />
      <div className="project-player__info"><strong>{film.title}</strong><p>{film.subtitle}</p></div>
      {failed ? <div className="film-error">This film couldn’t load.<a href={film.playbackVideo}>Open the video directly <ArrowRight size={14} /></a></div> : <><button className={`project-player__toggle ${!playing ? "is-paused" : ""}`} onClick={toggle} aria-label={playing ? "Pause film" : "Play film"}>{playing ? <Pause /> : <Play />}</button><input className="film-progress" type="range" aria-label="Film progress" min={0} max={100} step={.1} value={progress} onChange={(event) => { const video = videoRef.current; if (video?.duration) { video.currentTime = Number(event.target.value) / 100 * video.duration; setProgress(Number(event.target.value)); } }} /></>}
      <button className="project-player__arrow is-left" onClick={() => onChange((index - 1 + films.length) % films.length)} aria-label="Previous"><ArrowLeft /></button><button className="project-player__arrow is-right" onClick={() => onChange((index + 1) % films.length)} aria-label="Next"><ArrowRight /></button>
    </div>
  </div>;
}
