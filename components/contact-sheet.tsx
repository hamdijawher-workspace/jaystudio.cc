"use client";

import { ArrowRight, Mail, MessageCircle, X } from "lucide-react";

export const contactEmail =
  "mailto:hamdijawher@icloud.com?subject=Project%20enquiry%20for%20MPRV%20Co.";

const contactWhatsApp =
  "https://wa.me/21622085367?text=Hello%20MPRV%20Co.%2C%20I%27d%20like%20to%20discuss%20a%20project.";
const contactPhone = "tel:+21622085367";

export function ContactSheet({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="contact-sheet" role="dialog" aria-modal="true">
      <button
        className="contact-sheet__backdrop"
        type="button"
        onClick={onClose}
        aria-label="Close contact options"
      />
      <div className="contact-sheet__panel">
        <button type="button" onClick={onClose} aria-label="Close contact options">
          <X />
        </button>
        <span>START A PROJECT / MPRV CO.</span>
        <h2>Tell us what needs to move.</h2>
        <a href={contactPhone}>
          <MessageCircle />
          <strong>Call the studio</strong>
          <ArrowRight />
        </a>
        <a href={contactEmail}>
          <Mail />
          <strong>Email the studio</strong>
          <ArrowRight />
        </a>
        <a href={contactWhatsApp} target="_blank" rel="noreferrer">
          <MessageCircle />
          <strong>WhatsApp</strong>
          <ArrowRight />
        </a>
      </div>
    </div>
  );
}
