"use client";

import * as React from "react";
import { useRef, useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import {
  GraduationCap,
  CalendarCheck,
  MapPinCheck,
  BadgeInfo,
} from "lucide-react";
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

  useEffect(() => {
    const sections = timelineRef.current?.querySelectorAll(".timeline-event");
    if (!sections) return;

    sections.forEach((section, idx) => {
      const meta = section.querySelector(".meta") as HTMLElement;
      const card = section.querySelector(".card") as HTMLElement;
      const line = section.querySelector(".connector") as HTMLElement;

      gsap.set(meta, { xPercent: -50, left: "50%", position: "relative" });
      gsap.set(card, { opacity: 0, y: 200 });
      gsap.set(line, { scaleY: 0, transformOrigin: "top center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 40%",
          scrub: 1,
        },
      });

      // Step 1: metadata enters at center
      tl.fromTo(
        meta,
        { opacity: 0, scale: 0.8 },
        { opacity: 0.8, scale: 1.1, duration: 1.2, ease: "power3.out" }
      );

      // Step 2: image enters from bottom
      tl.fromTo(
        card,
        { y: 200, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1.05, duration: 1.2, ease: "power3.out" },
        "+=0.3"
      );

      // Step 3: push metadata left while image takes its spot
      tl.to(
        meta,
        {
          xPercent: 0,
          left: "0%",
          scale: 1,
          duration: 1,
          ease: "power2.inOut",
        },
        "<"
      );

      tl.to(card, { scale: 1, duration: 0.8, ease: "power2.inOut" }, "-=0.2");

      // Step 4: extend connector line AFTER both cards settled
      if (line) {
        tl.to(line, {
          scaleY: 1,
          duration: 1,
          ease: "power2.inOut",
        });
      }
    });
  }, []);

  return (
    <section
      ref={timelineRef}
      className="timeline-bg relative py-16 px-4 sm:px-6 lg:px-8 bg-[#071018]"
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black">
          Our Journey
        </h2>
        <p className="mt-3 text-sm sm:text-base text-black max-w-2xl mx-auto ">
          A quick look at our milestones and the events that shaped GDG Ranchi.
        </p>
      </div>

      {/* Events */}
      <div className="max-w-6xl mx-auto relative flex flex-col gap-y-36">
        {(events as Event[]).map((ev, idx) => (
          <div
            key={ev.slug}
            className="timeline-event relative flex flex-col md:flex-row items-start gap-8"
          >
            {/* Metadata card */}
            <div className="meta w-full md:w-5/12">
              <div className="group relative bg-black p-8 rounded-3xl shadow-2xl hover:shadow-xl text-center md:text-left overflow-hidden">
                <div className="relative z-10">
                  <header className="flex items-center gap-4 mb-4 justify-center md:justify-start">
                    <div className="">
                      <CalendarCheck className="w-7 h-7 text-emerald-400 " />
                    </div>
                    <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                      {ev?.timeline || ev.date}
                    </h3>
                  </header>

                  <p className="text-xl md:text-3xl font-semibold text-white mb-4 leading-tight">
                    {ev.title}
                  </p>

                  <div className="space-y-3 mt-6">
                    <div className="flex items-center gap-2.5 text-white/80 hover:text-white transition-colors group/location justify-center md:justify-start">
                      <div className=" p-2 rounded-lg">
                        <MapPinCheck className="w-5 h-5 text-emerald-400" />
                      </div>
                      <p className="text-base">{ev.location}</p>
                    </div>

                    <div className="flex items-start gap-2.5 text-white/70 justify-center md:justify-start">
                      <BadgeInfo className="text-lg text-blue-300" />
                      <p className="text-sm leading-relaxed flex-1">
                        {ev.about}
                      </p>
                    </div>
                  </div>
                </div>
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

            {/* Connector line (appears AFTER this section animates) */}
            {idx < (events as Event[]).length - 1 && (
              <div className="absolute left-1/2 top-full w-[3px] h-36 bg-gradient-to-b from-green-400 via-blue-500 to-purple-600 transform -translate-x-1/2 connector rounded-full" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
