"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

const features = [
  {
    icon: "CalendarDaysIcon",
    title: "Appointment Scheduling",
    description:
      "Calendar-based booking with real-time availability. Customers book, you confirm — no double bookings ever.",
    color: "#1F3D2B",
    bg: "rgba(31,61,43,0.08)",
    size: "large",
  },
  {
    icon: "ChatBubbleLeftEllipsisIcon",
    title: "WhatsApp Reminders",
    description:
      "Automated reminders sent via WhatsApp 24 hours and 1 hour before appointments. Reduce no-shows by up to 60%.",
    color: "#3F6F52",
    bg: "rgba(63,111,82,0.08)",
    size: "normal",
  },
  {
    icon: "UsersIcon",
    title: "Customer CRM",
    description:
      "Track visit history, preferences, and spending patterns for every customer.",
    color: "#C9A44C",
    bg: "rgba(201,164,76,0.1)",
    size: "normal",
  },
  {
    icon: "UserGroupIcon",
    title: "Staff Management",
    description:
      "Assign appointments to specific stylists, track their schedule and performance.",
    color: "#1F3D2B",
    bg: "rgba(31,61,43,0.08)",
    size: "normal",
  },
  {
    icon: "CreditCardIcon",
    title: "Billing & Payments",
    description:
      "Generate invoices instantly. Track payments and outstanding balances.",
    color: "#C9A44C",
    bg: "rgba(201,164,76,0.1)",
    size: "normal",
  },
  {
    icon: "ChartBarIcon",
    title: "Business Analytics",
    description:
      "Understand revenue trends, peak hours, and top services with visual reports.",
    color: "#3F6F52",
    bg: "rgba(63,111,82,0.08)",
    size: "normal",
  },
];

export default function FeaturesPreviewSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".reveal-hidden, .reveal-left, .reveal-right, .reveal-scale")
              .forEach((el, i) => {
                setTimeout(() => el.classList.add("revealed"), i * 80);
              });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-spacing bg-bg">
      <div className="container-main">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 reveal-hidden">
            <p className="section-label">Everything you need</p>
            <h2 className="font-display font-800 text-4xl lg:text-5xl text-foreground max-w-lg">
              Six tools. One app.{" "}
              <span className="gradient-text">Zero chaos.</span>
            </h2>
          </div>
          <div className="reveal-hidden" style={{ transitionDelay: "150ms" }}>
            <Link href="/features">
              <button className="btn-secondary text-sm gap-2">
                See all features
                <Icon name="ArrowRightIcon" size={16} />
              </button>
            </Link>
          </div>
        </div>

        {/* Bento Grid — asymmetric, varied sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {/* Card 1 — Large spanning card */}
          <div
            className="feature-card p-7 lg:col-span-1 lg:row-span-2 flex flex-col justify-between reveal-scale min-h-[280px]"
            style={{ transitionDelay: "0ms" }}
          >
            <div>
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: features[0].bg }}
              >
                <Icon
                  name={features[0].icon as "CalendarDaysIcon"}
                  size={24}
                  style={{ color: features[0].color }}
                />
              </div>
              <h3 className="font-display font-700 text-xl text-foreground mb-3">
                {features[0].title}
              </h3>
              <p className="text-muted text-base leading-relaxed">
                {features[0].description}
              </p>
            </div>
            {/* Mini calendar preview */}
            <div
              className="mt-6 rounded-2xl p-4 border border-border"
              style={{ background: "#F6F4EF" }}
            >
              <div className="grid grid-cols-7 gap-1 text-center">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <div key={i} className="text-[9px] font-display font-700 text-muted py-1">
                    {d}
                  </div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <div
                    key={d}
                    className={`text-[10px] font-display font-600 py-1 rounded-lg transition-colors ${
                      d === 12
                        ? "text-white"
                        : d === 8 || d === 15 || d === 22
                        ? "text-primary" :"text-muted"
                    }`}
                    style={{
                      background:
                        d === 12
                          ? "#1F3D2B"
                          : d === 8 || d === 15 || d === 22
                          ? "rgba(201,164,76,0.15)"
                          : "transparent",
                    }}
                  >
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cards 2–6 — Normal size */}
          {features.slice(1).map((feature, i) => (
            <div
              key={feature.title}
              className="feature-card p-6 reveal-hidden flex flex-col gap-4"
              style={{ transitionDelay: `${(i + 1) * 80}ms` }}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: feature.bg }}
              >
                <Icon
                  name={feature.icon as "ChatBubbleLeftEllipsisIcon"}
                  size={22}
                  style={{ color: feature.color }}
                />
              </div>
              <div>
                <h3 className="font-display font-700 text-lg text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
              {/* Accent bar */}
              <div
                className="h-0.5 w-10 rounded-full mt-auto"
                style={{ background: feature.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}