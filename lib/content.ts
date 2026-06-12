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

export const films: Film[] = [
  {
    title: "DELISHIO",
    category: "SOCIAL MEDIA CONTENT",
    subtitle: "Cold drink reel / social-first lifestyle content",
    image: "/projects/delishio-cover.jpg",
    previewVideo: "/projects/delishio-preview.mp4",
    playbackVideo: "/projects/delishio-web.mp4",
    orientation: "portrait",
    year: "2026"
  },
  {
    title: "AUREA / TEASER",
    category: "EVENT AGENCY TEASER",
    subtitle: "A first glimpse built around colour, character and anticipation",
    image: "/projects/aurea-teaser-cover.jpg",
    previewVideo: "/projects/aurea-teaser-preview.mp4",
    playbackVideo: "/projects/aurea-teaser-web.mp4",
    orientation: "portrait",
    year: "2026"
  },
  {
    title: "BEYOND ORDINARY",
    category: "AUREA REVEAL",
    subtitle: "From the newspaper tease to the final poolside reveal",
    image: "/projects/aurea-reveal-cover.jpg",
    previewVideo: "/projects/aurea-reveal-preview.mp4",
    playbackVideo: "/projects/aurea-reveal-web.mp4",
    orientation: "portrait",
    year: "2026"
  },
  {
    title: "SIDI BOU SAID",
    category: "INFLUENCER DESTINATION FILM",
    subtitle: "Bechir discovers the story behind Tunisia’s blue and white icon",
    image: "/projects/sidi-bou-said-cover.jpg",
    previewVideo: "/projects/sidi-bou-said.mp4",
    playbackVideo: "/projects/sidi-bou-said.mp4",
    orientation: "portrait",
    year: "2026"
  }
];

export function mediaPath(path: string, fromWorks = false) {
  return `${fromWorks ? ".." : "."}${path}`;
}
