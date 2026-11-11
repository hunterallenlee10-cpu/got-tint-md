import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  id,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  id?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 id={id} className="display text-[44px] sm:text-6xl lg:text-7xl text-ink">
        {title}
      </h2>
      {sub && <p className={`mt-5 text-lg text-muted ${center ? "mx-auto" : ""} max-w-xl`}>{sub}</p>}
    </div>
  );
}
