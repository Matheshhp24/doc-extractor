import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Upload, X, Copy, Download, CheckCircle2, AlertCircle, LogOut } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { createWorker, Worker } from 'tesseract.js';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

type ProcessingStatus = 'idle' | 'processing' | 'success' | 'error';
const API = import.meta.env.VITE_API_BASE_URL;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    if (status === 'success') {
      handleSuccess();
    }
  }, [status]);

  const onDrop = useCallback(async(acceptedFiles: File[]) => {
    try {
        const res = await fetch(`${API}/api/auth/is-limit-exceeds`, {
          method: "POST",
          credentials: "include",
        });

        if (!res.ok) {
          const errorMessage = await res.text(); // Read message from server
          toast.error(errorMessage);
          return;
        }

        setFile(acceptedFiles[0]);
        processFile(acceptedFiles[0]);
      } catch (err) {
        console.error("Error checking document limit:", err);
        toast.error("Something went wrong while checking your limit.");
      }

  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc', '.docx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxFiles: 1,
  });

  const processFile = async (file: File) => {
    setStatus('processing');
    setProgress(0);
    setExtractedText('');

    try {
      const worker: Worker = await createWorker({
        logger: (progressData) => {
          if (progressData.status === 'recognizing text') {
            setProgress(progressData.progress * 100);
          }
        },
      });

      await worker.loadLanguage('eng');
      await worker.initialize('eng');

      const reader = new FileReader();

      reader.onload = async (e) => {
        if (e.target?.result) {
          const result = await worker.recognize(e.target.result as string);
          setExtractedText(result.data.text);
          setStatus('success');
          setProgress(100);
          await worker.terminate();
        }
      };

      reader.onerror = () => {
        setStatus('error');
        setProgress(0);
      };

      if (file.type.includes('image')) {
        reader.readAsDataURL(file);
      } else {
        setTimeout(() => {
          setExtractedText(
            'This is a simulated text extraction for non-image files.\n\nIn a real implementation, you would need specialized libraries for different file types.\n\nFor PDFs: pdf.js\nFor DOC/DOCX: mammoth.js or similar\n\nThe extraction would extract actual text content from these documents.'
          );
          setStatus('success');
          setProgress(100);
        }, 2000);
      }
    } catch (error) {
      console.error('Error during text extraction:', error);
      setStatus('error');
      setProgress(0);
    }
  };

  const handleCopy = () => {
    if (textAreaRef.current) {
      textAreaRef.current.select();
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const blob = new Blob([extractedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(blob);
    element.download = 'extracted-text.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleReset = () => {
    setFile(null);
    setExtractedText('');
    setStatus('idle');
    setProgress(0);
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
        return (
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-800">
            <motion.div
              className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        );
      case 'success':
        return (
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-success-100 dark:bg-success-900/30">
            <CheckCircle2 className="w-6 h-6 text-success-500" />
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-error-100 dark:bg-error-900/30">
            <AlertCircle className="w-6 h-6 text-error-500" />
          </div>
        );
      default:
        return null;
    }
  };

  const handleSuccess = async() => {
      try {
        const res = await fetch(`${API}/api/auth/decrement-doc-used`, {
          method: 'POST',
          credentials: 'include', // send session cookie
        });
        const updatedDocUsed = await res.json();
        if (res.ok) {
          toast.success(updatedDocUsed);
          // Optionally update your user state here if needed
        } else {
          toast.error(updatedDocUsed);
        }
      } catch (err) {
        console.error('Error:', err);
      }
  }


  const getStatusMessage = () => {
    switch (status) {
      case 'processing':
        return 'Processing your document...';
      case 'success':
        return 'Document processed successfully!';
      case 'error':
        return 'An error occurred during extraction.';
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-800 dark:bg-primary-950">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Document Text Extraction</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Upload your document to extract the text content
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-primary-900 rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-primary-500" />
                  Upload Document
                </h2>

                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed ${
                    isDragActive ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/50' : 'border-gray-300 dark:border-gray-700'
                  } rounded-xl p-8 transition-colors duration-200 cursor-pointer mb-4`}
                >
                  <input {...getInputProps()} />
                  
                  <div className="text-center">
                    <FileText className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                    
                    {isDragActive ? (
                      <p className="text-primary-600 dark:text-primary-400">Drop your document here</p>
                    ) : (
                      <>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                          Drag & drop your document here, or click to select
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Supported formats: PDF, DOC, DOCX, JPG, PNG
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {file && (
                  <div className="bg-gray-50 dark:bg-primary-800/50 rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center overflow-hidden">
                      <FileText className="w-5 h-5 text-primary-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                        {file.name}
                      </span>
                    </div>
                    <button
                      onClick={handleReset}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}

                {status !== 'idle' && (
                  <div className="mt-6">
                    <div className="flex items-center mb-2">
                      {getStatusIcon()}
                      <span className="ml-3 text-gray-700 dark:text-gray-300">
                        {getStatusMessage()}
                      </span>
                    </div>
                    
                    {status === 'processing' && (
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
                          <motion.div
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
                          />
                        </div>
                        <div className="text-right mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {Math.round(progress)}%
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-primary-900 rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-primary-500" />
                  Extracted Text
                </h2>

                <div className="relative">
                  <textarea
                    ref={textAreaRef}
                    value={extractedText}
                    onChange={(e) => setExtractedText(e.target.value)}
                    className="w-full h-64 p-4 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-gray-50 dark:bg-primary-800/30 text-gray-900 dark:text-white resize-none"
                    placeholder="Extracted text will appear here..."
                    readOnly={status !== 'success'}
                  />

                  <AnimatePresence>
                    {status === 'success' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-4 right-4 flex space-x-2"
                      >
                        <button
                          onClick={handleCopy}
                          className="p-2 bg-white dark:bg-primary-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-primary-700 transition-colors focus:outline-none"
                          title="Copy to clipboard"
                        >
                          {copied ? (
                            <CheckCircle2 className="w-5 h-5 text-success-500" />
                          ) : (
                            <Copy className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                          )}
                        </button>
                        <button
                          onClick={handleDownload}
                          className="p-2 bg-white dark:bg-primary-800 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-primary-700 transition-colors focus:outline-none"
                          title="Download as text file"
                        >
                          <Download className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {status === 'success' && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Editing Options</h3>
                    <div className="flex flex-wrap gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 text-sm bg-gray-200 dark:bg-primary-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-primary-700 transition-colors"
                      >
                        Format Text
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 text-sm bg-gray-200 dark:bg-primary-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-primary-700 transition-colors"
                      >
                        Remove Line Breaks
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 text-sm bg-gray-200 dark:bg-primary-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-300 dark:hover:bg-primary-700 transition-colors"
                      >
                        Trim Whitespace
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Upgrade Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl shadow-lg p-6 text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Upgrade to Pro</h3>
                <p className="text-primary-100">
                  Get advanced features like batch processing, OCR for handwritten text, and more.
                </p>
              </div>
              <Link to="/payment">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-white text-primary-800 font-medium rounded-full shadow-md hover:bg-primary-50 transition-colors"
                >
                  Upgrade Now
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;