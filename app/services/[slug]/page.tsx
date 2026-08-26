import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/site-chrome";
import { getService, services } from "@/lib/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const currentIndex = services.findIndex((item) => item.slug === service.slug);
  const next = services[(currentIndex + 1) % services.length];

  return (
    <main className="service-page"><SiteNav />
      <header className="service-hero">
        <span className="eyebrow">Service / {service.number}</span>
        <div><h1>{service.title}</h1><p>{service.statement}</p></div>
      </header>
      <section className="service-image"><img src={service.image} alt="" /></section>
      <section className="service-process">
        <div><span className="eyebrow">The process</span><h2>Clear moves.<br />No wasted handoffs.</h2></div>
        <ol>{service.process.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div></li>)}</ol>
      </section>
      <section className="service-deliverables"><span className="eyebrow eyebrow--light">Typical deliverables</span><div>{service.deliverables.map((item) => <span key={item}>{item}</span>)}</div></section>
      <section className="service-brief"><span>Have a brief?</span><a href="/contact" data-cursor="cta" data-cursor-label="Start a project">Build the right process.<ArrowUpRight /></a></section>
      <a className="service-next" href={`/services/${next.slug}`}><span>Next service</span><strong>{next.title}</strong><ArrowRight /></a>
      <SiteFooter />
    </main>
  );
}
