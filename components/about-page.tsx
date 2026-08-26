import { ArrowUpRight } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { services } from "@/lib/services";

export function AboutPage() {
  return (
    <main className="studio-page"><SiteNav />
      <header className="studio-hero"><span className="eyebrow">MPRV Co. / About us</span><h1>Small enough<br />to move fast.<br /><em>Built to make big.</em></h1><div><p>An independent digital media company connecting strategy, creators and production.</p><span>Working MENA &amp; worldwide</span></div></header>
      <section className="studio-statement"><span className="eyebrow eyebrow--light">What we believe</span><h2>Brands do not need more content.<br />They need a system that makes<br /><em>the right content, repeatedly.</em></h2></section>
      <section className="studio-services" id="services"><div className="section-head"><span className="eyebrow">Services</span><h2>From first thought<br />to every format.</h2></div>{services.map((service) => <a href={`/services/${service.slug}`} key={service.slug}><span>{service.number}</span><h3>{service.title}</h3><p>{service.copy}</p><ArrowUpRight /></a>)}</section>
      <section className="studio-process"><div><span className="eyebrow eyebrow--light">How we work</span><h2>One lean team.<br />Four clear moves.</h2></div><ol>{[["01", "Find the tension", "We isolate what the audience should feel, notice or do."], ["02", "Build the format", "We design the creative idea around the channel, not after it."], ["03", "Make the work", "A tight production core expands with the right specialists."], ["04", "Multiply what works", "We adapt, version and learn instead of starting over every time."]].map(([number, title, copy]) => <li key={number}><span>{number}</span><strong>{title}</strong><p>{copy}</p></li>)}</ol></section>
      <section className="studio-model"><img src="/projects/aurea-event/aurea-event-04.jpg" alt="MPRV campaign production" /><div><span className="eyebrow">The model</span><h2>Core team.<br />Right collaborators.</h2><p>MPRV leads the idea and production, then builds the exact team the work needs—creators, cinematographers, stylists, editors, sound designers, developers and designers.</p><a href="/contact" data-cursor="cta" data-cursor-label="Brief us">Tell us what you’re making <ArrowUpRight /></a></div></section>
      <SiteFooter />
    </main>
  );
}
