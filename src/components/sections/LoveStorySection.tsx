"use client";

import { FadeIn } from "../animations/FadeIn";
import { GlassCard } from "../ui/GlassCard";

export function LoveStorySection() {
  return (
    <section id="love-story" className="py-24 relative overflow-hidden">
      {/* Decorative side flowers */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
        <svg width="400" height="600" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 0C100 0 150 100 200 150C200 150 150 200 100 300C100 300 50 200 0 150C0 150 50 100 100 0Z" fill="#DAB8B8"/>
        </svg>
      </div>
      
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
