"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

// const projects = [
//   {
//     title: "Neighborhood Cleanup",
//     description: "Join us in cleaning up local parks and streets to create a cleaner, safer environment for all.",
//     raised: 7500,
//     goal: 10000,
//     image: "/placeholder.svg?height=300&width=400",
//   },
//   {
//     title: "Youth Mentorship Program",
//     description:
//       "Support our initiative to pair experienced mentors with at-risk youth, fostering personal growth and community engagement.",
//     raised: 15000,
//     goal: 25000,
//     image: "/placeholder.svg?height=300&width=400",
//   },
//   {
//     title: "Community Garden",
//     description:
//       "Help us transform vacant lots into thriving community gardens, promoting sustainable living and food security.",
//     raised: 5000,
//     goal: 12000,
//     image: "/placeholder.svg?height=300&width=400",
//   },
// ]

export default function FeaturedProjects({ projects, isLoading, error }) {
  if (isLoading) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-indigo-800">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(
            (project, index) => (
              console.log(project),
              (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    y: -10,
                    boxShadow:
                      "0 20px 25px -5px rgba(79, 70, 229, 0.1), 0 10px 10px -5px rgba(79, 70, 229, 0.04)",
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={project.mediaUrls[0]}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-indigo-700">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="mb-4">
                      <Progress
                        value={(project.raised / project.fundingGoal) * 100}
                        className="h-2 bg-indigo-100"
                      />
                      <p className="text-sm text-gray-600 mt-2">
                        ${project.raised.toLocaleString()} raised of $
                        {project.fundingGoal.toLocaleString()} goal
                      </p>
                    </div>
                    <Link href={`/projects/${project._id}`}>
                      <motion.button
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-md font-semibold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Contribute Now
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              )
            )
          )}
        </div>
      </div>
    </section>
  );
}
