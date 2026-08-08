"use client";

import { ArrowRight, Instagram, Menu, X, Youtube } from "lucide-react";
import { useState } from "react";
import { contactEmail } from "@/components/contact-sheet";

const instagramUrl = "https://www.instagram.com/jaystudio.cc";
const tiktokUrl = "https://www.tiktok.com/@jay.hamdii";

export function SiteNav({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={`site-nav ${dark ? "site-nav--dark" : ""} ${open ? "is-menu-open" : ""}`}>
      <a className="site-nav__mark" href="/">JAY STUDIO</a>
      <nav className="site-nav__links" aria-label="Main navigation">
        <a href="/case-studies">Case Studies</a>
        <a href="/studio">Studio</a>
        <a href="/studio#capabilities">Capabilities</a>
        <a href="/contact">Contact</a>
      </nav>
      <button className="site-nav__mobile" type="button" onClick={() => setOpen((current) => !current)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button>
      <nav className="site-nav__overlay" aria-label="Mobile navigation">
        <a href="/case-studies" onClick={() => setOpen(false)}>Case Studies <ArrowRight /></a>
        <a href="/studio" onClick={() => setOpen(false)}>Studio / About <ArrowRight /></a>
        <a href="/studio#capabilities" onClick={() => setOpen(false)}>Capabilities <ArrowRight /></a>
        <a href="/contact" onClick={() => setOpen(false)}>Contact <ArrowRight /></a>
      </nav>
    </header>
  );
}

export function SiteFooter({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <footer className={`site-footer ${dark ? "site-footer--dark" : ""} ${compact ? "site-footer--compact" : ""}`}>
      <div className="site-footer__top">
        <div>
          <span className="site-footer__eyebrow">Independent creative studio</span>
          <p>Ideas, directed.<br />Stories, produced.</p>
        </div>
        <a className="site-footer__cta" href={contactEmail}>Start a conversation <ArrowRight /></a>
      </div>
      <div className="site-footer__bottom">
        <span>© 2026 JAY STUDIO / TUNIS</span>
        <div className="site-footer__socials">
          <a href={instagramUrl} target="_blank" rel="noreferrer"><Instagram /></a>
          <a href={tiktokUrl} target="_blank" rel="noreferrer" aria-label="TikTok">TikTok</a>
          <a href="https://www.youtube.com/" target="_blank" rel="noreferrer"><Youtube /></a>
        </div>
      </div>
    </footer>
  );
}
