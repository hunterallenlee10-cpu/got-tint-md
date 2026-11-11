import Image from "next/image";
import { BookButton, CallButton } from "../ui/Button";
import { photos } from "@/lib/gallery";

// DRAFT: "by tonight" depends on availability. Swap for "this week" if the owner prefers.
export function FinalCta() {
  return (
    <section aria-labelledby="final-title" className="pb-[72px] lg:pb-28">
      <div className="container-x">
        <div className="glass isolate relative overflow-hidden px-6 py-20 text-center sm:px-12 lg:py-28">
          <Image
            src={photos.p20.src}
            alt=""
            fill
            sizes="(min-width: 1240px) 1176px, 100vw"
            className="-z-10 object-cover opacity-70"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(80%_80%_at_50%_50%,rgba(7,9,10,0.5)_0%,rgba(7,9,10,0.88)_100%)]" />
          <p className="eyebrow mb-5 !text-ink/70">Capitol Heights · MD, DC &amp; VA</p>
          <h2 id="final-title" className="display mx-auto max-w-4xl text-[52px] text-ink sm:text-7xl lg:text-[104px]">
            Your windows. <span className="text-lime">Darker by tonight.</span>
          </h2>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <BookButton size="lg" arrow />
            <CallButton size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
