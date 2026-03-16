"use client";

import React, { useEffect, useRef } from "react";
import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";

const testimonials = [
{
  quote:
  "We used to manage everything on paper and WhatsApp groups. ManageMySalon replaced all of that in one week. Our no-show rate dropped from 30% to under 5%.",
  name: "Meghna Pillai",
  role: "Owner, Bloom Beauty Studio",
  location: "Pune, Maharashtra",
  avatar:
  "https://img.rocket.new/generatedImages/rocket_gen_img_187576949-1767745147487.png",
  avatarAlt: "Meghna Pillai, salon owner with dark hair smiling at camera",
  metric: "No-shows ↓ 83%",
  metricColor: "#1F3D2B"
},
{
  quote:
  "The WhatsApp reminders are the best feature. My customers love getting a message the night before. I\'ve gotten so many compliments about how professional we\'ve become.",
  name: "Rajesh Nambiar",
  role: "Owner, The Barber's Den",
  location: "Bengaluru, Karnataka",
  avatar:
  "https://img.rocket.new/generatedImages/rocket_gen_img_14db9e17d-1769267925649.png",
  avatarAlt: "Rajesh Nambiar, barbershop owner with beard and professional attire",
  metric: "Revenue +24%",
  metricColor: "#C9A44C"
},
{
  quote:
  "I manage 3 salons and this app made it possible to oversee all of them from my phone. The analytics show me which location needs attention without visiting every day.",
  name: "Divya Krishnaswamy",
  role: "Owner, Serenity Spa Chain",
  location: "Chennai, Tamil Nadu",
  avatar:
  "https://img.rocket.new/generatedImages/rocket_gen_img_1aa554d6e-1772874487739.png",
  avatarAlt: "Divya Krishnaswamy, spa chain owner with professional hairstyle and elegant attire",
  metric: "Manages 3 salons",
  metricColor: "#3F6F52"
}];


export default function BetaTestimonials() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.
            querySelectorAll(".reveal-hidden, .reveal-scale").
            forEach((el, i) => {
              setTimeout(() => el.classList.add("revealed"), i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref?.current) observer?.observe(ref?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-bg">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 space-y-3 reveal-hidden">
          <p className="section-label">Beta user stories</p>
          <h2 className="font-display font-800 text-4xl lg:text-5xl text-foreground">
            Salons already{" "}
            <span className="gradient-text">seeing results</span>
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials?.map((t, i) =>
          <div
            key={t?.name}
            className="feature-card p-7 flex flex-col gap-5 reveal-scale"
            style={{ transitionDelay: `${i * 100}ms` }}>
            
              {/* Quote icon */}
              <Icon
              name="ChatBubbleBottomCenterTextIcon"
              size={24}
              className="text-border" />
            

              {/* Quote */}
              <p className="text-foreground text-base leading-relaxed flex-1 italic">
                "{t?.quote}"
              </p>

              {/* Metric badge */}
              <div
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 w-fit"
              style={{
                background: `${t?.metricColor}12`,
                border: `1px solid ${t?.metricColor}25`
              }}>
              
                <Icon name="TrophyIcon" size={12} style={{ color: t?.metricColor }} />
                <span
                className="text-xs font-display font-700"
                style={{ color: t?.metricColor }}>
                
                  {t?.metric}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                  src={t?.avatar}
                  alt={t?.avatarAlt}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full" />
                
                </div>
                <div>
                  <p className="font-display font-700 text-sm text-foreground">
                    {t?.name}
                  </p>
                  <p className="text-xs text-muted">{t?.role}</p>
                  <p className="text-xs text-muted opacity-70">{t?.location}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}