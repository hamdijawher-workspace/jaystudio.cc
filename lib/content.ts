export type Film = {
  title: string;
  category: string;
  subtitle: string;
  image: string;
  previewVideo: string;
  playbackVideo: string;
  orientation: "portrait" | "landscape";
  year: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  season: string;
  positioning: string;
  cover: string;
  heroVideo?: string;
  role: string[];
  brief: string;
  idea: string;
  direction: string;
  process: string[];
  deliverables: string[];
  gallery: string[];
  moodboard?: string;
  films: Film[];
  note?: string;
};

export const films: Film[] = [
  {
    title: "DELISHIO",
    category: "DELISHIO — SUMMER 26",
    subtitle: "TASTE THE COLD · Creative Direction · Film · Photography",
    image: "/projects/delishio-cover.jpg",
    previewVideo: "/projects/delishio-web.mp4",
    playbackVideo: "/projects/delishio-web.mp4",
    orientation: "portrait",
    year: "2026"
  },
  {
    title: "AUREA / TEASER",
    category: "AUREA — THE FIRST REVEAL",
    subtitle: "A first glimpse built around colour, character and anticipation",
    image: "/projects/aurea-teaser-cover.jpg",
    previewVideo: "/projects/aurea-teaser-web.mp4",
    playbackVideo: "/projects/aurea-teaser-web.mp4",
    orientation: "portrait",
    year: "2026"
  },
  {
    title: "BEYOND ORDINARY",
    category: "AUREA — BEYOND ORDINARY",
    subtitle: "A controlled reveal from first glimpse to poolside experience",
    image: "/projects/aurea-reveal-cover.jpg",
    previewVideo: "/projects/aurea-reveal-web.mp4",
    playbackVideo: "/projects/aurea-reveal-web.mp4",
    orientation: "portrait",
    year: "2026"
  },
  {
    title: "SIDI BOU SAID",
    category: "SIDI BOU SAID — THE BLUE STORY",
    subtitle: "Bechir discovers the story behind Tunisia’s blue and white icon",
    image: "/projects/sidi-bou-said-cover.jpg",
    previewVideo: "/projects/sidi-bou-said.mp4",
    playbackVideo: "/projects/sidi-bou-said.mp4",
    orientation: "portrait",
    year: "2026"
  }
];

const aureaGallery = [1, 2, 3, 4, 5, 7, 9].map(
  (number) => `/projects/aurea-event/aurea-event-${String(number).padStart(2, "0")}.jpg`
);

export const caseStudies: CaseStudy[] = [
  {
    slug: "aurea-beyond-ordinary",
    client: "AUREA",
    title: "BEYOND ORDINARY",
    season: "2026 / Hospitality experience",
    positioning: "An anticipation-led campaign built around the reveal.",
    cover: films[2].image,
    heroVideo: films[2].playbackVideo,
    role: ["Creative Direction", "Art Direction", "Film", "Photography", "Post Production"],
    brief: "Aurea needed a visual world for an experience that could not be understood from a single image. The campaign had to create curiosity before revealing the atmosphere itself.",
    idea: "Build anticipation through controlled reveals: first a fragment, then a glimpse, then the full sensory world of Aurea.",
    direction: "The visual language moves from graphic restraint to warm, open-air immersion. Colour, poolside light, composed portraits and the rhythm of the edit turn the reveal into the story.",
    process: ["Anticipation", "Graphic tease", "Controlled reveal", "Poolside experience"],
    deliverables: ["Teaser film", "Reveal film", "Campaign photography", "Newspaper design"],
    gallery: aureaGallery,
    moodboard: "/projects/aurea-moodboard-placeholder.png",
    films: [films[1], films[2]],
    note: "The moodboard on this page is a reference board assembled from the campaign's actual visual language and produced stills, not external campaign documentation."
  },
  {
    slug: "delishio-summer-26",
    client: "DELISHIO",
    title: "TASTE THE COLD",
    season: "2026 / Summer campaign",
    positioning: "A social-first summer world with a tactile point of view.",
    cover: films[0].image,
    heroVideo: films[0].playbackVideo,
    role: ["Creative Direction", "Film", "Lifestyle Photography", "Editing"],
    brief: "Create a compact visual campaign that makes a cold drink feel immediate, social and desirable.",
    idea: "Make the sensation the subject: temperature, colour and movement carry the story before the product is fully explained.",
    direction: "A tight, high-energy frame language keeps the work tactile and direct, balancing product detail with lifestyle moments.",
    process: ["Sensory brief", "Visual treatment", "Shoot", "Social rollout"],
    deliverables: ["Hero short film", "Social cutdowns", "Lifestyle frames"],
    gallery: [films[0].image],
    films: [films[0]]
  },
  {
    slug: "sidi-bou-said-the-blue-story",
    client: "SIDI BOU SAID",
    title: "THE BLUE STORY",
    season: "2026 / Destination film",
    positioning: "A place-led story through the eyes of a visitor.",
    cover: films[3].image,
    heroVideo: films[3].playbackVideo,
    role: ["Creative Direction", "Film", "Editing", "Branded Storytelling"],
    brief: "Turn a familiar destination into a story with enough intimacy and movement to make the audience look again.",
    idea: "Let discovery lead. The place reveals itself through a personal route rather than a list of landmarks.",
    direction: "The camera stays close to the journey, using blue-and-white architecture, pauses and small human details to build a sense of place.",
    process: ["Story route", "Location study", "Production", "Long-form edit"],
    deliverables: ["Destination film", "Branded story edit"],
    gallery: [films[3].image],
    films: [films[3]]
  }
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function mediaPath(path: string, fromWorks = false) {
  return `${fromWorks ? ".." : "."}${path}`;
}
