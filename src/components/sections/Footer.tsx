"use client";

import { FadeIn } from "../animations/FadeIn";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="py-16 relative bg-background border-t-8 border-accent/20">
      {/* Animated Floral Border Top */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-4">
        <motion.svg 
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M60 5C60 5 70 20 85 25C85 25 70 30 60 35C60 35 50 30 35 25C35 25 50 20 60 5Z" fill="#DAB8B8" opacity="0.6"/>
          <circle cx="60" cy="20" r="4" fill="#C9A66B" />
        </motion.svg>
      </div>

      <div className="container mx-auto px-4 text-center mt-8">
        <FadeIn direction="up">
          <h2 className="font-cinzel text-3xl md:text-4xl text-accent font-bold mb-6 tracking-widest">
            Thank You
          </h2>
          <p className="font-poppins text-lightText mb-8 max-w-lg mx-auto">
            "We eagerly await the joy of celebrating this unforgettable day with you."
          </p>
          
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8" />
          
          <div className="flex items-center justify-center gap-4 text-darkText font-cormorant text-2xl md:text-3xl font-bold mb-4">
            <span>JOJI JOHNY</span>
            <span className="text-red-400 text-sm md:text-xl animate-pulse drop-shadow-[0_0_10px_rgba(248,113,113,0.8)]">❤️</span>
            <span>VANDANA</span>
          </div>

          <p className="font-cinzel text-accent uppercase tracking-[0.2em] text-sm mb-12">
            Monday, 17 August 2026
          </p>
          
          <div className="mt-16 pt-8 border-t border-accent/20 max-w-sm mx-auto">
            <h3 className="font-cinzel text-accent uppercase tracking-widest text-sm mb-4">Website Support</h3>
            <p className="font-poppins text-lightText text-sm mb-4">
              Website crafted with care.<br/>
              For website development or software development assistance, feel free to contact us.
            </p>
            <div className="font-poppins text-lightText/80 text-sm flex flex-col gap-2">
              <p>Email: albin.contactt@gmail.com</p>
              <p>Phone: +91 90618 46394</p>
            </div>
          </div>
          
          <p className="font-poppins text-lightText/60 text-xs mt-12">
            Made with <span className="text-red-400 animate-pulse inline-block drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]">❤️</span> for J & V
          </p>
        </FadeIn>
      </div>
    </footer>
  );
}
