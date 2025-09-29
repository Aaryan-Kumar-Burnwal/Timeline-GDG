"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState } from "react";
import * as React from "react";
import ImageSlider from "./ImageSlider";
import { easeOut } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  GraduationCap,
  ArrowRight,
  X,
} from "lucide-react";
import events from "../data/timeline.json";

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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const modalVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.97, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.28, ease: easeOut },
    },
    exit: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.97,
      y: 10,
      transition: { duration: 0.18 },
    },
  };

  const getYear = (date?: string) => {
    if (!date) return "";
    const m = date.match(/\d{4}/);
    return m ? m[0] : "";
  };

  return (
    <section
      id="timeline"
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#071018]"
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white"
        >
          Our Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-3 text-sm sm:text-base text-white/75 max-w-2xl mx-auto"
        >
          A quick look at our milestones and the events that shaped GDG Ranchi.
        </motion.p>
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
            const metaLeft = idx % 2 === 0; // even => meta left, card right
            const year = getYear(ev.date);

            // ordering for mobile (stack: meta -> center -> card), and for desktop we swap using order classes
            const metaOrderClass = metaLeft
              ? "order-1 md:order-1"
              : "order-1 md:order-3";
            const centerOrderClass = "order-2 md:order-2";
            const cardOrderClass = metaLeft
              ? "order-3 md:order-3"
              : "order-2 md:order-1";

            // alignment classes for metadata content: inner-edge alignment on md+
            const metaContentAlignClass = metaLeft
              ? "md:items-end md:text-right md:ml-25"
              : "md:items-start md:text-left";

            return (
              <motion.div
                key={`${ev.slug}-${idx}`}
                // replaced grid with flex; widths mimic 5/12 - 2/12 - 5/12 layout on md+
                className="flex flex-col md:flex-row items-start gap-4 md:gap-8"
                initial={{ opacity: 0, y: 10, x: metaLeft ? -18 : 18 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.46, delay: idx * 0.04 }}
                viewport={{ once: true, margin: "-120px" }}
              >
                {/* META block */}
                <div
                  className={`w-full md:w-[41.666%] flex flex-col ${
                    metaLeft ? "md:pr-6" : "md:pl-6"
                  } ${metaOrderClass}`}
                >
                  <div
                    className={`w-full md:max-w-[320px] flex flex-col ${metaContentAlignClass}`}
                  >
                    {/* Mobile meta (stacked above card) - left aligned for readability */}
                    <div className="md:hidden mb-3 text-center">
                      <div
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        className="text-xs text-[#22c55e] font-semibold uppercase tracking-wider"
                      >
                        Year
                      </div>
                      <div
                        style={{ fontFamily: "'Playfair Display', serif" }}
                        className="text-2xl sm:text-3xl font-extrabold text-white -mt-1"
                      >
                        {ev.timeline || ev.date}
                      </div>
                      <div
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        className="mt-2 text-sm text-white/75"
                      >
                        <div className="flex items-center gap-2 justify-center">
                          <Calendar className="w-4 h-4 text-[#22c55e]" />
                          {ev.date}
                        </div>
                        {ev.time && (
                          <div className="flex items-center gap-2 justify-center">
                            <Clock className="w-4 h-4 text-white/60" />
                            {ev.time}
                          </div>
                        )}
                        <div className="mt-1 font-semibold">{ev.title}</div>
                        <div className="text-white/60">
                          {ev.location || ev.institute}
                        </div>
                        {/* short about on mobile meta */}
                        <p
                          style={{ fontFamily: "'Poppins', sans-serif" }}
                          className="mt-2 text-sm text-white/70 line-clamp-3"
                        >
                          {ev.about}
                        </p>
                      </div>
                    </div>

                    {/* Desktop meta (aligned to inner edge) */}
                    <div
                      className={`hidden md:flex md:flex-col ${metaContentAlignClass} w-full`}
                    >
                      <div
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        className="text-xs text-[#22c55e] font-semibold uppercase tracking-wide"
                      >
                        Year
                      </div>

                      <div
                        style={{ fontFamily: "'Playfair Display', serif" }}
                        className="text-4xl w-[450px] md:text-5xl font-extrabold text-white -mt-1"
                      >
                        {ev.timeline || ev.date}
                      </div>

                      <div
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        className="mt-4 text-sm text-white/75 space-y-1 max-w-[260px]"
                      >
                        {/* DATE */}
                        <div
                          className={`flex items-center gap-2 ${
                            metaLeft
                              ? "md:justify-end md:text-right"
                              : "md:justify-start md:text-left"
                          }`}
                        >
                          <Calendar className="w-4 h-4 text-[#22c55e]" />
                          <span>{ev.date}</span>
                        </div>

                        {/* TIME */}
                        {ev.time && (
                          <div
                            className={`flex items-center gap-2 ${
                              metaLeft
                                ? "md:justify-end md:text-right"
                                : "md:justify-start md:text-left"
                            }`}
                          >
                            <Clock className="w-4 h-4 text-white/60" />
                            <span>{ev.time}</span>
                          </div>
                        )}

                        <div className="mt-2 font-semibold text-white">
                          {ev.title}
                        </div>
                        <div className="text-white/60">
                          {ev.location || ev.institute}
                        </div>

                        {/* ABOUT excerpt aligned exactly with title/date/time */}
                        {/* <div className="w-fit h-[150px] p-2 scroll-auto border-2 rounded-xl">
                          <p
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                            className="mt-3 h-[100px] text-sm text-white/70 line-clamp-3 max-w-[260px] text-center"
                          >
                            {ev.about}
                          </p>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* CENTER column (dot + connector) */}
                <div
                  className={`w-full md:w-[16.666%] flex justify-center items-start ${centerOrderClass} relative`}
                >
                  <div className="relative z-30 mt-3 md:mt-6 ">
                    <div className="w-4 h-4 rounded-full bg-white border-2 border-[#16a34a]" />
                  </div>

                  {/* small connector to the card (only md) */}
                  <div
                    aria-hidden
                    className={`hidden md:block absolute top-14 w-full ${
                      metaLeft ? "right-1/2 translate-x-1/2" : "left-1/2 "
                    }`}
                  >
                    <div
                      className="w-[50%] "
                      style={{
                        height: 4,
                        background:
                          "linear-gradient(90deg,#16a34a,#22c55e) w-full",
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </div>

                {/* CARD block (no date/time/location inside) */}
                <div
                  className={`w-full md:w-[41.666%] flex ${
                    metaLeft
                      ? "md:justify-start md:pl-6"
                      : "md:justify-end md:pr-6"
                  } ${cardOrderClass}`}
                >
                  <div className="w-full md:max-w-[460px]">
                    <article
                      className="bg-[#0f1720] border border-white/6 rounded-2xl p-5 shadow-2xl hover:-translate-y-2 transition-transform duration-300"
                      aria-labelledby={`event-${idx}-title`}
                    >
                      <header className="flex items-start gap-3 mb-3">
                        <GraduationCap className="w-5 h-5 text-[#22c55e] mt-1" />
                        <h3
                          id={`event-${idx}-title`}
                          className="text-lg md:text-xl font-semibold text-white"
                        >
                          {ev.title}
                        </h3>
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

                      {/* keep about in card too if you want; comment out if you want it ONLY in metadata */}
                      <p
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        className="text-sm text-white/75 mb-4 line-clamp-3"
                      >
                        {ev.about}
                      </p>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setSelectedEvent(ev)}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#22c55e] to-[#10b981] text-black font-medium py-2 px-4 rounded-lg shadow-sm"
                          aria-label={`Read more about ${ev.title}`}
                        >
                          Read More <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </article>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal popup */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
          >
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Modal container */}
            <motion.div
              className="relative z-40 bg-[#0b1220] rounded-2xl shadow-2xl border border-white/10 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="sticky top-4 right-4 ml-auto w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 z-50"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Modal content */}
              <div className="p-6 md:p-8 space-y-6">
                <h3 className="text-4xl font-bold text-white">
                  {selectedEvent.title}
                </h3>

                {/* Meta info */}
                <div className="text-sm text-white/70 space-y-2">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[#22c55e]" />
                    <span>{selectedEvent.date}</span>
                  </div>
                  {selectedEvent.time && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-white/60" />
                      <span>{selectedEvent.time}</span>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-white/60 mt-0.5" />
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>

                {/* About */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    About
                  </h4>
                  <p className="leading-relaxed text-white/80">
                    {selectedEvent.about}
                  </p>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Description
                  </h4>
                  <p className="leading-relaxed text-white/80">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Images */}
                {selectedEvent.images && selectedEvent.images.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedEvent.images.map((s, i) => (
                      <img
                        key={i}
                        src={s}
                        alt={`${selectedEvent.title} ${i + 1}`}
                        className="w-full h-48 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
