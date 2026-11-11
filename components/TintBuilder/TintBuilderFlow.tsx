"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CircleCheck, MessageSquare, Phone } from "lucide-react";
import { business } from "@/lib/business";
import { buttonClass } from "../ui/buttonClass";
import { StepInfo, StepService, StepShade, StepWhen, StepWhere, StepWindows } from "./Steps";
import { smsHref, summarize, validPhone } from "./summary";
import { isAuto, type BuilderPreset, type BuilderState } from "./types";

type StepId = "service" | "windows" | "shade" | "where" | "when" | "info";

const TITLES: Record<StepId, string> = {
  service: "What are we tinting?",
  windows: "What windows?",
  shade: "Pick a shade.",
  where: "Where?",
  when: "When?",
  info: "Your info.",
};

const initial = (p: BuilderPreset): BuilderState => ({
  service: p.service ?? null,
  windows: [],
  windowCount: 4,
  propertyNote: "",
  shade: p.shade ?? null,
  where: p.where ?? null,
  zip: "",
  pickupAddress: "",
  when: null,
  date: "",
  name: "",
  phone: "",
  vehicle: "",
  notes: "",
  special: !!p.special,
});

function isValid(step: StepId, s: BuilderState) {
  switch (step) {
    case "service":
      return !!s.service;
    case "windows":
      return isAuto(s.service) ? s.windows.length > 0 : s.windowCount > 0;
    case "shade":
      return !!s.shade;
    case "where":
      if (!s.where) return false;
      if (s.where === "mobile") return /^\d{5}$/.test(s.zip);
      if (s.where === "pickup") return s.pickupAddress.trim().length >= 5;
      return true;
    case "when":
      return !!s.when && (s.when !== "date" || !!s.date);
    case "info":
      return !!s.name.trim() && validPhone(s.phone);
  }
}

const PICK_MSG: Partial<Record<StepId, string>> = {
  service: "Pick one to keep going.",
  windows: "Pick at least one, or choose “Not sure, advise me.”",
  shade: "Pick a shade, or choose “Not sure.”",
  where: "Pick where you want it done.",
  when: "Pick a time that works.",
};

export function TintBuilderFlow({ preset = {}, inline = false }: { preset?: BuilderPreset; inline?: boolean }) {
  const [s, setS] = useState<BuilderState>(() => initial(preset));
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<"next" | "back">("next");
  const [showErrors, setShowErrors] = useState(false);
  const [done, setDone] = useState(false);
  const headRef = useRef<HTMLHeadingElement>(null);
  const lastView = useRef("0-false");

  const steps = useMemo<StepId[]>(
    () => (isAuto(s.service) || !s.service ? ["service", "windows", "shade", "where", "when", "info"] : ["service", "windows", "where", "when", "info"]),
    [s.service],
  );
  const step = steps[Math.min(i, steps.length - 1)];
  const set = (patch: Partial<BuilderState>) => setS((prev) => ({ ...prev, ...patch }));

  // Move focus to the new step's heading, but only when the step actually changes.
  useEffect(() => {
    const view = `${i}-${done}`;
    if (view === lastView.current) return;
    lastView.current = view;
    headRef.current?.focus({ preventScroll: true });
    headRef.current?.scrollIntoView({ block: "nearest" });
  }, [i, done]);

  const next = () => {
    if (!isValid(step, s)) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setDir("next");
    if (i === steps.length - 1) setDone(true);
    else setI(i + 1);
  };
  const back = () => {
    setShowErrors(false);
    setDir("back");
    setI(Math.max(0, i - 1));
  };

  if (done) {
    return (
      <div className="step-in-next" aria-live="polite">
        <CircleCheck size={56} strokeWidth={1.75} className="text-lime" aria-hidden />
        {/* DRAFT: confirm reply method and timing with owner. */}
        <h2 ref={headRef} tabIndex={-1} className="display mt-5 text-[40px] text-ink outline-none sm:text-[52px]">
          Got it, {s.name.trim().split(" ")[0]}. We&apos;ll text you to confirm your time.
        </h2>
        <dl className="mt-6 divide-y divide-line rounded-[12px] border border-line">
          {summarize(s).map(([k, v]) => (
            <div key={k} className="grid grid-cols-[110px_1fr] gap-3 px-4 py-3 text-sm sm:grid-cols-[140px_1fr]">
              <dt className="text-muted">{k}</dt>
              <dd className="text-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm text-muted">Want it faster? Send this to us now, or call.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <a href={smsHref(s)} className={buttonClass("primary", "lg")}>
            <MessageSquare size={18} strokeWidth={1.75} aria-hidden /> Text now
          </a>
          <a href={business.phone.tel} className={buttonClass("ghost", "lg")}>
            <Phone size={18} strokeWidth={1.75} aria-hidden /> Call now
          </a>
        </div>
      </div>
    );
  }

  const pickMsg = showErrors && !isValid(step, s) ? PICK_MSG[step] : undefined;
  const progress = ((i + 1) / steps.length) * 100;

  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        <span>
          Step {i + 1} of {steps.length}
        </span>
        {s.special && <span className="rounded-full border border-lime/40 px-2.5 py-1 text-[10px] text-lime">$99 special</span>}
      </div>
      <div
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]"
        role="progressbar"
        aria-label="Booking progress"
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-valuenow={i + 1}
      >
        <div className="h-full rounded-full bg-lime transition-[width] duration-500 ease-[var(--ease-film)]" style={{ width: `${progress}%` }} />
      </div>

      <div key={step} className={dir === "next" ? "step-in-next" : "step-in-back"}>
        <h2 ref={headRef} tabIndex={-1} className={`display mt-7 text-ink outline-none ${inline ? "text-[36px] sm:text-[44px]" : "text-[38px] sm:text-[48px]"}`}>
          {TITLES[step]}
        </h2>
        <div className="mt-5">
          {step === "service" && <StepService s={s} set={set} showErrors={showErrors} />}
          {step === "windows" && <StepWindows s={s} set={set} showErrors={showErrors} />}
          {step === "shade" && <StepShade s={s} set={set} showErrors={showErrors} />}
          {step === "where" && <StepWhere s={s} set={set} showErrors={showErrors} />}
          {step === "when" && <StepWhen s={s} set={set} showErrors={showErrors} />}
          {step === "info" && <StepInfo s={s} set={set} showErrors={showErrors} phoneOk={validPhone(s.phone)} />}
        </div>
        <p role="alert" className="mt-4 min-h-5 text-sm text-lime">
          {pickMsg}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-5">
        {i > 0 ? (
          <button type="button" onClick={back} className={buttonClass("ghost", "md")}>
            <ArrowLeft size={18} strokeWidth={1.75} aria-hidden /> Back
          </button>
        ) : (
          <span />
        )}
        <button type="button" onClick={next} className={buttonClass("primary", "lg")}>
          {step === "info" ? "Send my request" : "Next"}
          <ArrowRight size={18} strokeWidth={1.75} aria-hidden />
        </button>
      </div>
    </div>
  );
}
