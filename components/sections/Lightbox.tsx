"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/lib/gallery";

/** Full-screen photo viewer: arrow keys, swipe on touch, Esc to close, focus trapped. */
export function Lightbox({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: Photo[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  const photo = items[index];
  const go = (d: number) => onIndex((index + d + items.length) % items.length);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>("[data-close]")?.focus();
    return () => {
      document.body.style.overflow = prev;
      prevFocus?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>("button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const btn =
    "grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-bg/70 text-ink backdrop-blur transition-colors hover:border-lime hover:text-lime";

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.vehicle}, photo ${index + 1} of ${items.length}`}
      className="fixed inset-0 z-[70] flex flex-col bg-bg/95 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex shrink-0 items-center justify-between p-4">
        <span className="text-sm text-muted">
          {index + 1} / {items.length}
        </span>
        <button type="button" data-close aria-label="Close" onClick={onClose} className={btn}>
          <X size={20} strokeWidth={1.75} aria-hidden />
        </button>
      </div>

      <div
        className="relative flex-1 touch-pan-y"
        onPointerDown={(e) => (startX.current = e.clientX)}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          startX.current = null;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <Image
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="100vw"
          className="pointer-events-none object-contain p-2 sm:p-8"
        />
      </div>

      <div className="flex shrink-0 items-center justify-between gap-4 p-4 pb-6">
        <button type="button" aria-label="Previous photo" onClick={() => go(-1)} className={btn}>
          <ChevronLeft size={22} strokeWidth={1.75} aria-hidden />
        </button>
        <span className="rounded-full border border-white/10 bg-surface px-4 py-2 text-sm font-semibold text-ink">
          {photo.vehicle}
        </span>
        <button type="button" aria-label="Next photo" onClick={() => go(1)} className={btn}>
          <ChevronRight size={22} strokeWidth={1.75} aria-hidden />
        </button>
      </div>
    </div>
  );
}
