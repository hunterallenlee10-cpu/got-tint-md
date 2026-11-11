import { BookButton, CallButton } from "../ui/Button";

// DRAFT: confirm what the $99 special covers and if it's still running.
// The only lime-tinted section on the site.
export function OfferBand() {
  return (
    <section aria-labelledby="offer-title" className="border-y border-lime/20 bg-[rgba(200,230,42,0.06)]">
      <div className="container-x grid items-center gap-10 py-[72px] lg:grid-cols-[auto_1fr] lg:gap-16 lg:py-28">
        <p aria-hidden className="display text-[150px] leading-[0.8] text-lime sm:text-[200px] lg:text-[240px]">
          $99
        </p>
        <div>
          <p className="eyebrow mb-4 !text-lime">The special</p>
          <h2 id="offer-title" className="display text-[44px] text-ink sm:text-6xl lg:text-7xl">
            The $99 Window Tint Special.
          </h2>
          <p className="mt-5 max-w-lg text-lg text-ink/80">Ask what&apos;s included for your vehicle when you book.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BookButton preset={{ special: true }} size="lg" arrow>
              Claim the $99 special
            </BookButton>
            <CallButton size="lg" label="Ask about it" />
          </div>
        </div>
      </div>
    </section>
  );
}
