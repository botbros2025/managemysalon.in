"use client";

import React, { useEffect, useRef } from "react";
import Icon from "@/components/ui/AppIcon";

const benefits = [
  {
    icon: "GiftIcon",
    title: "Free Full Access",
    description:
      "Every feature — appointments, WhatsApp reminders, billing, analytics — completely free for all beta users. No credit card, no trial limits.",
    highlight: "100% Free",
    highlightColor: "#1F3D2B",
    highlightBg: "rgba(31,61,43,0.08)",
    size: "large",
  },
  {
    icon: "BoltIcon",
    title: "Early Feature Updates",
    description:
      "Beta users get new features before public release. Be the first to try AI-powered scheduling, advanced analytics, and more.",
    highlight: "First Access",
    highlightColor: "#C9A44C",
    highlightBg: "rgba(201,164,76,0.1)",
    size: "normal",
  },
  {
    icon: "HeartIcon",
    title: "Priority Support",
    description:
      "Dedicated WhatsApp support channel with response times under 2 hours. Your salon\'s success is our priority.",
    highlight: "< 2hr Response",
    highlightColor: "#3F6F52",
    highlightBg: "rgba(63,111,82,0.08)",
    size: "normal",
  },
  {
    icon: "LightBulbIcon",
    title: "Shape the Product",
    description:
      "Your feedback directly influences what we build. Monthly calls with the product team to discuss your salon's specific needs.",
    highlight: "Direct Influence",
    highlightColor: "#C9A44C",
    highlightBg: "rgba(201,164,76,0.1)",
    size: "normal",
  },
  {
    icon: "TagIcon",
    title: "Founding Member Discount",
    description:
      "Lock in a special lifetime discount when ManageMySalon launches publicly. Beta users get the best price — forever.",
    highlight: "Lifetime Deal",
    highlightColor: "#1F3D2B",
    highlightBg: "rgba(31,61,43,0.08)",
    size: "normal",
  },
];

export default function BetaBenefits() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll(".reveal-hidden, .reveal-scale")
              .forEach((el, i) => {
                setTimeout(() => el.classList.add("revealed"), i * 80);
              });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-24 bg-bg">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 space-y-3 reveal-hidden">
          <p className="section-label">Why join beta</p>
          <h2 className="font-display font-800 text-4xl lg:text-5xl text-foreground">
            Early users get{" "}
            <span className="gradient-text">more than just the app</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Being a beta user means being a partner in building the best salon
            management app in the market.
          </p>
        </div>

        {/* Benefits bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {/* Large card */}
          <div
            className="feature-card p-8 lg:col-span-1 lg:row-span-2 flex flex-col gap-6 reveal-scale"
            style={{ transitionDelay: "0ms" }}
          >
            <div>
              <div
                className="w-14 h-14 rounded-3xl flex items-center justify-center mb-6"
                style={{ background: benefits[0].highlightBg }}
              >
                <Icon
                  name={benefits[0].icon as "GiftIcon"}
                  size={28}
                  style={{ color: benefits[0].highlightColor }}
                />
              </div>
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-4"
                style={{
                  background: benefits[0].highlightBg,
                }}
              >
                <span
                  className="text-xs font-display font-700 uppercase tracking-widest"
                  style={{ color: benefits[0].highlightColor }}
                >
                  {benefits[0].highlight}
                </span>
              </div>
              <h3 className="font-display font-700 text-2xl text-foreground mb-3">
                {benefits[0].title}
              </h3>
              <p className="text-muted text-base leading-relaxed">
                {benefits[0].description}
              </p>
            </div>

            {/* Visual breakdown */}
            <div className="mt-auto space-y-3">
              {[
                { label: "Appointment Management", checked: true },
                { label: "WhatsApp Automation", checked: true },
                { label: "Customer CRM", checked: true },
                { label: "Staff Scheduling", checked: true },
                { label: "Billing & Invoicing", checked: true },
                { label: "Analytics Dashboard", checked: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(31,61,43,0.1)" }}
                  >
                    <Icon
                      name="CheckIcon"
                      size={11}
                      style={{ color: "#1F3D2B" }}
                    />
                  </div>
                  <span className="text-sm text-foreground">{item.label}</span>
                  <span
                    className="ml-auto text-xs font-display font-700 px-2 py-0.5 rounded-full"
                    style={{
                      background: "rgba(201,164,76,0.12)",
                      color: "#C9A44C",
                    }}
                  >
                    Free
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Normal cards */}
          {benefits.slice(1).map((benefit, i) => (
            <div
              key={benefit.title}
              className="feature-card p-6 flex flex-col gap-4 reveal-hidden"
              style={{ transitionDelay: `${(i + 1) * 80}ms` }}
            >
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center"
                style={{ background: benefit.highlightBg }}
              >
                <Icon
                  name={benefit.icon as "BoltIcon"}
                  size={22}
                  style={{ color: benefit.highlightColor }}
                />
              </div>

              <div
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 w-fit"
                style={{ background: benefit.highlightBg }}
              >
                <span
                  className="text-[10px] font-display font-800 uppercase tracking-widest"
                  style={{ color: benefit.highlightColor }}
                >
                  {benefit.highlight}
                </span>
              </div>

              <div>
                <h3 className="font-display font-700 text-lg text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}