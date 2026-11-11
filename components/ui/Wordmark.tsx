/** The "got tint?" wordmark. Lowercase, condensed, lime question mark. */
export function Wordmark({ className = "", allLime = false }: { className?: string; allLime?: boolean }) {
  return (
    <span className={`display inline-block lowercase leading-none tracking-tight ${className}`}>
      <span className={allLime ? "text-lime" : "text-ink"}>got tint</span>
      <span className="text-lime">?</span>
    </span>
  );
}
