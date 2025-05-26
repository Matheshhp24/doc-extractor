import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10 }}
      className="bg-white backdrop-blur-sm border border-violet-200 rounded-2xl p-6 shadow-md hover:shadow-violet-300/50 hover:border-violet-300 transition-all duration-300"
    >
      <div className="bg-violet-100 p-4 rounded-xl inline-block mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-violet-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;