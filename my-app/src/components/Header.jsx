"use client";
import HomePage from "@/app/view_all_projects/page";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [showHomePage, setShowHomePage] = useState(false);

  const handleGetStarted = () => {
    setShowHomePage(true); // Update state to show HomePage
  };

  if (showHomePage) {
    return <HomePage />; // Render HomePage when "Get Started" is clicked
  }

  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/placeholder.svg?height=1080&width=1920"
        alt="Community collaboration"
        layout="fill"
        objectFit="cover"
        className="absolute z-0"
      />
      {/* bg-gradient-to-br from-indigo-900 to-purple-900 */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 opacity-70 z-10"></div> */}
      <motion.div
        className="text-center relative z-20 max-w-4xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Make a Difference Today
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-indigo-200 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Join our community of changemakers and create lasting impact in your local area.
        </motion.p>
        <motion.button
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(236, 72, 153, 0.5)" }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </header>
  );
}
