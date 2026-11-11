import Image from "next/image";
import { BookButton, CallButton } from "../ui/Button";
import { TintWipe } from "./TintWipe";
import { photos, type Photo } from "@/lib/gallery";
import { business } from "@/lib/business";

function Chip({ children, top = false }: { children: string; top?: boolean }) {
  return (
    <span className={`absolute ${top ? "right-3 top-3" : "bottom-3 left-3"} z-10 rounded-full border border-white/10 bg-bg/70 px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur-md`}>
      {children}
    </span>
  );
}

function CollageCard({
  photo,
  className,
  sizes,
  objectPosition = "50% 50%",
  priority = false,
  chipTop = false,
  children,
}: {
  photo: Photo;
  className: string;
  sizes: string;
  objectPosition?: string;
  priority?: boolean;
  chipTop?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <figure className={`glass isolate overflow-hidden p-0 ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{ objectPosition }}
      />
      {/* glass highlight */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/70 to-transparent" />
      {children}
      <Chip top={chipTop}>{photo.vehicle}</Chip>
    </figure>
  );
}

const facts = [
  { big: "18+", small: "Years" },
  { big: "7 days", small: "Open 9 to 7" },
  { big: "Mobile", small: "+ Pickup" },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Soft smoked backdrop, no glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_75%_35%,#121819_0%,transparent_70%)]"
      />
      <div className="container-x relative grid gap-y-8 pb-16 pt-8 sm:pt-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:pb-28 lg:pt-16">
        {/* Head */}
        <div className="lg:col-start-1 lg:row-start-1 lg:self-end">
          <p className="eyebrow flex items-center gap-2.5 !text-[11px] !tracking-[0.12em] sm:!text-xs sm:!tracking-[0.18em]">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" aria-hidden />
            Capitol Heights, MD · Serving MD, DC &amp; VA
          </p>
          <h1 id="hero-title" className="display mt-5 text-ink">
            <span className="block text-[88px] lowercase leading-[0.85] text-lime sm:text-[120px] lg:text-[150px] xl:text-[168px]">
              got tint?
            </span>
            <span className="mt-3 block text-[52px] leading-[0.95] sm:mt-4 lg:mt-5 sm:text-[72px] lg:text-[80px] xl:text-[88px]">
              We come to you.
            </span>
          </h1>
        </div>

        {/* Media */}
        <div className="relative lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          {/* Mobile: one card. Desktop: three stacked, offset cards. */}
          <div className="relative aspect-[5/4] w-full lg:aspect-auto lg:h-[600px]">
            <CollageCard
              photo={photos.p13}
              className="!absolute right-0 top-0 hidden aspect-[4/5] w-[44%] lg:block"
              sizes="(min-width: 1024px) 280px, 0px"
              objectPosition="30% 50%"
              chipTop
            />
            <CollageCard
              photo={photos.p12}
              className="!absolute bottom-0 right-0 hidden aspect-[4/3] w-[52%] lg:block"
              sizes="(min-width: 1024px) 300px, 0px"
              objectPosition="45% 60%"
            />
            <CollageCard
              photo={photos.p07}
              className="!absolute inset-0 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] lg:inset-auto lg:left-0 lg:top-[15%] lg:aspect-[6/5] lg:w-[72%]"
              sizes="(min-width: 1024px) 440px, calc(100vw - 40px)"
              objectPosition="40% 38%"
              priority
            >
              <TintWipe />
            </CollageCard>
          </div>
        </div>

        {/* Body */}
        <div className="lg:col-start-1 lg:row-start-2">
          <p className="max-w-[34rem] text-lg leading-relaxed text-muted sm:text-xl">
            Pro window tint for cars, homes, businesses and boats. Bring it to our shop, or we&apos;ll come to your
            driveway. {business.years} years in the DMV.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BookButton size="lg" arrow />
            <CallButton size="lg" />
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 divide-x divide-line border-y border-line">
            {facts.map((f) => (
              <div key={f.big} className="px-4 py-4 first:pl-0">
                <dt className="sr-only">{f.small}</dt>
                <dd>
                  <span className="display block text-[28px] uppercase leading-none text-lime sm:text-[32px]">{f.big}</span>
                  <span className="mt-1.5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted sm:text-xs">
                    {f.small}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
