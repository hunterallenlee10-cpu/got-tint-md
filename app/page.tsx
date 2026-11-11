import { Hero } from "@/components/sections/Hero";
import { ThreeWays } from "@/components/sections/ThreeWays";
import { ShadeVisualizer } from "@/components/ShadeVisualizer/ShadeVisualizer";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";

export default function Home() {
  return (
    <>
      <Hero />
      <ThreeWays />
      <ShadeVisualizer />
      <Services />
      <Gallery />
    </>
  );
}
