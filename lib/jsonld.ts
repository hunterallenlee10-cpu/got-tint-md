import { business } from "./business";

// AutoRepair is a LocalBusiness subtype that fits an auto tint shop.
export function localBusinessJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: business.name,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image.jpg`,
    logo: `${siteUrl}/icon.png`,
    telephone: business.phone.e164,
    email: business.email,
    description: "Window tint for cars, homes, businesses and boats. Shop in Capitol Heights, MD, plus mobile tint and pickup across MD, DC and VA.",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: business.hours.opens,
        closes: business.hours.closes,
      },
    ],
    openingHours: "Mo-Su 09:00-19:00",
    areaServed: [
      { "@type": "State", name: "Maryland" },
      { "@type": "AdministrativeArea", name: "District of Columbia" },
      { "@type": "State", name: "Virginia" },
    ],
    sameAs: [business.social.facebook],
  };
}
