import { FadeIn } from "../animations/FadeIn";

export function BrideGroomSection() {
  return (
    <section id="couple" className="py-24 bg-white/40">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8">
          
          {/* Bride */}
          <div className="flex-1 text-center md:text-right w-full">
            <FadeIn direction="left" delay={0.2}>
              <div className="flex flex-col items-center md:items-end">
                <span className="font-cinzel text-accent tracking-[0.2em] uppercase text-sm mb-4 block">The Bride</span>
                <h3 className="font-cormorant text-5xl md:text-6xl text-darkText font-bold mb-6">
                  VANDANA
                </h3>
                <p className="font-poppins text-lightText max-w-sm text-sm md:text-base leading-relaxed">
                  Daughter of [Bride's Parents]
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

          {/* Groom */}
          <div className="flex-1 text-center md:text-left w-full">
            <FadeIn direction="right" delay={0.6}>
              <div className="flex flex-col items-center md:items-start">
                <span className="font-cinzel text-accent tracking-[0.2em] uppercase text-sm mb-4 block">The Groom</span>
                <h3 className="font-cormorant text-5xl md:text-6xl text-darkText font-bold mb-6">
                  JOJI JONEY
                </h3>
                <p className="font-poppins text-lightText max-w-sm text-sm md:text-base leading-relaxed">
                  Son of [Groom's Parents]
                </p>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
