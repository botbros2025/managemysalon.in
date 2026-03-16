import React from "react";
import Link from "next/link";
import AppLogo from "@/components/ui/AppLogo";
import Icon from "@/components/ui/AppIcon";

const footerLinks = [
  { label: "Features", href: "/features" },
  { label: "Beta Program", href: "/beta-program" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-container mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <Link href="/homepage" className="flex items-center gap-2.5">
            <AppLogo size={28} />
            <span className="font-display font-700 text-base text-primary">
              ManageMySalon
            </span>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footerLinks?.map((link) => (
              <Link
                key={link?.label}
                href={link?.href}
                className="text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                {link?.label}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white text-muted transition-all"
              aria-label="WhatsApp support"
            >
              <Icon name="ChatBubbleLeftRightIcon" size={16} />
            </a>
            <a
              href="mailto:hello@managemysalon.app"
              className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white text-muted transition-all"
              aria-label="Email"
            >
              <Icon name="EnvelopeIcon" size={16} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-muted">
            © 2026 ManageMySalon. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Built for modern salons everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}