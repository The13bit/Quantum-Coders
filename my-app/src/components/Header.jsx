"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"



export default function Header() {
  return (
    <header className="bg-gradient-to-br from-primary-100 to-secondary-100 py-20 px-6 text-center relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            "radial-gradient(circle, rgba(238,174,202,0.5) 0%, rgba(148,187,233,0.5) 100%)",
            "radial-gradient(circle, rgba(238,174,202,0.5) 100%, rgba(148,187,233,0.5) 0%)",
          ],
        }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />
      <div className="relative z-10">
        <motion.h1
          className="text-5xl font-bold mb-6 text-primary-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
        </motion.h1>
        <motion.p
          className="text-2xl text-secondary-700 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Explore impactful projects in your community. See how you can make a difference today!
        </motion.p>
      </div>
    </header>
  )
}

