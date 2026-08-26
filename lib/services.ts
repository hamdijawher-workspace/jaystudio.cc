export type Service = {
  slug: string;
  number: string;
  title: string;
  copy: string;
  image: string;
  statement: string;
  process: Array<{ title: string; copy: string }>;
  deliverables: string[];
};

export const services: Service[] = [
  {
    slug: "ugc-creator-content",
    number: "01",
    title: "UGC & creator content",
    copy: "Creator casting, native concepts, scripts, production and performance-ready variations.",
    image: "/projects/delishio-cover.jpg",
    statement: "A repeatable creator system that feels native to the feed and useful to the brand.",
    process: [
      { title: "Define the angle", copy: "We turn the objective into clear audience tensions, hooks and creator territories." },
      { title: "Cast the right voice", copy: "We source creators for credibility, camera presence and category fit." },
      { title: "Build and shoot", copy: "Scripts stay structured without stripping away the creator's natural delivery." },
      { title: "Version and learn", copy: "We deliver modular hooks, bodies, endings and cutdowns for organic and paid use." }
    ],
    deliverables: ["Creator strategy", "Casting", "Concepts and scripts", "UGC production", "Paid variations", "Cutdowns"]
  },
  {
    slug: "production",
    number: "02",
    title: "Production",
    copy: "Campaign films, social series, photography and nimble shoots from idea to final delivery.",
    image: "/projects/aurea-event/aurea-event-04.jpg",
    statement: "Lean, complete production for work that needs craft without unnecessary weight.",
    process: [
      { title: "Shape the treatment", copy: "The creative idea becomes a visual approach, shot language and production plan." },
      { title: "Build the team", copy: "We assemble only the specialists the production actually needs." },
      { title: "Make the work", copy: "Direction, photography and production stay connected on set." },
      { title: "Finish every format", copy: "The master idea is edited, graded and adapted for each channel and placement." }
    ],
    deliverables: ["Creative treatment", "Pre-production", "Film production", "Photography", "Post-production", "Social formats"]
  },
  {
    slug: "creative-systems",
    number: "03",
    title: "Creative systems",
    copy: "Art direction, formats and repeatable content systems built to keep brands culturally current.",
    image: "/projects/aurea-reveal-cover.jpg",
    statement: "A recognizable creative language that can move across campaigns, creators and channels.",
    process: [
      { title: "Audit the signal", copy: "We identify what is distinctive, what is generic and where the brand can own attention." },
      { title: "Set the world", copy: "We define the visual rules, voice, formats and repeatable creative behaviors." },
      { title: "Prototype the system", copy: "Key assets prove how the idea behaves in real content before scale." },
      { title: "Equip the rollout", copy: "Templates and direction make the system usable by internal and external teams." }
    ],
    deliverables: ["Creative strategy", "Art direction", "Format development", "Content pillars", "Templates", "Creative playbook"]
  },
  {
    slug: "digital-media",
    number: "04",
    title: "Digital media",
    copy: "Social-first campaigns, launch assets, landing experiences and content adapted for every channel.",
    image: "/projects/sidi-bou-said-cover.jpg",
    statement: "Connected digital touchpoints that make one campaign idea work harder across the customer journey.",
    process: [
      { title: "Map the journey", copy: "We identify where the audience discovers, considers and acts." },
      { title: "Design the system", copy: "Content, interface and campaign assets are planned as one connected experience." },
      { title: "Produce the assets", copy: "We create the master content and the channel-specific pieces around it." },
      { title: "Launch and refine", copy: "The rollout is checked in context and improved using real performance signals." }
    ],
    deliverables: ["Campaign systems", "Social content", "Launch assets", "Landing experiences", "Display formats", "Rollout support"]
  }
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
