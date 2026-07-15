import { FadeIn } from "../animations/FadeIn";
import { GlassCard } from "../ui/GlassCard";
import { Calendar, Clock, MapPin } from "lucide-react";

export function WeddingDetailsSection() {
  const details = [
    {
      title: "Wedding Date",
      value: "Monday, 17 August 2026",
      icon: <Calendar className="w-6 h-6 text-accent mb-4" />,
      delay: 0.2
    },
    {
      title: "Wedding Time",
      value: "10:00 AM onwards",
      icon: <Clock className="w-6 h-6 text-accent mb-4" />,
      delay: 0.4
    },
    {
      title: "Holy Matrimony",
      value: "St. George Orthodox Church, Puliyakode\n10:00 AM",
      icon: <MapPin className="w-6 h-6 text-accent mb-4" />,
      delay: 0.6
    },
    {
      title: "Reception",
      value: "Hi-Life Convention Centre, Anjilangadi\n12:00 PM onwards",
      icon: <MapPin className="w-6 h-6 text-accent mb-4" />,
      delay: 0.8
    }
  ];

  return (
    <section id="details" className="py-24 relative overflow-hidden bg-transparent">
      {/* Luxury gold border frame */}
      <div className="absolute inset-4 md:inset-8 border border-[#D4AF37]/15 rounded-[2rem] pointer-events-none" />
      {/* Corner ornaments */}
      <span className="absolute top-6 left-6 text-[#D4AF37]/25 text-3xl pointer-events-none select-none">✦</span>
      <span className="absolute top-6 right-6 text-[#D4AF37]/25 text-3xl pointer-events-none select-none">✦</span>
      <span className="absolute bottom-6 left-6 text-[#D4AF37]/25 text-3xl pointer-events-none select-none">✦</span>
      <span className="absolute bottom-6 right-6 text-[#D4AF37]/25 text-3xl pointer-events-none select-none">✦</span>
      {/* Top centre flower */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[#D4AF37]/20 text-5xl pointer-events-none select-none">✿</div>
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <FadeIn direction="up">
          <h2 className="font-cormorant text-4xl md:text-5xl text-darkText font-bold text-center mb-16">
            Wedding Details
          </h2>
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {details.map((detail, index) => (
            <FadeIn key={index} direction="up" delay={detail.delay}>
              <GlassCard className="flex flex-col items-center text-center h-full hover:border-accent transition-colors duration-300">
                {detail.icon}
                <h4 className="font-cinzel text-lg text-darkText font-bold mb-2">
                  {detail.title}
                </h4>
                <p className="font-poppins text-lightText whitespace-pre-line">
                  {detail.value}
                </p>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
