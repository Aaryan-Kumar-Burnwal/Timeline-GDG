"use client";

import * as React from "react";
import { useRef, useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import { GraduationCap } from "lucide-react";
import events from "../data/timeline.json";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Event = {
  title: string;
  about: string;
  description: string;
  date: string;
  time?: string;
  location?: string;
  institute?: string;
  slug: string;
  images?: string[];
  timeline?: string;
};

export default function Timeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    const sections = timelineRef.current?.querySelectorAll(".timeline-event");
    if (!sections) return;

    sections.forEach((section) => {
      const meta = section.querySelector(".meta") as HTMLElement;
      const card = section.querySelector(".card") as HTMLElement;

      gsap.set(meta, { xPercent: -50, left: "50%", position: "relative" });
      gsap.set(card, { opacity: 0, y: 200 });

      // timeline per event
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 40%",
          scrub: true,
          markers: false,
        },
      });

      // Step 1: metadata enters at exact center
      tl.fromTo(
        meta,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1.1, duration: 1, ease: "power2.out" }
      );

      // Step 2: image enters from bottom, metadata still stays center
      tl.fromTo(
        card,
        { y: 200, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1.05,
          duration: 1,
          ease: "power2.out",
        },
        "+=0.4"
      );

      // Step 3: push metadata left while image takes position
      tl.to(
        meta,
        {
          xPercent: 0, // remove center offset
          left: "0%",
          scale: 1,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "<"
      );

      // Step 4: settle image in final position
      tl.to(
        card,
        {
          scale: 1,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=0.3"
      );
    });
  }, []);

  return (
    <section
      ref={timelineRef}
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#071018]"
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
          Our Journey
        </h2>
        <p className="mt-3 text-sm sm:text-base text-white/75 max-w-2xl mx-auto">
          A quick look at our milestones and the events that shaped GDG Ranchi.
        </p>
      </div>

      <div className="max-w-6xl mx-auto relative flex flex-col gap-y-36">
        {(events as Event[]).map((ev) => (
          <div
            key={ev.slug}
            className="timeline-event relative flex flex-col md:flex-row items-start gap-8"
          >
            {/* Metadata card */}
            <div className="meta w-full md:w-5/12">
              <div className="bg-[#0f1720] p-6 rounded-2xl shadow-2xl border border-white/10 text-center md:text-left">
                <header className="flex items-center gap-3 mb-3 justify-center md:justify-start">
                  <GraduationCap className="w-5 h-5 text-[#22c55e]" />
                  <h3 className="text-lg md:text-xl font-semibold text-white">
                    {ev.title}
                  </h3>
                </header>
                <p className="text-sm text-white/75">{ev.about}</p>
              </div>
            </div>

            {/* Image card */}
            <div className="card w-full md:w-7/12">
              <div className="bg-[#0f1720] border border-white/6 rounded-2xl p-5 shadow-2xl">
                <ImageSlider
                  images={ev.images || []}
                  alt={ev.title}
                  className="h-[300px] sm:h-[300px] md:h-[300px]"
                  showDots
                  showControls
                  showCounter
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
