import { ArrowUpRight } from "lucide-react";
import { SiteFooter, SiteNav, Wordmark } from "@/components/site-chrome";

const email = "hamdijawher@icloud.com";

export default function ContactPage() {
  return (
    <main className="contact-page"><SiteNav dark />
      <section className="contact-hero"><div className="contact-hero__texture" /><div className="contact-hero__brand"><Wordmark /></div><span className="eyebrow eyebrow--light">New business / Collaboration</span><h1>Got something<br />that needs<br /><em>to move?</em></h1><p>Tell us the objective, the audience and what is getting in the way. A rough brief is enough to start.</p></section>
      <section className="contact-options">
        <a href={`mailto:${email}?subject=MPRV%20Co.%20project%20brief`} data-cursor="cta" data-cursor-label="Write us"><span>01 / Email</span><strong>{email}</strong><ArrowUpRight /></a>
        <a href="https://wa.me/21622085367?text=Hello%20MPRV%20Co.%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer" data-cursor="cta" data-cursor-label="WhatsApp"><span>02 / WhatsApp</span><strong>+216 22 085 367</strong><ArrowUpRight /></a>
        <a href="https://www.instagram.com/jaystudio.cc" target="_blank" rel="noreferrer" data-cursor="cta" data-cursor-label="Instagram"><span>03 / Instagram</span><strong>MPRV Co. / Instagram</strong><ArrowUpRight /></a>
      </section>
      <section className="contact-note"><span>Where we work</span><p>Working across MENA and worldwide.</p></section>
      <SiteFooter dark />
    </main>
  );
}
