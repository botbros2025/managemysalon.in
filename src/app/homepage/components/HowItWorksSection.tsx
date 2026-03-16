"use client";

import React, { useEffect, useRef } from "react";
import Icon from "@/components/ui/AppIcon";

const steps = [
  {
    number: "01",
    icon: "BuildingStorefrontIcon",
    title: "Create Your Salon Profile",
    description:
      "Set up your salon in under 5 minutes. Add your services, pricing, and working hours.",
    color: "#1F3D2B",
    bg: "rgba(31,61,43,0.08)",
  },
  {
    number: "02",
    icon: "UserGroupIcon",
    title: "Add Staff & Services",
    description:
      "Invite your team, assign roles, and link services to specific staff members.",
    color: "#3F6F52",
    bg: "rgba(63,111,82,0.08)",
  },
  {
    number: "03",
    icon: "CalendarDaysIcon",
    title: "Start Managing Bookings",
    description:
      "Accept appointments, send WhatsApp reminders, and watch your salon run smoothly.",
    color: "#C9A44C",
    bg: "rgba(201,164,76,0.1)",
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-surface">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 space-y-3 reveal-hidden">
          <p className="section-label">Simple setup</p>
          <h2 className="font-display font-800 text-4xl lg:text-5xl text-foreground">
            Up and running in{" "}
            <span className="gradient-text">under 10 minutes</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            No technical knowledge needed. If you can use WhatsApp, you can use
            ManageMySalon.
          </p>
        </div>

        {/* Steps — horizontal with connector lines */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px bg-gradient-to-r from-border via-accent to-border z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="flex flex-col items-center text-center reveal-scale"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Icon circle */}
                <div className="relative mb-6">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-white shadow-card"
                    style={{ background: step.bg, borderColor: step.color + "30" }}
                  >
                    <Icon
                      name={step.icon as "BuildingStorefrontIcon"}
                      size={28}
                      style={{ color: step.color }}
                    />
                  </div>
                  {/* Step number badge */}
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-display font-800 text-white shadow-sm"
                    style={{ background: step.color }}
                  >
                    {i + 1}
                  </div>
                </div>

                {/* Content card */}
                <div className="feature-card p-6 w-full text-left">
                  <p
                    className="font-display font-800 text-xs uppercase tracking-widest mb-3"
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
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14 reveal-hidden" style={{ transitionDelay: "450ms" }}>
          <a href="#" className="btn-primary text-base px-8 py-4 shadow-green">
            <Icon name="ArrowDownTrayIcon" size={18} />
            Get Started Free
          </a>
          <p className="text-muted text-sm mt-3">
            Free during beta • No setup fees
          </p>
        </div>
      </div>
    </section>
  );
}