import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';
import FeedbackModal from '@/components/FeedbackModal';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'ManageMySalon — Salon Management Made Simple',
  description: 'ManageMySalon helps salon owners manage appointments, staff, billing, and WhatsApp reminders from one powerful mobile app. Join 500+ salons in beta.',
  icons: {
    icon: [
      { url: '/assets/images/app_logo.svg', type: 'image/svg+xml' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        {children}
        <FeedbackModal />

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fmanagemysa6675back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.17" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" />
      </body>
    </html>
  );
}