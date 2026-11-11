"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from "framer-motion";
import { JeepWindows, VIEW_TIGHT, VIEW_WIDE } from "./JeepWindows";
import { ShadeSlider } from "./ShadeSlider";
import { LegalStrip } from "./LegalStrip";
import { BookButton } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { shades } from "@/lib/shades";
import type { StateId } from "@/lib/tintLaws";

const SWEEP_TO = 3; // 20%

export function ShadeVisualizer() {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { once: true, amount: 0.5 });
  const touched = useRef(false);

  const pos = useMotionValue(0);
  const [index, setIndex] = useState(0);
  const [state, setState] = useState<StateId>("MD");
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const set = () => setNarrow(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const opacity = useTransform(
    pos,
    shades.map((_, i) => i),
    shades.map((s) => s.overlay),
  );

  useMotionValueEvent(pos, "change", (v) => {
    const i = Math.round(v);
    setIndex((prev) => (prev === i ? prev : i));
  });

  // Sweep 70% to 20% once, the first time the panel scrolls into view.
  useEffect(() => {
    if (!inView || touched.current) return;
    if (reduce) {
      pos.set(SWEEP_TO);
      return;
    }
    const c = animate(pos, SWEEP_TO, { duration: 2.4, delay: 0.3, ease: [0.45, 0, 0.2, 1] });
    return () => c.stop();
  }, [inView, reduce, pos]);

  const onDrag = (v: number) => {
    touched.current = true;
    pos.stop();
    pos.set(v);
  };

  const onCommit = (i: number) => {
    touched.current = true;
    pos.stop();
    if (reduce) pos.set(i);
    else animate(pos, i, { type: "spring", stiffness: 420, damping: 38 });
    setIndex(i);
  };

  const shade = shades[index];

  return (
    <section id="shades" aria-labelledby="shades-title" className="section border-t border-line">
      <div className="container-x">
        <SectionHeading
          id="shades-title"
          eyebrow="Shade visualizer"
          title="Pick your shade."
          sub="Slide to see it on real glass. The lower the number, the darker the tint."
        />

        <div ref={panelRef} className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-6">
          <div className="glass overflow-hidden">
            <div className="relative">
              <JeepWindows opacity={opacity} view={narrow ? VIEW_TIGHT : VIEW_WIDE} />
              <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-bg/70 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur-md">
                Jeep Wrangler Rubicon · our work
              </span>
              <span aria-hidden className="display absolute bottom-3 right-3 rounded-full bg-lime px-3.5 py-1 text-[22px] leading-none text-bg sm:hidden">
                {shade.vlt}%
              </span>
            </div>
            <div className="px-5 pb-5 pt-4 sm:px-8 sm:pb-7">
              <ShadeSlider pos={pos} index={index} onDrag={onDrag} onCommit={onCommit} />
            </div>
          </div>

          <div className="glass flex flex-col justify-between p-6 sm:p-8">
            <div>
              <p className="eyebrow">Your shade</p>
              <p aria-live="polite" className="mt-3">
                <span className="display block text-[96px] leading-[0.85] text-lime sm:text-[120px]">
                  {shade.vlt}
                  <span className="text-[0.55em]">%</span>
                </span>
                <span className="mt-3 block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  {shade.vlt === 5 ? "Limo · " : ""}visible light let through
                </span>
                <span className="mt-5 block text-lg text-ink">
                  <strong className="font-semibold">{shade.vlt}%:</strong> {shade.line.charAt(0).toLowerCase() + shade.line.slice(1)}
                </span>
              </p>
              <dl className="mt-7 grid gap-4">
                <Meter label="Privacy" value={shade.privacy} />
                <Meter label="Night visibility" value={6 - shade.privacy} />
              </dl>
            </div>
            <div className="mt-8">
              <BookButton preset={{ shade: shade.vlt }} size="lg" arrow className="w-full sm:w-auto">
                Book this shade
              </BookButton>
              <p className="mt-3 text-sm text-muted">Not sure? We&apos;ll help you pick when you book.</p>
            </div>
          </div>
        </div>

        <div className="mt-5 lg:mt-6">
          <LegalStrip state={state} onState={setState} vlt={shade.vlt} />
        </div>
      </div>
    </section>
  );
}

function Meter({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm">
        <dt className="text-muted">{label}</dt>
        <dd className="sr-only">{value} out of 5</dd>
      </div>
      <div aria-hidden className="mt-2 grid grid-cols-5 gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <span key={n} className={`h-1.5 rounded-full transition-colors duration-300 ${n <= value ? "bg-lime" : "bg-white/10"}`} />
        ))}
      </div>
    </div>
  );
}
