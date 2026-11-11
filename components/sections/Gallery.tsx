"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Expand } from "lucide-react";
import { Lightbox } from "./Lightbox";
import { gallery, galleryFilters, marquee, type GalleryTag } from "@/lib/gallery";
import { buttonClass } from "../ui/Button";

const INITIAL = 12;
// Varied crops give the grid a masonry rhythm, even though the source photos are all near-square.
const ASPECTS = ["aspect-[4/5]", "aspect-square", "aspect-[4/3]", "aspect-square", "aspect-[4/3]", "aspect-[4/5]"];

function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <div aria-hidden className="marquee relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="marquee-track flex w-max gap-3">
        {row.map((p, i) => (
          <div key={i} className="relative h-24 w-36 shrink-0 overflow-hidden rounded-[10px] border border-line sm:h-28 sm:w-44">
            <Image src={p.src} alt="" fill sizes="176px" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Gallery() {
  const [filter, setFilter] = useState<"all" | GalleryTag>("all");
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState<number | null>(null);

  const items = useMemo(() => (filter === "all" ? gallery : gallery.filter((p) => p.tags.includes(filter))), [filter]);
  const visible = expanded ? items : items.slice(0, INITIAL);

  return (
    <section id="work" aria-labelledby="work-title" className="section border-t border-line">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Our work</p>
            <h2 id="work-title" className="display text-[44px] text-ink sm:text-6xl lg:text-7xl">
              Fresh off the bay.
            </h2>
            <p className="mt-5 text-lg text-muted">Real cars, real customers. Every photo here is a Got Tint job.</p>
          </div>
        </div>
      </div>

      <div className="mt-10 lg:mt-12">
        <Marquee />
      </div>

      <div className="container-x">
        <div role="group" aria-label="Filter photos" className="no-scrollbar -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
          {galleryFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => {
                setFilter(f.id);
                setExpanded(false);
              }}
              className={`h-11 shrink-0 rounded-full border px-5 text-sm font-semibold transition-colors ${
                filter === f.id ? "border-lime bg-lime text-bg" : "border-line text-ink/85 hover:border-white/25"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul className="mt-8 columns-2 gap-3 sm:gap-4 lg:columns-4" aria-live="polite">
          {visible.map((p, i) => (
            <li key={p.id} className="mb-3 break-inside-avoid sm:mb-4">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block w-full overflow-hidden rounded-[12px] border border-line"
                aria-label={`Open photo: ${p.vehicle}`}
              >
                <div className={`relative ${ASPECTS[i % ASPECTS.length]}`}>
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 300px, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-bg/85 to-transparent p-3 pt-10 text-left text-xs font-semibold text-ink sm:text-sm">
                  {p.vehicle}
                  <Expand size={16} strokeWidth={1.75} className="text-lime opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                </span>
              </button>
            </li>
          ))}
        </ul>

        {items.length > INITIAL && !expanded && (
          <div className="mt-8 flex justify-center">
            <button type="button" onClick={() => setExpanded(true)} className={buttonClass("ghost", "lg")}>
              Show more ({items.length - INITIAL})
            </button>
          </div>
        )}
      </div>

      {open !== null && <Lightbox items={visible} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </section>
  );
}
