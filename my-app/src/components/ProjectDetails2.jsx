"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FundingProgress } from "./FundingProgress";
import { ContributionOverTime } from "./ContributionOverTime";
import { ContributorList } from "./ContributorList";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PaymentField from "./PaymentField";

function ProjectDetail({
  _id = "",
  title = "Untitled Project",
  mediaUrls = [],
  fundingGoal = 0,
  raised = 0,
  ovt = [],
  contributions = [],
  hoursLeft = 0,
  description = "",
  faq = [],
  progressUpdates = [],
  comments = [],
}) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("Description");
  const progress = fundingGoal > 0 ? (raised / fundingGoal) * 100 : 0;
  const [showPay, setShowPay] = useState(false);

  const handlePrev = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === 0 ? mediaUrls.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === mediaUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Description":
        return (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-indigo-800">
              About this project
            </h2>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </motion.section>
        );
      case "FAQ":
        return (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-indigo-800">
              Frequently Asked Questions
            </h2>
            <ul className="space-y-6">
              {faq.map((item, index) => (
                <li key={index} className="bg-white rounded-lg shadow-sm p-4">
                  <p className="font-medium text-lg mb-2 text-indigo-700">
                    {item.question}
                  </p>
                  <p className="text-gray-600">{item.answer}</p>
                </li>
              ))}
            </ul>
          </motion.section>
        );
      case "Updates":
        return (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-indigo-800">
              Project Updates
            </h2>
            {progressUpdates.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                <p className="text-gray-700 leading-relaxed">{project.description}</p>
              </div>
            ))}
          </motion.section>
        );
      case "Comments":
        return (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-indigo-800">
              Backer Comments
            </h2>
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="text-gray-700">{comment}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        );
      case "contributions":
        return (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-indigo-800">
              contributions
            </h2>
            <ContributorList contributors={contributions} />
          </motion.section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="lg:flex">
          {/* Media Carousel Section */}
          <div className="lg:w-2/3 p-8">
            <motion.div
              className="relative h-[400px] rounded-xl overflow-hidden shadow-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {mediaUrls && mediaUrls.length > 0 ? (
                <AnimatePresence initial={false}>
                  <motion.div
                    key={currentMediaIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    {mediaUrls[currentMediaIndex].type === "image" ? (
                      <img
                        src={
                          mediaUrls[currentMediaIndex].url || "/placeholder.svg"
                        }
                        alt="Project Media"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <video controls className="w-full h-full object-cover">
                        <source
                          src={mediaUrls[currentMediaIndex].url}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-100">
                  <p className="text-gray-500">
                    No media available for this project.
                  </p>
                </div>
              )}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 text-indigo-600 p-2 rounded-full hover:bg-opacity-75 transition-colors duration-200"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 text-indigo-600 p-2 rounded-full hover:bg-opacity-75 transition-colors duration-200"
              >
                <ChevronRight size={24} />
              </button>
            </motion.div>
            <div className="mt-8">
              <h1 className="text-4xl font-bold text-indigo-900 mb-4">
                {title}
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                {description.slice(0, 150)}...
              </p>
              <ContributionOverTime data={ovt} />
            </div>
          </div>

          {/* Project Details and Funding Section */}
          <div className="lg:w-1/3 bg-gradient-to-b from-purple-100 to-indigo-100 p-8">
            <FundingProgress
              currentFunds={raised}
              goal={fundingGoal}
              daysRemaining={Math.ceil(hoursLeft / 24)}
            />
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <p className="text-lg font-semibold text-indigo-800 mb-2">
                {contributions.length} backers
              </p>
              <p className="text-lg font-semibold text-indigo-800 mb-6">
                {Math.ceil(hoursLeft / 24)} days to go
              </p>
              {showPay && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                  <PaymentField onClose={() => setShowPay(false)} id={_id} />
                </div>
              )}
              <button
                onClick={() => {
                  setShowPay(!showPay);
                }}
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 mb-4"
              >
                Back this project
              </button>
              <button className="w-full bg-white text-indigo-600 px-6 py-3 rounded-lg shadow-md hover:bg-indigo-50 transition duration-300 border border-indigo-200">
                Remind me
              </button>
            </motion.div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="border-t border-gray-200 mt-12 ">
          <div className="flex">
            {["Description", "FAQ", "Updates", "Comments", "contributions"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`flex-1 text-center p-4 font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-indigo-500 text-indigo-700"
                      : "text-gray-600 hover:text-indigo-600"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              )
            )}
          </div>
          <div className="p-8 bg-gray-50">
            <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;
