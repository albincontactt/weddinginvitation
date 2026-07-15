"use client";

import { FadeIn } from "../animations/FadeIn";
import { GlassCard } from "../ui/GlassCard";

export function LoveStorySection() {
  return (
    <section id="love-story" className="py-24 relative overflow-hidden bg-transparent">
      {/* Floral corner ornaments */}
      <span className="absolute top-6 left-6 text-[#D4AF37]/20 text-4xl pointer-events-none select-none">✿</span>
      <span className="absolute top-6 right-6 text-[#D4AF37]/20 text-4xl pointer-events-none select-none">✿</span>
      <span className="absolute bottom-6 left-6 text-[#D4AF37]/20 text-4xl pointer-events-none select-none">❋</span>
      <span className="absolute bottom-6 right-6 text-[#D4AF37]/20 text-4xl pointer-events-none select-none">❋</span>
      {/* Soft glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/4 via-transparent to-[#D4AF37]/4 pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
        <FadeIn direction="up">
          <GlassCard className="border-accent/30 relative">
            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-accent/50 rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/50 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-accent/50 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-accent/50 rounded-br-lg" />
            
            <div className="py-12 px-4 md:px-12">
              <h2 className="font-cormorant text-4xl md:text-5xl text-darkText font-bold mb-8">
                Our Special Day
              </h2>
              <div className="w-24 h-[1px] bg-accent mx-auto mb-8" />
              <p className="font-poppins text-lg md:text-2xl text-lightText leading-relaxed italic">
                "We request the honour of your presence as we begin a beautiful new chapter together."
              </p>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}
