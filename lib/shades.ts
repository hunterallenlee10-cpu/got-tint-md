// The 5 shade stops, by VLT (visible light let through). Lower number = darker.
// `overlay` is how dark the visualizer paints the glass for that stop.

export type ShadeId = 70 | 50 | 35 | 20 | 5;

export type Shade = {
  vlt: ShadeId;
  label: string;
  line: string;
  overlay: number;
  /** 1 to 5, relative only. Night view is the inverse. */
  privacy: number;
};

export const shades: Shade[] = [
  { vlt: 70, label: "70%", line: "Barely there. Cuts heat and glare, keeps the factory look.", overlay: 0.1, privacy: 1 },
  { vlt: 50, label: "50%", line: "A light smoke. Clean look, easy night driving.", overlay: 0.3, privacy: 2 },
  { vlt: 35, label: "35%", line: "The classic look. Clear view out, solid privacy in.", overlay: 0.5, privacy: 3 },
  { vlt: 20, label: "20%", line: "Dark and sharp. Hard to see in from outside.", overlay: 0.68, privacy: 4 },
  { vlt: 5, label: "5% (limo)", line: "Limo dark. Full privacy, popular for back windows.", overlay: 0.88, privacy: 5 },
];

export const shadeByVlt = (vlt: number) => shades.find((s) => s.vlt === vlt) ?? shades[2];
