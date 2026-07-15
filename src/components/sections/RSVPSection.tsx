c"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "../animations/FadeIn";
import { X } from "lucide-react";

// Confetti particle component
function Particle({ type }: { type: "accept" | "decline" }) {
  const colors =
    type === "accept"
      ? ["#D4AF37", "#FFD700", "#FFF8DC", "#FF6B8A", "#90EE90", "#87CEEB"]
      : ["#FFB6C1", "#FFDAB9", "#E6E6FA", "#FFF0F5", "#F5F0E8"];

  return (
    <>
      {[...Array(type === "accept" ? 50 : 20)].map((_, i) => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const isSquare = type === "accept" && i % 3 === 0;
        return (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              borderRadius: isSquare ? "2px" : "50%",
              background: color,
              left: "50%",
              top: "60%",
            }}
            animate={{
              x: (Math.random() - 0.5) * 500,
              y: -(Math.random() * 400 + 80),
              rotate: Math.random() * 720,
              opacity: [1, 1, 0],
              scale: [1, Math.random() * 0.5 + 0.5],
            }}
            transition={{
              duration: 1.8 + Math.random() * 1.5,
              ease: "easeOut",
              delay: Math.random() * 0.4,
            }}
          />
        );
      })}
    </>
  );
}

export function RSVPSection() {
  const [showPopup, setShowPopup] = useState(false);
  const [responseType, setResponseType] = useState<"accept" | "decline" | null>(null);

  const handleResponse = (type: "accept" | "decline") => {
    setResponseType(type);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setTimeout(() => setResponseType(null), 400);
  };

  return (
    <section id="rsvp" className="py-28 relative overflow-hidden">
      {/* Luxury flower arch decoration above card */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85vw] md:w-[55vw] max-w-2xl h-[20vw] max-h-40 rounded-t-full border-t-2 border-x-2 border-[#D4AF37]/15 pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#D4AF37]/8 blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#D4AF37]/6 blur-[100px]" />
      </div>

      {/* Floral corner ornaments */}
      <span className="absolute top-6 left-8 text-[#D4AF37]/25 text-3xl pointer-events-none select-none">✿</span>
      <span className="absolute top-6 right-8 text-[#D4AF37]/25 text-3xl pointer-events-none select-none">✿</span>
      <span className="absolute bottom-6 left-8 text-[#D4AF37]/25 text-3xl pointer-events-none select-none">❋</span>
      <span className="absolute bottom-6 right-8 text-[#D4AF37]/25 text-3xl pointer-events-none select-none">❋</span>

      <div className="container mx-auto px-4 max-w-3xl relative z-10 text-center">
        <FadeIn direction="up">
          <div className="glass-card p-8 md:p-14 relative overflow-hidden">
            {/* Inner gold corner accents */}
            <div className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/50" />
            <div className="absolute top-5 right-5 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/50" />
            <div className="absolute bottom-5 left-5 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/50" />
            <div className="absolute bottom-5 right-5 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/50" />

            <h2 className="font-cormorant text-4xl md:text-5xl text-[#F5F0E8] font-bold mb-5">
              Kindly Respond
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-7" />
            <p className="font-poppins text-[#C9B99A] text-base md:text-lg mb-12 max-w-md mx-auto leading-relaxed">
              Your presence is the greatest gift to us.
              <br />
              Please let us know if you will be joining our celebration.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              {/* YES button */}
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: "0 0 35px rgba(212,175,55,0.45)" }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleResponse("accept")}
                className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-full border border-[#D4AF37]/50 bg-gradient-to-r from-[#D4AF37]/15 to-[#D4AF37]/5 backdrop-blur-sm transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
              >
                <span className="text-xl">💖</span>
                <span className="font-cinzel tracking-widest text-[#F5F0E8] uppercase text-sm font-semibold">
                  Yes, I Will Attend
                </span>
              </motion.button>

              {/* NO button */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleResponse("decline")}
                className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-full border border-[#F5F0E8]/15 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-[#F5F0E8]/30"
              >
                <span className="text-xl">🤍</span>
                <span className="font-cinzel tracking-widest text-[#C9B99A] uppercase text-sm font-semibold">
                  No, I Cannot Attend
                </span>
              </motion.button>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Popup / Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-md"
            onClick={closePopup}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 22, stiffness: 280 }}
              className="glass-card p-10 max-w-md w-full relative text-center overflow-hidden border-[#D4AF37]/35 shadow-[0_0_60px_rgba(212,175,55,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Confetti / petals burst */}
              {responseType && <Particle type={responseType} />}

              {/* Close button */}
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 text-[#C9B99A] hover:text-[#D4AF37] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.15 }}
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 text-4xl shadow-[0_0_25px_rgba(212,175,55,0.25)] bg-[#D4AF37]/10 border border-[#D4AF37]/30"
              >
                {responseType === "accept" ? "🎉" : "🌸"}
              </motion.div>

              <h3 className="font-cormorant text-3xl md:text-4xl text-[#F5F0E8] font-bold mb-4">
                {responseType === "accept" ? "Joyful News!" : "Thank You"}
              </h3>

              <p className="font-poppins text-[#C9B99A] leading-relaxed text-base whitespace-pre-line">
                {responseType === "accept"
                  ? "Thank you for accepting our invitation!\nWe are truly excited to celebrate our special day with you."
                  : "Thank you for letting us know.\nWe hope to celebrate with you another time."}
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={closePopup}
                className="mt-8 font-cinzel text-[#D4AF37] uppercase tracking-[0.2em] text-sm border-b border-[#D4AF37]/40 pb-1 hover:border-[#D4AF37] transition-colors"
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
