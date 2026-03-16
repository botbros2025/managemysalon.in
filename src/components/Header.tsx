"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppLogo from "@/components/ui/AppLogo";
import Icon from "@/components/ui/AppIcon";

const navLinks = [
  { label: "Home", href: "/homepage" },
  { label: "Features", href: "/features" },
  { label: "Beta Program", href: "/beta-program" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "nav-blur shadow-sm" : "bg-bg border-b border-border"
        }`}
      >
        <div className="max-w-container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link href="/homepage" className="flex items-center gap-2.5 flex-shrink-0">
              <AppLogo size={32} />
              <span className="font-display font-800 text-lg tracking-tight text-primary hidden sm:block">
                ManageMySalon
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks?.map((link) => {
                const isActive = pathname === link?.href;
                return (
                  <Link
                    key={link?.href}
                    href={link?.href}
                    className={`relative px-4 py-2 text-sm font-medium font-display rounded-full transition-all duration-200 ${
                      isActive
                        ? "text-primary bg-card" :"text-muted hover:text-foreground hover:bg-card"
                    }`}
                  >
                    {link?.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <button className="btn-secondary text-sm py-2.5 px-5">
                Login
              </button>
              <Link href="/beta-program">
                <button className="btn-primary text-sm py-2.5 px-5">
                  <Icon name="ArrowDownTrayIcon" size={16} />
                  Download App
                </button>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-card transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <Icon name="XMarkIcon" size={22} className="text-foreground" />
              ) : (
                <Icon name="Bars3Icon" size={22} className="text-foreground" />
              )}
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 bottom-0 w-[80vw] max-w-sm bg-bg border-l border-border shadow-xl transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-20 pb-8 px-6">
            <nav className="flex flex-col gap-1 flex-1">
              {navLinks?.map((link) => {
                const isActive = pathname === link?.href;
                return (
                  <Link
                    key={link?.href}
                    href={link?.href}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-base font-display font-600 transition-all ${
                      isActive
                        ? "bg-primary text-white" :"text-foreground hover:bg-card"
                    }`}
                  >
                    {link?.label}
                  </Link>
                );
              })}
            </nav>
            <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-border">
              <button className="btn-secondary w-full justify-center">Login</button>
              <Link href="/beta-program" className="w-full">
                <button className="btn-primary w-full justify-center">
                  <Icon name="ArrowDownTrayIcon" size={16} />
                  Download App
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}