"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Wordmark } from "../ui/Wordmark";
import { TintBuilderFlow } from "./TintBuilderFlow";
import type { BuilderPreset } from "./types";

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),textarea,select,[tabindex]:not([tabindex="-1"])';

/** The Tint Builder as a modal: Esc closes, focus is trapped, body scroll is locked. */
export default function TintBuilderModal({ preset, onClose }: { preset: BuilderPreset; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    const sbw = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    document.body.style.paddingRight = sbw ? `${sbw}px` : "";
    panel.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const f = [...panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null || el.getClientRects().length);
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || !panel.current.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
      document.body.style.paddingRight = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
      <div aria-hidden className="modal-fade absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="builder-title"
        className="modal-rise glass relative flex max-h-[100dvh] w-full flex-col overflow-hidden rounded-b-none sm:max-h-[92vh] sm:max-w-[680px] sm:rounded-b-[14px]"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-3 sm:px-8">
          <p id="builder-title" className="flex items-baseline gap-2">
            <Wordmark className="text-[26px]" />
            <span className="text-sm font-semibold text-muted">Book my tint</span>
          </p>
          <button type="button" data-autofocus onClick={onClose} aria-label="Close booking" className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink hover:border-lime hover:text-lime">
            <X size={20} strokeWidth={1.75} aria-hidden />
          </button>
        </div>
        <div className="overflow-y-auto overscroll-contain px-5 pb-[max(24px,env(safe-area-inset-bottom))] pt-6 sm:px-8 sm:pb-8">
          <TintBuilderFlow preset={preset} />
        </div>
      </div>
    </div>
  );
}
