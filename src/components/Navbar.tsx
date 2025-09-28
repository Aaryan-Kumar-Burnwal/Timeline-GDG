"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Upcoming Events", href: "#timeline" },
    { name: "Contacts", href: "#footer" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-3 left-1/2 -translate-x-1/2 w-[95%] z-50 
bg-[length:200%_200%] bg-[position:0%_50%] animate-gradient 
bg-gradient-to-r from-[#1a237e] via-[#1e88e5] to-[#34a853] 
shadow-md rounded-4xl"
    >
      {/* Overlay for readability */}

      <div className="relative container mx-auto flex justify-between items-center py-4 px-6 z-10 ">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <Image
            src="/images/gdgLogo.png"
            alt="GDG Ranchi"
            width={50}
            height={30}
            className=""
          />
          <span className="text-lg md:text-xl font-bold text-white drop-shadow-md">
            GDG Ranchi
          </span>
        </motion.div>

        {/* Nav Links */}
        <ul className="hidden md:flex gap-10 font-medium text-white">
          {navLinks.map((link, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group relative"
            >
              <Link href={link.href} className="transition-colors duration-300">
                {link.name}
              </Link>
              {/* Animated underline with bright Google accent */}
              <span className="absolute left-0 -bottom-1 w-0 h-[3px] bg-gradient-to-r from-[#ea4335] via-[#fbbc05] to-[#4285f4] transition-all duration-300 group-hover:w-full"></span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
