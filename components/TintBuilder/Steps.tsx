"use client";

import type { ReactNode } from "react";
import { Check, Info, Minus, Plus } from "lucide-react";
import { shades } from "@/lib/shades";
import { serviceOptions, whenOptions, whereOptions, windowOptions } from "./options";
import { formatPhone } from "./summary";
import { isAuto, type BuilderState, type WindowId } from "./types";

export type StepProps = { s: BuilderState; set: (patch: Partial<BuilderState>) => void; showErrors: boolean };

const cardBase =
  "relative flex cursor-pointer items-center gap-4 rounded-[12px] border border-line bg-white/[0.02] p-4 transition-colors hover:border-white/25 has-[:checked]:border-lime has-[:checked]:bg-lime/[0.07] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-lime";

const inputCls =
  "h-12 w-full rounded-[10px] border border-line bg-bg px-4 text-base text-ink placeholder:text-muted/70 focus:border-lime focus:outline-none aria-[invalid=true]:border-[#e5a35a]";

function Tick() {
  return (
    <span className="ml-auto grid h-6 w-6 shrink-0 place-items-center rounded-full border border-white/20 text-transparent transition-colors [label:has(:checked)_&]:border-lime [label:has(:checked)_&]:bg-lime [label:has(:checked)_&]:text-bg">
      <Check size={14} strokeWidth={2.5} aria-hidden />
    </span>
  );
}

function Field({ label, id, error, hint, children }: { label: string; id: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label}
        {hint && <span className="ml-1 font-normal text-muted">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-2 text-sm text-[#f0b46a]">
          {error}
        </p>
      )}
    </div>
  );
}

