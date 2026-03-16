"use client";

import React, { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/AppIcon";

export default function BetaCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    salonName: "",
    email: "",
    city: "",
  });

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
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend integration point — connect to your API here
    setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{ background: "#1F3D2B" }}
    >
      {/* Background decorations */}
      <div
        className="absolute top-[-100px] left-[-80px] w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none blob"
        style={{ background: "radial-gradient(circle, #C9A44C 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-80px] right-[-60px] w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none blob-2"
        style={{ background: "radial-gradient(circle, #3F6F52 0%, transparent 70%)" }}
      />

      <div className="max-w-container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — Text */}
          <div className="space-y-8 reveal-left">
            <div>
              <p
                className="text-xs font-display font-800 uppercase tracking-widest mb-4"
                style={{ color: "#C9A44C" }}
              >
                Reserve Your Spot
              </p>
              <h2 className="font-display font-800 text-4xl lg:text-5xl text-white leading-tight mb-4">
                Get Early Access to{" "}
                <span className="gold-text">ManageMySalon</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                Fill in your details and we'll reach out with your download link
                and add you to our exclusive beta community.
              </p>
            </div>

            {/* What you get list */}
            <div className="space-y-4">
              {[
                { icon: "GiftIcon", text: "Free access to all features" },
                { icon: "BoltIcon", text: "Early feature previews" },
                { icon: "HeartIcon", text: "Priority WhatsApp support" },
                { icon: "TagIcon", text: "Founding member pricing locked in" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(201,164,76,0.15)" }}
                  >
                    <Icon
                      name={item.icon as "GiftIcon"}
                      size={16}
                      className="text-accent"
                    />
                  </div>
                  <span className="text-white/80 text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Download buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a href="#" className="btn-gold text-sm px-6 py-3.5 shadow-gold">
                <Icon name="ArrowDownTrayIcon" size={16} />
                Download APK
              </a>
              <a href="#" className="btn-outline-white text-sm px-6 py-3.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                iOS TestFlight
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div className="reveal-right">
            <div
              className="rounded-4xl p-8 lg:p-10"
              style={{ background: "#EEEAE3", border: "1px solid #DDD6CC" }}
            >
              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                    style={{ background: "rgba(31,61,43,0.1)" }}
                  >
                    <Icon
                      name="CheckCircleIcon"
                      size={36}
                      style={{ color: "#1F3D2B" }}
                      variant="solid"
                    />
                  </div>
                  <h3 className="font-display font-700 text-2xl text-foreground">
                    You're on the list!
                  </h3>
                  <p className="text-muted text-base">
                    We'll WhatsApp you with your download link within 24 hours.
                    Welcome to the ManageMySalon beta family!
                  </p>
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2"
                    style={{ background: "rgba(201,164,76,0.12)" }}
                  >
                    <Icon name="SparklesIcon" size={14} className="text-accent" />
                    <span className="text-sm font-display font-700 text-accent">
                      Beta member confirmed
                    </span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h3 className="font-display font-700 text-2xl text-foreground mb-1">
                      Request Beta Access
                    </h3>
                    <p className="text-muted text-sm">
                      We'll reach out within 24 hours.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-display font-600 text-foreground mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Priya Sharma"
                        className="w-full px-4 py-3 rounded-2xl text-sm text-foreground placeholder:text-muted outline-none transition-all"
                        style={{
                          background: "#F6F4EF",
                          border: "1.5px solid #DDD6CC",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#1F3D2B";
                          e.target.style.boxShadow = "0 0 0 3px rgba(31,61,43,0.08)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#DDD6CC";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-display font-600 text-foreground mb-1.5">
                        Salon Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.salonName}
                        onChange={(e) => setForm({ ...form, salonName: e.target.value })}
                        placeholder="Bloom Beauty Studio"
                        className="w-full px-4 py-3 rounded-2xl text-sm text-foreground placeholder:text-muted outline-none transition-all"
                        style={{
                          background: "#F6F4EF",
                          border: "1.5px solid #DDD6CC",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#1F3D2B";
                          e.target.style.boxShadow = "0 0 0 3px rgba(31,61,43,0.08)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#DDD6CC";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-display font-600 text-foreground mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="priya@bloombeauty.in"
                        className="w-full px-4 py-3 rounded-2xl text-sm text-foreground placeholder:text-muted outline-none transition-all"
                        style={{
                          background: "#F6F4EF",
                          border: "1.5px solid #DDD6CC",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#1F3D2B";
                          e.target.style.boxShadow = "0 0 0 3px rgba(31,61,43,0.08)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#DDD6CC";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-display font-600 text-foreground mb-1.5">
                        City
                      </label>
                      <input
                        type="text"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        placeholder="Mumbai"
                        className="w-full px-4 py-3 rounded-2xl text-sm text-foreground placeholder:text-muted outline-none transition-all"
                        style={{
                          background: "#F6F4EF",
                          border: "1.5px solid #DDD6CC",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#1F3D2B";
                          e.target.style.boxShadow = "0 0 0 3px rgba(31,61,43,0.08)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#DDD6CC";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full justify-center text-base py-4 shadow-green"
                  >
                    <Icon name="RocketLaunchIcon" size={18} />
                    Request Beta Access
                  </button>

                  <p className="text-center text-xs text-muted">
                    Free during beta · No credit card · Cancel anytime
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}