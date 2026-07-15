"use client";

import { useEffect, useState } from "react";
import { FadeIn } from "../animations/FadeIn";
import { Button } from "../ui/Button";
import { Calendar as CalendarIcon } from "lucide-react";

export function CountdownSection() {
  const targetDate = new Date("2026-08-17T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-6">
      <div className="glass-card w-16 h-16 md:w-24 md:h-24 flex items-center justify-center mb-2">
        <span className="font-cormorant text-2xl md:text-5xl font-bold text-darkText">
          {value.toString().padStart(2, "0")}
        </span>
      </div>
      <span className="font-cinzel text-[10px] md:text-sm text-accent uppercase tracking-widest">
        {label}
      </span>
    </div>
  );

  return (
    <section id="countdown" className="py-20 bg-background relative z-10 flex flex-col items-center">
      <div className="container mx-auto px-4">
        <FadeIn direction="up">
          <div className="flex justify-center items-center mb-12">
            <TimeBlock value={timeLeft.days} label="Days" />
            <div className="text-2xl md:text-4xl text-accent font-cormorant pb-8">:</div>
            <TimeBlock value={timeLeft.hours} label="Hours" />
            <div className="text-2xl md:text-4xl text-accent font-cormorant pb-8">:</div>
            <TimeBlock value={timeLeft.minutes} label="Minutes" />
            <div className="text-2xl md:text-4xl text-accent font-cormorant pb-8">:</div>
            <TimeBlock value={timeLeft.seconds} label="Seconds" />
          </div>
          
          <div className="flex justify-center">
            <Button 
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Joji+%26+Vandana+Wedding&dates=20260817/20260818&details=Join+us+as+we+celebrate+our+wedding+together.&location=St.+George+Orthodox+Church,+Puliyakode+and+Hi-Life+Convention+Centre,+Anjilangadi" 
              variant="outline"
            >
              <CalendarIcon className="w-5 h-5" />
              📅 Save Our Wedding Date
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
