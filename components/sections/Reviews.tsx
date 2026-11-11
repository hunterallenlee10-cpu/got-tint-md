"use client";

import { useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { business } from "@/lib/business";

// SAMPLE CONTENT. These are placeholders, not real customers.
// TODO (owner): replace with real Google reviews before launch.
const samples = [
  { name: "Marcus T.", text: "Came out to my job and did my truck in the lot. Looked clean, no bubbles, and I didn't miss a minute of work." },
  { name: "Danielle R.", text: "Dropped my car at the shop in the morning and it was ready that afternoon. Way cooler in the summer now." },
  { name: "Andre W.", text: "They picked up my car and brought it back tinted. Easy. Already sent my brother." },
];

// DRAFT: point this at the real Google Business Profile reviews link.
const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=" + encodeURIComponent(`Got Tint ${business.address.city} MD reviews`);

export function Reviews() {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (d: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: d * (el.firstElementChild as HTMLElement).offsetWidth, behavior: "smooth" });
  };

  return (
    <section aria-labelledby="reviews-title" className="section border-t border-line">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Reviews</p>
            <h2 id="reviews-title" className="display text-[44px] text-ink sm:text-6xl lg:text-7xl">
              Word gets around the DMV.
            </h2>
          </div>
          <div className="flex gap-2 lg:hidden">
            <button type="button" aria-label="Previous review" onClick={() => scroll(-1)} className="grid h-12 w-12 place-items-center rounded-full border border-line text-ink hover:border-lime hover:text-lime">
              <ChevronLeft size={20} strokeWidth={1.75} aria-hidden />
            </button>
            <button type="button" aria-label="Next review" onClick={() => scroll(1)} className="grid h-12 w-12 place-items-center rounded-full border border-line text-ink hover:border-lime hover:text-lime">
              <ChevronRight size={20} strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>

        <ul
          ref={track}
          aria-label="Sample reviews"
          className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mx-0 md:px-0 lg:mt-16 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible"
        >
          {samples.map((r) => (
            <li key={r.name} className="glass flex w-[86%] shrink-0 snap-start flex-col p-7 sm:w-[60%] lg:w-auto lg:p-8">
              <p className="self-start rounded-full border border-dashed border-lime/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-lime">
                Sample review: replace with real Google reviews
              </p>
              <Quote size={28} strokeWidth={1.75} className="mt-6 text-white/20" aria-hidden />
              <blockquote className="mt-3 flex-1 text-lg leading-relaxed text-ink">{r.text}</blockquote>
              <div className="mt-8 flex items-center gap-3">
                <span aria-hidden className="display grid h-11 w-11 place-items-center rounded-full bg-surface text-[20px] text-lime ring-1 ring-line">
                  {r.name.charAt(0)}
                </span>
                <span className="font-semibold text-ink">{r.name}</span>
              </div>
            </li>
          ))}
        </ul>

        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-ink underline decoration-lime decoration-2 underline-offset-[6px] hover:text-lime"
        >
          See our reviews on Google
          <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden />
        </a>
      </div>
    </section>
  );
}
