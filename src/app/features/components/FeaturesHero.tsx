"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

export default function FeaturesHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".reveal-hidden")
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
      className="section-spacing pt-28 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #F6F4EF 0%, #EEEAE3 100%)",
      }}
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(63,111,82,0.07) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(201,164,76,0.05) 0%, transparent 50%)",
        }}
      />
      <div className="container-main relative z-10">
        <div className="max-w-3xl">
          <div className="reveal-hidden">
            <Link
              href="/homepage"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-6"
            >
              <Icon name="ArrowLeftIcon" size={14} />
              Back to Home
            </Link>
          </div>

          <p className="section-label mb-4 reveal-hidden" style={{ transitionDelay: "50ms" }}>
            Platform Features
          </p>

          <h1
            className="font-display font-800 text-5xl lg:text-6xl text-foreground mb-6 leading-tight reveal-hidden"
            style={{ transitionDelay: "100ms" }}
          >
            Every Tool Your Salon Needs,{" "}
            <span className="gradient-text">Built Into One App</span>
          </h1>

          <p
            className="text-lg text-muted max-w-xl leading-relaxed mb-8 reveal-hidden"
            style={{ transitionDelay: "200ms" }}
          >
            ManageMySalon replaces your paper diary, WhatsApp chaos, and
            scattered spreadsheets with a single powerful mobile app.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 reveal-hidden"
            style={{ transitionDelay: "300ms" }}
          >
            <a href="#" className="btn-primary text-base px-7 py-4 shadow-green">
              <Icon name="ArrowDownTrayIcon" size={18} />
              Download Free
            </a>
            <Link href="/beta-program">
              <button className="btn-secondary text-base px-7 py-4">
                Join Beta Program
                <Icon name="ArrowRightIcon" size={16} />
              </button>
            </Link>
          </div>
        </div>

        {/* Feature count badges */}
        <div
          className="flex flex-wrap gap-3 mt-10 reveal-hidden"
          style={{ transitionDelay: "400ms" }}
        >
          {["6 Core Features", "WhatsApp Built-in", "Real-time Sync", "Mobile-first"]?.map(
            (badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-display font-600 text-primary border border-border bg-card"
              >
                <Icon name="CheckIcon" size={14} className="text-accent" />
                {badge}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}