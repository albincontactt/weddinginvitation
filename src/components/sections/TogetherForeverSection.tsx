"use client";

import { motion } from "framer-motion";

export function TogetherForeverSection() {
  return (
    <section 
      id="finale-section" 
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden py-32 bg-transparent"
    >
      {/* Background matches the luxury black theme since it's transparent over the global CinematicBackground */}
      
      <div className="z-10 text-center flex flex-col items-center justify-center mt-32 md:mt-48">
        {/* Generous top margin ensures the text sits gracefully beneath the interlocked rings */}
        <div className="relative h-[200px] w-full flex items-center justify-center">
          
          {/* First Text: Together Forever */}
          <motion.h2 
            className="absolute text-5xl md:text-7xl lg:text-8xl font-cormorant font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF8D6] via-[#D4AF37] to-[#A67C00]"
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
            className="absolute text-5xl md:text-7xl lg:text-8xl font-cormorant font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF8D6] via-[#D4AF37] to-[#A67C00] drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            initial={{ opacity: 0, filter: "blur(15px)", scale: 0.9 }}
            whileInView={{ 
              opacity: [0, 0, 1], 
              filter: ["blur(15px)", "blur(15px)", "blur(0px)"],
              scale: [0.9, 0.9, 1]
            }}
            transition={{ duration: 7, times: [0, 0.75, 1] }}
            viewport={{ once: false, amount: 0.5 }}
          >
            Joji <span className="text-red-500/90 mx-3 inline-block animate-pulse drop-shadow-[0_0_12px_rgba(239,68,68,0.5)]">❤️</span> Vandhana
          </motion.h2>
          
        </div>
      </div>
    </section>
  );
}
