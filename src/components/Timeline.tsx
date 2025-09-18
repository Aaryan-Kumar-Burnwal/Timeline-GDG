"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Generate 25 events dynamically
const events = Array.from({ length: 25 }, (_, i) => ({
  year: 2019 + (i % 6),
  title: `Event ${i + 1}`,
  description: `This is the description for event ${i + 1}.`,
  image: `/images/event${(i % 6) + 1}.jpg`,
  link: "#",
}));

export default function Timeline() {
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
          {events.map((event, index) => (
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
              <Link
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-white shadow-xl rounded-2xl p-6 w-full md:w-5/12 hover:scale-105 transition-transform duration-300 relative overflow-hidden ${
                  index % 2 === 0 ? "mr-auto text-left" : "ml-auto text-right"
                }`}
              >
                {/* Rotating lights border */}
                <span className="absolute -inset-1 rounded-2xl border-4 border-transparent animate-rotateLights pointer-events-none"></span>

                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className="text-2xl font-bold text-gray-900">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600">{event.year}</p>
                <p className="mt-2 text-gray-700">{event.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CSS for rotating border */}
      <style jsx>{`
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
          background: conic-gradient(
            #fbbf24,
            #f43f5e,
            #10b981,
            #3b82f6,
            #fbbf24,
            #f43f5e
          );
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          animation: rotateLights 4s linear infinite;
        }
      `}</style>
    </section>
  );
}
