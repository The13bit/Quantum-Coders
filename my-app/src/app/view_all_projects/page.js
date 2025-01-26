
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const projectsPerPage = 6;
  const getHoursLeft = (deadlineDate) => {
    const now = new Date();
    const deadline = new Date(deadlineDate);
    const diffInMs = deadline - now;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    return diffInHours > 0 ? diffInHours : 0;
  };

  const fetchProjects = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/projects/all`);
      const newProjects = await res.json();

      newProjects.forEach((project) => {
        project.raised = project.contributions.reduce(
          (total, contribution) => total + contribution.amount,
          0
        );
      });
      if (newProjects.length < projectsPerPage) {
        setHasMore(false);
      }

      setProjects((prev) => {
        const uniqueProjects = [...prev, ...newProjects].filter(
          (project, index, self) =>
            index === self.findIndex((p) => p._id === project._id)
        );
        return uniqueProjects;
      });
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= documentHeight - 100 && !loading && hasMore) {
        fetchProjects();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const fadeInAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <AnimatedBackground />
     
      <motion.div
        className="relative z-10 max-w-7xl mx-auto py-8 px-4"
        initial="hidden"
        animate="visible"
        variants={fadeInAnimation}
      >
        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
          Explore Community Projects
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={`${project._id}-${project.title}`}
              variants={fadeInAnimation}
              className="transition-transform transform hover:scale-105"
            >
              <Link href={`/projects/${project._id}`}>
                <ProjectCard
                  projectImage={project?.mediaUrls[0] || "https://placehold.co/600x400"}
                  profileImage={
                    project.creator?.avatar || "https://placehold.co/600x400"
                  }
                  title={project.title || "Untitled Project"}
                  username={project.creator?.name || "Anonymous"}
                  timeLeft={Math.ceil(getHoursLeft(project.deadline) / 24)}
                  fundingPercent={
                    (project.raised / project.fundingGoal) * 100 || 0
                  }
                  description={
                    project.description || "No description available"
                  }
                  categories={project.categories || []}
                />
              </Link>
            </motion.div>
          ))}
        </div>
        {loading && (
          <div className="text-center py-4">
            <motion.div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              variants={fadeInAnimation}
            >
              <span className="sr-only">Loading...</span>
            </motion.div>
          </div>
        )}
        {!hasMore && projects.length > 0 && (
          <motion.div
            className="text-center py-4 text-gray-600"
            variants={fadeInAnimation}
          >
            No more projects to load
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

