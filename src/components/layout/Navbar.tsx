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

  const toggleMenu = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  // Close menu on route changes
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location.pathname, isOpen]);

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
        scrolled 
          ? 'bg-primary-300/290 backdrop-blur-md shadow-md' 
          : 'bg-transparent'
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
              <FileText className="w-8 h-8 text-accent-500" />
            </motion.div>
            <motion.span 
              className="text-white text-xl font-bold tracking-wider"
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
                className={`text-white hover:text-accent-400 transition-colors relative ${
                  location.pathname === link.path ? 'text-accent-400' : ''
                }`}
              >
                {location.pathname === link.path && (
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-500"
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
              className="text-white font-medium flex items-center gap-2 cursor-pointer select-none relative" // add relative here for tooltip parent
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
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm rounded px-3 py-1 shadow-lg whitespace-nowrap z-50"
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
                  className="px-5 py-2 rounded-full text-white border border-white/30 hover:bg-white/10 transition-colors"
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
                    className="px-5 py-2 rounded-full text-white border border-white/30 hover:bg-white/10 transition-colors"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 rounded-full bg-accent-500 text-white hover:bg-accent-600 transition-colors"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait" initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              duration: 0.1,
              exit: { duration: 0.05 }
            }}
            className="md:hidden bg-primary-900/95 backdrop-blur-lg mt-4 rounded-2xl"
          >
            <div className="flex flex-col space-y-4 p-6">
              {navLinks.map((link) => (
                <div
                  key={link.path}
                  className={`text-white hover:text-accent-400 transition-colors py-2 block cursor-pointer ${
                    location.pathname === link.path ? 'text-accent-400' : ''
                  }`}
                  onClick={() => navigateTo(link.path)}
                >
                  {link.name}
                </div>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t border-white/10">
                {user ? (
                  <>
                    <span className="text-white text-center">Hi, {user.fullName}</span>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full px-5 py-2 rounded-full text-white border border-white/30 hover:bg-white/10 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <div onClick={() => navigateTo('/login')} className="block w-full">
                      <button 
                        className="w-full px-5 py-2 rounded-full text-white border border-white/30 hover:bg-white/10 transition-colors">
                        Login
                      </button>
                    </div>
                    <div onClick={() => navigateTo('/signup')} className="block w-full">
                      <button 
                        className="w-full px-5 py-2 rounded-full bg-accent-500 text-white hover:bg-accent-600 transition-colors">
                        Sign Up
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// Memoize the Navbar component to prevent unnecessary re-renders
export default memo(Navbar);
