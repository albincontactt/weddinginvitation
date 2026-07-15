"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "../animations/FadeIn";
import { Check, X } from "lucide-react";

export function RSVPSection() {
  const [showPopup, setShowPopup] = useState(false);
  const [responseType, setResponseType] = useState<"accept" | "decline" | null>(null);

  const handleResponse = (type: "accept" | "decline") => {
    setResponseType(type);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setTimeout(() => setResponseType(null), 300);
  };

  return (
    <section id="rsvp" className="py-24 relative bg-background overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-accent blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-primary blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
        <FadeIn direction="up">
          <div className="glass-card p-8 md:p-16 border-accent/20 relative">
            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-accent/40" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/40" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-accent/40" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-accent/40" />

            <h2 className="font-cormorant text-4xl md:text-5xl text-darkText font-bold mb-6">
              Kindly Respond
            </h2>
            <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8" />
            <p className="font-poppins text-lg text-lightText mb-12 max-w-lg mx-auto leading-relaxed">
              Your presence is the greatest gift to us.<br />
              Please let us know if you will be joining our celebration.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleResponse("accept")}
                className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 border border-accent/30 rounded-full backdrop-blur-sm transition-all duration-300 shadow-[0_0_15px_rgba(201,166,107,0.1)] hover:shadow-[0_0_25px_rgba(201,166,107,0.3)]"
              >
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/40 transition-colors">
                  <Check className="w-4 h-4 text-accent" />
                </div>
                <span className="font-cinzel tracking-widest text-darkText uppercase text-sm font-semibold">
                  Accept Invitation
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleResponse("decline")}
                className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 dark:bg-black/5 dark:hover:bg-black/10 border border-lightText/20 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-lightText/10 flex items-center justify-center group-hover:bg-lightText/20 transition-colors">
                  <X className="w-4 h-4 text-lightText" />
                </div>
                <span className="font-cinzel tracking-widest text-lightText uppercase text-sm font-semibold">
                  Decline Invitation
                </span>
              </motion.button>
            </div>
          </div>
        </FadeIn>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-md"
            onClick={closePopup}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="glass-card p-10 max-w-md w-full relative text-center border-accent/40 shadow-[0_0_50px_rgba(201,166,107,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 text-lightText hover:text-accent transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="w-16 h-16 mx-auto rounded-full bg-accent/20 flex items-center justify-center mb-6">
                {responseType === "accept" ? (
                  <Check className="w-8 h-8 text-accent" />
                ) : (
                  <X className="w-8 h-8 text-lightText" />
                )}
              </div>

              <h3 className="font-cormorant text-3xl text-darkText font-bold mb-4">
                {responseType === "accept" ? "Joyful News!" : "Thank You"}
              </h3>
              
              <p className="font-poppins text-lightText leading-relaxed">
                {responseType === "accept" 
                  ? "Thank you for accepting our invitation.\nWe are delighted to celebrate with you."
                  : "Thank you for your response.\nWe hope to celebrate with you another time."}
              </p>
              
              <div className="mt-8">
                <button
                  onClick={closePopup}
                  className="font-cinzel text-accent uppercase tracking-[0.2em] text-sm hover:text-primary transition-colors border-b border-accent/30 pb-1"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
