import React from 'react';
import { motion } from 'framer-motion';

const Loading: React.FC = () => {
  // Text lines animation variants
  const textLineVariants = {
    initial: { width: 0, opacity: 0 },
    animate: (i: number) => ({
      width: ['20%', '80%', '60%', '70%'],
      opacity: 1,
      transition: {
        width: {
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse' as const,
          ease: 'easeInOut',
          delay: i * 0.2,
        },
        opacity: { duration: 0.3 }
      }
    })
  };
  
  // Scanner line animation
  const scannerVariants = {
    initial: { y: 0, opacity: 0.7 },
    animate: {
      y: ['0%', '100%', '0%'],
      opacity: [0.7, 0.9, 0.7],
      transition: {
        y: {
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        opacity: {
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Document container with scanning effect */}
        <div className="relative w-64 h-80 bg-white border-2 border-accent-300 rounded-lg shadow-lg mb-8 overflow-hidden">
          {/* Document header */}
          <div className="h-8 w-full bg-accent-100 border-b border-accent-300 mb-4 flex items-center justify-center">
            <div className="w-20 h-3 bg-accent-300 rounded-full"></div>
          </div>
          
          {/* Text lines being processed */}
          <div className="px-6 space-y-3">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="h-3 bg-accent-200 rounded-full"
                custom={i}
                variants={textLineVariants}
                initial="initial"
                animate="animate"
              />
            ))}
          </div>
          
          {/* Scanner line effect */}
          <motion.div 
            className="absolute inset-x-0 h-1 bg-accent-500 opacity-70"
            variants={scannerVariants}
            initial="initial"
            animate="animate"
          />
        </div>
        
        {/* Loading text */}
        <motion.div 
          className="text-center"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <p className="text-accent-800 text-lg font-medium mb-1">
            Extracting Text
          </p>
          <p className="text-accent-600 text-sm">
            Processing your document...
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Loading;
