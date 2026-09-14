"use client";

import { useEffect, useRef } from "react";

export function MprvCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = cursor.current;
    if (!node || !window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let visible = false;
    let target: HTMLElement | null = null;
    const point = { x: -100, y: -100 };
    const current = { x: -100, y: -100, width: 10, height: 10, radius: 5 };
    const findTarget = () => {
      const element = document.elementFromPoint(point.x, point.y);
      target = element?.closest<HTMLElement>('button:not([disabled]), a[href], [data-cursor]') ?? null;
    };
    const render = () => {
      const bounds = target?.getBoundingClientRect();
      const shape = target ? getComputedStyle(target) : null;
      const rounding = shape?.borderTopLeftRadius ?? "5px";
      const radius = bounds && rounding.endsWith("%") ? Math.min(bounds.width, bounds.height) * parseFloat(rounding) / 100 : parseFloat(rounding);
      const next = bounds ? { x: bounds.left - 3, y: bounds.top - 3, width: bounds.width + 6, height: bounds.height + 6, radius: radius + 3 } : { x: point.x - 5, y: point.y - 5, width: 10, height: 10, radius: 5 };
      for (const key of ["x", "y", "width", "height", "radius"] as const) current[key] += (next[key] - current[key]) * .3;
      node.style.transform = `translate3d(${current.x}px,${current.y}px,0)`;
      node.style.width = `${current.width}px`;
      node.style.height = `${current.height}px`;
      node.style.borderRadius = `${current.radius}px`;
      node.style.opacity = visible ? "1" : "0";
      node.dataset.morphed = bounds ? "true" : "false";
      frame = requestAnimationFrame(render);
    };
    const move = (event: MouseEvent) => { point.x = event.clientX; point.y = event.clientY; visible = true; findTarget(); };
    const leave = () => { visible = false; target = null; };
    const keyboard = (event: KeyboardEvent) => { if (event.key === "Tab") visible = false; };
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("scroll", findTarget, { passive: true });
    window.addEventListener("keydown", keyboard);
    document.documentElement.addEventListener("mouseleave", leave);
    frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("mousemove", move); window.removeEventListener("scroll", findTarget); window.removeEventListener("keydown", keyboard); document.documentElement.removeEventListener("mouseleave", leave); };
  }, []);
  return <div ref={cursor} className="mprv-cursor" aria-hidden="true" />;
}
