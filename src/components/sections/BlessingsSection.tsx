import { FadeIn } from "../animations/FadeIn";
import { FloatingFlower } from "../animations/FloatingFlower";

export function BlessingsSection() {
  return (
    <section id="blessings" className="py-32 relative overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <FloatingFlower size={45} delay={0.2} className="top-[20%] left-[20%]" color="#C9A66B" />
        <FloatingFlower size={35} delay={1.2} className="top-[40%] right-[15%]" />
        <FloatingFlower size={55} delay={0.7} className="bottom-[30%] left-[30%]" />
        <FloatingFlower size={40} delay={1.8} className="bottom-[15%] right-[25%]" color="#C9A66B" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <FadeIn direction="up">
          <div className="max-w-3xl mx-auto">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="mx-auto mb-8 text-primary">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" opacity="0.3"/>
            </svg>
            <h2 className="font-cormorant text-3xl md:text-5xl text-darkText font-medium leading-relaxed italic mb-8">
              "Your prayers, love and blessings will make our celebration complete."
            </h2>
            <div className="w-16 h-[2px] bg-accent mx-auto" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
