"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      className="relative text-gray-900 py-8 px-6 
      bg-gradient-to-b from-[#f1f8e9] via-[#e3f2fd] to-[#f8fafc]"
    >
      <div className="relative z-10 text-center">
        {/* Brand */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-bold text-gray-800"
        >
          GDG Ranchi
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-sm text-gray-600 mt-2"
        >
          Building a vibrant developer community in Jharkhand 🚀
        </motion.p>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 text-xs text-gray-500"
        >
          © {new Date().getFullYear()} Google Developer Group Ranchi. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}
