"use client";

import { motion } from "framer-motion";

export function TogetherForeverSection() {
  return (
    <section 
      id="together-forever" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
    >
      <div className="z-10 text-center flex flex-col items-center justify-center mt-48 md:mt-64">
        {/* The mt-48 ensures the text is positioned below the interlocking rings which will be perfectly centered on screen */}
        <div className="relative h-[200px] w-full flex items-center justify-center">
          
          {/* First Text: Together Forever */}
          <motion.h2 
            className="absolute text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5CC] via-[#D4AF37] to-[#B8860B]"
            initial={{ opacity: 0, filter: "blur(15px)", y: 20 }}
            whileInView={{ 
              opacity: [0, 1, 1, 0], 
              filter: ["blur(15px)", "blur(0px)", "blur(0px)", "blur(15px)"],
              y: [20, 0, 0, -20]
            }}
            transition={{ duration: 7, times: [0, 0.25, 0.75, 1] }}
            viewport={{ once: false, amount: 0.5 }}
          >
            Together Forever
          </motion.h2>

          {/* Second Text: Joji ❤️ Vandhana */}
          <motion.h2 
            className="absolute text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5CC] via-[#D4AF37] to-[#B8860B] drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            initial={{ opacity: 0, filter: "blur(15px)", scale: 0.9 }}
            whileInView={{ 
              opacity: [0, 0, 1], 
              filter: ["blur(15px)", "blur(15px)", "blur(0px)"],
              scale: [0.9, 0.9, 1]
            }}
            transition={{ duration: 7, times: [0, 0.75, 1] }}
            viewport={{ once: false, amount: 0.5 }}
          >
            Joji <span className="text-red-500/90 mx-3 inline-block animate-pulse drop-shadow-[0_0_15px_rgba(239,68,68,0.6)]">❤️</span> Vandhana
          </motion.h2>
          
        </div>
      </div>
    </section>
  );
}
