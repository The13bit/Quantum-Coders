"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    function getsession() {
      //if session length is greater than 0, return true

      const session = localStorage.getItem("success");
      console.log(session);
      if (session) {
        setIsAuthenticated(true);
      }
    }
    getsession();
  });

  return (
    <motion.nav
      className="bg-purple-300 bg-opacity-20 backdrop-blur-md py-4 px-6 flex items-center justify-between sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/" className="text-2xl font-bold text-indigo-800 ">
        <Image src="/logo.png" alt="CommunityImpact " className="rounded-full
      border-collapse border-2  p-2"  width={64} height={34} />
      </Link>

      {!isAuthenticated ? (
        <div className="flex space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/login">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                Log In
              </span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/signup">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                Sign Up
              </span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/Name">
              <span className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                Info
              </span>
            </Link>
          </motion.div>
        </div>
      ) : (
        
        <div className="flex space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                Home
              </span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/view_all_projects">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                View
              </span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/Create">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                Create
              </span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/myprojects">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
               My Projects
              </span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/Profile">
              <span className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
               Profile
              </span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link onClick={() => localStorage.removeItem("success")} href="/api/auth/signout">
              <span className="bg-gradient-to-r from-teal-500 to-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
               Sign Out
              </span>
            </Link>
          </motion.div>
        </div>
      )}
    </motion.nav>
  );
}
