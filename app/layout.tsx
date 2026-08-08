import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JAY STUDIO | Creative Direction & Production",
  description:
    "Jay Studio creates and produces visual campaigns through creative direction, film, photography and digital."
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
