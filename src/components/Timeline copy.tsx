"use client";

import * as React from "react";
import { useRef, useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import { Calendar, Clock, MapPin, GraduationCap, ArrowRight, X } from "lucide-react";
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

  const getYear = (date?: string) => {
    if (!date) return "";
    const m = date.match(/\d{4}/);
    return m ? m[0] : "";
  };

  useEffect(() => {
    const sections = timelineRef.current?.querySelectorAll(".timeline-event");
    if (!sections) return;

    sections.forEach((section) => {
      const meta = section.querySelector(".meta") as HTMLElement;
      const card = section.querySelector(".card") as HTMLElement;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      });

      // Step 1: Meta small fade in
      tl.fromTo(meta, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 0.7, duration: 0.5 });

      // Step 2: Meta enlarge
      tl.to(meta, { scale: 1, duration: 0.5 });

      // Step 3: Card (image) small slide up
      tl.fromTo(card, { opacity: 0, y: 50, scale: 0.7 }, { opacity: 1, y: 0, scale: 0.7, duration: 0.5 });

      // Step 4: Card enlarge
      tl.to(card, { scale: 1, duration: 0.5 });
    });
  }, []);

  return (
    <section
      ref={timelineRef}
      id="timeline"
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

      <div className="max-w-6xl mx-auto relative">
        {/* Center vertical line (visible md+) */}
        <div
          aria-hidden
          className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 h-full w-[4px] rounded"
          style={{
            background: "linear-gradient(180deg,#22c55e,#16a34a)",
            boxShadow: "0 0 0 1px rgba(16,185,129,0.06)",
          }}
        />

        <div className="flex flex-col gap-y-16">
          {(events as Event[]).map((ev, idx) => {
            const metaLeft = idx % 2 === 0;
            const year = getYear(ev.date);

            const metaOrderClass = metaLeft ? "order-1 md:order-1" : "order-1 md:order-3";
            const centerOrderClass = "order-2 md:order-2";
            const cardOrderClass = metaLeft ? "order-3 md:order-3" : "order-2 md:order-1";

            const metaContentAlignClass = metaLeft
              ? "md:items-end md:text-right md:ml-25"
              : "md:items-start md:text-left";

            return (
              <div
                key={`${ev.slug}-${idx}`}
                className="timeline-event flex flex-col md:flex-row items-start gap-4 md:gap-8"
              >
                {/* META block */}
                <div
                  className={`meta w-full md:w-[41.666%] flex flex-col ${metaLeft ? "md:pr-6" : "md:pl-6"} ${metaOrderClass}`}
                >
                  <div className={`w-full md:max-w-[320px] flex flex-col ${metaContentAlignClass}`}>
                    {/* Desktop meta */}
                    <div className={`hidden md:flex md:flex-col ${metaContentAlignClass} w-full`}>
                      <div className="text-xs text-[#22c55e] font-semibold uppercase tracking-wide">
                        Year
                      </div>
                      <div className="text-4xl md:text-5xl font-extrabold text-white -mt-1">
                        {ev.timeline || ev.date}
                      </div>
                      <div className="mt-4 text-sm text-white/75 space-y-1 max-w-[260px]">
                        <div className={`flex items-center gap-2 ${metaLeft ? "md:justify-end md:text-right" : "md:justify-start md:text-left"}`}>
                          <Calendar className="w-4 h-4 text-[#22c55e]" /> <span>{ev.date}</span>
                        </div>
                        {ev.time && (
                          <div className={`flex items-center gap-2 ${metaLeft ? "md:justify-end md:text-right" : "md:justify-start md:text-left"}`}>
                            <Clock className="w-4 h-4 text-white/60" /> <span>{ev.time}</span>
                          </div>
                        )}
                        <div className="mt-2 font-semibold text-white">{ev.title}</div>
                        <div className="text-white/60">{ev.location || ev.institute}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CENTER column (dot + connector) */}
                <div className={`w-full md:w-[16.666%] flex justify-center items-start ${centerOrderClass} relative`}>
                  <div className="relative z-30 mt-3 md:mt-6">
                    <div className="w-4 h-4 rounded-full bg-white border-2 border-[#16a34a]" />
                  </div>
                </div>

                {/* CARD block */}
                <div className={`card w-full md:w-[41.666%] flex ${metaLeft ? "md:justify-start md:pl-6" : "md:justify-end md:pr-6"} ${cardOrderClass}`}>
                  <div className="w-full md:max-w-[460px]">
                    <article className="bg-[#0f1720] border border-white/6 rounded-2xl p-5 shadow-2xl hover:-translate-y-2 transition-transform duration-300">
                      <header className="flex items-start gap-3 mb-3">
                        <GraduationCap className="w-5 h-5 text-[#22c55e] mt-1" />
                        <h3 className="text-lg md:text-xl font-semibold text-white">{ev.title}</h3>
                      </header>

                      <div className="mb-3 overflow-hidden rounded-lg border border-white/6">
                        <ImageSlider
                          images={ev.images || []}
                          alt={ev.title}
                          className="h-[300px] sm:h-[300px] md:h-[300px]"
                          showDots
                          showControls
                          showCounter
                        />
                      </div>

                      <p className="text-sm text-white/75 mb-4 line-clamp-3">{ev.about}</p>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setSelectedEvent(ev)}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#22c55e] to-[#10b981] text-black font-medium py-2 px-4 rounded-lg shadow-sm"
                        >
                          Read More <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-black/70" onClick={() => setSelectedEvent(null)} />
          <div className="relative z-40 bg-[#0b1220] rounded-2xl shadow-2xl border border-white/10 w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-8">
            <button
              onClick={() => setSelectedEvent(null)}
              className="sticky top-4 right-4 ml-auto w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 z-50"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <h3 className="text-4xl font-bold text-white">{selectedEvent.title}</h3>

            <div className="text-sm text-white/70 space-y-2 my-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[#22c55e]" /> <span>{selectedEvent.date}</span>
              </div>
              {selectedEvent.time && (
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-white/60" /> <span>{selectedEvent.time}</span>
                </div>
              )}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-white/60 mt-0.5" /> <span>{selectedEvent.location}</span>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-2">About</h4>
              <p className="leading-relaxed text-white/80">{selectedEvent.about}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Description</h4>
              <p className="leading-relaxed text-white/80">{selectedEvent.description}</p>
            </div>

            {selectedEvent.images && selectedEvent.images.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {selectedEvent.images.map((s, i) => (
                  <img key={i} src={s} alt={`${selectedEvent.title} ${i + 1}`} className="w-full h-48 object-cover rounded" />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
