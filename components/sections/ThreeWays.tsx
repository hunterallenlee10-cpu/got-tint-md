import Image from "next/image";
import { Car, MapPin, Store } from "lucide-react";
import { BookButton } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";
import { photos, type Photo } from "@/lib/gallery";
import { business } from "@/lib/business";
import type { WhereId } from "../TintBuilder/types";

const ways: { where: WhereId; n: string; title: string; line: string; cta: string; photo: Photo; icon: typeof Store; pos?: string }[] = [
  {
    where: "shop",
    n: "01",
    title: "Come to the shop",
    line: `${business.address.streetShort}, ${business.address.city}. ${business.hours.short}.`,
    cta: "Book a shop visit",
    photo: photos.p04,
    icon: Store,
  },
  {
    where: "mobile",
    n: "02",
    title: "We come to you",
    line: "Home or work. We bring everything.",
    cta: "Book mobile tint",
    photo: photos.p11,
    icon: MapPin,
    pos: "40% 55%",
  },
  {
    where: "pickup",
    n: "03",
    title: "Pickup & drop-off",
    line: "We grab it, tint it and bring it back.",
    cta: "Book a pickup",
    photo: photos.p17,
    icon: Car,
  },
];

export function ThreeWays() {
  return (
    <section aria-labelledby="ways-title" className="section border-t border-line">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading id="ways-title" eyebrow="Your call, your schedule" title="3 ways to get tinted." />
          <p className="max-w-sm text-lg text-muted lg:text-right">Come to us or we can come to you. Pickup service available.</p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16 lg:gap-6">
          {ways.map((w) => {
            const Icon = w.icon;
            return (
              <li key={w.where} className="glass group flex flex-col overflow-hidden transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-white/15">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={w.photo.src}
                    alt={w.photo.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ objectPosition: w.pos ?? "50% 50%" }}
                  />
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0e1213] to-transparent" />
                  <span className="display absolute left-5 top-4 text-[22px] text-white/90 drop-shadow">{w.n}</span>
                </div>
                <div className="flex flex-1 flex-col p-6 pt-2 lg:p-7 lg:pt-3">
                  <h3 className="display flex items-center gap-3 text-[34px] text-ink lg:text-[38px]">
                    <Icon size={24} strokeWidth={1.75} className="shrink-0 text-lime" aria-hidden />
                    {w.title}
                  </h3>
                  <p className="mt-3 flex-1 text-muted">{w.line}</p>
                  <BookButton preset={{ where: w.where }} variant="ghost" className="mt-6 self-start" arrow>
                    {w.cta}
                  </BookButton>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
