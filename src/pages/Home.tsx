import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, FileText, Upload, Download, Search } from 'lucide-react';
import FeatureCard from '../components/home/FeatureCard';
import backgroundVideo from '../assets/13710627_1920_1080_25fps.mp4';



const Home: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const features = [
    { 
      icon: <FileText className="w-10 h-10 text-violet-500" />,
      title: "Smart Document Analysis",
      description: "Advanced algorithms that accurately extract text from any document type while preserving formatting."
    },
    { 
      icon: <Upload className="w-10 h-10 text-violet-500" />,
      title: "Batch Processing",
      description: "Upload multiple documents at once and process them in parallel for maximum efficiency."
    },
    { 
      icon: <Search className="w-10 h-10 text-violet-500" />,
      title: "Intelligent Search",
      description: "Quickly find specific information within extracted text using our smart search functionality."
    },
    { 
      icon: <Download className="w-10 h-10 text-violet-500" />,
      title: "Export Options",
      description: "Export extracted text in multiple formats including TXT, DOC, PDF, and more."
    }
  ];

  // Smooth scroll to features section
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div ref={targetRef} className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
  {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-violet-50/60 to-white/90 z-10 pointer-events-none"></div>

          {/* Background video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full"
          >
            {/* Use either a local import or direct URL */}
             <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>

        <motion.div
          style={{ opacity, scale, y }}
          className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6"
          >
            Extract Text from <br />
            <span className="text-violet-500">Any Document</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-2xl mb-10"
          >
            Whether it’s a scanned invoice, a blurry contract, or a 50-page vendor form — your AI-powered extractor sees it, understands it, and delivers crystal-clear data.
No templates. No rules. Just results.

          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-full transition-colors"
              >
                Try It Now
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border border-gray-300 hover:bg-gray-100 text-gray-800 font-medium rounded-full transition-colors"
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          onClick={scrollToFeatures}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-10 h-10 text-gray-600" />
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our text extraction platform comes packed with advanced features
              to handle all your document processing needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-violet-100 to-violet-200">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Ready to transform your document workflow?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Join thousands of users who are already saving time with our powerful text extraction tool.
            </p>
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-full transition-colors"
              >
                Get Started Free
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;