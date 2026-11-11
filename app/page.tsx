import { Hero } from "@/components/sections/Hero";
import { ThreeWays } from "@/components/sections/ThreeWays";
import { ShadeVisualizer } from "@/components/ShadeVisualizer/ShadeVisualizer";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { VisitShop } from "@/components/sections/VisitShop";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { OfferBand } from "@/components/sections/OfferBand";
import { Reviews } from "@/components/sections/Reviews";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <ThreeWays />
      <ShadeVisualizer />
      <Services />
      <Gallery />
      <VisitShop />
      <HowItWorks />
      <OfferBand />
      <Reviews />
      <Faq />
      <FinalCta />
    </>
  );
}
