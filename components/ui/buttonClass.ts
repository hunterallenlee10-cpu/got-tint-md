// Shared by server and client components.
export type Variant = "primary" | "ghost" | "dark";
export type Size = "md" | "lg";

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

