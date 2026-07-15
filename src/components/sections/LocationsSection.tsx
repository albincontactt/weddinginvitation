"use client";

import { FadeIn } from "../animations/FadeIn";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "../ui/Button";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function LocationsSection() {
  return (
    <section id="locations" className="py-24 relative bg-[url('https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-fixed bg-center">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-0" />
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Church */}
          <div className="flex-1">
            <FadeIn direction="right" delay={0.2}>
              <GlassCard className="h-full flex flex-col items-center text-center bg-white/40 dark:bg-black/40 hover:shadow-[0_0_30px_rgba(201,166,107,0.15)] transition-shadow duration-500">
                <div className="relative mb-8 mt-4">
                  <div className="absolute inset-0 bg-accent/30 rounded-full animate-ping" />
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-16 h-16 rounded-full border-2 border-accent bg-background flex items-center justify-center z-10 shadow-[0_0_15px_rgba(201,166,107,0.5)]"
                  >
                    <MapPin className="text-accent w-8 h-8 drop-shadow-md" />
                  </motion.div>
                </div>
                
                <h3 className="font-cormorant text-4xl text-darkText font-bold mb-4">
                  Church Ceremony
                </h3>
                <p className="font-poppins text-lightText mb-8 flex-grow">
                  Join us as we exchange our vows at St. George Orthodox Church, Puliyakode, a place of spiritual significance to us.
                  <br /><br />
                  Time: 10:00 AM
                </p>
                <Button href="https://maps.app.goo.gl/snAuVQFCfFYmzasi7" variant="primary">
                  <MapPin className="w-4 h-4" />
                  Navigate to Church
                </Button>
              </GlassCard>
            </FadeIn>
          </div>

          {/* Reception */}
          <div className="flex-1">
            <FadeIn direction="left" delay={0.4}>
              <GlassCard className="h-full flex flex-col items-center text-center bg-white/40 dark:bg-black/40 hover:shadow-[0_0_30px_rgba(201,166,107,0.15)] transition-shadow duration-500">
                <div className="relative mb-8 mt-4">
                  <div className="absolute inset-0 bg-accent/30 rounded-full animate-ping" style={{ animationDelay: "1s" }} />
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="relative w-16 h-16 rounded-full border-2 border-accent bg-background flex items-center justify-center z-10 shadow-[0_0_15px_rgba(201,166,107,0.5)]"
                  >
                    <MapPin className="text-accent w-8 h-8 drop-shadow-md" />
                  </motion.div>
                </div>

                <h3 className="font-cormorant text-4xl text-darkText font-bold mb-4">
                  Wedding Reception
                </h3>
                <p className="font-poppins text-lightText mb-8 flex-grow">
                  Celebrate our union with an evening of dinner, drinks, and dancing at Hi-Life Convention Centre, Anjilangadi.
                  <br /><br />
                  Time: 12:00 PM onwards
                </p>
                <Button href="https://maps.app.goo.gl/iLHG1TYKqqN1tEiz6" variant="primary">
                  <MapPin className="w-4 h-4" />
                  Navigate to Reception
                </Button>
              </GlassCard>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
