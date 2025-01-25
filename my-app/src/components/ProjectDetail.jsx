"use client";
import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FundingProgress } from "./FundingProgress"
import { ContributionOverTime } from "./ContributionOverTime"
import { ChevronLeft, ChevronRight } from "lucide-react"

function ProjectDetail({
  title = "Untitled Project",
  media = [],
  budget = 0,
  funded = 0,
  contributors = 0,
  hoursLeft = 0,
  description = "",
  faq = [],
  updates = "",
  comments = [],
}) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("Description")
  const progress = budget > 0 ? (funded / budget) * 100 : 0

  const handlePrev = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex === 0 ? media.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex === media.length - 1 ? 0 : prevIndex + 1))
  }

  const renderContent = () => {
    switch (activeTab) {
      case "Description":
        return (
          (<motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}>
            <h2 className="text-2xl font-semibold mb-4">About this project</h2>
            <p className="text-gray-700">{description}</p>
          </motion.section>)
        );
      case "FAQ":
        return (
          (<motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}>
            <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
            <ul className="space-y-6">
              {faq.map((item, index) => (
                <li key={index} className="text-gray-700">
                  <p className="font-medium text-lg mb-2">{item.question}</p>
                  <p className="text-gray-600">{item.answer}</p>
                </li>
              ))}
            </ul>
          </motion.section>)
        );
      case "Updates":
        return (
          (<motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}>
            <h2 className="text-2xl font-semibold mb-4">Project Updates</h2>
            <p className="text-gray-700">{updates}</p>
          </motion.section>)
        );
      case "Comments":
        return (
          (<motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}>
            <h2 className="text-2xl font-semibold mb-4">Backer Comments</h2>
            <div className="space-y-6">
              {comments.map((comment, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm border"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}>
                  <p className="text-gray-800">{comment}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>)
        );
      default:
        return null
    }
  }

  return (
    (<div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div
        className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="lg:flex">
          {/* Media Carousel Section */}
          <div className="lg:w-2/3 p-8">
            <motion.div
              className="relative h-[400px] rounded-xl overflow-hidden shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}>
              {media && media.length > 0 ? (
                <AnimatePresence initial={false}>
                  <motion.div
                    key={currentMediaIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0">
                    {media[currentMediaIndex].type === "image" ? (
                      <img
                        src={media[currentMediaIndex].url || "/placeholder.svg"}
                        alt="Project Media"
                        className="object-cover w-full h-full" />
                    ) : (
                      <video controls className="w-full h-full object-cover">
                        <source src={media[currentMediaIndex].url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-200">
                  <p className="text-gray-500">No media available for this project.</p>
                </div>
              )}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
                <ChevronRight size={24} />
              </button>
            </motion.div>
            <div className="mt-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
              <p className="text-xl text-gray-700 mb-6">{description.slice(0, 150)}...</p>
              <ContributionOverTime
                data={[
                  { date: "2023-01-01", amount: 0 },
                  { date: "2023-01-15", amount: 15000 },
                  { date: "2023-02-01", amount: 30000 },
                  { date: "2023-02-15", amount: 45000 },
                  { date: "2023-03-01", amount: 60000 },
                  { date: "2023-03-15", amount: 75000 },
                ]} />
            </div>
          </div>

          {/* Project Details and Funding Section */}
          <div className="lg:w-1/3 bg-gray-50 p-8">
            <FundingProgress
              currentFunds={funded}
              goal={budget}
              daysRemaining={Math.ceil(hoursLeft / 24)} />
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}>
              <p className="text-lg font-semibold text-gray-700 mb-2">{contributors} backers</p>
              <p className="text-lg font-semibold text-gray-700 mb-6">{Math.ceil(hoursLeft / 24)} days to go</p>
              <button
                className="w-full bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-300 mb-4">
                Back this project
              </button>
              <button
                className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-gray-300 transition duration-300">
                Remind me
              </button>
            </motion.div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-t border-gray-200 mt-12">
          <div className="flex">
            {["Description", "FAQ", "Updates", "Comments"].map((tab) => (
              <button
                key={tab}
                className={`flex-1 text-center p-4 font-medium ${
                  activeTab === tab ? "border-b-2 border-green-500 text-green-500" : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}>
                {tab}
              </button>
            ))}
          </div>
          <div className="p-8">
            <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
          </div>
        </div>
      </div>
    </div>)
  );
}

export default ProjectDetail

