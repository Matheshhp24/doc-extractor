import React, { useEffect, useState, useCallback, memo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, User } from 'lucide-react';

interface NavbarProps {}
interface User {
  fullName: string;
  docLimit: number;
  docUsed: number;
}

const API = import.meta.env.VITE_API_BASE_URL;

const Navbar: React.FC<NavbarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll state inside Navbar component
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = useCallback(() => {
    console.log('Toggle menu clicked, current state:', isOpen);
    setIsOpen(!isOpen);
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  // Add debug effect to monitor state changes
  useEffect(() => {
    console.log('Menu state changed to:', isOpen);
  }, [isOpen]);

  // Close menu on route changes - only dependent on location changes
  useEffect(() => {
    console.log('Route changed to:', location.pathname);
    // Only close if the menu is currently open
    if (isOpen) {
      console.log('Menu was open, closing due to route change');
      setIsOpen(false);
    }
  }, [location.pathname]); // isOpen removed from dependencies

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API}/api/auth/me`, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();
  }, [location.key]);

  const handleLogout = async () => {
    await fetch(`${API}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    navigate("/login");
  };

  // Simple touch device detection
  const isTouchDevice = useCallback(() => {
    return ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Toggle tooltip on mobile only
  const handleNameClick = useCallback(() => {
    if (isTouchDevice()) {
      setShowTooltip((prev) => !prev);
    }
  }, [isTouchDevice]);

  // Close menu immediately 
  const closeMenu = useCallback(() => {
    // Force immediate state update
    setIsOpen(false);
  }, []);

  // Navigate and ensure menu is closed first
  const navigateTo = useCallback((path: string) => {
    setIsOpen(false);
    // Small delay to allow state update to complete before navigation
    requestAnimationFrame(() => {
      navigate(path);
    });
  }, [navigate]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-white shadow-sm border-b border-gray-100' 
          : 'bg-white'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <FileText className="w-8 h-8 text-violet-500" />
            </motion.div>
            <motion.span 
              className="text-gray-800 text-xl font-bold tracking-wider"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              DocCrunch.Ai
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-gray-600 hover:text-violet-600 transition-all duration-200 relative ${
                  location.pathname === link.path ? 'text-violet-500 font-medium' : ''
                }`}
              >
                {location.pathname === link.path && (
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-violet-500 rounded-full"
                    layoutId="navbar-indicator"
                  />
                )}
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Section - Desktop */}
          <div className="hidden md:flex items-center space-x-4 relative">
            {user ? (
              <>

            <span
              onClick={(e) => {
                e.stopPropagation();  // prevent event bubbling
                if (isTouchDevice()) {
                  setShowTooltip((prev) => !prev);
                }
              }}
              onMouseEnter={() => !isTouchDevice() && setShowTooltip(true)}
              onMouseLeave={() => !isTouchDevice() && setShowTooltip(false)}
              className="text-gray-800 font-medium flex items-center gap-2 cursor-pointer select-none relative" // add relative here for tooltip parent
            >
              <User className="w-5 h-5" />
              Hi, {user.fullName}

              {/* Tooltip */}
              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white text-gray-800 text-sm rounded-lg px-4 py-3 shadow-sm whitespace-nowrap z-50 border border-gray-100"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    <div>Credits Used: {user.docUsed}</div>
                    <div>Available Credits: {user.docLimit}</div>

                  </motion.div>
                )}
              </AnimatePresence>
            </span>


                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 rounded-full text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all duration-200"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 rounded-full text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all duration-200"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 rounded-full bg-violet-500 text-white hover:bg-violet-600 transition-all duration-200"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-gray-600 focus:outline-none p-2 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-all duration-200"
              id="mobile-menu-button"
              style={{ touchAction: "manipulation", position: "relative", zIndex: 1000 }}
            >
              {isOpen ? <X className="w-6 h-6 text-violet-500" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait" initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.9, transformOrigin: "top" }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.9 }}
            transition={{ 
              type: "tween",
              duration: 0.2,
              ease: "easeOut"
            }}
            className="md:hidden bg-white border border-gray-100 mt-4 rounded-2xl overflow-hidden shadow-sm absolute inset-x-0 mx-6"
            style={{ zIndex: 999 }}
            id="mobile-menu-container"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col space-y-4 p-6 bg-white"
            >
              {navLinks.map((link) => (
                <div
                  key={link.path}
                  className={`text-gray-600 hover:text-violet-600 transition-all duration-200 py-2 block cursor-pointer ${
                    location.pathname === link.path ? 'text-violet-500 font-medium' : ''
                  }`}
                  onClick={() => navigateTo(link.path)}
                >
                  {link.name}
                </div>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100">
                {user ? (
                  <>
                    <span className="text-gray-800 text-center font-medium">Hi, {user.fullName}</span>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full px-5 py-2 rounded-full text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all duration-200"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <div onClick={() => navigateTo('/login')} className="block w-full">
                      <button 
                        className="w-full px-5 py-2 rounded-full text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all duration-200">
                        Login
                      </button>
                    </div>
                    <div onClick={() => navigateTo('/signup')} className="block w-full">
                      <button 
                        className="w-full px-5 py-2 rounded-full bg-violet-500 text-white hover:bg-violet-600 transition-all duration-200">
                        Sign Up
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Memoize the Navbar component to prevent unnecessary re-renders
export default memo(Navbar);
