import { ArrowRight } from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/site-chrome";

const capabilities = [
  ["01", "Creative Direction", "Concept development, campaign direction, visual language and art direction."],
  ["02", "Film", "Commercials, brand films, campaign films and branded storytelling."],
  ["03", "Photography", "Campaign, lifestyle, hospitality, automotive and product imagery."],
  ["04", "Digital", "Campaign experiences, landing pages and digital art direction."]
];

export default function StudioPage() {
  return (
    <main className="studio-page editorial-page">
      <SiteNav />
      <section className="studio-page__hero"><span className="eyebrow">The studio</span><h1>We create<br />the idea.<br /><em>Then we make it real.</em></h1></section>
      <section className="studio-page__statement"><span className="eyebrow">Positioning</span><p>Jay Studio is an independent creative direction and production studio creating campaigns for brands through film, photography and digital experiences.</p></section>
      <section className="studio-page__process"><span className="eyebrow">A considered process</span><div>{["Strategy", "Concept", "Direction", "Production", "Post"].map((step, index) => <div key={step}><span>0{index + 1}</span><strong>{step}</strong></div>)}</div></section>
      <section className="studio-page__capabilities" id="capabilities"><span className="eyebrow">Capabilities</span>{capabilities.map(([number, title, text]) => <div className="studio-capability" key={number}><span>{number}</span><h2>{title}</h2><p>{text}</p></div>)}</section>
      <section className="studio-page__model"><span className="eyebrow">Collaborative model</span><div><h2>Small core.<br />Right people.</h2><p>Jay Studio brings the creative and production core, then assembles the right collaborators around the project: cinematographers, photographers, stylists, talent, sound designers, editors, developers and designers.</p></div></section>
      <section className="studio-page__cta"><h2>Bring us<br />the starting point.</h2><a href="mailto:hamdijawher@icloud.com">Start a conversation <ArrowRight /></a></section>
      <SiteFooter />
    </main>
  );
}
