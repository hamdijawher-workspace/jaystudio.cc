"use client";

import { ArrowLeft, ArrowRight, Images, Menu, Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ContactSheet } from "@/components/contact-sheet";
import { films, mediaPath } from "@/lib/content";
import type { Film } from "@/lib/content";

type WorkFilter =
  | "All"
  | "Video"
  | "Photography"
  | "Brands"
  | "Influencer"
  | "Long Format"
  | "Short Format";

type ArchiveWork = {
  id: string;
  title: string;
  descriptor: string;
  image: string;
  filters: WorkFilter[];
  kind: "video" | "album" | "photo";
  film?: Film;
  photoIndex?: number;
};

const filters: WorkFilter[] = [
  "All",
  "Video",
  "Photography",
  "Brands",
  "Influencer",
  "Long Format",
  "Short Format"
];

const aureaPhotoNumbers = [1, 2, 3, 4, 5, 7, 9];
const aureaPhotos = aureaPhotoNumbers.map((photoNumber, index) => ({
  src: `/projects/aurea-event/aurea-event-${String(photoNumber).padStart(2, "0")}.jpg`,
  alt: `Aurea Beyond Ordinary event photograph ${index + 1}`
}));

const archiveWorks: ArchiveWork[] = [
  {
    id: "aurea-reveal",
    title: "BEYOND ORDINARY",
    descriptor: "Aurea reveal / short-form hospitality film",
    image: films[2].image,
    film: films[2],
    filters: ["All", "Video", "Brands", "Short Format"],
    kind: "video"
  },
  {
    id: "delishio-reel",
    title: "DELISHIO",
    descriptor: "Cold drink / social media content",
    image: films[0].image,
    film: films[0],
    filters: ["All", "Video", "Brands", "Short Format"],
    kind: "video"
  },
  {
    id: "sidi-film",
    title: "SIDI BOU SAID",
    descriptor: "Influencer destination story",
    image: films[3].image,
    film: films[3],
    filters: ["All", "Video", "Influencer", "Long Format"],
    kind: "video"
  },
  {
    id: "aurea-teaser",
    title: "AUREA / TEASER",
    descriptor: "Event agency teaser / social-first film",
    image: films[1].image,
    film: films[1],
    filters: ["All", "Video", "Brands", "Short Format"],
    kind: "video"
  },
  {
    id: "aurea-event-album",
    title: "AUREA / BEYOND ORDINARY",
    descriptor: `${aureaPhotos.length} unique event photographs`,
    image: aureaPhotos[0].src,
    filters: ["All", "Brands"],
    kind: "album"
  }
];

const photographyWorks: ArchiveWork[] = aureaPhotos.map((photo, index) => ({
  id: `aurea-photo-${index + 1}`,
  title: "AUREA / BEYOND ORDINARY",
  descriptor: `Event photography / frame ${String(index + 1).padStart(2, "0")}`,
  image: photo.src,
  filters: ["Photography"],
  kind: "photo",
  photoIndex: index
}));

function ArchivePlayer({
  film,
  onClose
}: {
  film: Film | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!film) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [film, onClose]);

  if (!film) return null;

  return (
    <div className="archive-player" role="dialog" aria-modal="true">
      <button
        className="archive-player__backdrop"
        type="button"
        onClick={onClose}
        aria-label="Close video"
      />
      <div className="archive-player__header">
        <div>
          <strong>{film.title}</strong>
          <span>{film.category}</span>
        </div>
        <button type="button" onClick={onClose} aria-label="Close video">
          <X />
        </button>
      </div>
      <video
        className={film.orientation === "portrait" ? "is-portrait" : ""}
        src={mediaPath(film.playbackVideo, true)}
        poster={mediaPath(film.image, true)}
        autoPlay
        controls
        playsInline
      />
    </div>
  );
}

