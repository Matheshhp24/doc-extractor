import React from 'react';
import { motion } from 'framer-motion';

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-primary-950">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-16 h-16 mb-8 border-4 border-t-accent-500 border-r-transparent border-b-accent-500 border-l-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.p 
          className="text-white text-xl font-light tracking-wider"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          LOADING
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loading;