"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/AnimatedBackground";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    

    try {
      if (!email || !password) {
        throw new Error("Please fill in all fields");
      }
    
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.ok) {
        router.push("/success");
        router.refresh();
      }
    } catch (error) {
      setError(error.message);
      router.push("/error");
        router.refresh();
    } finally {
      setLoading(false);
    }
  };

  const formAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <AnimatedBackground />
      <motion.div
        className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg z-10 w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={formAnimation}
      >
        <motion.h2
          className="text-3xl font-bold mb-6 text-center text-indigo-800"
          variants={itemAnimation}
        >
          Login to CommunityImpact
        </motion.h2>
        <form  className="space-y-4">
          <motion.div variants={itemAnimation}>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <Input
              id="username"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </motion.div>
          <motion.div variants={itemAnimation}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </motion.div>
          
            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Log In
            </Button>
          
        </form>
        <motion.p
          className="mt-4 text-center text-sm text-gray-600"
          variants={itemAnimation}
        >
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-300"
          >
            Sign up
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
