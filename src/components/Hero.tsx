"use client";

import { motion } from "framer-motion";
import { Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-black via-gray-950 to-gray-900">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(66,133,244,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(52,168,83,0.1),transparent_50%)]"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl"
      >
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/images/gdgLogo.png"
            alt="GDG Ranchi"
            width={90}
            height={60}
            className="mx-auto drop-shadow-sm"
          />
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
          Google Developer Group
          <span className="block text-blue-400 mt-2">Ranchi</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light max-w-2xl mx-auto leading-relaxed">
          Jharkhand's premier tech community for developers, innovators, and
          learners
        </p>

        {/* CTA Button */}
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold 
          rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 mb-12"
        >
          Join Our Community
          <span className="text-lg">→</span>
        </motion.button>

        {/* Social Links */}
        <div className="flex justify-center gap-8">
          <motion.a
            href="https://x.com/gdgrnc"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            className="p-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 
            text-gray-400 hover:text-white group"
          >
            <Twitter
              size={24}
              className="group-hover:scale-110 transition-transform duration-200"
            />
          </motion.a>

          <motion.a
            href="https://www.instagram.com/gdgranchi/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            className="p-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 
            text-gray-400 hover:text-[#E4405F] group"
          >
            <Instagram
              size={24}
              className="group-hover:scale-110 transition-transform duration-200"
            />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/company/gdgrnc/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            className="p-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 
            text-gray-400 hover:text-[#0A66C2] group"
          >
            <Linkedin
              size={24}
              className="group-hover:scale-110 transition-transform duration-200"
            />
          </motion.a>

          <motion.a
            href="https://www.youtube.com/@GDGRanchi"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            className="p-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 
            text-gray-400 hover:text-[#FF0000] group"
          >
            <Youtube
              size={24}
              className="group-hover:scale-110 transition-transform duration-200"
            />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
