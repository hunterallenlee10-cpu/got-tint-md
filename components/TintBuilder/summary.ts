import { business } from "@/lib/business";
import { labelOf, serviceOptions, whenOptions, whereOptions, windowOptions } from "./options";
import { isAuto, type BuilderState } from "./types";

export const digits = (s: string) => s.replace(/\D/g, "");

/** US phone: 10 digits, or 11 starting with 1. */
export const validPhone = (s: string) => {
  const d = digits(s);
  return d.length === 10 || (d.length === 11 && d.startsWith("1"));
};

export const formatPhone = (s: string) => {
  const d = digits(s).replace(/^1(?=\d{10})/, "").slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};

const fmtDate = (iso: string) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
};

/** Label / value pairs for the success screen and the SMS. */
export function summarize(s: BuilderState): [string, string][] {
  const rows: [string, string][] = [];
  rows.push(["Tinting", labelOf(serviceOptions, s.service)]);
  if (isAuto(s.service)) {
    if (s.windows.length) rows.push(["Windows", s.windows.map((w) => labelOf(windowOptions, w)).join(", ")]);
    if (s.shade) rows.push(["Shade", s.shade === "help" ? "Help me choose" : `${s.shade}%`]);
    if (s.vehicle.trim()) rows.push(["Vehicle", s.vehicle.trim()]);
  } else {
    rows.push(["Windows", `About ${s.windowCount}`]);
    if (s.propertyNote.trim()) rows.push(["About the job", s.propertyNote.trim()]);
  }
  let where = labelOf(whereOptions, s.where);
  if (s.where === "mobile" && s.zip) where += ` (ZIP ${s.zip})`;
  if (s.where === "pickup" && s.pickupAddress.trim()) where += ` (${s.pickupAddress.trim()})`;
  rows.push(["Where", where]);
  rows.push(["When", s.when === "date" ? fmtDate(s.date) : labelOf(whenOptions, s.when)]);
  if (s.special) rows.push(["Special", `Interested in the ${business.special.name}`]);
  if (s.notes.trim()) rows.push(["Notes", s.notes.trim()]);
  return rows;
}

/** Prefilled text so the request actually reaches the owner's phone. */
export function smsHref(s: BuilderState) {
  const lines = [
    `Hi Got Tint, this is ${s.name.trim()}. I'd like to book a tint.`,
    ...summarize(s).map(([k, v]) => `${k}: ${v}`),
    `My number: ${formatPhone(s.phone)}`,
  ];
  // "?&body=" works on both iOS and Android.
  return `${business.phone.sms}?&body=${encodeURIComponent(lines.join("\n"))}`;
}
