"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { useBooking } from "../BookingContext";
import type { BuilderPreset } from "../TintBuilder/types";
import { business } from "@/lib/business";

type Variant = "primary" | "ghost" | "dark";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[transform,background-color,border-color,box-shadow,color] duration-200 active:scale-[0.97] select-none";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-14 px-7 text-base",
};

const variants: Record<Variant, string> = {
  // The only glow on the site lives on the primary button.
  primary:
    "bg-lime text-bg shadow-[0_0_0_1px_rgba(200,230,42,0.4),0_8px_32px_-8px_rgba(200,230,42,0.55)] hover:shadow-[0_0_0_1px_rgba(200,230,42,0.6),0_10px_40px_-6px_rgba(200,230,42,0.7)] hover:-translate-y-px",
  ghost: "border border-white/15 text-ink hover:border-lime/70 hover:text-lime bg-white/[0.02]",
  dark: "bg-bg text-lime hover:bg-black border border-bg",
};

export const buttonClass = (variant: Variant = "primary", size: Size = "md", extra = "") =>
  `${base} ${sizes[size]} ${variants[variant]} ${extra}`;

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
