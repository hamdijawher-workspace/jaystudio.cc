"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { contactEmail } from "@/components/contact-sheet";

const navItems = [["Work", "/case-studies"], ["Services", "/about#services"], ["About us", "/about"], ["Contact", "/contact"]];

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`mprv-wordmark ${compact ? "is-compact" : ""}`} role="img" aria-label="MPRV Co."><b>MPRV</b><span>Co.</span></span>
  );
}

export function SiteNav({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle("menu-is-open", open);
    return () => document.body.classList.remove("menu-is-open");
  }, [open]);
  return (
    <header className={`site-nav ${dark ? "site-nav--dark" : ""} ${open ? "is-menu-open" : ""}`}>
      <a className="site-nav__mark" href="/" data-cursor="cta" data-cursor-label="Home"><Wordmark compact /></a>
      <nav className="site-nav__links" aria-label="Main navigation">
        {navItems.map(([label, href]) => <a href={href} key={label} data-cursor="link"><span>{label}</span></a>)}
      </nav>
      <button className="site-nav__mobile" type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button>
      <nav className="site-nav__overlay" aria-label="Mobile navigation">
        <div><Wordmark /></div>
        {navItems.map(([label, href], index) => <a href={href} onClick={() => setOpen(false)} key={label}><span>0{index + 1}</span>{label}<ArrowUpRight /></a>)}
      </nav>
    </header>
  );
}

export function SiteFooter({ dark = false, compact = false }: { dark?: boolean; compact?: boolean }) {
  return (
    <footer className={`site-footer ${dark ? "site-footer--dark" : ""} ${compact ? "site-footer--compact" : ""}`}>
      <div className="site-footer__lead"><span>Have a project in motion?</span><a href={contactEmail} data-cursor="cta" data-cursor-label="Email us">Let’s make it move.<ArrowUpRight /></a></div>
      <div className="site-footer__grid">
        <div><Wordmark /><p>Media made for how people<br />watch, share and buy now.</p></div>
        <nav>{navItems.map(([label, href]) => <a href={href} key={label}>{label}</a>)}</nav>
        <nav><a href="https://www.instagram.com/jaystudio.cc" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.tiktok.com/@jay.hamdii" target="_blank" rel="noreferrer">TikTok ↗</a><a href="mailto:hamdijawher@icloud.com">Email ↗</a></nav>
      </div>
      <div className="site-footer__base"><span>© 2026 MPRV Co.</span><span>Working MENA &amp; worldwide</span><span>Media · UGC · Production</span></div>
    </footer>
  );
}
