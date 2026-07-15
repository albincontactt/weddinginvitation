"use client";

import { motion } from "framer-motion";
import { FadeIn } from "../animations/FadeIn";
import { FloatingFlower } from "../animations/FloatingFlower";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background with slight parallax effect */}
      <motion.div
        className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      />
      
      {/* Ambient background particles/flowers */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <FloatingFlower size={60} delay={0} className="top-[10%] left-[15%]" />
        <FloatingFlower size={40} delay={1.5} className="top-[30%] right-[20%]" color="#C9A66B" />
        <FloatingFlower size={50} delay={0.5} className="bottom-[25%] left-[25%]" />
        <FloatingFlower size={70} delay={2} className="bottom-[15%] right-[10%]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <FadeIn delay={0.2} direction="down">
          <p className="font-cinzel text-accent tracking-[0.3em] uppercase text-sm md:text-lg mb-8">
            Together with our Families
          </p>
        </FadeIn>

        <FadeIn delay={0.6} direction="up">
          <h1 className="font-cormorant text-5xl md:text-7xl lg:text-8xl text-darkText font-bold mb-4">
            JOJI JONEY
          </h1>
          <p className="font-cormorant text-4xl md:text-6xl text-accent font-medium italic my-2">
            &amp;
          </p>
          <h1 className="font-cormorant text-5xl md:text-7xl lg:text-8xl text-darkText font-bold mb-10">
            VANDANA
          </h1>
        </FadeIn>

        <FadeIn delay={1.0} direction="up">
          <p className="font-poppins text-lightText max-w-md mx-auto text-sm md:text-base leading-relaxed mb-8">
            Joyfully Invite You To Celebrate Their Wedding
          </p>
        </FadeIn>

        <FadeIn delay={1.2}>
          <div className="flex items-center justify-center w-full mb-8">
            <div className="h-[1px] w-16 md:w-32 bg-accent/40" />
            <div className="mx-4 text-accent">✧</div>
            <div className="h-[1px] w-16 md:w-32 bg-accent/40" />
          </div>
        </FadeIn>

        <FadeIn delay={1.4} direction="up">
          <div className="glass-card px-10 py-4 mb-16 inline-block">
            <p className="font-cinzel text-darkText font-semibold text-lg md:text-2xl tracking-[0.2em]">
              17 AUGUST 2026
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Scroll Down Indicator */}
      <FadeIn delay={2.0} direction="none" className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            const nextSection = document.getElementById("countdown");
            nextSection?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="font-cinzel text-xs text-accent uppercase tracking-widest mb-2">Scroll Down</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
        </motion.div>
      </FadeIn>
    </section>
  );
}
