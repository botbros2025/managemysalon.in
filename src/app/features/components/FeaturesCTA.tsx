"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Icon from "@/components/ui/AppIcon";

export default function FeaturesCTA() {
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
      { threshold: 0.2 }
    );
    if (ref?.current) observer?.observe(ref?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-surface">
      <div className="max-w-container mx-auto px-6 lg:px-8">
        <div
          className="rounded-5xl p-10 lg:p-16 relative overflow-hidden reveal-scale"
          style={{ background: "#1F3D2B" }}
        >
          {/* Decorations */}
          <div
            className="absolute top-[-80px] right-[-60px] w-[350px] h-[350px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #C9A44C 0%, transparent 70%)" }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5"
                style={{
                  background: "rgba(201,164,76,0.15)",
                  border: "1px solid rgba(201,164,76,0.3)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[11px] font-display font-700 text-accent uppercase tracking-widest">
                  All Features Free in Beta
                </span>
              </div>
              <h2 className="font-display font-800 text-3xl lg:text-4xl text-white leading-tight">
                Ready to put these features to work in your salon?
              </h2>
              <p className="text-white/60 text-base">
                Download the app and get access to every feature — completely
                free during the beta period.
              </p>
            </div>

            <div className="flex flex-col gap-3 flex-shrink-0">
              <a
                href="#"
                className="btn-gold text-base px-7 py-4 shadow-gold whitespace-nowrap"
              >
                <Icon name="ArrowDownTrayIcon" size={18} />
                Download APK
              </a>
              <Link href="/beta-program">
                <button className="btn-outline-white text-base px-7 py-4 w-full justify-center">
                  Join Beta Program
                  <Icon name="ArrowRightIcon" size={16} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}