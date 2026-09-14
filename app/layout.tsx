import type { Metadata } from "next";
import localFont from "next/font/local";
import { MprvCursor } from "@/components/mprv-cursor";
import "./globals.css";
import "./cinema.css";

const outfit = localFont({ src: "../public/fonts/Outfit-Variable.ttf", variable: "--font-outfit", display: "swap", weight: "100 900" });

export const metadata: Metadata = {
  title: "MPRV Co. | Media, UGC & Production",
  description:
    "MPRV Co. is a digital media agency creating UGC, campaigns, film, photography and social-first content across MENA and worldwide."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.variable}><MprvCursor />{children}</body>
    </html>
  );
}
