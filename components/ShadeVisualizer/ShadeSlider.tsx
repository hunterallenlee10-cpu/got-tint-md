"use client";

import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { GripVertical } from "lucide-react";
import { shades } from "@/lib/shades";

const MAX = shades.length - 1;

/**
 * Snapping shade slider. `pos` is a continuous 0..4 value (drag is smooth,
 * release snaps to the nearest stop). Exposed as a real role="slider".
 */
export function ShadeSlider({
  pos,
  index,
  onDrag,
  onCommit,
}: {
  pos: MotionValue<number>;
  index: number;
  onDrag: (v: number) => void;
  onCommit: (i: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const left = useTransform(pos, (v) => `${(v / MAX) * 100}%`);

  const valueAt = (clientX: number) => {
    const r = trackRef.current!.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    return t * MAX;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    onDrag(valueAt(e.clientX));
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) onDrag(valueAt(e.clientX));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    onCommit(Math.round(valueAt(e.clientX)));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowUp: index + 1,
      ArrowLeft: index - 1,
      ArrowDown: index - 1,
      Home: 0,
      End: MAX,
    };
    if (e.key in map) {
      e.preventDefault();
      onCommit(Math.min(MAX, Math.max(0, map[e.key])));
    }
  };

  const shade = shades[index];

  return (
    <div className="select-none">
      <div
        ref={trackRef}
        className="relative h-14 cursor-pointer touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Track: light to dark, like the film itself */}
        <div className="absolute inset-x-0 top-1/2 h-2.5 -translate-y-1/2 rounded-full border border-line bg-gradient-to-r from-[#3a4447] via-[#1a2022] to-[#020303]" />
        {shades.map((s, i) => (
          <span
            key={s.vlt}
            aria-hidden
            className={`absolute top-1/2 h-4 w-px -translate-y-1/2 ${i <= index ? "bg-lime/70" : "bg-white/25"}`}
            style={{ left: `${(i / MAX) * 100}%` }}
          />
        ))}
        <motion.div
          role="slider"
          tabIndex={0}
          aria-label="Window shade (visible light let through)"
          aria-valuemin={0}
          aria-valuemax={MAX}
          aria-valuenow={index}
          aria-valuetext={`${shade.vlt} percent`}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-grab place-items-center rounded-full bg-lime text-bg shadow-[0_6px_20px_-4px_rgba(0,0,0,0.8)] ring-4 ring-bg active:cursor-grabbing"
          style={{ left }}
        >
          <GripVertical size={20} strokeWidth={1.75} aria-hidden />
        </motion.div>
      </div>
      <div className="relative mt-1 h-6 text-xs font-semibold sm:text-[13px]">
        {shades.map((s, i) => (
          <button
            key={s.vlt}
            type="button"
            tabIndex={-1}
            onClick={() => onCommit(i)}
            className={`absolute top-0 whitespace-nowrap transition-colors ${
              i === 0 ? "translate-x-0" : i === MAX ? "-translate-x-full" : "-translate-x-1/2"
            } ${i === index ? "text-lime" : "text-muted hover:text-ink"}`}
            style={{ left: `${(i / MAX) * 100}%` }}
          >
            {s.vlt === 5 ? "5% limo" : s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
