"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const title = "Google Developer Groups Ranchi";

  return (
    <section
      className="relative min-h-[110vh] flex flex-col justify-center items-center text-center
  animate-gradient bg-[radial-gradient(circle_at_top_left,#4285F4,transparent_30%),radial-gradient(circle_at_bottom_right,#EA4335,transparent_30%)]
  bg-gradient-to-r from-[#34A853] via-[#FBBC05] to-[#EA4335] bg-[length:200%_200%] bg-[position:0%_50%] overflow-hidden"
    >
      {/* Hero Background Image */}
      <div className="absolute inset-0 -z-10 mt-20 overflow-hidden">
        <Image
          src="/images/hero-img.png"
          alt="GDG Ranchi Hero"
          layout="fill"
          objectFit="cover  "
          className="opacity-80 border-2 border-black"
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/0 via-black/20 to-black/0" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-white max-w-4xl px-4 sm:px-6"
      >
        {/* Logo */}
        <Image
          src="/images/gdgLogo.png"
          alt="GDG Ranchi"
          width={100}
          height={70}
          className="p-1 mx-auto mb-6 shadow-xl"
        />

        {/* Animated Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex flex-wrap justify-center gap-1">
          {/* Wrap all characters in a single element that carries the gradient
so the gradient flows across the whole title (not repeated per char).
*/}
          <span
            className="bg-clip-text text-transparent"
            style={{
              // Google theme: red, yellow, blue, green
              background:
                "linear-gradient(90deg, #DB4437 0%, #F4B400 33%, #4285F4 66%, #0F9D58 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: i * 0.08,
                  type: "spring",
                  stiffness: 300,
                  damping: 12,
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl mb-6 px-2 sm:px-0">
          Jharkhand • Building a community of developers, innovators, and
          learners.
        </p>

        {/* CTA Button */}
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold 
      rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 mb-12 text-sm sm:text-base"
        >
          Join Our Community
          <span className="text-lg sm:text-xl">→</span>
        </motion.button>

        {/* Social Links */}
        <div className="flex justify-center gap-6 sm:gap-8 flex-wrap">
          {/* Add your social icons here */}
        </div>
      </motion.div>
    </section>
  );
}
