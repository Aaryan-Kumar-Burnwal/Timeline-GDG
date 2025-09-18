"use client";

import { motion } from "framer-motion";
import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Hero() {
  const title = "Google Developer Group Ranchi";

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 
      animate-gradient bg-[radial-gradient(circle_at_top_left,#4285F4,transparent_30%),radial-gradient(circle_at_bottom_right,#EA4335,transparent_30%)] 
      bg-gradient-to-r from-[#34A853] via-[#FBBC05] to-[#EA4335] bg-[length:200%_200%] bg-[position:0%_50%]"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-white max-w-3xl"
      >
        {/* Logo */}
        <img
          src="/images/profile.png"
          alt="GDG Ranchi"
          className="w-32 h-32 rounded-full mx-auto mb-6 shadow-xl border-4 border-white"
        />

        {/* Animated Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex flex-wrap justify-center gap-1">
          {title.split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: index * 0.08,
                type: "spring",
                stiffness: 300,
                damping: 12,
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl mb-6">
          Jharkhand • Building a community of developers, innovators, and learners.
        </p>

        {/* CTA Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="inline-block px-6 py-3 rounded-full bg-white text-black font-semibold shadow-lg cursor-pointer"
        >
          Join Our Journey 🚀
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="mt-8 flex justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: title.length * 0.08 + 0.5 }}
        >
          <a
            href="https://x.com/gdgrnc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-125 transition-transform duration-300 text-[#1DA1F2]"
          >
            <FaTwitter size={32} />
          </a>
          <a
            href="https://www.instagram.com/gdgranchi/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-125 transition-transform duration-300 text-[#E4405F]"
          >
            <FaInstagram size={32} />
          </a>
          <a
            href="https://www.linkedin.com/company/gdgrnc/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-125 transition-transform duration-300 text-[#0A66C2]"
          >
            <FaLinkedin size={32} />
          </a>
          <a
            href="https://www.youtube.com/@GDGRanchi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-125 transition-transform duration-300 text-[#FF0000]"
          >
            <FaYoutube size={32} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
