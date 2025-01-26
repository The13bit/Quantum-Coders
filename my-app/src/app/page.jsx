"use client";

import { motion } from "framer-motion";

import Header from "@/components/Header";
import FeaturedProjects from "@/components/FeaturedProjects";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import DynamicBackground from "@/components/DynamicBackground";
import { useState,useEffect } from "react";
import ParticleBackground from "@/components/particleBackground";


export default function Home() {
  const [topProjects, setTopProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  //fetch top three funded projects thath haven gone past the deadline
  useEffect(() => {
    const fetchTopProjects = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("/api/projects/all");
        const data = await response.json();

        // Filter and sort projects
        const filteredProjects = data
          .filter((project) => new Date(project.deadline) > new Date())
          .sort((a, b) => b.fundedAmount - a.fundedAmount)
          .slice(0, 3);
        // add an etra raised field that is addition of amounts in contibution
        filteredProjects.forEach((project) => {
          project.raised = project.contributions.reduce(
            (total, contribution) => total + contribution.amount,
            0
          );
        });

        setTopProjects(filteredProjects);
        setIsLoading(false);
        console.log(filteredProjects);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchTopProjects();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"
    >
      <ParticleBackground/>
 
      <main className="flex-grow relative z-10">
        <Header />
        <FeaturedProjects
          projects={topProjects}
          isLoading={isLoading}
          error={error}
        />
        <AboutSection />
      </main>
      <Footer />
    </motion.div>
  );
}
