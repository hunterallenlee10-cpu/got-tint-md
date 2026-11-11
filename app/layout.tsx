import type { Metadata, Viewport } from "next";
import { Manrope, Saira_Condensed } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { BookingProvider } from "@/components/BookingContext";
import { PromoBar } from "@/components/sections/PromoBar";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { MobileBar } from "@/components/sections/MobileBar";
import { BackToTop } from "@/components/sections/BackToTop";
import "./globals.css";

const saira = Saira_Condensed({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-saira", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  title: "Got Tint? | Window Tinting in Capitol Heights, MD · Mobile Tint in MD, DC & VA",
  description:
    "Pro window tint for cars, homes, businesses and boats. Come to our Capitol Heights shop or we come to you across Maryland, DC and Virginia. 18+ years. Open 9 to 7, every day.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#07090A", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${saira.variable} ${manrope.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-lime focus:px-5 focus:py-3 focus:font-semibold focus:text-bg">
          Skip to content
        </a>
        <BookingProvider>
          <PromoBar />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <MobileBar />
          <BackToTop />
        </BookingProvider>
        <Analytics />
      </body>
    </html>
  );
}
