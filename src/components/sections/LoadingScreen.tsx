"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading for premium feel
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col items-center relative"
          >
            {/* Shimmer Effect Background */}
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-accent/20 blur-3xl rounded-full -z-10"
            />

            {/* Animated floral wreath */}
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-6 animate-[spin_10s_linear_infinite]"
            >
              <circle cx="50" cy="50" r="45" stroke="#C9A66B" strokeWidth="1" strokeDasharray="5 5" opacity="0.5"/>
              <path d="M50 5C45 15 40 10 30 20C40 25 45 15 50 25C55 15 60 25 70 20C60 10 55 15 50 5Z" fill="#DAB8B8" />
              <path d="M50 95C45 85 40 90 30 80C40 75 45 85 50 75C55 85 60 75 70 80C60 90 55 85 50 95Z" fill="#DAB8B8" />
              <path d="M5 50C15 45 10 40 20 30C25 40 15 45 25 50C15 55 25 60 20 70C10 60 15 55 5 50Z" fill="#DAB8B8" />
              <path d="M95 50C85 45 90 40 80 30C75 40 85 45 75 50C85 55 75 60 80 70C90 60 85 55 95 50Z" fill="#DAB8B8" />
            </svg>

            {/* Center Initials */}
            <div className="absolute top-[32px] left-1/2 transform -translate-x-1/2 font-cormorant text-3xl text-accent font-semibold tracking-widest flex items-center justify-center whitespace-nowrap">
              J <span className="text-xl mx-2 text-red-400 animate-pulse">❤️</span> V
            </div>

            <motion.div 
              className="mt-6 h-[1px] w-0 bg-gradient-to-r from-transparent via-accent to-transparent"
              animate={{ width: ["0px", "120px", "0px"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <p className="font-cinzel text-accent uppercase tracking-[0.2em] text-sm mt-6">
              Preparing Your Invitation...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
