// Window tint limits for passenger vehicles. Numbers are minimum VLT % (light let through).
// 0 means any darkness is allowed. Checked November 2026 against the statute text.
// General guide only. The site always shows "General guide, not legal advice."
//
// MARYLAND: Md. Code, Transp. § 22-406(i) and COMAR 29.02.01.11
//   https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=gtr&section=22-406&enactments=false
//   https://law.cornell.edu/regulations/maryland/COMAR-29-02-01-11
//   Medical certificate rule updated by HB 436 (Ch. 452 of 2025): https://mgaleg.maryland.gov/mgawebsite/Legislation/Details/hb0436?ys=2025RS
//   Windshield: no tint below the AS-1 line or the top 5 inches. Outside mirrors required on both sides if tinted.
//
// DISTRICT OF COLUMBIA: D.C. Code § 50-2207.02(a), (b), (h)
//   https://code.dccouncil.gov/us/dc/council/code/sections/50-2207.02
//   The Code names only "mini-van" for the 55/35 rule. SUVs and trucks are not named, so we show 70/50
//   for them and call out minivans separately. Factory-installed glass is exempt.
//
// VIRGINIA: Va. Code §§ 46.2-1052 and 46.2-1053
//   https://law.lis.virginia.gov/vacode/title46.2/chapter10/section46.2-1052/
//   https://law.lis.virginia.gov/vacode/title46.2/chapter10/section46.2-1053/
//   Confirmation: https://www.tintlaws.com/virginia/
//   Windshield: only a top sunshield strip (AS-1). Rear tint needs dual side mirrors. Statute allows a 7 point tolerance.

export type StateId = "MD" | "DC" | "VA";

export type Limits = { front: number; rear: number; back: number };

export type TintLaw = {
  id: StateId;
  name: string;
  sedan: Limits;
  suv: Limits;
  windshield: string;
  note: string;
};

export const tintLaws: Record<StateId, TintLaw> = {
  MD: {
    id: "MD",
    name: "Maryland",
    sedan: { front: 35, rear: 35, back: 35 },
    suv: { front: 35, rear: 0, back: 0 },
    windshield: "Top 5 inches only",
    note: "Mirrors on both sides required with tint.",
  },
  DC: {
    id: "DC",
    name: "DC",
    sedan: { front: 70, rear: 50, back: 50 },
    suv: { front: 70, rear: 50, back: 50 },
    windshield: "70%, darker only above the AS-1 line",
    note: "Minivans: 55% front, 35% rear. Factory glass is exempt.",
  },
  VA: {
    id: "VA",
    name: "Virginia",
    sedan: { front: 50, rear: 35, back: 35 },
    suv: { front: 50, rear: 0, back: 0 },
    windshield: "Top strip only (AS-1 line)",
    note: "Mirrors on both sides required with rear tint.",
  },
};

export const stateOrder: StateId[] = ["MD", "DC", "VA"];

export const fmtLimit = (v: number) => (v === 0 ? "Any" : `${v}%`);

/** True when a shade is darker than the front-side limit in that state. */
export const darkerThanFront = (vlt: number, state: StateId) => vlt < tintLaws[state].sedan.front;
