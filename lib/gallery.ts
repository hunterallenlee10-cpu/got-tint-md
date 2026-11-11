// The owner's real job photos (from his Facebook page). These are the only photos on the site.
// Vehicle names come from the photo map. Never add shade numbers or job details that aren't confirmed.

export type GalleryTag = "trucks" | "luxury" | "sedans" | "ev" | "suv";

export type Photo = {
  id: string;
  src: string;
  alt: string;
  vehicle: string;
  width: number;
  height: number;
  tags: GalleryTag[];
};

const p = (
  id: string,
  file: string,
  vehicle: string,
  alt: string,
  tags: GalleryTag[],
  width = 838,
  height = 837,
): Photo => ({ id, src: `/images/${file}.webp`, vehicle, alt, tags, width, height });

export const photos = {
  p01: p("01", "01-red-tesla-model3-front-at-shop-lot", "Tesla Model 3", "Red Tesla Model 3 with dark window tint, parked in the Got Tint shop lot", ["ev", "sedans"]),
  p02: p("02", "02-red-tesla-model3-side-9000A-building", "Tesla Model 3", "Side view of a red Tesla Model 3 with tinted windows in front of the 9000A building", ["ev", "sedans"]),
  p03: p("03", "03-SHOP-FRONT-9000A-gottint-door-red-mercedes-tesla", "The shop", "The Got Tint shop at 9000A Edgeworth Drive, with GOTTINT? painted on the bay door and a red Mercedes and red Tesla out front", []),
  p04: p("04", "04-mercedes-gls-gray-in-front-of-shop", "Mercedes GLS", "Gray Mercedes GLS with tinted windows in front of the open shop bay", ["luxury", "suv"]),
  p05: p("05", "05-gmc-sierra-at4x-hd-gray-gottint-banner-behind", "GMC Sierra AT4X HD", "Gray GMC Sierra AT4X HD pickup with a got tint banner hanging behind it", ["trucks"]),
  p06: p("06", "06-black-luxury-suv-at-shop-door", "Luxury SUV", "Black luxury SUV with deep window tint at the shop door", ["suv", "luxury"]),
  p07: p("07", "07-teal-jeep-wrangler-rubicon-side-BEST", "Jeep Wrangler Rubicon", "Teal Jeep Wrangler Rubicon side profile, clouds reflected in its tinted windows", ["trucks"]),
  p08: p("08", "08-teal-jeep-wrangler-rear-windows-sky-reflection", "Jeep Wrangler Rubicon", "Rear windows of a teal Jeep Wrangler reflecting the sky", ["trucks"]),
  p09: p("09", "09-white-jeep-wrangler-rubicon", "Jeep Wrangler Rubicon", "White Jeep Wrangler Rubicon with tinted windows", ["trucks"]),
  p10: p("10", "10-gray-jeep-gladiator-sunset", "Jeep Gladiator", "Gray Jeep Gladiator with tinted windows at sunset", ["trucks"]),
  p11: p("11", "11-lamborghini-urus-silver-at-customer-home-MOBILE", "Lamborghini Urus", "Silver Lamborghini Urus tinted in a customer's driveway, with an extension cord on the ground", ["luxury", "suv"], 1117, 837),
  p12: p("12", "12-lamborghini-urus-silver-hood-windshield", "Lamborghini Urus", "Front of a silver Lamborghini Urus with dark tinted glass", ["luxury", "suv"], 1117, 837),
  p13: p("13", "13-black-bmw-m5-golden-hour", "BMW M5", "Black BMW M5 with tinted windows in golden-hour sun", ["luxury", "sedans"]),
  p14: p("14", "14-black-bmw-m5-rear-quarter", "BMW M5", "Rear quarter of a black BMW M5 with dark rear glass", ["luxury", "sedans"]),
  p15: p("15", "15-gray-tesla-model3-blue-sky", "Tesla Model 3", "Gray Tesla Model 3 with tinted windows under a blue sky", ["ev", "sedans"]),
  p16: p("16", "16-orange-dodge-charger-side", "Dodge Charger", "Orange Dodge Charger with tinted windows", ["sedans"]),
  p17: p("17", "17-black-dodge-charger-rt-in-shop-bay", "Dodge Charger R/T", "Black Dodge Charger R/T inside the shop bay", ["sedans"]),
  p18: p("18", "18-black-dodge-charger-night-snow", "Dodge Charger", "Black Dodge Charger at night in the snow", ["sedans"]),
  p19: p("19", "19-red-chevy-silverado-in-shop-bay", "Chevy Silverado", "Red Chevy Silverado with tinted windows inside the shop bay", ["trucks"]),
  p20: p("20", "20-red-lexus-es-sunset-snow", "Lexus ES", "Red Lexus ES with tinted windows at sunset in the snow", ["luxury", "sedans"]),
  p21: p("21", "21-red-lexus-es-in-shop-bay", "Lexus ES", "Red Lexus ES with tinted windows inside the shop bay", ["luxury", "sedans"]),
  p22: p("22", "22-dark-kia-sorento-xpro", "Kia Sorento X-Pro", "Dark Kia Sorento X-Pro with tinted windows", ["suv"]),
  p23: p("23", "23-silver-vw-atlas", "VW Atlas", "Silver VW Atlas with tinted windows", ["suv"]),
  p24: p("24", "24-shop-interior-red-car-film-rolls", "Inside the shop", "Inside the Got Tint shop: a red car in the bay, film rolls on the wall and the work area", []),
} as const;

export const galleryFilters: { id: "all" | GalleryTag; label: string }[] = [
  { id: "all", label: "All" },
  { id: "trucks", label: "Trucks & Jeeps" },
  { id: "luxury", label: "Luxury & Exotic" },
  { id: "sedans", label: "Sedans & Muscle" },
  { id: "ev", label: "EVs" },
  { id: "suv", label: "SUVs" },
];

// Gallery order: strongest shots first. The shop photos (03, 24) live in "Visit the shop".
export const gallery: Photo[] = [
  photos.p12, photos.p07, photos.p13, photos.p05, photos.p18, photos.p01,
  photos.p06, photos.p10, photos.p20, photos.p16, photos.p15, photos.p04,
  photos.p14, photos.p09, photos.p19, photos.p22, photos.p02, photos.p08,
  photos.p11, photos.p17, photos.p21, photos.p23,
];

export const marquee: Photo[] = [
  photos.p13, photos.p09, photos.p16, photos.p22, photos.p02, photos.p19, photos.p10, photos.p14,
];