export function StepService({ s, set }: StepProps) {
  return (
    <fieldset>
      <legend className="sr-only">What are we tinting?</legend>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {serviceOptions.map((o) => {
          const Icon = o.icon;
          return (
            <label key={o.id} className={`${cardBase} flex-col items-start gap-3 p-5 ${o.id === "boat" ? "col-span-2 sm:col-span-1" : ""}`}>
              <input
                type="radio"
                name="service"
                className="sr-only"
                checked={s.service === o.id}
                onChange={() => set({ service: o.id })}
              />
              <Icon size={28} strokeWidth={1.75} className="text-lime" aria-hidden />
              <span className="font-semibold text-ink">{o.label}</span>
              <span className="absolute right-3 top-3">
                <Tick />
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

const EXCLUSIVE: WindowId[][] = [["full", "front2"], ["strip", "windshield"]];

export function StepWindows({ s, set }: StepProps) {
  if (!isAuto(s.service)) {
    return (
      <div className="grid gap-6">
        <div>
          <p className="mb-3 text-sm font-semibold text-ink" id="count-label">About how many windows?</p>
          <div className="inline-flex items-center gap-2 rounded-full border border-line p-1.5" role="group" aria-labelledby="count-label">
            <button type="button" aria-label="Fewer windows" onClick={() => set({ windowCount: Math.max(1, s.windowCount - 1) })} className="grid h-11 w-11 place-items-center rounded-full bg-surface text-ink hover:text-lime">
              <Minus size={18} strokeWidth={1.75} aria-hidden />
            </button>
            <output aria-live="polite" className="display w-16 text-center text-[36px] text-lime">{s.windowCount}</output>
            <button type="button" aria-label="More windows" onClick={() => set({ windowCount: Math.min(99, s.windowCount + 1) })} className="grid h-11 w-11 place-items-center rounded-full bg-surface text-ink hover:text-lime">
              <Plus size={18} strokeWidth={1.75} aria-hidden />
            </button>
          </div>
          <p className="mt-2 text-sm text-muted">A rough count is fine. We measure on site.</p>
        </div>
        <Field label="Anything we should know?" hint="(optional)" id="propertyNote">
          <textarea id="propertyNote" rows={3} value={s.propertyNote} onChange={(e) => set({ propertyNote: e.target.value })} placeholder="Sliding door, skylight, storefront glass..." className={`${inputCls} h-auto py-3`} />
        </Field>
      </div>
    );
  }

  const toggle = (id: WindowId) => {
    let next = s.windows.includes(id) ? s.windows.filter((w) => w !== id) : [...s.windows, id];
    if (id === "advise" && next.includes("advise")) next = ["advise"];
    else if (id !== "advise") {
      next = next.filter((w) => w !== "advise");
      const group = EXCLUSIVE.find((g) => g.includes(id));
      if (group && next.includes(id)) next = next.filter((w) => w === id || !group.includes(w));
    }
    set({ windows: next });
  };

  const showWindshieldNote = s.windows.includes("windshield");

  return (
    <fieldset>
      <legend className="mb-3 text-sm text-muted">Pick all that apply.</legend>
      <div className="flex flex-wrap gap-2.5">
        {windowOptions.map((o) => (
          <label key={o.id} className={`${cardBase} min-h-12 gap-3 rounded-full px-4 py-2.5`}>
            <input type="checkbox" className="sr-only" checked={s.windows.includes(o.id)} onChange={() => toggle(o.id)} />
            <span className="text-[15px] font-semibold text-ink">{o.label}</span>
            <Tick />
          </label>
        ))}
      </div>
      {showWindshieldNote && (
        <p className="mt-4 flex items-start gap-2 text-sm text-ink">
          <Info size={17} strokeWidth={1.75} className="mt-0.5 shrink-0 text-lime" aria-hidden />
          {windowOptions.find((o) => o.id === "windshield")!.note}{" "}
        </p>
      )}
    </fieldset>
  );
}

export function StepShade({ s, set }: StepProps) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm text-muted">Lower number, darker glass.</legend>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {shades.map((sh) => (
          <label key={sh.vlt} className={`${cardBase} flex-col gap-2 p-3`}>
            <input type="radio" name="shade" className="sr-only" checked={s.shade === sh.vlt} onChange={() => set({ shade: sh.vlt })} />
            <span aria-hidden className="h-14 w-full rounded-[8px] border border-white/10 bg-gradient-to-br from-[#8fb7c4] to-[#4d6f7a]" style={{ boxShadow: `inset 0 0 0 999px rgba(3,4,5,${sh.overlay})` }} />
            <span className="display text-[24px] leading-none text-ink">{sh.vlt}%</span>
            {sh.vlt === 5 && <span className="-mt-1 text-[11px] text-muted">limo</span>}
          </label>
        ))}
        <label className={`${cardBase} col-span-3 justify-center p-3 text-center sm:col-span-1 sm:flex-col`}>
          <input type="radio" name="shade" className="sr-only" checked={s.shade === "help"} onChange={() => set({ shade: "help" })} />
          <span className="text-sm font-semibold text-ink">Not sure, help me choose</span>
        </label>
      </div>
    </fieldset>
  );
}

export function StepWhere({ s, set, showErrors }: StepProps) {
  const zipErr = showErrors && s.where === "mobile" && !/^\d{5}$/.test(s.zip) ? "Enter a 5-digit ZIP so we know where to come." : undefined;
  const addrErr = showErrors && s.where === "pickup" && s.pickupAddress.trim().length < 5 ? "Add the pickup address." : undefined;
  return (
    <div className="grid gap-5">
      <fieldset>
        <legend className="sr-only">Where should we tint?</legend>
        <div className="grid gap-3">
          {whereOptions.map((o) => {
            const Icon = o.icon;
            return (
              <label key={o.id} className={cardBase}>
                <input type="radio" name="where" className="sr-only" checked={s.where === o.id} onChange={() => set({ where: o.id })} />
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-surface ring-1 ring-line">
                  <Icon size={20} strokeWidth={1.75} className="text-lime" aria-hidden />
                </span>
                <span>
                  <span className="block font-semibold text-ink">{o.label}</span>
                  <span className="block text-sm text-muted">{o.sub}</span>
                </span>
                <Tick />
              </label>
            );
          })}
        </div>
      </fieldset>
      {s.where === "mobile" && (
        <Field label="Your ZIP code" id="zip" error={zipErr}>
          <input id="zip" inputMode="numeric" autoComplete="postal-code" maxLength={5} value={s.zip} onChange={(e) => set({ zip: e.target.value.replace(/\D/g, "").slice(0, 5) })} aria-invalid={!!zipErr} aria-describedby={zipErr ? "zip-err" : undefined} className={`${inputCls} max-w-[200px]`} placeholder="20743" />
        </Field>
      )}
      {s.where === "pickup" && (
        <Field label="Pickup address" id="pickupAddress" error={addrErr}>
          <input id="pickupAddress" autoComplete="street-address" value={s.pickupAddress} onChange={(e) => set({ pickupAddress: e.target.value })} aria-invalid={!!addrErr} aria-describedby={addrErr ? "pickupAddress-err" : undefined} className={inputCls} placeholder="Street, city" />
        </Field>
      )}
    </div>
  );
}

export function StepWhen({ s, set, showErrors }: StepProps) {
  const today = new Date();
  const min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  const dateErr = showErrors && s.when === "date" && !s.date ? "Pick a date." : undefined;
  return (
    <div className="grid gap-5">
      <fieldset>
        <legend className="sr-only">When works for you?</legend>
        <div className="grid grid-cols-2 gap-3">
          {whenOptions.map((o) => {
            const Icon = o.icon;
            return (
              <label key={o.id} className={`${cardBase} flex-col items-start gap-3 p-5`}>
                <input type="radio" name="when" className="sr-only" checked={s.when === o.id} onChange={() => set({ when: o.id })} />
                <Icon size={24} strokeWidth={1.75} className="text-lime" aria-hidden />
                <span className="font-semibold text-ink">{o.label}</span>
                <span className="absolute right-3 top-3">
                  <Tick />
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
      {s.when === "date" && (
        <Field label="Date" id="date" error={dateErr}>
          <input id="date" type="date" min={min} value={s.date} onChange={(e) => set({ date: e.target.value })} aria-invalid={!!dateErr} className={`${inputCls} max-w-[240px] [color-scheme:dark]`} />
        </Field>
      )}
    </div>
  );
}

export function StepInfo({ s, set, showErrors, phoneOk }: StepProps & { phoneOk: boolean }) {
  const nameErr = showErrors && !s.name.trim() ? "What should we call you?" : undefined;
  const phoneErr = showErrors && !phoneOk ? "That number doesn't look right. Try 10 digits, like (301) 555-0123." : undefined;
  return (
    <div className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" id="name" error={nameErr}>
          <input id="name" autoComplete="name" value={s.name} onChange={(e) => set({ name: e.target.value })} aria-invalid={!!nameErr} aria-describedby={nameErr ? "name-err" : undefined} aria-required className={inputCls} />
        </Field>
        <Field label="Phone" id="phone" error={phoneErr}>
          <input id="phone" type="tel" inputMode="tel" autoComplete="tel" value={s.phone} onChange={(e) => set({ phone: formatPhone(e.target.value) })} aria-invalid={!!phoneErr} aria-describedby={phoneErr ? "phone-err" : undefined} aria-required className={inputCls} placeholder="(301) 555-0123" />
        </Field>
      </div>
      {isAuto(s.service) && (
        <Field label="Vehicle" hint="(year, make, model)" id="vehicle">
          <input id="vehicle" value={s.vehicle} onChange={(e) => set({ vehicle: e.target.value })} className={inputCls} placeholder="2022 Honda Accord" />
        </Field>
      )}
      <Field label="Notes" hint="(optional)" id="notes">
        <textarea id="notes" rows={2} value={s.notes} onChange={(e) => set({ notes: e.target.value })} className={`${inputCls} h-auto py-3`} />
      </Field>
      {/* DRAFT: confirm what the $99 special covers. */}
      <label className={`${cardBase} py-3.5`}>
        <input type="checkbox" className="sr-only" checked={s.special} onChange={(e) => set({ special: e.target.checked })} />
        <span className="display text-[24px] leading-none text-lime">$99</span>
        <span className="text-[15px] font-semibold text-ink">I&apos;m interested in the $99 special</span>
        <Tick />
      </label>
    </div>
  );
}
