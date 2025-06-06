import React, { memo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';

// Memoized OutletWrapper to prevent re-renders on scroll
const MemoizedOutlet = memo(() => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="sync" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="min-h-screen"
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
});

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow bg-white px-4 pt-20 pb-12 md:pt-24 md:pb-16 shadow-sm">
        <div className="container mx-auto">
          <MemoizedOutlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;