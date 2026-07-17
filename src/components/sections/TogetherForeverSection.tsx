"use client";

import React from "react";

export function TogetherForeverSection() {
  return (
    <section 
      id="together-forever" 
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden py-32 bg-[#080808] border-t border-b border-[#D4AF37]/15"
    >
      {/* Radial vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_30%,rgba(0,0,0,0.85)_100%)] z-1 pointer-events-none" />

      <div className="container relative z-5 flex flex-col items-center justify-center">
        {/* Trigger target space where rings align */}
        <div className="h-[250px] flex items-center justify-center relative mb-8">
          <div id="rings-final-position" className="w-[200px] h-[200px] relative" />
        </div>

        {/* Text containers */}
        <div className="relative text-center w-full min-h-[180px] flex flex-col items-center justify-center">
          {/* Together Forever Message */}
          <h2 
            id="climax-text-together" 
            className="absolute text-center w-full font-cinzel text-4xl md:text-5xl lg:text-6xl font-bold tracking-[6px] uppercase text-[#FFF4C2] drop-shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-all duration-1000 translate-y-[30px] opacity-0"
          >
            Together Forever
          </h2>

          {/* Bride & Groom names with beat heart */}
          <h2 
            id="climax-text-names" 
            className="absolute text-center w-full font-cormorant text-5xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all duration-1000 translate-y-[30px] opacity-0 flex items-center justify-center"
          >
            Joji 
            <span className="inline-block mx-4 animate-[heartBeat_1.2s_infinite_ease-in-out]">
              <span className="text-[#E31837] filter drop-shadow-[0_0_12px_rgba(227,24,55,0.8)] text-4xl md:text-5xl">❤️</span>
            </span> 
            Vandhana
          </h2>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes heartBeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.15); }
          40% { transform: scale(1.05); }
          60% { transform: scale(1.2); }
        }
        .climax-msg.visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}} />
    </section>
  );
}

