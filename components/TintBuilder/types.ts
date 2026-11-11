import type { ShadeId } from "@/lib/shades";

export type ServiceId = "car" | "suv" | "home" | "business" | "boat";
export type WhereId = "shop" | "mobile" | "pickup";
export type WhenId = "today" | "week" | "date" | "price";
export type WindowId = "full" | "front2" | "strip" | "windshield" | "advise";

/** What a CTA can pre-select when it opens the Tint Builder. */
export type BuilderPreset = {
  service?: ServiceId;
  where?: WhereId;
  shade?: ShadeId;
  special?: boolean;
};

export type BuilderState = {
  service: ServiceId | null;
  windows: WindowId[];
  windowCount: number;
  propertyNote: string;
  shade: ShadeId | "help" | null;
  where: WhereId | null;
  zip: string;
  pickupAddress: string;
  when: WhenId | null;
  date: string;
  name: string;
  phone: string;
  vehicle: string;
  notes: string;
  special: boolean;
};

export const isAuto = (s: ServiceId | null) => s === "car" || s === "suv";
