import { FadeIn } from "../animations/FadeIn";

export function BrideGroomSection() {
  return (
    <section id="couple" className="py-24 relative bg-transparent overflow-hidden">
      {/* Floral vine corner accents */}
      <span className="absolute top-4 left-4 text-[#D4AF37]/20 text-4xl pointer-events-none select-none">✿</span>
      <span className="absolute top-4 right-4 text-[#D4AF37]/20 text-4xl pointer-events-none select-none">✿</span>
      <span className="absolute bottom-4 left-4 text-[#D4AF37]/20 text-4xl pointer-events-none select-none">❋</span>
      <span className="absolute bottom-4 right-4 text-[#D4AF37]/20 text-4xl pointer-events-none select-none">❋</span>
      {/* Inner side glow */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#D4AF37]/6 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#D4AF37]/6 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8">
          
          {/* Groom */}
          <div className="flex-1 text-center md:text-right w-full">
            <FadeIn direction="left" delay={0.2}>
              <div className="flex flex-col items-center md:items-end">
                <span className="font-cinzel text-accent tracking-[0.2em] uppercase text-sm mb-4 block">The Groom</span>
                <h3 className="font-cormorant text-5xl md:text-6xl text-darkText font-bold mb-6">
                  JOJI
                </h3>
                <p className="font-poppins text-lightText max-w-sm text-sm md:text-base leading-relaxed whitespace-pre-line">
                  S/o Mr. K. K. Johny &amp; Mrs. Viji Johny{"\n"}
                  Kurumapillil House{"\n"}
                  Pathirikode P.O.{"\n"}
                  Malappuram District{"\n"}
                  Kerala – 679326{"\n"}
                  Phone: +91 9745614095
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Divider */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center">
            <FadeIn direction="up" delay={0.4}>
              <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-accent to-transparent hidden md:block" />
              <div className="my-8 md:my-4 font-cormorant text-6xl text-primary italic">&amp;</div>
              <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-accent to-transparent hidden md:block" />
            </FadeIn>
          </div>

          {/* Bride */}
          <div className="flex-1 text-center md:text-left w-full">
            <FadeIn direction="right" delay={0.6}>
              <div className="flex flex-col items-center md:items-start">
                <span className="font-cinzel text-accent tracking-[0.2em] uppercase text-sm mb-4 block">The Bride</span>
                <h3 className="font-cormorant text-5xl md:text-6xl text-darkText font-bold mb-6">
                  VANDANA
                </h3>
                <p className="font-poppins text-lightText max-w-sm text-sm md:text-base leading-relaxed whitespace-pre-line">
                  D/o Mr. K. Vijayan &amp; Mrs. V. G. Jayakumari{"\n"}
                  Kanjiranagatil House{"\n"}
                  Kacheriparambu P.O.{"\n"}
                  Palakkad District{"\n"}
                  Kerala – 678601{"\n"}
                  Phone: +91 9495863301
                </p>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
