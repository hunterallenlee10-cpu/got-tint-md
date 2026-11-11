import type { ReactNode } from "react";
import { Plus } from "lucide-react";
import { business } from "@/lib/business";

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "How dark can I go in Maryland?",
    a: (
      <>
        35% on the front side windows of any car. On SUVs and trucks, the rear sides and back glass can go darker.{" "}
        <a href="#shades" className="font-semibold text-ink underline decoration-lime underline-offset-4">
          See the legal guide
        </a>{" "}
        for MD, DC and VA.
      </>
    ),
  },
  {
    // DRAFT: confirm mobile service radius.
    q: "Do you really come to me?",
    a: "Yes. We come to your home or work across Maryland, DC and Virginia. Call or text to check your area.",
  },
  { q: "Do you offer pickup?", a: "Yes. We pick up your car, tint it and bring it back." },
  { q: "How long does a car take?", a: "Most cars are done the same day. Call for your vehicle." },
  {
    q: "Do you tint homes and businesses?",
    a: "Yes. Every job is custom-cut. We'll schedule a visit to see the windows and give you a quote.",
  },
  // DRAFT: confirm warranty terms.
  { q: "Is there a warranty?", a: "Yes. High quality film and installation with a manufacturer's lifetime warranty. Ask us for the details." },
  { q: "What are your hours?", a: `${business.hours.label}, at ${business.address.streetShort} in ${business.address.city}.` },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section border-t border-line">
      <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div>
          <p className="eyebrow mb-4">FAQ</p>
          <h2 id="faq-title" className="display text-[44px] text-ink sm:text-6xl lg:text-7xl">
            Quick answers.
          </h2>
          <p className="mt-5 max-w-sm text-lg text-muted">
            Something else?{" "}
            <a href={business.phone.sms} className="font-semibold text-ink underline decoration-lime underline-offset-4 hover:text-lime">
              Text {business.phone.display}
            </a>
            .
          </p>
        </div>

        <div className="border-t border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold text-ink transition-colors hover:text-lime [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line transition-[transform,background-color,color,border-color] duration-300 group-open:rotate-45 group-open:border-lime group-open:bg-lime group-open:text-bg">
                  <Plus size={18} strokeWidth={1.75} aria-hidden />
                </span>
              </summary>
              <p className="max-w-xl pb-6 pr-14 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
