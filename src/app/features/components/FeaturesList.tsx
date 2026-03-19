"use client";

import React, { useEffect, useRef } from "react";
import Icon from "@/components/ui/AppIcon";
import AppImage from "@/components/ui/AppImage";

const features = [
{
  id: "appointments",
  icon: "CalendarDaysIcon",
  label: "Appointment Management",
  title: "A Booking System That Works the Way You Do",
  description:
  "Say goodbye to double bookings and missed appointments. Our calendar-based system gives you a bird's eye view of every slot, every stylist, and every day.",
  points: [
  "Drag-and-drop calendar interface",
  "Real-time availability updates",
  "Block personal time and breaks",
  "SMS & WhatsApp booking confirmations"],

  image:
  "https://img.rocket.new/generatedImages/rocket_gen_img_1325820bb-1772951394905.png",
  imageAlt: "Calendar appointment scheduling interface on mobile device showing daily bookings",
  color: "#1F3D2B",
  bg: "rgba(31,61,43,0.08)",
  flip: false
},
{
  id: "crm",
  icon: "UsersIcon",
  label: "Customer CRM",
  title: "Know Every Customer Like a Regular",
  description:
  "Build lasting relationships with a complete customer database. Track visit history, preferred services, spending patterns, and personal notes for every client.",
  points: [
  "Complete visit history per customer",
  "Preferred stylist tracking",
  "Spending analytics per customer",
  "Birthday reminders and loyalty tracking"],

  image:
  "https://img.rocket.new/generatedImages/rocket_gen_img_1fd7b248f-1773310495294.png",
  imageAlt: "Customer profile screen showing visit history, preferences and spending data",
  color: "#C9A44C",
  bg: "rgba(201,164,76,0.1)",
  flip: true
},
{
  id: "staff",
  icon: "UserGroupIcon",
  label: "Staff Scheduling",
  title: "Manage Your Team Without the Headaches",
  description:
  "Assign appointments to specific staff members, track individual performance, and ensure your team's schedule runs like clockwork.",
  points: [
  "Individual staff calendars",
  "Performance metrics per stylist",
  "Commission tracking",
  "Shift management and leave tracking"],

  image:
  "https://img.rocket.new/generatedImages/rocket_gen_img_16d53ca62-1773310491319.png",
  imageAlt: "Staff management screen showing team schedules, assignments and performance metrics",
  color: "#3F6F52",
  bg: "rgba(63,111,82,0.08)",
  flip: false
},
{
  id: "whatsapp",
  icon: "ChatBubbleLeftEllipsisIcon",
  label: "WhatsApp Automation",
  title: "Reminders That Actually Get Read",
  description:
  "WhatsApp messages have 98% open rates. Automatically send appointment reminders, confirmations, and follow-ups without lifting a finger.",
  points: [
  "Automatic 24h and 1h reminders",
  "Booking confirmation messages",
  "Post-visit thank you messages",
  "Customizable message templates"],

  image:
  "https://img.rocket.new/generatedImages/rocket_gen_img_109399d5b-1766258694001.png",
  imageAlt: "WhatsApp reminder automation screen showing scheduled messages and delivery status",
  color: "#1F3D2B",
  bg: "rgba(31,61,43,0.08)",
  flip: true
},
{
  id: "billing",
  icon: "CreditCardIcon",
  label: "Billing System",
  title: "Invoices Done in Seconds, Not Minutes",
  description:
  "Generate professional invoices at checkout, track payment status, and maintain a clear financial record for every service rendered.",
  points: [
  "One-tap invoice generation",
  "Multiple payment method tracking",
  "Outstanding balance alerts",
  "Daily and monthly revenue summaries"],

  image:
  "https://img.rocket.new/generatedImages/rocket_gen_img_1af430d85-1769645745079.png",
  imageAlt: "Billing and invoice screen showing payment tracking and revenue summary for a salon",
  color: "#C9A44C",
  bg: "rgba(201,164,76,0.1)",
  flip: false
},
{
  id: "analytics",
  icon: "ChartBarIcon",
  label: "Business Analytics",
  title: "Understand Your Salon. Grow Your Salon.",
  description:
  "Visual reports that show you exactly where your revenue comes from, which services are most popular, and when your busiest hours are.",
  points: [
  "Daily, weekly, and monthly revenue charts",
  "Top services by revenue and frequency",
  "Peak hour heatmaps",
  "Customer retention rate tracking"],

  image:
  "https://img.rocket.new/generatedImages/rocket_gen_img_16a736270-1773310491416.png",
  imageAlt: "Analytics dashboard showing revenue charts, peak hours and top services for a salon",
  color: "#3F6F52",
  bg: "rgba(63,111,82,0.08)",
  flip: true
}];


function FeatureRow({
  feature,
  index



}: {feature: (typeof features)[0];index: number;}) {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.
            querySelectorAll(".reveal-left, .reveal-right, .reveal-hidden, .reveal-scale").
            forEach((el, i) => {
              setTimeout(() => el.classList.add("revealed"), i * 100);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (rowRef.current) observer.observe(rowRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rowRef}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-16 lg:py-20 border-b border-border last:border-0 ${
      feature.flip ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""}`
      }>
      
      {/* Text */}
      <div
        className={`space-y-6 ${feature.flip ? "reveal-right" : "reveal-left"}`}>
        
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: feature.bg }}>
            
            <Icon
              name={feature.icon as "CalendarDaysIcon"}
              size={20}
              style={{ color: feature.color }} />
            
          </div>
          <p
            className="text-xs font-display font-800 uppercase tracking-widest"
            style={{ color: feature.color }}>
            
            {feature.label}
          </p>
        </div>

        <h2 className="font-display font-800 text-3xl lg:text-4xl text-foreground leading-tight">
          {feature.title}
        </h2>

        <p className="text-muted text-base leading-relaxed">{feature.description}</p>

        <ul className="space-y-3">
          {feature.points.map((point) =>
          <li key={point} className="flex items-start gap-3">
              <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: feature.bg }}>
              
                <Icon
                name="CheckIcon"
                size={11}
                style={{ color: feature.color }} />
              
              </div>
              <span className="text-sm text-foreground leading-relaxed">{point}</span>
            </li>
          )}
        </ul>
      </div>

      {/* Visual */}
      <div
        className={`${feature.flip ? "reveal-left" : "reveal-right"}`}>
        
        <div
          className="rounded-4xl overflow-hidden border border-border shadow-card-hover relative"
          style={{ background: feature.bg }}>
          
          <div className="aspect-[4/3] relative">
            <AppImage
              src={feature.image}
              alt={feature.imageAlt}
              fill
              className="object-cover" />
            
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${feature.color}20 0%, transparent 60%)`
              }} />
            
          </div>

          {/* Feature label overlay */}
          <div
            className="absolute bottom-4 left-4 right-4 glass-card rounded-2xl p-4">
            
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: feature.bg }}>
                
                <Icon
                  name={feature.icon as "CalendarDaysIcon"}
                  size={16}
                  style={{ color: feature.color }} />
                
              </div>
              <div>
                <p className="font-display font-700 text-sm text-foreground">
                  {feature.label}
                </p>
                <p className="text-xs text-muted">Tap to explore</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}

export default function FeaturesList() {
  return (
    <section className="py-8 bg-bg">
      <div className="max-w-container mx-auto px-10 lg:px-16">
        {features.map((feature, i) =>
        <FeatureRow key={feature.id} feature={feature} index={i} />
        )}
      </div>
    </section>);

}