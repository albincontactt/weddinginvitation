import { LoadingScreen } from "@/components/sections/LoadingScreen";
import { HeroSection } from "@/components/sections/HeroSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { LoveStorySection } from "@/components/sections/LoveStorySection";
import { BrideGroomSection } from "@/components/sections/BrideGroomSection";
import { WeddingDetailsSection } from "@/components/sections/WeddingDetailsSection";
import { LocationsSection } from "@/components/sections/LocationsSection";
import { BlessingsSection } from "@/components/sections/BlessingsSection";
import { TogetherForeverSection } from "@/components/sections/TogetherForeverSection";
import { RSVPSection } from "@/components/sections/RSVPSection";
import { Footer } from "@/components/sections/Footer";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { MusicPlayer } from "@/components/ui/MusicPlayer";
import { CinematicBackground } from "@/components/ui/CinematicBackground";
import { PageBorders } from "@/components/ui/PageBorders";
import { FallingPetals } from "@/components/animations/FallingPetals";

export default function Home() {
  return (
    <main className="relative bg-transparent min-h-screen">
      {/* Fixed layers */}
      <CinematicBackground />
      <PageBorders />
      <FallingPetals />

      {/* UI overlays */}
      <LoadingScreen />
      <FloatingNav />
      <MusicPlayer />

      {/* Page sections */}
      <HeroSection />
      <CountdownSection />
      <LoveStorySection />
      <BrideGroomSection />
      <WeddingDetailsSection />
      <LocationsSection />
      <BlessingsSection />
      <TogetherForeverSection />
      <RSVPSection />
      <Footer />
    </main>
  );
}
