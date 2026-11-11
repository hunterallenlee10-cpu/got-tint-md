// Every business fact on the site lives here. Edit this file, not the components.
// Source: the owner's current site (gottintmd.com), Facebook page and business cards.

export const business = {
  name: "Got Tint?",
  wordmark: "got tint?",
  url: "https://gottintmd.com",

  address: {
    street: "9000A Edgeworth Drive",
    streetShort: "9000A Edgeworth Dr",
    city: "Capitol Heights",
    state: "MD",
    zip: "20743",
  },

  // From his Dec 2025 Facebook post.
  hours: { label: "9am to 7pm, every day", short: "Open 9 to 7, every day", opens: "09:00", closes: "19:00" },

  phone: {
    display: "(301) 828-6311",
    tel: "tel:+13018286311",
    sms: "sms:+13018286311",
    e164: "+13018286311",
  },
  // Second line listed on his current site.
  phone2: { display: "301-909-TINT", tel: "tel:+13019098468" },
  // NOTE: a third number on the old site, (678) 365-5959, is a Georgia area code. Left off on purpose. Confirm with owner.

  email: "gottint1@gmail.com",

  social: {
    facebook: "https://www.facebook.com/1GOTTINT",
    // DRAFT: @gottint_ is printed on his cards. Confirm the Instagram URL before launch.
    instagram: "https://www.instagram.com/gottint_",
    handle: "@gottint_",
  },

  years: "18+",
  serviceArea: "Maryland, Washington DC and Virginia",
  serviceAreaShort: "MD, DC & VA",

  // DRAFT: confirm warranty terms with owner.
  warranty: "High quality product and installation with a manufacturer's lifetime warranty.",

  // DRAFT: confirm what the $99 special covers and if it's still running.
  special: { price: "$99", name: "$99 Window Tint Special" },
} as const;

export const mapsUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("9000A Edgeworth Drive, Capitol Heights, MD 20743");

export const mapsEmbedUrl =
  "https://maps.google.com/maps?q=" +
  encodeURIComponent("9000A Edgeworth Drive, Capitol Heights, MD 20743") +
  "&z=17&output=embed";

export const fullAddress = `${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zip}`;
