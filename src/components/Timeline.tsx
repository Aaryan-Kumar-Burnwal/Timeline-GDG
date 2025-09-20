"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useCallback, useMemo } from "react";
import * as React from "react";
import ImageSlider from "./ImageSlider";
import {
  Calendar,
  Clock,
  MapPin,
  GraduationCap,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import events from "../data/timeline.json";

type Event = {
  title: string;
  about: string;
  description: string;
  date: string;
  time?: string;
  location: string;
  institute: string;
  slug: string;
  images?: string[];
};

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Optimized animation variants
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.95,
      y: shouldReduceMotion ? 0 : -20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.95,
      y: shouldReduceMotion ? 0 : 20,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.2,
      },
    },
  };

  const cardHoverVariants = {
    hover: shouldReduceMotion
      ? {}
      : {
          scale: 1.02,
          transition: {
            duration: 0.2,
            ease: "easeOut",
          },
        },
  };

  return (
    <section
      id="timeline"
      className="relative py-20 px-6 bg-gradient-to-b from-[#4285F4] via-[#34A853] via-[#FBBC05] to-[#EA4335] overflow-hidden"
    >
      <div className="container mx-auto text-center mb-20 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.6 }}
          className="text-5xl font-bold text-white mb-6 drop-shadow-lg"
        >
          Our Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.1 : 0.6,
            delay: shouldReduceMotion ? 0 : 0.1,
          }}
          className="text-white/90 max-w-2xl mx-auto text-lg leading-relaxed"
        >
          A quick look at our milestones and the events that shaped GDG Ranchi.
        </motion.p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Simplified Vertical Line */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-white via-yellow-200 to-red-200 h-full"
          initial={{ scaleY: shouldReduceMotion ? 1 : 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 1, ease: "easeOut" }}
          style={{ transformOrigin: "top" }}
        />

        <div className="space-y-32">
          {(events as Event[]).map((event, index) => (
            <motion.div
              key={`${event.slug}-${index}`}
              initial={{
                opacity: 0,
                x: shouldReduceMotion ? 0 : index % 2 === 0 ? -60 : 60,
              }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0.1 : 0.5,
                ease: "easeOut",
                delay: shouldReduceMotion ? 0 : index * 0.05,
              }}
              viewport={{ once: true, margin: "-50px" }}
              className={`relative flex w-full ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              {/* Simplified Timeline Dot */}
              <motion.div
                className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10"
                initial={{ scale: shouldReduceMotion ? 1 : 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  delay: shouldReduceMotion ? 0 : index * 0.05 + 0.2,
                  duration: shouldReduceMotion ? 0 : 0.3,
                  ease: "easeOut",
                }}
              >
                <div className="w-6 h-6 bg-white border-4 border-[#4285F4] rounded-full shadow-lg"></div>
              </motion.div>

              {/* Optimized Event Card */}
              <motion.div
                variants={cardHoverVariants}
                whileHover="hover"
                className={`bg-white/95 shadow-xl rounded-2xl p-8 w-full pt-24 md:pt-8 md:w-5/12 transition-all duration-300 relative overflow-hidden cursor-pointer group ${
                  index % 2 === 0 ? "mr-auto text-left" : "ml-auto text-right"
                } border border-white/20`}
                style={{
                  willChange: shouldReduceMotion ? "auto" : "transform",
                }}
              >
                <div className="relative z-10">
                  {/* Event Title */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="mt-1">
                      <GraduationCap className="w-6 h-6 text-[#4285F4]" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-[#4285F4] transition-colors duration-200">
                      {event.title}
                    </h3>
                  </div>

                  {/* Event Meta Info */}
                  <div className="mb-6 space-y-2">
                    <div className="flex items-center gap-2 text-[#4285F4] font-semibold">
                      <Calendar className="w-4 h-4" />
                      <span className="text-lg">{event.date}</span>
                    </div>
                    {event.time && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                    )}
                    <div className="flex items-start gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">
                        {event.institute}
                      </span>
                    </div>
                  </div>

                  {/* Image Slider */}
                  <ImageSlider
                    images={event.images || []}
                    alt={event.title}
                    className="mb-4"
                    showControls={true}
                    showDots={true}
                    showCounter={true}
                  />

                  {/* Simplified CTA Button */}
                  <motion.button
                    onClick={() => setSelectedEvent(event)}
                    className="w-full mt-4 bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                    {/* Removed infinite animation */}
                  </motion.button>
                </div>

                {/* Subtle Background Elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent rounded-full opacity-30 -translate-y-12 translate-x-12" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Optimized Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.1 : 0.2 }}
            onClick={() => setSelectedEvent(null)}
          >
            <div className="absolute inset-0 bg-black/70" />

            <motion.div
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              {/* Modal Content */}
              <div className="mb-8 pr-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  {selectedEvent.title}
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[#4285F4] font-medium">
                    <Calendar className="w-5 h-5" />
                    <span>{selectedEvent.date}</span>
                  </div>
                  {selectedEvent.time && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <Clock className="w-5 h-5" />
                      <span>{selectedEvent.time}</span>
                    </div>
                  )}
                  <div className="flex items-start gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">
                      {selectedEvent.location}
                    </span>
                  </div>
                  {selectedEvent.institute && (
                    <div className="flex items-center gap-3 text-gray-600">
                      <GraduationCap className="w-5 h-5" />
                      <span>{selectedEvent.institute}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#4285F4] to-[#34A853] rounded" />
                    About
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedEvent.about}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#34A853] to-[#FBBC05] rounded" />
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedEvent.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
