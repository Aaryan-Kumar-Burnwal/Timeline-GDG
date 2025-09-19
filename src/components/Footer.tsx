"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      className="relative text-gray-900 py-8 px-6 
      bg-[length:200%_200%] bg-[position:0%_50%] animate-gradient 
      bg-gradient-to-r from-[#1a237e] via-[#1e88e5] to-[#34a853]"
    >
      <div className="relative z-10 text-center">
        {/* Brand */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-bold text-white drop-shadow-md"
        >
          GDG Ranchi
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-sm text-white/90 mt-2"
        >
          Building a vibrant developer community in Jharkhand 🚀
        </motion.p>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 text-xs text-white/70"
        >
          © {new Date().getFullYear()} Google Developer Group Ranchi. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}
