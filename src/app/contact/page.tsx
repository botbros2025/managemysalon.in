"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Icon from "@/components/ui/AppIcon";

export default function ContactPage() {
  const ref = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    salonName: "",
    email: "",
    message: "",
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
    setSubmitted(true);
  };

  const inputStyle = {
    background: "#F6F4EF",
    border: "1.5px solid #DDD6CC",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "#1F3D2B";
    e.target.style.boxShadow = "0 0 0 3px rgba(31,61,43,0.08)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "#DDD6CC";
    e.target.style.boxShadow = "none";
  };

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <p
              className="text-xs font-display font-800 uppercase tracking-widest mb-4"
              style={{ color: "#C9A44C" }}
            >
              Get In Touch
            </p>
            <h1 className="font-display font-800 text-4xl lg:text-5xl text-foreground leading-tight mb-4">
              We'd Love to{" "}
              <span className="gold-text">Hear From You</span>
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              Have a question about ManageMySalon? Our team is here to help you
              get the most out of your salon management experience.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section ref={ref} className="pb-24 px-6 lg:px-8">
          <div className="max-w-container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

              {/* Left — Contact Info */}
              <div className="lg:col-span-2 space-y-6 reveal-left">
                {/* Email Card */}
                <div
                  className="rounded-3xl p-6 space-y-3"
                  style={{ background: "#EEEAE3", border: "1px solid #DDD6CC" }}
                >
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(31,61,43,0.1)" }}
                  >
                    <Icon name="EnvelopeIcon" size={20} style={{ color: "#1F3D2B" }} />
                  </div>
                  <div>
                    <p className="font-display font-700 text-sm text-foreground mb-1">
                      Email Us
                    </p>
                    <p className="text-muted text-sm mb-2">
                      We typically respond within 24 hours.
                    </p>
                    <a
                      href="mailto:hello@managemysalon.in"
                      className="text-sm font-display font-700 transition-colors"
                      style={{ color: "#1F3D2B" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A44C")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#1F3D2B")}
                    >
                      hello@managemysalon.in
                    </a>
                  </div>
                </div>

                {/* WhatsApp Card */}
                <div
                  className="rounded-3xl p-6 space-y-3"
                  style={{ background: "#EEEAE3", border: "1px solid #DDD6CC" }}
                >
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(201,164,76,0.12)" }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#C9A44C"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-display font-700 text-sm text-foreground mb-1">
                      WhatsApp Support
                    </p>
                    <p className="text-muted text-sm mb-3">
                      Chat with us directly for quick help and support.
                    </p>
                    <a
                      href="https://wa.me/919999999999?text=Hi%2C%20I%20need%20help%20with%20ManageMySalon"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-display font-700 transition-all"
                      style={{ background: "#1F3D2B", color: "#fff" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#2a5239")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#1F3D2B")}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>

                {/* Response time note */}
                <div
                  className="rounded-3xl p-5 flex items-start gap-3"
                  style={{ background: "rgba(201,164,76,0.08)", border: "1px solid rgba(201,164,76,0.2)" }}
                >
                  <Icon name="ClockIcon" size={18} className="text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted leading-relaxed">
                    Our support team is available{" "}
                    <span className="font-display font-700 text-foreground">Mon–Sat, 9am–7pm IST</span>.
                    We aim to respond to all messages within 24 hours.
                  </p>
                </div>
              </div>

              {/* Right — Form */}
              <div className="lg:col-span-3 reveal-right">
                <div
                  className="rounded-4xl p-8 lg:p-10"
                  style={{ background: "#EEEAE3", border: "1px solid #DDD6CC" }}
                >
                  {submitted ? (
                    <div className="text-center py-10 space-y-4">
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
                        Message Sent!
                      </h3>
                      <p className="text-muted text-base max-w-sm mx-auto">
                        Thanks for reaching out. We'll get back to you within 24 hours.
                      </p>
                      <div
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2"
                        style={{ background: "rgba(201,164,76,0.12)" }}
                      >
                        <Icon name="SparklesIcon" size={14} className="text-accent" />
                        <span className="text-sm font-display font-700 text-accent">
                          We'll be in touch soon
                        </span>
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={() => { setSubmitted(false); setForm({ name: "", salonName: "", email: "", message: "" }); }}
                          className="text-sm font-display font-600 underline underline-offset-2"
                          style={{ color: "#1F3D2B" }}
                        >
                          Send another message
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <h3 className="font-display font-700 text-2xl text-foreground mb-1">
                          Send Us a Message
                        </h3>
                        <p className="text-muted text-sm">
                          Fill in the form and we'll get back to you shortly.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-display font-600 text-foreground mb-1.5">
                            Your Name <span style={{ color: "#C9A44C" }}>*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Priya Sharma"
                            className="w-full px-4 py-3 rounded-2xl text-sm text-foreground placeholder:text-muted outline-none transition-all"
                            style={inputStyle}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-display font-600 text-foreground mb-1.5">
                            Salon Name <span style={{ color: "#C9A44C" }}>*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={form.salonName}
                            onChange={(e) => setForm({ ...form, salonName: e.target.value })}
                            placeholder="Bloom Beauty Studio"
                            className="w-full px-4 py-3 rounded-2xl text-sm text-foreground placeholder:text-muted outline-none transition-all"
                            style={inputStyle}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-display font-600 text-foreground mb-1.5">
                          Email Address <span style={{ color: "#C9A44C" }}>*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="priya@bloombeauty.in"
                          className="w-full px-4 py-3 rounded-2xl text-sm text-foreground placeholder:text-muted outline-none transition-all"
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-display font-600 text-foreground mb-1.5">
                          Message <span style={{ color: "#C9A44C" }}>*</span>
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Tell us how we can help you..."
                          className="w-full px-4 py-3 rounded-2xl text-sm text-foreground placeholder:text-muted outline-none transition-all resize-none"
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full btn-primary justify-center py-3.5"
                      >
                        <Icon name="PaperAirplaneIcon" size={16} />
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
