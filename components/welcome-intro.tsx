"use client";

import { useEffect, useRef, useState } from "react";

export function WelcomeIntro({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing");
  const complete = useRef(onComplete);
  const pending = useRef<number[]>([]);
  complete.current = onComplete;
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || sessionStorage.getItem("mprv-welcomed")) {
      setPhase("done"); complete.current(); return;
    }
    const message = "Hello. A different story starts here.";
    const timers: number[] = [];
    pending.current = timers;
    for (let i = 1; i <= message.length; i++) timers.push(window.setTimeout(() => setText(message.slice(0, i)), 100 + i * 34));
    timers.push(window.setTimeout(() => { setPhase("leaving"); complete.current(); sessionStorage.setItem("mprv-welcomed", "yes"); }, 1750));
    timers.push(window.setTimeout(() => setPhase("done"), 2450));
    return () => timers.forEach(window.clearTimeout);
  }, []);
  if (phase === "done") return null;
  return <div className={`welcome-intro is-${phase}`} aria-label="Welcome to MPRV Co."><div className="welcome-intro__top"><span>mprv co.</span><span>Independent by nature.</span></div><div className="welcome-intro__message" aria-hidden="true">{text}<i /></div><div className="welcome-intro__bottom"><span>Film. Direction. Feeling.</span><button onClick={() => { pending.current.forEach(window.clearTimeout); sessionStorage.setItem("mprv-welcomed", "yes"); setPhase("done"); complete.current(); }}>Enter the studio ↗</button></div></div>;
}
