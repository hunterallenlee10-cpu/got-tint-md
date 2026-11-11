"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowUpRight, Anchor, Building2, Car, House } from "lucide-react";
import { useBooking } from "../BookingContext";
import { Placeholder } from "../ui/Placeholder";
import { photos } from "@/lib/gallery";
import type { ServiceId } from "../TintBuilder/types";

function Tile({
  service,
  title,
  line,
  icon: Icon,
  className = "",
  media,
  dark = false,
}: {
  service: ServiceId;
  title: string;
  line: string;
  icon: typeof Car;
  className?: string;
  media?: ReactNode;
  dark?: boolean;
}) {
  const { open } = useBooking();
  return (
    <button
      type="button"
      onClick={() => open({ service })}
      aria-haspopup="dialog"
      className={`glass group relative flex flex-col overflow-hidden text-left transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-white/15 ${className}`}
    >
      {media}
      <span className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-bg/60 text-ink backdrop-blur transition-colors group-hover:border-lime group-hover:bg-lime group-hover:text-bg">
        <ArrowUpRight size={20} strokeWidth={1.75} aria-hidden />
        <span className="sr-only">Book {title.toLowerCase()} tint</span>
      </span>
      <div className={`relative mt-auto p-6 lg:p-7 ${dark ? "pt-24" : ""}`}>
        <Icon size={24} strokeWidth={1.75} className="mb-4 text-lime" aria-hidden />
        <h3 className="display text-[36px] text-ink lg:text-[44px]">
          <span className="lime-underline pb-1">{title}</span>
        </h3>
        <p className="mt-3 max-w-sm text-muted">{line}</p>
      </div>
    </button>
  );
}

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section border-t border-line">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Services</p>
          <h2 id="services-title" className="display text-[44px] text-ink sm:text-6xl lg:text-7xl">
            Cars. Homes. Shops. Boats.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Sun protection, a cooler interior, less glare and more privacy. Pick what you&apos;re tinting.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-4 md:grid-rows-[auto_auto] lg:mt-16 lg:gap-6">
          <Tile
            service="car"
            title="Auto"
            line="Cars, trucks and SUVs. Less heat, less glare, more privacy."
            icon={Car}
            dark
            className="min-h-[440px] md:col-span-2 md:row-span-2 md:min-h-[620px]"
            media={
              <>
                <Image
                  src={photos.p08.src}
                  alt={photos.p08.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0b0f10] via-[#0b0f10]/55 to-transparent" />
              </>
            }
          />
          <Tile
            service="home"
            title="Residential"
            line="Cooler rooms, lower energy bills, privacy without blinds."
            icon={House}
            className="md:col-span-2"
            media={<Placeholder label="Photo: home window job, from Got Tint" className="m-3 mb-0 h-36 lg:h-40" />}
          />
          <Tile
            service="business"
            title="Commercial"
            line="Storefronts and offices. Less glare, added security, custom colors."
            icon={Building2}
            className="md:col-span-1"
            media={<Placeholder label="Photo: storefront job, from Got Tint" className="m-3 mb-0 h-28" />}
          />
          <Tile
            service="boat"
            title="Marine"
            line="Boats. UV and heat protection for every surface."
            icon={Anchor}
            className="md:col-span-1 md:pt-[124px]"
          />
        </div>

        <p className="display mt-14 text-center text-[34px] text-ink sm:text-5xl lg:mt-20">
          No job is too big. <span className="text-lime">No job is too small.</span>
        </p>
      </div>
    </section>
  );
}
