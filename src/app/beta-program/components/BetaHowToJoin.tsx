"use client";

import React, { useEffect, useRef } from "react";
import Icon from "@/components/ui/AppIcon";

const steps = [
  {
    number: "01",
    icon: "ArrowDownTrayIcon",
    title: "Download the App",
    description:
      "Get ManageMySalon on Android (APK direct download) or iOS via TestFlight. Takes less than 2 minutes.",
    action: "Download APK",
    color: "#1F3D2B",
    bg: "rgba(31,61,43,0.08)",
  },
  {
    number: "02",
    icon: "BuildingStorefrontIcon",
    title: "Create Your Salon",
    description:
      "Fill in your salon name, services, and working hours. We'll have you set up in under 10 minutes.",
    action: null,
    color: "#C9A44C",
    bg: "rgba(201,164,76,0.1)",
  },
  {
    number: "03",
    icon: "ChatBubbleLeftEllipsisIcon",
    title: "Join the Beta Community",
    description:
      "We'll add you to our exclusive beta WhatsApp group for updates, support, and direct access to the product team.",
    action: "WhatsApp Group",
    color: "#3F6F52",
    bg: "rgba(63,111,82,0.08)",
  },
];

export default function BetaHowToJoin() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".reveal-hidden, .reveal-scale")
              .forEach((el, i) => {
                setTimeout(() => el.classList.add("revealed"), i * 120);
              });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="join" ref={ref} className="py-24 bg-surface">
      <div className="max-w-container mx-auto px-10 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16 space-y-3 reveal-hidden">
          <p className="section-label">Getting started</p>
          <h2 className="font-display font-800 text-4xl lg:text-5xl text-foreground">
            Join the beta in{" "}
            <span className="gradient-text">3 simple steps</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            No complex onboarding. No credit cards. Just download and start
            managing your salon smarter.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="feature-card p-8 flex flex-col gap-5 reveal-scale relative overflow-hidden"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Big number watermark */}
              <div
                className="absolute top-4 right-6 font-display font-800 text-7xl opacity-[0.04] select-none pointer-events-none"
                style={{ color: step.color, lineHeight: 1 }}
              >
                {step.number}
              </div>

              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center relative z-10"
                style={{ background: step.bg }}
              >
                <Icon
                  name={step.icon as "ArrowDownTrayIcon"}
                  size={24}
                  style={{ color: step.color }}
                />
              </div>

              <div className="relative z-10">
                <p
                  className="text-xs font-display font-800 uppercase tracking-widest mb-2"
                  style={{ color: step.color }}
                >
                  Step {step.number}
                </p>
                <h3 className="font-display font-700 text-xl text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {step.action && (
                <button
                  className="mt-auto flex items-center gap-2 text-sm font-display font-700 transition-all hover:gap-3 relative z-10"
                  style={{ color: step.color }}
                >
                  {step.action}
                  <Icon name="ArrowRightIcon" size={14} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Connector visual (desktop) */}
        <div className="hidden lg:flex items-center justify-center gap-4 mt-8 reveal-hidden" style={{ transitionDelay: "400ms" }}>
          <div className="flex items-center gap-2 text-sm text-muted">
            <Icon name="ClockIcon" size={16} className="text-accent" />
            Total time: under 15 minutes from download to first booking
          </div>
        </div>
      </div>
    </section>
  );
}

