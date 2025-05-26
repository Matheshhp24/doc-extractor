import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Lottie from 'react-lottie-player';
import authAnimation from '../assets/auth-animation.json';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';




const API = import.meta.env.VITE_API_BASE_URL;
const Login: React.FC = () => {  const [user, setUser] = useState<{ fullName: string } | null>(null);
    

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in by making an API call or checking local state
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API}/api/auth/me`, {
          credentials: "include",
        });

        if (res.ok) {
          navigate("/dashboard");  // If the user is logged in, set user data
        } 
      } catch (error) {
        setUser(null);
      }
    };

    fetchUser();

  }, [user,navigate]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // Add this to handle cookies
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        toast.success('Login successful');
        navigate("/dashboard");
      } else {
        const errorText = await response.text();
        toast.error(errorText || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen py-24 sm:py-16 md:py-0 md:h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-4xl md:max-h-[640px] min-h-[550px] md:min-h-[500px] flex flex-col md:flex-row overflow-hidden">
        {/* Left side - Animation */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-accent-800 to-accent-500 p-4 md:p-8 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none flex-1 flex items-center justify-center"
        >
          <div className="text-center w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
            <div className="w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] md:w-[240px] md:h-[240px]">
              <Lottie
                loop
                animationData={authAnimation}
                play
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-6 sm:mt-8 mb-3 sm:mb-4">Welcome Back!</h2>
            <p className="text-white/95 max-w-[260px] sm:max-w-[300px] mx-auto text-base md:text-lg leading-relaxed">
              Access your account to extract text from your documents.
            </p>
          </div>
        </motion.div>

        {/* Right side - Login Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-4 sm:p-6 md:p-8 rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none flex-1 shadow-sm border border-gray-100"
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Login</h1>
            <p className="text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 sm:space-y-5 mb-2 sm:mb-0">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-accent-400" />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white text-gray-800"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-accent-400" />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 bg-white text-gray-800"
                    placeholder="••••••••"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-accent-400 hover:text-accent-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-accent-600 focus:ring-accent-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-accent-600 hover:text-accent-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-accent-600 hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </motion.button>
            </div>
          </form>

          <div className="mt-6 text-center pb-6 sm:pb-4 md:pb-0">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-accent-600 hover:text-accent-500">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;