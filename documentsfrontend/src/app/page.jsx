"use client";

import Peep from "./icons/Peep";
import { motion } from "framer-motion";

const Home = () => {
  const peepVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.3,
        delay: 0.3,
        type: "spring"
      }
    },
  };

  const itemsVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1.3,
        delay: 0.3,
        type: "spring",
      },
    },
  };

  return (
    <motion.div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center p-5">
        <motion.div initial="hidden" animate="visible" variants={peepVariants}>
          <Peep />
        </motion.div>
        <motion.h2
          className="font-mono text-4xl text-center p-2"
          initial="hidden"
          animate="visible"
          variants={itemsVariants}
        >
          Welcome to Document Manager.
        </motion.h2>
        <motion.p
          className="font-mono text-slate-400 text-center p-1"
          initial="hidden"
          animate="visible"
          variants={itemsVariants}
        >
          You can keep your documents safe.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Home;
