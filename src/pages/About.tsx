import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FileText, Zap, Lock, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import Abilash from '../assets/abilash.png';
import Mathesh from '../assets/mathesh.png';

const About: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // Features section
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Timeline section
  const [timelineRef, timelineInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <FileText className="w-8 h-8 text-accent-500" />,
      title: "Advanced OCR Technology",
      description: "Our cutting-edge optical character recognition accurately extracts text from any document type, including scanned PDFs and images."
    },
    {
      icon: <Zap className="w-8 h-8 text-accent-500" />,
      title: "Lightning Fast Processing",
      description: "Process documents in seconds, not minutes, with our optimized algorithms and cloud-based infrastructure."
    },
    {
      icon: <Lock className="w-8 h-8 text-accent-500" />,
      title: "Enterprise-Grade Security",
      description: "Your documents are encrypted both in transit and at rest. We never store your files longer than necessary."
    },
    {
      icon: <Users className="w-8 h-8 text-accent-500" />,
      title: "Collaborative Workspaces",
      description: "Share extracted text with your team, add comments, and collaborate in real-time to improve productivity."
    }
  ];

  const timelineEvents = [
    {
      year: "2022",
      title: "DocCrunch.Ai Founded",
      description: "DocCrunch.Ai was founded with a mission to make text extraction accessible to everyone."
    },
    {
      year: "2023",
      title: "OCR Engine 2.0",
      description: "Released our proprietary OCR technology with 99.8% accuracy for printed text."
    },
    {
      year: "2024",
      title: "Handwriting Recognition",
      description: "Introduced industry-leading handwriting recognition capabilities."
    },
    {
      year: "2025",
      title: "Global Expansion",
      description: "Expanded to serve customers in over 150 countries with support for 30+ languages."
    }
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      {/* Hero Section */}
      <div ref={targetRef} className="relative h-[50vh] md:h-[60vh] overflow-hidden bg-white">
        <motion.div
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-accent-100/70 to-white z-10"></div>
          <img
            src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Team working on documents"
            className="object-cover w-full h-full"
          />
        </motion.div>

        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4"
          >
            About DocCrunch.Ai
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl"
          >
            Revolutionizing document management through innovative text extraction technology
          </motion.p>
        </div>
      </div>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              At DocCrunch.Ai, we're on a mission to liberate valuable information trapped in documents. 
              We believe that text extraction should be effortless, accurate, and accessible to everyone. 
              Our technology empowers businesses and individuals to digitize, analyze, and leverage their 
              document content in ways that save time and unlock new insights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-16 bg-accent-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our cutting-edge features set us apart from traditional document processing solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow duration-300"
              >
                <div className="bg-accent-100 p-4 rounded-2xl inline-block mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section ref={timelineRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From startup to industry leader in text extraction technology
            </p>
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-accent-200"></div>

            {/* Timeline events */}
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                variants={fadeInUpVariants}
                initial="hidden"
                animate={timelineInView ? "visible" : "hidden"}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative mb-12 md:mb-16 ${index % 2 === 0 ? 'md:text-right md:pr-12 md:ml-auto md:mr-1/2' : 'md:text-left md:pl-12 md:mr-auto md:ml-1/2'} md:w-1/2`}
              >
                {/* Timeline dot */}
                <div className="absolute left-[-8px] md:left-auto md:right-[-8px] top-0 w-4 h-4 rounded-full bg-accent-500 border-4 border-white"></div>
                
                {/* Year badge */}
                <div className="inline-block bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                  {event.year}
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600">
                  {event.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A passionate group of experts dedicated to revolutionizing document processing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                name: "Abilash", 
                role: "Founder & CEO",
                image: Abilash
              },
              { 
                name: "Mathesh", 
                role: "CTO",
                image: Mathesh 
              },
              { 
                name: "Abilash", 
                role: "Founder & CEO",
                image: Abilash
              },
              { 
                name: "Mathesh", 
                role: "CTO",
                image: Mathesh 
              },
              // { 
              //   name: "Michael Rodriguez", 
              //   role: "Head of AI Research",
              //   image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              // },
              // { 
              //   name: "Emma Wilson", 
              //   role: "Lead UX Designer",
              //   image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              // }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group"
              >
                <div className="relative overflow-hidden h-72">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {member.name}
                  </h3>
                  <p className="text-accent-600">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-accent-500 to-accent-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to experience DocCrunch.Ai?
            </h2>
            <p className="text-xl text-accent-100 max-w-3xl mx-auto mb-10">
              Join thousands of satisfied users who have transformed their document workflows
            </p>
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-accent-700 font-medium rounded-full shadow-md hover:bg-accent-50 transition-colors inline-flex items-center"
              >
                Try It Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;