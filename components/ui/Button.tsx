"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { useBooking } from "../BookingContext";
import type { BuilderPreset } from "../TintBuilder/types";
import { business } from "@/lib/business";

import { buttonClass, type Size, type Variant } from "./buttonClass";

export { buttonClass };

type BookProps = {
  preset?: BuilderPreset;
  children?: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  arrow?: boolean;
} & Omit<ComponentPropsWithoutRef<"button">, "children">;

/** Every "Book" CTA on the site uses this. It opens the Tint Builder with presets. */
export function BookButton({
  preset,
  children = "Book My Tint",
  variant = "primary",
  size = "md",
  className = "",
  arrow = false,
  ...rest
}: BookProps) {
  const { open } = useBooking();
  return (
    <button
      type="button"
      className={buttonClass(variant, size, className)}
      onClick={() => open(preset)}
      aria-haspopup="dialog"
      {...rest}
    >
      {children}
      {arrow && <ArrowRight size={18} strokeWidth={1.75} aria-hidden />}
    </button>
  );
}

export function CallButton({
  variant = "ghost",
  size = "md",
  className = "",
  label,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  label?: string;
}) {
  return (
    <a href={business.phone.tel} className={buttonClass(variant, size, className)}>
      <Phone size={18} strokeWidth={1.75} aria-hidden />
      {label ?? `Call ${business.phone.display}`}
    </a>
  );
}
