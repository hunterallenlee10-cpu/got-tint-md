"use client";
import type { BuilderPreset } from "./types";
// Placeholder until Phase 5.
export default function TintBuilderModal({ onClose }: { preset: BuilderPreset; onClose: () => void }) {
  return <div role="dialog" className="fixed inset-0 z-[70] bg-bg/80" onClick={onClose} />;
}
