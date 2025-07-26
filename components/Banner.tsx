"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Users, TrendingUp } from "lucide-react";

export default function Banner() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        delay: 1.2, 
        duration: 0.5,
        type: "spring",
        stiffness: 200
      } 
    },
  };
  
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 overflow-hidden dark:via-gray-800 dark:to-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Main heading */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight px-4 sm:px-0"
          variants={itemVariants}
        >
          Welcome to{" "}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            PromptMenia
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0"
          variants={itemVariants}
        >
          The ultimate AI prompt marketplace where creativity meets innovation. Discover, share, and monetize premium AI prompts with our thriving community.
        </motion.p>

        {/* Feature highlights */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 px-4 sm:px-0"
          variants={itemVariants}
        >
          <div className="flex items-center gap-2 text-purple-500">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm md:text-base font-bold">Premium Prompts</span>
          </div>
          <div className="flex items-center gap-2 text-blue-500">
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm md:text-base font-bold">Active Community</span>
          </div>
          <div className="flex items-center gap-2 text-pink-500">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm md:text-base font-bold">Earn Revenue</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0"
          variants={buttonVariants}
        >
          <Button
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold shadow hover:shadow transition-all duration-300 transform hover:scale-105"
          >
            Start Exploring
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Share Your Prompts
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}