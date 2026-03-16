"use client";

import React, { useEffect, useRef } from "react";
import Icon from "@/components/ui/AppIcon";

export default function BetaHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".reveal-hidden, .reveal-scale")
              .forEach((el, i) => {
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
    <section
      ref={ref}
      className="pt-28 pb-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #1F3D2B 0%, #2D5A3D 50%, #1F3D2B 100%)",
      }}
    >
      {/* Background decorations */}
      <div
        className="absolute top-[-100px] right-[-80px] w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none blob"
        style={{ background: "radial-gradient(circle, #C9A44C 0%, transparent 65%)" }}
      />
      <div
        className="absolute bottom-[-80px] left-[-60px] w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none blob-2"
        style={{ background: "radial-gradient(circle, #3F6F52 0%, transparent 65%)" }}
      />
      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="max-w-container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Gold badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 mb-8 reveal-hidden"
            style={{
              background: "rgba(201,164,76,0.18)",
              border: "1.5px solid rgba(201,164,76,0.4)",
            }}
          >
            <Icon name="SparklesIcon" size={14} className="text-accent" />
            <span className="text-sm font-display font-700 text-accent uppercase tracking-widest">
              Beta Program — Limited Spots
            </span>
          </div>

          <h1
            className="font-display font-800 text-5xl lg:text-7xl text-white mb-6 leading-tight reveal-hidden"
            style={{ transitionDelay: "100ms" }}
          >
            Join the ManageMySalon{" "}
            <span className="gold-text">Beta</span>
          </h1>

          <p
            className="text-white/65 text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-10 reveal-hidden"
            style={{ transitionDelay: "200ms" }}
          >
            Be among the first salons to use ManageMySalon. Get free access,
            shape the product, and get priority support — before anyone else.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 reveal-scale"
            style={{ transitionDelay: "300ms" }}
          >
            <a
              href="#join"
              className="btn-gold text-base px-8 py-4 shadow-gold"
            >
              <Icon name="RocketLaunchIcon" size={18} />
              Join Beta Now — It's Free
            </a>
            <a href="#" className="btn-outline-white text-base px-8 py-4">
              <Icon name="ArrowDownTrayIcon" size={18} />
              Download App
            </a>
          </div>

          {/* Stats row */}
          <div
            className="flex flex-wrap items-center justify-center gap-8 reveal-hidden"
            style={{ transitionDelay: "400ms" }}
          >
            {[
              { value: "500+", label: "Salons in beta" },
              { value: "Free", label: "Full access" },
              { value: "Priority", label: "Support included" },
            ]?.map((stat) => (
              <div key={stat?.label} className="text-center">
                <p
                  className="font-display font-800 text-3xl gold-text"
                >
                  {stat?.value}
                </p>
                <p className="text-white/50 text-sm mt-0.5">{stat?.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}