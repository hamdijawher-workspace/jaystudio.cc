import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JAY STUDIO | Cinematic Campaigns",
  description:
    "Cinematic visual campaigns for hospitality, real estate, restaurants, lifestyle brands and premium experiences."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
