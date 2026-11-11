"use client";

import { useRef } from "react";
import { Info } from "lucide-react";
import { darkerThanFront, fmtLimit, stateOrder, tintLaws, type StateId } from "@/lib/tintLaws";

const rows = [
  { key: "front", label: "Front side" },
  { key: "rear", label: "Rear side" },
  { key: "back", label: "Back window" },
] as const;

export function LegalStrip({ state, onState, vlt }: { state: StateId; onState: (s: StateId) => void; vlt: number }) {
  const law = tintLaws[state];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tooDark = darkerThanFront(vlt, state);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    const next = (i + dir + stateOrder.length) % stateOrder.length;
    onState(stateOrder[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="glass p-5 sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="display text-[28px] text-ink">Is it legal where I live?</h3>
        <div role="tablist" aria-label="State" className="inline-flex self-start rounded-full border border-line bg-bg p-1">
          {stateOrder.map((s, i) => (
            <button
              key={s}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`law-tab-${s}`}
              aria-selected={state === s}
              aria-controls="law-panel"
              tabIndex={state === s ? 0 : -1}
              onClick={() => onState(s)}
              onKeyDown={(e) => onKey(e, i)}
              className={`h-10 min-w-[84px] rounded-full px-4 text-sm font-semibold transition-colors ${
                state === s ? "bg-lime text-bg" : "text-muted hover:text-ink"
              }`}
            >
              {tintLaws[s].name}
            </button>
          ))}
        </div>
      </div>

      <div id="law-panel" role="tabpanel" aria-labelledby={`law-tab-${state}`} className="mt-5">
        <table className="w-full text-left text-sm sm:text-[15px]">
          <caption className="sr-only">Minimum visible light let through in {law.name}</caption>
          <thead>
            <tr className="text-muted">
              <th scope="col" className="pb-3 font-medium">Window</th>
              <th scope="col" className="pb-3 font-medium">Sedans</th>
              <th scope="col" className="pb-3 font-medium">SUVs &amp; trucks</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} className="border-t border-line">
                <th scope="row" className="py-3 font-medium text-ink/85">{r.label}</th>
                <td className="display py-3 text-[22px] text-ink">{fmtLimit(law.sedan[r.key])}</td>
                <td className="display py-3 text-[22px] text-ink">{fmtLimit(law.suv[r.key])}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-sm text-muted">
          Windshield: {law.windshield}. {law.note}
        </p>

        <p aria-live="polite" className="mt-4 min-h-6 text-sm">
          {tooDark && (
            <span className="inline-flex items-start gap-2 text-ink">
              <Info size={17} strokeWidth={1.75} className="mt-0.5 shrink-0 text-lime" aria-hidden />
              Darker than the legal front-side limit in {law.name}. Popular for rear windows.
            </span>
          )}
        </p>
        <p className="mt-2 text-xs text-muted">General guide, not legal advice. Medical exemptions may apply. Ask us.</p>
      </div>
    </div>
  );
}
