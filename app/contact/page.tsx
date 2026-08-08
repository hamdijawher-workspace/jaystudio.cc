import { ArrowRight, Instagram, Mail, MessageCircle } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/site-chrome";

const email = "hamdijawher@icloud.com";

export default function ContactPage() {
  return (
    <main className="contact-page editorial-page">
      <SiteNav />
      <section className="contact-page__hero"><span className="eyebrow">Contact</span><h1>Tell us what<br />you want people<br /><em>to feel.</em></h1></section>
      <section className="contact-page__links"><a href={`mailto:${email}`}><Mail /><span><small>Email</small><strong>{email}</strong></span><ArrowRight /></a><a href="https://wa.me/21622085367" target="_blank" rel="noreferrer"><MessageCircle /><span><small>WhatsApp</small><strong>+216 22 085 367</strong></span><ArrowRight /></a><a href="https://www.instagram.com/jaystudio.cc" target="_blank" rel="noreferrer"><Instagram /><span><small>Instagram</small><strong>@jaystudio.cc</strong></span><ArrowRight /></a></section>
      <SiteFooter />
    </main>
  );
}
