"use client";

import { FadeIn } from "../animations/FadeIn";
import { GlassCard } from "../ui/GlassCard";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeSectionProps {
  url?: string;
}

export function QRCodeSection({ url = "https://example.com/invitation" }: QRCodeSectionProps) {
  return (
    <section id="qr-code" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
        <FadeIn direction="up">
          <GlassCard className="inline-block border-accent/50 relative overflow-hidden">
            {/* Golden corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent rounded-br-xl" />
            
            <div className="p-8 md:p-12 flex flex-col items-center">
              <h2 className="font-cormorant text-3xl md:text-4xl text-darkText font-bold mb-8">
                Scan to Open Invitation
              </h2>
              
              <div className="p-4 bg-white rounded-lg shadow-inner mb-6">
                <QRCodeSVG
                  value={url}
                  size={200}
                  bgColor={"#ffffff"}
                  fgColor={"#3B3B3B"}
                  level={"Q"}
                  includeMargin={false}
                />
              </div>
              
              <p className="font-poppins text-lightText italic">
                "Scan using your phone camera."
              </p>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}
