"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AnimatedBackground from "@/components/AnimatedBackground";
import { FileIcon } from "lucide-react"; // Import an icon for files (photos and videos)

export default function CreateProjectPage() {
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    description: "",
    categories: "",
    deadline: "",
    budget: "",
    photos: [],
    video: null,
  });

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "photos" && files.length > 0) {
      setProjectDetails((prevDetails) => ({
        ...prevDetails,
        photos: Array.from(files),
      }));
    } else if (id === "video" && files.length > 0) {
      setProjectDetails((prevDetails) => ({
        ...prevDetails,
        video: files[0],
      }));
    } else {
      setProjectDetails((prevDetails) => ({
        ...prevDetails,
        [id]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Project Details:", projectDetails);
    // Call API to save project details
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
        className="bg-white bg-opacity-90 backdrop-blur-lg p-8 rounded-lg shadow-lg z-10 w-full max-w-3xl"
        initial="hidden"
        animate="visible"
        variants={formAnimation}
      >
        <motion.h2
          className="text-3xl font-bold mb-6 text-center text-indigo-800"
          variants={itemAnimation}
        >
          Create a New Project
        </motion.h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemAnimation} className="flex flex-col space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-700"
            >
              Project Title
            </label>
            <Input
              id="title"
              type="text"
              value={projectDetails.title}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </motion.div>

          <motion.div variants={itemAnimation} className="flex flex-col space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Project Description
            </label>
            <textarea
              id="description"
              value={projectDetails.description}
              onChange={handleChange}
              required
              rows="4"
              className="p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </motion.div>

          <motion.div variants={itemAnimation} className="flex flex-col space-y-2">
            <label
              htmlFor="categories"
              className="text-sm font-medium text-gray-700"
            >
              Categories
            </label>
            <Input
              id="categories"
              type="text"
              value={projectDetails.categories}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </motion.div>

          <motion.div variants={itemAnimation} className="flex flex-col space-y-2">
            <label
              htmlFor="deadline"
              className="text-sm font-medium text-gray-700"
            >
              Deadline
            </label>
            <Input
              id="deadline"
              type="date"
              value={projectDetails.deadline}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </motion.div>

          <motion.div variants={itemAnimation} className="flex flex-col space-y-2">
            <label
              htmlFor="budget"
              className="text-sm font-medium text-gray-700"
            >
              Budget
            </label>
            <Input
              id="budget"
              type="number"
              value={projectDetails.budget}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </motion.div>

          <motion.div variants={itemAnimation} className="flex flex-col space-y-2">
            <label
              htmlFor="photos"
              className="text-sm font-medium text-gray-700"
            >
              Project Photos
            </label>
            <input
              id="photos"
              type="file"
              accept="image/*"
              onChange={handleChange}
              multiple
              className="p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {projectDetails.photos.length > 0 && (
              <div className="mt-2 flex space-x-2">
                {projectDetails.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(photo)}
                    alt={`Project Photo ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
          </motion.div>

          <motion.div variants={itemAnimation} className="flex flex-col space-y-2">
            <label
              htmlFor="video"
              className="text-sm font-medium text-gray-700"
            >
              Project Video
            </label>
            <input
              id="video"
              type="file"
              accept="video/*"
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
            {projectDetails.video && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Video Selected: {projectDetails.video.name}</p>
              </div>
            )}
          </motion.div>

          <motion.div variants={itemAnimation} className="col-span-2">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              Create Project
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
