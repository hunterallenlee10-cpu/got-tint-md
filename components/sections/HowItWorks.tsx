import { CalendarCheck, MapPinned, Sun } from "lucide-react";
import { BookButton } from "../ui/Button";

const steps = [
  { n: "01", icon: CalendarCheck, title: "Book it", line: "Book online, call or text. Takes a minute." },
  { n: "02", icon: MapPinned, title: "Pick your spot", line: "Our shop, your driveway, or we pick it up." },
  // DRAFT: confirm warranty terms (manufacturer's lifetime warranty on the film).
  { n: "03", icon: Sun, title: "Drive away cooler", line: "With a manufacturer's lifetime warranty on the film." },
];

export function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-title" className="section border-t border-line">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">How it works</p>
            <h2 id="how-title" className="display text-[44px] text-ink sm:text-6xl lg:text-7xl">
              Three steps. No runaround.
            </h2>
          </div>
          <BookButton size="lg" arrow className="self-start lg:self-auto" />
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16 lg:gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.n} className="glass relative overflow-hidden p-7 lg:p-8">
                <span aria-hidden className="display absolute -right-2 -top-6 text-[150px] leading-none text-white/[0.035]">
                  {s.n}
                </span>
                <span className="display text-[22px] text-lime">{s.n}</span>
                <Icon size={26} strokeWidth={1.75} className="mt-8 text-ink" aria-hidden />
                <h3 className="display mt-4 text-[34px] text-ink">{s.title}</h3>
                <p className="mt-2 text-muted">{s.line}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
