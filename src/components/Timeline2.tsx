"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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

// Image Slider Component - Dynamic sizing based on image orientation
const ImageSlider = ({
  images,
  eventTitle,
}: {
  images: string[];
  eventTitle: string;
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [imageOrientation, setImageOrientation] = useState<
    "landscape" | "portrait" | "square"
  >("landscape");

  // Use your actual image as placeholder
  const placeholderImages = [
    "/images/IMG_1.jpg",
    "/images/IMG_2.jpg",
    "/images/IMG_1.jpg",
  ];

  const displayImages =
    images && images.length > 0 ? images : placeholderImages;

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + displayImages.length) % displayImages.length
    );
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const { naturalWidth, naturalHeight } = img;

    if (naturalWidth > naturalHeight) {
      setImageOrientation("landscape");
    } else if (naturalHeight > naturalWidth) {
      setImageOrientation("portrait");
    } else {
      setImageOrientation("square");
    }
  };

  // Dynamic height based on orientation
  const getContainerHeight = () => {
    switch (imageOrientation) {
      case "portrait":
        return "h-fit"; // Taller for portrait (like left card in your sketch)
      case "landscape":
        return "h-fit"; // Shorter for landscape (like right card in your sketch)
      case "square":
        return "h-fit"; // Medium for square
      default:
        return "h-fit";
    }
  };

  return (
    <div
      className={`relative w-full ${getContainerHeight()} bg-gray-50 rounded-lg overflow-hidden mb-4 border border-gray-200 transition-all duration-300`}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImage}
          src={displayImages[currentImage]}
          alt={`${eventTitle} - Image ${currentImage + 1}`}
          className="w-full h-full object-contain"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.3 }}
          onLoad={handleImageLoad}
          onError={(e) => {
            e.currentTarget.src = "/images/IMG_1.jpg";
          }}
        />
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {displayImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
              currentImage === index ? "bg-blue-600" : "bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows - Only show if more than 1 image */}
      {displayImages.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            ←
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
          >
            →
          </button>
        </>
      )}

      {/* Image counter */}
      <div className="absolute top-2 right-2">
        <div className="bg-black/40 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
          {currentImage + 1} / {displayImages.length}
        </div>
      </div>
    </div>
  );
};

export default function Timeline2() {
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
                className={`bg-white shadow-xl rounded-2xl p-6 w-full pt-20 md:pt-6 md:w-5/12 hover:scale-105 transition-transform duration-300 relative overflow-hidden cursor-pointer ${
                  index % 2 === 0 ? "mr-auto text-left" : "ml-auto text-right"
                }`}
              >
                {/* Rotating lights border */}
                <span className="absolute -inset-1 rounded-2xl border-4 border-transparent animate-rotateLights pointer-events-none"></span>

                {/* Event Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {event.title}
                </h3>

                {/* Event Date */}
                <div className="mb-4">
                  <p className="text-lg font-semibold text-blue-600">
                    {event.date}
                  </p>
                  {event.time && (
                    <p className="text-sm text-gray-600 mt-1">{event.time}</p>
                  )}
                </div>

                {/* Image Slider - Now dynamically sized! */}
                <ImageSlider
                  images={event.images || []}
                  eventTitle={event.title}
                />

                {/* Click to read more indicator */}
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="text-blue-600 font-medium text-sm flex items-center justify-center"
                >
                  Click to read more →
                </button>
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
                  {selectedEvent.time && (
                    <p className="text-gray-600">⏰ {selectedEvent.time}</p>
                  )}
                  <p className="text-gray-600">📍 {selectedEvent.location}</p>
                  {selectedEvent.institute && (
                    <p className="text-gray-600">
                      🏫 {selectedEvent.institute}
                    </p>
                  )}
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

      {/* Add this to your global CSS or tailwind.config.js */}
      {/* <style jsx global>{`
        @keyframes rotateLights {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-rotateLights {
          pointer-events: none;
          position: absolute;
          inset: -4px;
          border-radius: 16px;
          border: 4px solid transparent;
          padding: 4px;
          background: conic-gradient(#fbbf24, #f43f5e, #10b981, #3b82f6, #fbbf24, #f43f5e);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          animation: rotateLights 4s linear infinite;
        }
      `}</style> */}
    </section>
  );
}
