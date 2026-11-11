import Image from "next/image";
import { Clock, MapPin, Navigation } from "lucide-react";
import { CallButton } from "../ui/Button";
import { buttonClass } from "../ui/buttonClass";
import { photos } from "@/lib/gallery";
import { business, mapsUrl } from "@/lib/business";

export function VisitShop() {
  return (
    <section aria-labelledby="shop-title" className="section border-t border-line">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
        <div className="relative pb-16 sm:pb-24">
          <figure className="glass isolate relative aspect-square overflow-hidden sm:w-[86%]">
            <Image
              src={photos.p03.src}
              alt={photos.p03.alt}
              fill
              sizes="(min-width: 1024px) 560px, 90vw"
              className="object-cover"
            />
            <figcaption className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-bg/70 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur-md">
              9000A Edgeworth Dr
            </figcaption>
          </figure>
          <figure className="glass isolate absolute bottom-0 right-0 aspect-square w-[46%] overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] sm:w-[40%]">
            <Image
              src={photos.p24.src}
              alt={photos.p24.alt}
              fill
              sizes="(min-width: 1024px) 260px, 45vw"
              className="object-cover"
            />
            <figcaption className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-bg/70 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur-md">
              Inside the bay
            </figcaption>
          </figure>
        </div>

        <div>
          <p className="eyebrow mb-4">Visit the shop</p>
          <h2 id="shop-title" className="display text-[44px] text-ink sm:text-6xl lg:text-7xl">
            A real shop. Real people. Since day one.
          </h2>
          <p className="mt-5 max-w-md text-lg text-muted">
            Come see the bay, the film and the work. {business.years} years serving the DMV.
          </p>

          <dl className="mt-8 grid gap-4 border-y border-line py-6">
            <div className="flex gap-3">
              <dt>
                <MapPin size={20} strokeWidth={1.75} className="mt-0.5 text-lime" aria-hidden />
                <span className="sr-only">Address</span>
              </dt>
              <dd className="text-ink">
                {business.address.street}
                <br />
                {business.address.city}, {business.address.state} {business.address.zip}
              </dd>
            </div>
            <div className="flex gap-3">
              <dt>
                <Clock size={20} strokeWidth={1.75} className="mt-0.5 text-lime" aria-hidden />
                <span className="sr-only">Hours</span>
              </dt>
              <dd className="text-ink">{business.hours.label}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("ghost", "lg")}>
              <Navigation size={18} strokeWidth={1.75} aria-hidden />
              Get directions
            </a>
            <CallButton size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
