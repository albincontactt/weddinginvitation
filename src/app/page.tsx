import { LoadingScreen } from "@/components/sections/LoadingScreen";
import { HeroSection } from "@/components/sections/HeroSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { LoveStorySection } from "@/components/sections/LoveStorySection";
import { WeddingRingsSection } from "@/components/sections/WeddingRingsSection";
import { BrideGroomSection } from "@/components/sections/BrideGroomSection";
import { WeddingDetailsSection } from "@/components/sections/WeddingDetailsSection";
import { LocationsSection } from "@/components/sections/LocationsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { BlessingsSection } from "@/components/sections/BlessingsSection";
import { RSVPSection } from "@/components/sections/RSVPSection";
import { Footer } from "@/components/sections/Footer";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { MusicPlayer } from "@/components/ui/MusicPlayer";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { FallingPetals } from "@/components/animations/FallingPetals";

export default function Home() {
  return (
    <main className="relative bg-background min-h-screen">
      <LoadingScreen />
      <FallingPetals />
      <FloatingNav />
      <MusicPlayer />
      <ThemeToggle />
      
      <HeroSection />
      <CountdownSection />
      <LoveStorySection />
      <WeddingRingsSection />
      <BrideGroomSection />
      <WeddingDetailsSection />
      <LocationsSection />
      <GallerySection />
      <BlessingsSection />
      <RSVPSection />
      <Footer />
    </main>
  );
}
