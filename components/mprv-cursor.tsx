"use client";

import { useEffect, useRef, useState } from "react";

export function MprvCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const frame = useRef(0);
  const [mode, setMode] = useState("idle");
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const render = () => {
      current.current.x += (pointer.current.x - current.current.x) * 0.2;
      current.current.y += (pointer.current.y - current.current.y) * 0.2;
      if (cursorRef.current) cursorRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      frame.current = requestAnimationFrame(render);
    };
    const move = (event: MouseEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY };
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      setMode(target?.dataset.cursor ?? "idle");
      setLabel(target?.dataset.cursorLabel ?? "");
    };
    const leave = () => setMode("hidden");
    const enter = () => setMode("idle");
    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    frame.current = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  return <div ref={cursorRef} className={`mprv-cursor is-${mode}`} aria-hidden="true"><span>{label}</span></div>;
}
