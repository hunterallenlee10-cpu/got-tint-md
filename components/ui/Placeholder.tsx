import { ImageIcon } from "lucide-react";

/**
 * Honest stand-in for photos we don't have yet. Never replace with stock or AI images.
 * TODO (owner): send real photos of home, business and boat jobs.
 */
export function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder. ${label}`}
      className={`relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-dashed border-white/12 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.025)_0_10px,transparent_10px_20px)] p-4 text-center ${className}`}
    >
      <ImageIcon size={22} strokeWidth={1.75} className="text-muted" aria-hidden />
      <span className="text-xs font-medium text-muted">{label}</span>
    </div>
  );
}
