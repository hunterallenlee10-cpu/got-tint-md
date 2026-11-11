"use client";

import dynamic from "next/dynamic";
import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import type { BuilderPreset } from "./TintBuilder/types";

const TintBuilderModal = dynamic(() => import("./TintBuilder/TintBuilderModal"), { ssr: false });

type BookingApi = { open: (preset?: BuilderPreset) => void };

const BookingCtx = createContext<BookingApi>({ open: () => {} });

export function BookingProvider({ children }: { children: ReactNode }) {
  const [preset, setPreset] = useState<BuilderPreset | null>(null);
  const [key, setKey] = useState(0);
  const opener = useRef<HTMLElement | null>(null);

  const open = useCallback((p: BuilderPreset = {}) => {
    opener.current = document.activeElement as HTMLElement | null;
    setPreset(p);
    setKey((k) => k + 1);
  }, []);

  const close = useCallback(() => {
    setPreset(null);
    // Give focus back to whatever opened the builder once it has unmounted.
    requestAnimationFrame(() => opener.current?.focus());
  }, []);

  const api = useMemo(() => ({ open }), [open]);

  return (
    <BookingCtx.Provider value={api}>
      {children}
      {preset && <TintBuilderModal key={key} preset={preset} onClose={close} />}
    </BookingCtx.Provider>
  );
}

export const useBooking = () => useContext(BookingCtx);
