"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useBooking } from "../BookingContext";

// DRAFT: confirm what the $99 special covers and if it's still running.
export function PromoBar() {
  const { open } = useBooking();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("promo-dismissed") === "1") setHidden(true);
    } catch {}
  }, []);

  if (hidden) return null;

  const dismiss = () => {
    setHidden(true);
    try {
      sessionStorage.setItem("promo-dismissed", "1");
    } catch {}
  };

  return (
    <div className="relative z-50 bg-lime text-bg" role="region" aria-label="Current special">
      <div className="container-x flex min-h-10 items-center justify-center gap-x-3 py-2 pr-12 text-center text-[13px] font-semibold sm:text-sm">
        <p>
          <span className="display mr-1 text-[17px] font-extrabold">$99</span> Window Tint Special.<span className="hidden sm:inline"> Ask when you book.</span>{" "}
          <button
            type="button"
            onClick={() => open({ special: true })}
            className="ml-1 inline-flex min-h-6 items-center underline decoration-2 underline-offset-4 hover:no-underline"
          >
            Book My Tint
          </button>
        </p>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss special"
        className="absolute right-1 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full hover:bg-black/10"
      >
        <X size={18} strokeWidth={1.75} aria-hidden />
      </button>
    </div>
  );
}
