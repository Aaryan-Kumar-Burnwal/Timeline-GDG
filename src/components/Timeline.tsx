"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import events from "../data/timeline.json";

type Event = {
  title: string;
  about: string;
  description: string;
  date: string;
  location: string;
};

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -100,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 100,
      transition: {
        duration: 0.2,
      },
    },
  };

  const backdropVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section
      id="timeline"
      className="relative py-20 px-6 bg-gradient-to-b from-[#4285F4] via-[#34A853] via-[#FBBC05] to-[#EA4335]"
    >
      <div className="container mx-auto text-center mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-white mb-4 drop-shadow-lg"
        >
          Our Journey
        </motion.h2>
        <p className="text-white/90 max-w-2xl mx-auto">
          A quick look at our milestones and the events that shaped GDG Ranchi.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-white via-yellow-200 to-red-200 h-full"></div>

        <div className="space-y-24">
          {(events as Event[]).map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -120 : 120 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`relative flex w-full ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              {/* Dot */}
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-8 h-8 bg-white border-4 border-[#4285F4] rounded-full"></div>
              </div>

              {/* Event Card with rotating lights border */}
              <div
                onClick={() => setSelectedEvent(event)}
                className={`bg-white shadow-xl rounded-2xl p-6 w-full md:w-5/12 hover:scale-105 transition-transform duration-300 relative overflow-hidden cursor-pointer ${
                  index % 2 === 0 ? "mr-auto text-left" : "ml-auto text-right"
                }`}
              >
                {/* Rotating lights border */}
                <span className="absolute -inset-1 rounded-2xl border-4 border-transparent animate-rotateLights pointer-events-none"></span>

                <h3 className="text-2xl font-bold text-gray-900">
                  {event.title}
                </h3>
                <p className="text-base text-gray-700 mt-2 line-clamp-3">
                  {event.about}
                </p>
                <p className="text-sm text-gray-600 mt-2">{event.date}</p>
                <p className="text-xs text-gray-500 mt-1">{event.location}</p>

                {/* Click to read more indicator */}
                <p className="text-blue-600 font-medium mt-3 text-sm">
                  Click to read more →
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelectedEvent(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Modal Header */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {selectedEvent.title}
                </h2>
                <div className="space-y-2">
                  <p className="text-blue-600 font-medium">
                    📅 {selectedEvent.date}
                  </p>
                  <p className="text-gray-600">📍 {selectedEvent.location}</p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    About
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedEvent.about}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
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

      {/* CSS for rotating border */}
      {/* <style jsx>{`
        @keyframes rotateLights {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-rotateLights {
          pointer-events: none;
          position: absolute;
          inset: -4px;
          border-radius: 16px;
          border: 4px solid transparent;
          padding: 4px;
          background: conic-gradient(
            #fbbf24,
            #f43f5e,
            #10b981,
            #3b82f6,
            #fbbf24,
            #f43f5e
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          animation: rotateLights 4s linear infinite;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style> */}
    </section>
  );
}
