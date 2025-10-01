"use client";

import * as React from "react";
import { useRef, useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import { GraduationCap, ArrowRight, X } from "lucide-react";
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

      // Step 1: metadata slide in from left
      gsap.from(meta, {
        x: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 60%",
          scrub: false,
        },
      });

      // Step 2: image card slide up from bottom
      gsap.from(card, {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "top 40%",
          scrub: false,
        },
      });
    });
  }, []);

  return (
    <section ref={timelineRef} className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#071018]">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
          Our Journey
        </h2>
        <p className="mt-3 text-sm sm:text-base text-white/75 max-w-2xl mx-auto">
          A quick look at our milestones and the events that shaped GDG Ranchi.
        </p>
      </div>

      <div className="max-w-6xl mx-auto relative flex flex-col gap-y-16">
        {(events as Event[]).map((ev, idx) => {
          const metaLeft = true; // metadata always left
          return (
            <div
              key={ev.slug}
              className="timeline-event flex flex-col md:flex-row items-start gap-8"
            >
              {/* Metadata card */}
              <div className="meta w-full md:w-5/12">
                <div className="bg-[#0f1720] p-5 rounded-2xl shadow-2xl border border-white/10">
                  <header className="flex items-center gap-3 mb-3">
                    <GraduationCap className="w-5 h-5 text-[#22c55e]" />
                    <h3 className="text-lg md:text-xl font-semibold text-white">{ev.title}</h3>
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
          );
        })}
      </div>
    </section>
  );
}
