import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer 
      className="bg-white py-12 shadow-sm border-t border-gray-100"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-4">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-6 h-6 text-accent-500" />
              <span className="text-xl font-bold tracking-wider text-gray-800">DocCrunch.Ai</span>
            </div>
            <p className="text-gray-600 mb-6">
              Transforming document management with cutting-edge text extraction technology.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className="text-gray-500 hover:text-accent-500 transition-all duration-200 p-2 rounded-full"
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-500 hover:text-accent-500 transition-all duration-200 p-2 rounded-full"
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-500 hover:text-accent-500 transition-all duration-200 p-2 rounded-full"
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-6 text-gray-800">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Dashboard', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-accent-500 transition-all duration-200 hover:pl-1"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-6 text-gray-800">Resources</h3>
            <ul className="space-y-3">
              {['Pricing', 'Documentation', 'API', 'Privacy'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-accent-500 transition-all duration-200 hover:pl-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-6 text-gray-800">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-accent-500 mt-0.5" />
                <span className="text-gray-600">support@Doccrunch.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-accent-500 mt-0.5" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent-500 mt-0.5" />
                <span className="text-gray-600">
                  1234 Innovation Drive<br />
                  San Francisco, CA 94107
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div 
          className="border-t border-gray-100 mt-12 pt-8 text-center text-gray-500 bg-white py-6 rounded-lg shadow-sm border border-gray-100"
          variants={itemVariants}
        >
          <p>&copy; {new Date().getFullYear()} DocCrunch.Ai. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;