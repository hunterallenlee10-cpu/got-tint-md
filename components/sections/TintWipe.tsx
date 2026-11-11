"use client";

import { motion, useReducedMotion } from "framer-motion";

const DURATION = 1.2;
const DELAY = 0.55;
const EASE = [0.65, 0, 0.35, 1] as const;

/**
 * The hero's signature motion: a dark film is laid across the glass from left
 * to right, with a lime squeegee line riding its leading edge. Plays once.
 * With reduced motion it renders the finished, tinted state.
 */
export function TintWipe() {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div aria-hidden className="pointer-events-none absolute inset-0 bg-[rgba(7,9,10,0.55)]" />;
  }

  const t = { duration: DURATION, delay: DELAY, ease: EASE };

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* The film itself */}
      <motion.div
        className="absolute inset-0 bg-[rgba(7,9,10,0.55)]"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={t}
      />
      {/* Wet sheen trailing the squeegee, fades as the film "sets" */}
      <motion.div
        className="absolute inset-y-0 left-0 w-full"
        initial={{ x: "-100%", opacity: 1 }}
        animate={{ x: "0%", opacity: [1, 1, 0] }}
        transition={{ x: t, opacity: { duration: DURATION + 0.6, delay: DELAY, times: [0, 0.7, 1] } }}
      >
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white/[0.10] to-transparent" />
      </motion.div>
      {/* The squeegee line */}
      <motion.div
        className="absolute inset-y-0 left-0 w-full"
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={t}
      >
        <motion.div
          className="absolute -inset-y-2 right-0 w-[3px] rounded-full bg-lime shadow-[0_0_14px_2px_rgba(200,230,42,0.45)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.35, delay: DELAY + DURATION }}
        />
      </motion.div>
    </div>
  );
}
