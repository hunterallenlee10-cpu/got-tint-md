import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Mail, MapPin, MessageSquare, Navigation, Phone } from "lucide-react";
import { TintBuilderFlow } from "@/components/TintBuilder/TintBuilderFlow";
import { FinalCta } from "@/components/sections/FinalCta";
import { ScrollToTop } from "@/components/ScrollToTop";
import { buttonClass } from "@/components/ui/buttonClass";
import { photos } from "@/lib/gallery";
import { business, mapsEmbedUrl, mapsUrl } from "@/lib/business";

export const metadata: Metadata = {
  title: "Contact Got Tint? | Book Window Tint in Capitol Heights, MD",
  description: "Call or text (301) 828-6311, or book online. Shop at 9000A Edgeworth Dr, Capitol Heights, MD. Mobile tint across MD, DC and VA.",
  alternates: { canonical: "/contact" },
};

const tiles = [
  { icon: Phone, title: "Call", value: business.phone.display, href: business.phone.tel, sub: "Talk to us now" },
  { icon: MessageSquare, title: "Text", value: business.phone.display, href: business.phone.sms, sub: "Send a pic of your ride" },
  { icon: Mail, title: "Email", value: business.email, href: `mailto:${business.email}`, sub: "For homes and businesses" },
];

export default function ContactPage() {
  return (
    <>
      <ScrollToTop />
      <section aria-labelledby="contact-title" className="relative isolate overflow-hidden border-b border-line">
        <Image src={photos.p03.src} alt="" fill priority sizes="100vw" className="-z-10 object-cover object-[50%_40%] opacity-45" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-bg/60 via-bg/80 to-bg" />
        <div className="container-x py-20 lg:py-32">
          <p className="eyebrow mb-5">Contact · {business.address.city}, MD</p>
          <h1 id="contact-title" className="display max-w-3xl text-[60px] text-ink sm:text-8xl lg:text-[120px]">
            Let&apos;s get you <span className="text-lime">tinted.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted">Call, text or book below. Come to us, or we come to you.</p>
        </div>
      </section>

      <section aria-label="Ways to reach us" className="container-x -mt-px pt-12 lg:pt-16">
        <ul className="grid gap-4 md:grid-cols-3 lg:gap-6">
          {tiles.map((t) => {
            const Icon = t.icon;
            return (
              <li key={t.title}>
                <a href={t.href} className="glass group flex items-center gap-4 p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-white/15">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lime text-bg">
                    <Icon size={22} strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="eyebrow block">{t.title}</span>
                    <span className="display mt-1 block truncate text-[26px] leading-tight text-ink group-hover:text-lime">{t.value}</span>
                    <span className="block text-sm text-muted">{t.sub}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="book-title" className="section">
        <div className="container-x grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-8">
          <div className="glass p-6 sm:p-8 lg:p-10">
            <p className="eyebrow">Book my tint</p>
            <h2 id="book-title" className="sr-only">
              Book my tint
            </h2>
            <div className="mt-2">
              <TintBuilderFlow inline />
            </div>
          </div>

          <div className="grid content-start gap-6">
            <div className="glass p-6 sm:p-8">
              <h2 className="display text-[34px] text-ink">The shop</h2>
              <dl className="mt-5 grid gap-4">
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
                <div className="flex gap-3">
                  <dt>
                    <Phone size={20} strokeWidth={1.75} className="mt-0.5 text-lime" aria-hidden />
                    <span className="sr-only">Phone</span>
                  </dt>
                  <dd className="text-ink">
                    <a href={business.phone.tel} className="hover:text-lime">{business.phone.display}</a>
                    <span className="text-muted"> · also </span>
                    <a href={business.phone2.tel} className="hover:text-lime">{business.phone2.display}</a>
                  </dd>
                </div>
              </dl>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("ghost", "md", "mt-6")}>
                <Navigation size={18} strokeWidth={1.75} aria-hidden /> Get directions
              </a>
            </div>
            <div className="glass overflow-hidden">
              <iframe
                title="Map to Got Tint at 9000A Edgeworth Drive, Capitol Heights, MD"
                src={mapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block aspect-[4/3] w-full border-0 grayscale-[0.6] invert-[0.92] hue-rotate-180"
              />
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
