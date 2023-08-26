"use client";
import Feed from "@components/Feed";
import { motion } from "framer-motion"

const Home = () => (
  <motion.div
    animate={{ opacity: 1, scale: 1 }}
    initial={{ opacity: 0, scale: 0.8 }}
    transition={{ ease: "easeOut" }}
  >
  <section className='w-full flex-center flex-col'>
    <h1 className='mb-2 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center'>
      Discover & Share
      <br />
      <span className='orange_gradient text-center'> AI-Powered Prompts</span>
    </h1>
    <p className='desc text-center'>
      Promptmenia.ai is an open-source AI prompting tool for modern world to
      discover, create and share creative prompts.
    </p>
    <Feed />
  </section>
  </motion.div>
);

export default Home;
