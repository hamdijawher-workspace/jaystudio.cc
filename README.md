# JAY STUDIO

Portfolio website for JAY STUDIO, built with Next.js, React, TypeScript, and
custom responsive CSS.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify a production build

```bash
npm run typecheck
npm run build
```

The static production export is written to `out`.

## Project media

Featured project images and videos are configured in `lib/content.ts`.
Photography assets live under `public/projects/aurea-event`.

Place replacement files under `public/projects`, then update the matching
content entry:

```ts
image: "/projects/project-cover.jpg",
previewVideo: "/projects/project-preview.mp4",
playbackVideo: "/projects/project-web.mp4"
```
