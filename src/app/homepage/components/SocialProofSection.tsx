"use client";

import React, { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/AppIcon";

const stats = [
  {
    value: 100,
    suffix: "+",
    label: "Salons Joined Beta",
    icon: "BuildingStorefrontIcon",
    color: "#1F3D2B",
  },
  {
    value: 10000,
    suffix: "+",
    label: "Appointments Managed",
    icon: "CalendarDaysIcon",
    color: "#3F6F52",
  },
  {
    value: 25000,
    suffix: "+",
    label: "WhatsApp Reminders Sent",
    icon: "ChatBubbleLeftEllipsisIcon",
    color: "#C9A44C",
  },
  {
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
    icon: "StarIcon",
    color: "#1F3D2B",
  },
];

function useCountUp(target: number, duration = 1800, started: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);

  return count;
}

function StatCard({
  stat,
  index,
  started,
}: {
  stat: (typeof stats)[0];
  index: number;
  started: boolean;
}) {
  const count = useCountUp(stat.value, 1800, started);
  const display =
    stat.value >= 1000 ? (count / 1000).toFixed(count >= 1000 ? 0 : 1) + "k" : count;

  return (
    <div
      className="stat-card p-6 lg:p-8 reveal-hidden"
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
        style={{
          background: `${stat.color}14`,
        }}
      >
        <Icon
          name={stat.icon as "BuildingStorefrontIcon"}
          size={22}
          className=""
          style={{ color: stat.color }}
        />
      </div>
      <p
        className="font-display font-800 text-4xl lg:text-5xl mb-1 tabular-nums"
        style={{ color: stat.color }}
      >
        {started ? display : "0"}
        {stat.suffix}
      </p>
      <p className="text-sm text-muted font-medium">{stat.label}</p>
    </div>
  );
}

export default function SocialProofSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            entry.target
              .querySelectorAll(".reveal-hidden")
              .forEach((el) => el.classList.add("revealed"));
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-bg border-y border-border">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 reveal-hidden">
          <p className="section-label mb-3">Trusted by salons everywhere</p>
          <h2 className="font-display font-700 text-3xl lg:text-4xl text-foreground">
            Real numbers from real salons
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}