function PhotoLightbox({
  index,
  onChange,
  onClose
}: {
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    if (index === null) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        onChange((index - 1 + aureaPhotos.length) % aureaPhotos.length);
      }
      if (event.key === "ArrowRight") {
        onChange((index + 1) % aureaPhotos.length);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index, onChange, onClose]);

  if (index === null) return null;

  const previous = () =>
    onChange((index - 1 + aureaPhotos.length) % aureaPhotos.length);
  const next = () => onChange((index + 1) % aureaPhotos.length);

  return (
    <div className="photo-lightbox" role="dialog" aria-modal="true">
      <button
        className="photo-lightbox__backdrop"
        type="button"
        onClick={onClose}
        aria-label="Close photography album"
      />
      <div className="photo-lightbox__stage">
        <div className="photo-lightbox__header">
          <div>
            <strong>AUREA / BEYOND ORDINARY</strong>
            <span>Event photography</span>
          </div>
          <button type="button" onClick={onClose} aria-label="Close album">
            <X />
          </button>
        </div>
        <img
          src={mediaPath(aureaPhotos[index].src, true)}
          alt={aureaPhotos[index].alt}
        />
        <button
          className="photo-lightbox__arrow photo-lightbox__arrow--left"
          type="button"
          onClick={previous}
          aria-label="Previous photograph"
        >
          <ArrowLeft />
        </button>
        <button
          className="photo-lightbox__arrow photo-lightbox__arrow--right"
          type="button"
          onClick={next}
          aria-label="Next photograph"
        >
          <ArrowRight />
        </button>
        <div className="photo-lightbox__footer">
          <span>
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(aureaPhotos.length).padStart(2, "0")}
          </span>
          <div>
            {aureaPhotos.map((photo, photoIndex) => (
              <button
                type="button"
                className={photoIndex === index ? "is-active" : ""}
                onClick={() => onChange(photoIndex)}
                aria-label={`View photograph ${photoIndex + 1}`}
                key={photo.src}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorksPage() {
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<WorkFilter>("All");

  const visibleWorks =
    activeFilter === "Photography"
      ? photographyWorks
      : archiveWorks.filter((work) => work.filters.includes(activeFilter));

  const openWork = (work: ArchiveWork) => {
    if (work.kind === "video" && work.film) setSelectedFilm(work.film);
    if (work.kind === "album") setSelectedPhoto(0);
    if (work.kind === "photo" && work.photoIndex !== undefined) {
      setSelectedPhoto(work.photoIndex);
    }
  };

  return (
    <main className="works-page">
      <header className="works-header">
        <a href="../" aria-label="Back to homepage">
          <ArrowLeft />
          <span>JAY STUDIO</span>
        </a>
        <span>WORK ARCHIVE / 2026</span>
        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <div className={`works-menu ${menuOpen ? "is-open" : ""}`}>
        <a href="../">Featured work</a>
        <a href="mailto:hamdijawher@icloud.com">Contact the studio</a>
      </div>

      <section className="works-intro">
        <p>Selected work</p>
        <h1>A visual archive built for movement, detail and atmosphere.</h1>
        <div className="works-intro__meta">
          <span>Films</span>
          <span>Social content</span>
          <span>Photography</span>
          <span>Brand work</span>
        </div>
      </section>

      <nav className="works-filters" aria-label="Filter work">
        {filters.map((filter) => (
          <button
            type="button"
            className={activeFilter === filter ? "is-active" : ""}
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
            key={filter}
          >
            {filter}
          </button>
        ))}
      </nav>

      <section className="works-grid" aria-live="polite">
        {visibleWorks.map((work, index) => (
          <article
            className={`work-card work-card--${work.kind}`}
            key={work.id}
          >
            <button
              type="button"
              onClick={() => openWork(work)}
              aria-label={
                work.kind === "video"
                  ? `Play ${work.title}`
                  : `View ${work.title} photography`
              }
            >
              <img
                src={mediaPath(work.image, true)}
                alt={work.kind === "video" ? "" : work.title}
              />
              <span className="work-card__shade" />
              <span className="work-card__index">
                {work.kind === "album"
                  ? "PHOTOS"
                  : String(index + 1).padStart(2, "0")}
              </span>
              {work.kind === "video" && (
                <span className="work-card__play">
                  <Play fill="currentColor" />
                </span>
              )}
              {work.kind === "album" && (
                <span className="work-card__album-stack">
                  <span>
                    <img
                      src={mediaPath(aureaPhotos[1].src, true)}
                      alt=""
                    />
                  </span>
                  <span>
                    <img
                      src={mediaPath(aureaPhotos[2].src, true)}
                      alt=""
                    />
                  </span>
                  <strong>+{aureaPhotos.length}</strong>
                </span>
              )}
              {work.kind === "photo" && (
                <span className="work-card__photo-mark">
                  <Images />
                </span>
              )}
              <span className="work-card__overlay">
                <strong>{work.title}</strong>
                <small>{work.descriptor}</small>
              </span>
            </button>
            <div className="work-card__caption">
              <div>
                <strong>{work.title}</strong>
                <span>{work.descriptor}</span>
              </div>
              <span>
                {work.kind === "video"
                  ? "Motion"
                  : work.kind === "album"
                    ? "Album"
                    : "Photography"}
              </span>
            </div>
          </article>
        ))}
      </section>

      <footer className="works-footer">
        <h2>Have a project in mind?</h2>
        <a href="mailto:hamdijawher@icloud.com">
          Start a conversation <ArrowRight />
        </a>
        <p>© 2026 JAY STUDIO</p>
      </footer>

      <button
        className="floating-contact works-contact"
        type="button"
        onClick={() => setContactOpen(true)}
      >
        Contact Us
      </button>

      <ArchivePlayer film={selectedFilm} onClose={() => setSelectedFilm(null)} />
      <PhotoLightbox
        index={selectedPhoto}
        onChange={setSelectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
      <ContactSheet open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}
