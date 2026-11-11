"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Shows only after 1.5 screens of scrolling. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-24 right-4 z-30 grid h-12 w-12 place-items-center rounded-full border border-line bg-surface/90 text-ink backdrop-blur transition-[opacity,transform,border-color,color] duration-300 hover:border-lime hover:text-lime lg:bottom-8 lg:right-8 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp size={20} strokeWidth={1.75} aria-hidden />
    </button>
  );
}
