"use client";

import { motion, type MotionValue } from "framer-motion";

// Window shapes traced by hand over photo 07 (838 x 837 px source).
// Coordinates are in the photo's own pixel space, so they line up at any size.
const WINDOWS = {
  quarter: "26,226 40,222 158,222 166,226 168,232 160,312 154,320 146,322 22,320 13,316 11,306 16,250 20,234",
  rear: "210,224 336,223 342,227 344,234 342,322 338,327 330,328 212,326 205,322 203,314 203,234 205,227",
  front: "398,230 406,227 528,229 536,234 549,262 541,270 539,329 400,329 393,324 392,316 392,238",
};

// Crops of the photo shown in the panel (x, y, w, h in source px).
// Phones get a tighter crop so the glass is bigger.
export const VIEW_WIDE = { x: 0, y: 140, w: 838, h: 540 };
export const VIEW_TIGHT = { x: 0, y: 170, w: 610, h: 400 };

type View = typeof VIEW_WIDE;

export function JeepWindows({ opacity, view = VIEW_WIDE, load = true }: { opacity: MotionValue<number>; view?: View; load?: boolean }) {
  return (
    <svg
      viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
      className="block h-auto w-full"
      role="img"
      aria-label="Teal Jeep Wrangler Rubicon side profile. The side windows darken to match the selected shade."
    >
      <defs>
        <clipPath id="jeep-glass">
          <polygon points={WINDOWS.quarter} />
          <polygon points={WINDOWS.rear} />
          <polygon points={WINDOWS.front} />
        </clipPath>
        <linearGradient id="glass-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.10" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="838" height="837" fill="#111517" />
      {load && <image href="/images/07-teal-jeep-wrangler-rubicon-side-BEST.webp" x="0" y="0" width="838" height="837" />}
      <g clipPath="url(#jeep-glass)">
        <motion.rect x="0" y="200" width="600" height="150" fill="#030405" style={{ opacity }} />
        {/* keep a hint of reflection on top of the film, like real glass */}
        <rect x="0" y="215" width="600" height="120" fill="url(#glass-sheen)" />
      </g>
    </svg>
  );
}
