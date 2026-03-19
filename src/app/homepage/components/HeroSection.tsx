"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";

/* ─── Draggable + Parallax Card ─────────────────────────────────────────── */

interface DraggableCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  parallaxFactor?: number;
}

function DraggableCard({
  children,
  className = "",
  style = {},
  parallaxFactor = 1,
}: DraggableCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const parallaxOffset = useRef({ x: 0, y: 0 });

  const applyTransform = useCallback((transition?: string) => {
    const el = cardRef.current;
    if (!el) return;
    const tx = dragOffset.current.x + parallaxOffset.current.x;
    const ty = dragOffset.current.y + parallaxOffset.current.y;
    if (transition !== undefined) el.style.transition = transition;
    el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
  }, []);

  // Expose setter so the parent RAF loop can push parallax values
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    (el as any).__setParallax = (px: number, py: number) => {
      parallaxOffset.current = { x: px * parallaxFactor, y: py * parallaxFactor };
      if (!isDragging.current) applyTransform();
    };
  }, [parallaxFactor, applyTransform]);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return; // mobile-safe
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    };
    const el = cardRef.current;
    if (el) {
      el.style.transition = "box-shadow 0.2s ease";
      el.style.cursor = "grabbing";
      el.style.zIndex = "50";
      el.style.boxShadow =
        "0 24px 64px rgba(31,61,43,0.20), 0 6px 20px rgba(0,0,0,0.10)";
    }
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current) return;
      const MAX = 30;
      dragOffset.current = {
        x: Math.max(-MAX, Math.min(MAX, e.clientX - dragStart.current.x)),
        y: Math.max(-MAX, Math.min(MAX, e.clientY - dragStart.current.y)),
      };
      applyTransform("box-shadow 0.2s ease");
    },
    [applyTransform]
  );

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    dragOffset.current = { x: 0, y: 0 };
    const el = cardRef.current;
    if (el) {
      el.style.cursor = "grab";
      el.style.zIndex = "";
      el.style.boxShadow = "";
    }
    applyTransform("transform 0.7s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s ease");
  }, [applyTransform]);

  return (
    <div
      ref={cardRef}
      data-parallax-card
      data-parallax-factor={parallaxFactor}
      className={`glass-card rounded-2xl shadow-card ${className}`}
      style={{
        ...style,
        cursor: "grab",
        willChange: "transform",
        userSelect: "none",
        touchAction: "none",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {children}
    </div>
  );
}

/* ─── Hero Section ───────────────────────────────────────────────────────── */

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouse.current = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      };
    };

    const tick = () => {
      const LERP = 0.055;
      smooth.current.x += (mouse.current.x - smooth.current.x) * LERP;
      smooth.current.y += (mouse.current.y - smooth.current.y) * LERP;

      const sx = smooth.current.x;
      const sy = smooth.current.y;

      // Background blobs
      const blob1 = el.querySelector<HTMLElement>(".hero-blob-1");
      const blob2 = el.querySelector<HTMLElement>(".hero-blob-2");
      if (blob1) blob1.style.transform = `translate3d(${sx * 30}px, ${sy * 20}px, 0)`;
      if (blob2) blob2.style.transform = `translate3d(${-sx * 24}px, ${-sy * 18}px, 0)`;

      // Phone mockup — subtle 3-D tilt
      if (phoneRef.current) {
        const rotX = -sy * 7;
        const rotY = sx * 9;
        phoneRef.current.style.transform = `translate3d(${sx * 14}px, ${sy * 9}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }

      // Draggable cards — push parallax
      const cards = el.querySelectorAll<HTMLElement>("[data-parallax-card]");
      cards.forEach((card) => {
        const factor = parseFloat(card.dataset.parallaxFactor ?? "1");
        if (typeof (card as any).__setParallax === "function") {
          (card as any).__setParallax(sx * 20 * factor, sy * 14 * factor);
        }
      });

      // Staff card (static parallax, no drag)
      const staffCard = el.querySelector<HTMLElement>("[data-parallax-static]");
      if (staffCard) {
        staffCard.style.transform = `translate3d(${sx * 14}px, ${sy * 10}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    el.addEventListener("mousemove", onMouseMove);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="section-spacing relative min-h-screen flex items-center pt-20 overflow-hidden hero-bg"
      style={{ perspective: "1400px" }}
    >
      {/* Background blobs */}
      <div
        className="hero-blob-1 absolute top-[-100px] right-[-80px] w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(63,111,82,0.18) 0%, transparent 70%)",
          willChange: "transform",
        }}
      />
      <div
        className="hero-blob-2 absolute bottom-[-60px] left-[-60px] w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,164,76,0.2) 0%, transparent 70%)",
          willChange: "transform",
        }}
      />

      <div className="container-main w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text content */}
          <div className="space-y-8 animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-display font-700 text-accent uppercase tracking-widest">
                Beta Now Live
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="font-display font-800 text-5xl lg:text-7xl text-foreground leading-[1.05] tracking-tight">
                Salon Management{" "}
                <span className="gradient-text">Made Simple</span>
              </h1>
              <p className="text-lg text-muted leading-relaxed max-w-lg">
                Manage appointments, staff, customers, and WhatsApp reminders —
                all from one powerful app designed for modern salons.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#" className="btn-primary text-base px-7 py-4 shadow-green">
                <Icon name="ArrowDownTrayIcon" size={18} />
                Download Android APK
              </a>
              <a href="#" className="btn-secondary text-base px-7 py-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                iOS Beta (TestFlight)
              </a>
            </div>

            {/* Micro-trust */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-1.5">
                <Icon name="CheckCircleIcon" size={16} className="text-primary-hover" variant="solid" />
                <span className="text-sm text-muted">Free during beta</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="CheckCircleIcon" size={16} className="text-primary-hover" variant="solid" />
                <span className="text-sm text-muted">No credit card</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="CheckCircleIcon" size={16} className="text-primary-hover" variant="solid" />
                <span className="text-sm text-muted">Android & iOS</span>
              </div>
            </div>
          </div>

          {/* Right — Phone mockup with floating cards */}
          <div className="relative flex justify-center lg:justify-end items-center min-h-[560px]">
            {/* Phone mockup — parallax tilt */}
            <div
              ref={phoneRef}
              className="relative z-10 animate-float"
              style={{
                willChange: "transform",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="phone-frame w-[240px] h-[490px] mx-auto"
                style={{ borderRadius: "44px" }}
              >
                {/* Notch */}
                <div
                  className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-6 rounded-full z-10"
                  style={{ background: "#1F3D2B" }}
                />
                {/* Screen */}
                <div className="w-full h-full overflow-hidden rounded-[42px] bg-bg">
                  <AppImage
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_1bdad48dd-1770197186247.png"
                    alt="ManageMySalon app dashboard showing appointment calendar and salon management interface"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="space-y-2">
                      <p className="text-white/60 text-[10px] font-display font-600 uppercase tracking-widest">
                        Today's Schedule
                      </p>
                      <p className="text-white font-display font-700 text-xl">
                        8 Appointments
                      </p>
                      <div className="flex gap-1.5">
                        {["9AM", "11AM", "1PM", "3PM"].map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-full text-[9px] font-700 font-display"
                            style={{
                              background: "rgba(201,164,76,0.3)",
                              color: "#E8C06A",
                              border: "1px solid rgba(201,164,76,0.4)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 1 — WhatsApp reminder (draggable + parallax) */}
            <DraggableCard
              className="absolute left-[-10px] lg:left-[-40px] top-[60px] p-3.5 animate-float-delayed z-20 w-[180px]"
              parallaxFactor={1.2}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(63,111,82,0.12)" }}
                >
                  <Icon name="ChatBubbleLeftEllipsisIcon" size={14} className="text-primary-hover" />
                </div>
                <div>
                  <p className="text-[10px] font-display font-700 text-foreground">WhatsApp Sent</p>
                  <p className="text-[9px] text-muted">2 mins ago</p>
                </div>
              </div>
              <p className="text-[10px] text-muted leading-relaxed">
                "Hi Priya! Your appointment is confirmed for 3:00 PM today 💅"
              </p>
            </DraggableCard>

            {/* Card 2 — Revenue (draggable + parallax) */}
            <DraggableCard
              className="absolute right-[-10px] lg:right-[-20px] top-[80px] p-3.5 animate-float-slow z-20 w-[160px]"
              parallaxFactor={0.85}
            >
              <p className="text-[10px] font-display font-600 text-muted mb-1.5">Today's Revenue</p>
              <p className="text-xl font-display font-800 text-primary">₹4,820</p>
              <div className="flex items-center gap-1 mt-1">
                <Icon name="ArrowTrendingUpIcon" size={12} className="text-primary-hover" />
                <span className="text-[10px] text-primary-hover font-600">+18% vs yesterday</span>
              </div>
            </DraggableCard>

            {/* Card 3 — Next appointment (draggable + parallax) */}
            <DraggableCard
              className="absolute left-[-10px] lg:left-[-30px] bottom-[80px] p-3.5 animate-float z-20 w-[190px]"
              parallaxFactor={1.05}
              style={{ animationDelay: "1.5s" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                  <AppImage
                    src="https://img.rocket.new/generatedImages/rocket_gen_img_1ee2bcef3-1763301295581.png"
                    alt="Customer profile photo of a woman with dark hair"
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-[10px] font-display font-700 text-foreground">Sneha Rao</p>
                  <p className="text-[9px] text-muted">Next at 2:30 PM</p>
                </div>
              </div>
              <div
                className="rounded-lg px-2 py-1 text-[9px] font-display font-600"
                style={{ background: "rgba(201,164,76,0.15)", color: "#C9A44C" }}
              >
                Hair Color + Trim
              </div>
            </DraggableCard>

            {/* Card 4 — Staff active (static parallax, no drag) */}
            <div
              data-parallax-static
              className="glass-card absolute right-[-10px] lg:right-[-20px] bottom-[100px] rounded-2xl p-3.5 shadow-card animate-float-delayed z-20 w-[150px]"
              style={{
                animationDelay: "0.8s",
                willChange: "transform",
              }}
            >
              <p className="text-[10px] font-display font-600 text-muted mb-2">Staff Active</p>
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=40&q=80",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&q=80",
                  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=40&q=80",
                ].map((src, i) => (
                  <div key={i} className="w-7 h-7 rounded-full overflow-hidden border-2 border-white">
                    <AppImage
                      src={src}
                      alt={`Staff member ${i + 1} profile photo`}
                      width={28}
                      height={28}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
                <div
                  className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-display font-700"
                  style={{ background: "#1F3D2B", color: "white" }}
                >
                  +2
                </div>
              </div>
              <p className="text-[9px] text-muted mt-1.5">5 stylists on duty</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}