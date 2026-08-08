"use client";

import {
  ArrowRight,
  Instagram,
  Play,
  X,
  Youtube
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ContactSheet, contactEmail } from "@/components/contact-sheet";
import { films, mediaPath } from "@/lib/content";
import type { Film } from "@/lib/content";

const instagramUrl =
  "https://www.instagram.com/jaystudio.cc?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
const tiktokUrl =
  "https://www.tiktok.com/@jay.hamdii?is_from_webapp=1&sender_device=pc";
const youtubeUrl = "https://www.youtube.com/";

function Loader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const startedAt = performance.now();
    const duration = 1800;
    let frame = 0;
    const update = (now: number) => {
      const next = Math.min(100, Math.round(((now - startedAt) / duration) * 100));
      setProgress(next);
      if (next < 100) {
        frame = requestAnimationFrame(update);
      } else {
        window.setTimeout(() => setVisible(false), 280);
      }
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (!visible) return null;

  return (
    <div className={`loader ${progress === 100 ? "is-complete" : ""}`}>
      <div className="loader__logo" aria-label="JAY STUDIO">
        <span className="loader__logo-outline">JAY STUDIO</span>
        <span
          className="loader__logo-fill"
          style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
        >
          JAY STUDIO
        </span>
      </div>
      <div className="loader__bottom">
        <span>{String(progress).padStart(3, "0")}%</span>
        <div>
          <i style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}

function HomeFooterOverlay() {
  const [visible, setVisible] = useState(false);
  const previousY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY > 20);
      previousY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className={`home-footer-overlay ${visible ? "is-visible" : ""}`}>
      <div><span>JAY STUDIO</span><p>Ideas, directed.<br />Stories, produced.</p></div>
      <nav><a href="/case-studies">Selected Work</a><a href="/studio">About Jay Studio</a><a href="/contact">Contact</a></nav>
      <small>© 2026 JAY STUDIO / TUNIS</small>
    </footer>
  );
}

function TikTokIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4v10.2a4.2 4.2 0 1 1-3.6-4.15" />
      <path d="M14.5 4c.6 2.5 2.15 4.05 4.5 4.55" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="6" y1="12" x2="18" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function StudioMenu({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open, onClose]);

  return (
    <aside className={`studio-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="studio-menu__top">
        <span>WORK</span>
        <button type="button" onClick={onClose} aria-label="Close menu">
          <X />
        </button>
      </div>
      <nav>
        <a href="/case-studies" onClick={onClose}>
          <strong>Case Studies</strong>
          <ArrowRight />
        </a>
        <a href="/case-studies/aurea-beyond-ordinary" onClick={onClose}>
          <strong>AUREA / Beyond Ordinary</strong>
          <ArrowRight />
        </a>
        <a href="/studio" onClick={onClose}>
          <strong>Studio / About</strong>
          <ArrowRight />
        </a>
        <a href="/contact" onClick={onClose}>
          <strong>Contact</strong>
          <ArrowRight />
        </a>
      </nav>
      <div className="studio-menu__footer">
        <a
          href={contactEmail}
          className="studio-menu__contact"
          onClick={onClose}
        >
          Contact Us
        </a>
        <div className="studio-menu__socials">
          <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
            <Instagram />
          </a>
          <a href={tiktokUrl} target="_blank" rel="noreferrer" aria-label="TikTok">
            <TikTokIcon />
          </a>
          <a href={youtubeUrl} target="_blank" rel="noreferrer" aria-label="YouTube">
            <Youtube />
          </a>
        </div>
        <p>Ideas, directed. Stories, produced.</p>
      </div>
    </aside>
  );
}

function BackgroundPreview({
  film,
  onEnded
}: {
  film: Film;
  onEnded: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.currentTime = 0;
    void video.play().catch(() => undefined);
  }, [film]);

  return (
    <video
      ref={videoRef}
      className="showcase-project__cover-video"
      src={mediaPath(film.previewVideo)}
      poster={mediaPath(film.image)}
      muted
      playsInline
      preload="auto"
      onEnded={onEnded}
    />
  );
}

function ProjectIndicators({
  activeIndex,
  onSelect
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="project-indicators" aria-label="Select project">
      {films.map((film, index) => (
        <button
          type="button"
          className={activeIndex === index ? "is-active" : ""}
          onClick={() => onSelect(index)}
          aria-label={`View ${film.title}`}
          aria-current={activeIndex === index ? "true" : undefined}
          key={film.title}
        >
          <span />
        </button>
      ))}
    </div>
  );
}

export function VideoPlayer({
  film,
  index,
  onClose,
  onChange
}: {
  film: Film | null;
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const touchStart = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!film) return;
    setMuted(false);
    setCurrentTime(0);
    setDuration(0);
    setPlaying(true);
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        onChange((index - 1 + films.length) % films.length);
      }
      if (event.key === "ArrowRight") {
        onChange((index + 1) % films.length);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [film, index, onChange, onClose]);

  if (!film) return null;

  const changeBy = (direction: number) => {
    onChange((index + direction + films.length) % films.length);
  };

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remaining = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div
      className="project-player"
      role="dialog"
      aria-modal="true"
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const end = event.changedTouches[0]?.clientX ?? touchStart.current;
        const distance = end - touchStart.current;
        if (Math.abs(distance) > 60) changeBy(distance > 0 ? -1 : 1);
        touchStart.current = null;
      }}
    >
      <button
        className="project-player__backdrop"
        type="button"
        onClick={onClose}
        aria-label="Close video"
      />
      <div className={`project-player__media is-${film.orientation}`}>
        <div className="project-player__top">
          <button
            className="project-player__sound"
            type="button"
            onClick={() => {
              const next = !muted;
              setMuted(next);
              if (videoRef.current) videoRef.current.muted = next;
            }}
          >
            {muted ? "Sound Off" : "Sound On"}
          </button>
          <button
            className="project-player__close"
            type="button"
            onClick={onClose}
            aria-label="Close video"
          >
            <X />
          </button>
        </div>
        <video
          ref={videoRef}
          key={film.title}
          src={mediaPath(film.playbackVideo)}
          poster={mediaPath(film.image)}
          autoPlay
          muted={muted}
          playsInline
          preload="auto"
          onClick={togglePlayback}
          onLoadedMetadata={(event) => {
            setDuration(event.currentTarget.duration);
            event.currentTarget.muted = muted;
          }}
          onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        {!playing && (
          <button
            className="project-player__play"
            type="button"
            onClick={togglePlayback}
            aria-label="Resume video"
          >
            <Play fill="currentColor" />
          </button>
        )}
        <div className="project-player__controls">
          <strong>{film.title}</strong>
          <div>
            <span>{formatTime(currentTime)}</span>
            <button
              type="button"
              className="project-player__timeline"
              onClick={(event) => {
                const video = videoRef.current;
                if (!video || !duration) return;
                const bounds = event.currentTarget.getBoundingClientRect();
                video.currentTime =
                  ((event.clientX - bounds.left) / bounds.width) * duration;
              }}
              aria-label="Seek video"
            >
              <i />
              <b
                style={{
                  width: `${duration ? (currentTime / duration) * 100 : 0}%`
                }}
              />
            </button>
          </div>
        </div>
      </div>
      <ProjectIndicators activeIndex={index} onSelect={onChange} />
    </div>
  );
}

export function StudioSite() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const mobileTrack = useRef<HTMLDivElement>(null);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const advanceTimeout = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (advanceTimeout.current) {
        window.clearTimeout(advanceTimeout.current);
      }
    };
  }, []);

  const selectProject = (index: number) => {
    setActiveIndex(index);
    const track = mobileTrack.current;
    if (track && window.matchMedia("(max-width: 767px)").matches) {
      track.scrollTo({ left: track.clientWidth * index, behavior: "smooth" });
    }
  };

  const openContact = () => {
    setMenuOpen(false);
    setContactOpen(true);
  };

  const advanceProject = () => {
    if (advanceTimeout.current) {
      window.clearTimeout(advanceTimeout.current);
    }
    advanceTimeout.current = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % films.length);
      advanceTimeout.current = null;
    }, 2000);
  };

  return (
    <>
      <Loader />
      <main className="home-page">
      <section className="showcase" aria-label="Featured work">
      <header className="showcase-header">
        <button
          type="button"
          className="showcase-header__menu"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <HamburgerIcon />
        </button>
        <div className="showcase-brand">
          <a href="./" className="showcase-wordmark">
            JAY STUDIO
          </a>
          <p>Creative direction &amp; production</p>
        </div>
        <div className="showcase-header__actions">
          <div className="showcase-socials">
            <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a>
            <a href={tiktokUrl} target="_blank" rel="noreferrer" aria-label="TikTok"><TikTokIcon /></a>
            <a href={youtubeUrl} target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube /></a>
          </div>
        </div>
      </header>

      <div
        className="showcase-track"
        ref={mobileTrack}
        onScroll={(event) => {
          if (window.innerWidth > 767) return;
          if (scrollTimer.current) clearTimeout(scrollTimer.current);
          const target = event.currentTarget;
          scrollTimer.current = setTimeout(() => {
            const next = Math.round(target.scrollLeft / target.clientWidth);
            setActiveIndex(Math.max(0, Math.min(films.length - 1, next)));
          }, 60);
        }}
      >
        {films.map((film, index) => (
          <article
            className={`showcase-project ${
              activeIndex === index ? "is-active" : ""
            }`}
            key={film.title}
            onClick={() => setActiveIndex(index)}
          >
            {activeIndex === index && playingIndex === null ? (
              <BackgroundPreview film={film} onEnded={advanceProject} />
            ) : (
              <img src={mediaPath(film.image)} alt="" />
            )}
            <div className="showcase-project__shade" />
            <div className="showcase-project__meta">
              <span>{film.category}</span>
              <h1>{film.title}</h1>
              <p>{film.subtitle}</p>
            </div>
            <button
              className="showcase-project__play"
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                if (activeIndex === index || window.innerWidth <= 767) {
                  setPlayingIndex(index);
                } else {
                  setActiveIndex(index);
                }
              }}
              aria-label={`Play ${film.title}`}
            >
              <Play fill="currentColor" />
              <span>Play project</span>
            </button>
            <span className="showcase-project__number">
              {String(index + 1).padStart(2, "0")}
            </span>
          </article>
        ))}
      </div>

      <div className="showcase-bottom">
        <ProjectIndicators
          activeIndex={activeIndex}
          onSelect={selectProject}
        />
        <span>
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(films.length).padStart(2, "0")}
        </span>
      </div>

      <a className="floating-case-studies" href="/case-studies">
        Selected Work <ArrowRight />
      </a>

      </section>
      <div className="home-scroll-spacer" aria-hidden="true" />
      <HomeFooterOverlay />

      <StudioMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
      <ContactSheet open={contactOpen} onClose={() => setContactOpen(false)} />
      <VideoPlayer
        film={playingIndex === null ? null : films[playingIndex]}
        index={playingIndex ?? 0}
        onClose={() => setPlayingIndex(null)}
        onChange={(index) => {
          setPlayingIndex(index);
          setActiveIndex(index);
        }}
      />
      </main>
    </>
  );
}
