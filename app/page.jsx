"use client";
import Feed from "@components/Feed";
import { motion } from "framer-motion"
import Banner from "@components/Banner";

const Home = () => (
  <motion.div
    animate={{ opacity: 1, scale: 1 }}
    initial={{ opacity: 0, scale: 0.8 }}
    transition={{ ease: "easeOut" }}
  >
  <section className='w-full flex-center flex-col dark:bg-slate-900 dark:text-white'>
    
    <Banner />
    <Feed />
  </section>
  </motion.div>
);

export default Home;
