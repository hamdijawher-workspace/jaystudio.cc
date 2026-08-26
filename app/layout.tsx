import type { Metadata } from "next";
import { MprvCursor } from "@/components/mprv-cursor";
import "./globals.css";

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
      <body><MprvCursor />{children}</body>
    </html>
  );
}
