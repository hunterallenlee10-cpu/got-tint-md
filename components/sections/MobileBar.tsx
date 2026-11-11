"use client";

import { CalendarCheck, MessageSquare, Phone } from "lucide-react";
import { useBooking } from "../BookingContext";
import { business } from "@/lib/business";

/** Mobile only: always-visible Call / Text / Book bar. */
export function MobileBar() {
  const { open } = useBooking();
  const item = "flex h-14 flex-col items-center justify-center gap-0.5 rounded-xl text-[12px] font-semibold";
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/85 px-3 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden"
    >
      <div className="grid grid-cols-[1fr_1fr_1.4fr] gap-2">
        <a href={business.phone.tel} className={`${item} border border-line text-ink`}>
          <Phone size={19} strokeWidth={1.75} className="text-lime" aria-hidden />
          Call
        </a>
        <a href={business.phone.sms} className={`${item} border border-line text-ink`}>
          <MessageSquare size={19} strokeWidth={1.75} className="text-lime" aria-hidden />
          Text
        </a>
        <button type="button" onClick={() => open()} className={`${item} bg-lime text-bg`} aria-haspopup="dialog">
          <CalendarCheck size={19} strokeWidth={1.75} aria-hidden />
          Book My Tint
        </button>
      </div>
    </nav>
  );
}
