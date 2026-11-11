import { Building2, CalendarDays, Car, Clock, DollarSign, House, MapPin, Sailboat, Store, Truck, Zap } from "lucide-react";
import type { ServiceId, WhenId, WhereId, WindowId } from "./types";

export const serviceOptions: { id: ServiceId; label: string; icon: typeof Car }[] = [
  { id: "car", label: "Car", icon: Car },
  { id: "suv", label: "SUV or truck", icon: Truck },
  { id: "home", label: "Home", icon: House },
  { id: "business", label: "Business", icon: Building2 },
  { id: "boat", label: "Boat", icon: Sailboat },
];

export const windowOptions: { id: WindowId; label: string; note?: string }[] = [
  { id: "full", label: "Full car (sides + back)" },
  { id: "front2", label: "Front two windows only" },
  { id: "strip", label: "Windshield sun strip" },
  { id: "windshield", label: "Full windshield", note: "Check your state's rules. Most limit windshield tint." },
  { id: "advise", label: "Not sure, advise me" },
];

export const whereOptions: { id: WhereId; label: string; sub: string; icon: typeof Car }[] = [
  { id: "shop", label: "Come to the shop", sub: "9000A Edgeworth Dr, Capitol Heights", icon: Store },
  { id: "mobile", label: "Come to me", sub: "Home or work. We bring everything.", icon: MapPin },
  { id: "pickup", label: "Pickup & drop-off", sub: "We grab it and bring it back.", icon: Car },
];

export const whenOptions: { id: WhenId; label: string; icon: typeof Car }[] = [
  { id: "today", label: "Today", icon: Zap },
  { id: "week", label: "This week", icon: Clock },
  { id: "date", label: "Pick a date", icon: CalendarDays },
  { id: "price", label: "Just getting a price", icon: DollarSign },
];

export const labelOf = <T extends { id: string; label: string }>(list: T[], id: string | null) =>
  list.find((o) => o.id === id)?.label ?? "";
