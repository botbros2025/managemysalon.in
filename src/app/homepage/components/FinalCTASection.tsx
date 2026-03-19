"use client";

import React, { useEffect, useRef } from "react";
import Icon from "@/components/ui/AppIcon";

export default function FinalCTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-spacing relative overflow-hidden"
      style={{ background: "#1F3D2B" }}
    >
      {/* Background decorations */}
      <div
        className="absolute top-[-120px] right-[-80px] w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none blob"
        style={{ background: "radial-gradient(circle, #C9A44C 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-100px] left-[-60px] w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none blob-2"
        style={{ background: "radial-gradient(circle, #3F6F52 0%, transparent 70%)" }}
      />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)",
        }}
      />

      <div className="container-main relative z-10 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 reveal-hidden"
          style={{
            background: "rgba(201,164,76,0.15)",
            border: "1px solid rgba(201,164,76,0.3)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-display font-700 text-accent uppercase tracking-widest">
            Beta Access Open Now
          </span>
        </div>

        <h2
          className="font-display font-800 text-4xl lg:text-6xl text-white mb-6 max-w-3xl mx-auto leading-tight reveal-hidden"
          style={{ transitionDelay: "100ms" }}
        >
          Start Managing Your Salon{" "}
          <span className="gold-text">Smarter Today</span>
        </h2>

        <p
          className="text-white/60 text-lg max-w-xl mx-auto mb-10 reveal-hidden"
          style={{ transitionDelay: "200ms" }}
        >
          Join 500+ salons already using ManageMySalon to save time, reduce
          no-shows, and grow their business.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10 reveal-scale"
          style={{ transitionDelay: "300ms" }}
        >
          <a
            href="#"
            className="btn-gold text-base px-8 py-4 shadow-gold font-display font-700"
          >
            <Icon name="ArrowDownTrayIcon" size={18} />
            Download APK
          </a>
          <a href="#" className="btn-outline-white text-base px-8 py-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            iOS TestFlight
          </a>
        </div>

        {/* Trust signals */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 reveal-hidden"
          style={{ transitionDelay: "400ms" }}
        >
          {[
            { icon: "ShieldCheckIcon", text: "Free during beta" },
            { icon: "BoltIcon", text: "Setup in 10 minutes" },
            { icon: "DevicePhoneMobileIcon", text: "Android & iOS" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-2">
              <Icon
                name={item.icon as "ShieldCheckIcon"}
                size={16}
                className="text-accent"
              />
              <span className="text-white/60 text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}