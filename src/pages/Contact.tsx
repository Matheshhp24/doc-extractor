import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, AlertCircle } from 'lucide-react';
import Lottie from 'react-lottie-player';
import contactAnimation from '../assets/contact-animation.json';
import emailjs from '@emailjs/browser';
import type { EmailJSResponseStatus } from '@emailjs/browser';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // EmailJS service and template IDs from environment variables
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL;

  // Check if EmailJS configuration is available
  const isEmailJSConfigured = !!SERVICE_ID && !!TEMPLATE_ID && !!PUBLIC_KEY;

  // Initialize EmailJS with your public key
  useEffect(() => {
    if (PUBLIC_KEY) {
      emailjs.init(PUBLIC_KEY);
    } else {
      console.warn('EmailJS public key is missing. Email functionality will not work.');
    }
  }, [PUBLIC_KEY]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Check if EmailJS is configured
    if (!isEmailJSConfigured) {
      setIsSubmitting(false);
      setError('Email service is not configured. Please contact the administrator.');
      return;
    }
    
    // Prepare template parameters
    const templateParams = {
      to_email: CONTACT_EMAIL,
      from_name: formData.name,
      from_email: CONTACT_EMAIL, 
      subject: formData.subject,
      message: `User Email: ${formData.email}\n\n${formData.message}`, // Including user email in the message body
      // Additional parameters that might be useful
      contact_number: Date.now(),
      reply_to: CONTACT_EMAIL // Reply will go back to FreeFire email
    };
    
    // Send email using EmailJS
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
      .then((response: EmailJSResponseStatus) => {
        console.log('Email sent successfully:', response);
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after a delay
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
        }, 5000);
      })
      .catch((err: any) => {
        console.error('Failed to send email:', err);
        setIsSubmitting(false);
        
        // Provide more specific error messages based on the error
        if (err.status === 0) {
          setError('Network error. Please check your internet connection and try again.');
        } else if (err.status === 400) {
          setError('Invalid email configuration. Please contact the site administrator.');
        } else if (err.status === 403) {
          setError('Email service authentication failed. Please contact the site administrator.');
        } else {
          setError(`Failed to send message. Please try again or contact us directly at ${CONTACT_EMAIL}`);
        }
      });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-accent-500" />,
      title: "Email Us",
      details: [
        CONTACT_EMAIL,
        "support@DocCrunch.Ai.com"
      ]
    },
    {
      icon: <Phone className="w-6 h-6 text-accent-500" />,
      title: "Call Us",
      details: [
        "+1 (555) 123-4567",
        "+1 (555) 987-6543"
      ]
    },
    {
      icon: <MapPin className="w-6 h-6 text-accent-500" />,
      title: "Visit Us",
      details: [
        "1234 Innovation Drive",
        "San Francisco, CA 94107"
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our text extraction technology? We're here to help!
          </p>
          <p className="mt-2 text-accent-600">
            Your messages will be sent from and to our support team at <span className="font-medium">{CONTACT_EMAIL}</span>
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-8">
              <div className="mb-8">
                <Lottie
                  loop
                  animationData={contactAnimation}
                  play
                  style={{ width: 200, height: 200, margin: '0 auto' }}
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    className="flex"
                  >
                    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-accent-100 rounded-lg mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">
                        {item.title}
                      </h3>
                      <div className="mt-1 text-gray-600">
                        {item.details.map((detail, idx) => (
                          <p key={idx}>{detail}</p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  {['twitter', 'facebook', 'instagram', 'linkedin'].map((social, index) => (
                    <motion.a
                      key={social}
                      href="#"
                      whileHover={{ y: -3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="h-10 w-10 flex items-center justify-center rounded-full bg-accent-100 text-accent-600 hover:bg-accent-200 transition-colors"
                    >
                      <span className="sr-only">{social}</span>
                      {/* Using a placeholder for social icons */}
                      <div className="w-5 h-5 flex items-center justify-center">
                        {social[0].toUpperCase()}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-accent-500" />
                Send Us a Message
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-success-50 border border-success-200 rounded-lg p-6 text-center"
                >
                  <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-success-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for contacting us. We'll get back to you shortly.
                  </p>
                </motion.div>
              ) : error ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-6 text-center mb-6"
                >
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Message Failed
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {error}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setError(null)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Try Again
                  </motion.button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  {/* Hidden field to help prevent spam */}
                  <input type="hidden" name="contact_number" value={Date.now()} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Name
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white text-gray-800"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your Email Address
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white text-gray-800"
                        placeholder="your@email.com"
                        required
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        We'll include this in your message so we can reply to you
                      </p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <motion.select
                      whileFocus={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white text-gray-800"
                      required
                    >
                      <option value="" disabled>Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="partnership">Partnership Opportunity</option>
                    </motion.select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <motion.textarea
                      whileFocus={{ scale: 1.01 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white text-gray-800 resize-none"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>

                  <div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-accent-600 hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 transition-colors"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          {/* <div className="aspect-w-16 aspect-h-9 h-96"> */}
            {/* <iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.6487741439795!2d80.24094897490738!3d13.082680712172486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265d1f2e4c4d1%3A0x32d3f51cfa9a4b9!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1716463421123!5m2!1sen!2sin" 
  className="w-full h-full border-0"
  allowFullScreen={true}
  loading="lazy"
  title="Chennai Office Location"
/> */}

          {/* </div> */}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                question: "How accurate is your text extraction?",
                answer: "Our technology achieves 99.8% accuracy for printed text and over 95% accuracy for handwritten text, depending on clarity."
              },
              {
                question: "What file formats do you support?",
                answer: "We support PDF, DOC, DOCX, JPG, PNG, TIFF, and many other common document and image formats."
              },
              {
                question: "Is my data secure?",
                answer: "Absolutely. All files are encrypted both in transit and at rest. We never store your documents longer than necessary for processing."
              },
              {
                question: "Do you offer  processing?",
                answer: "Yes, our Pro and Enterprise plans support batch processing of multiple documents simultaneously."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;