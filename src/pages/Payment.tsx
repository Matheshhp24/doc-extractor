import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CreditCardComponent from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { Check, CreditCard, Package, Shield } from 'lucide-react';

type PlanType = 'monthly' | 'annual';
type PaymentStep = 'plan' | 'payment' | 'success';

const Payment: React.FC = () => {
  const [planType, setPlanType] = useState<PlanType>('monthly');
  const [currentStep, setCurrentStep] = useState<PaymentStep>('plan');
  
  // Credit card state
  const [cardState, setCardState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'number') {
      // Only allow numbers and limit to 16 digits
      const sanitizedValue = value.replace(/\D/g, '').slice(0, 16);
      setCardState(prev => ({ ...prev, [name]: sanitizedValue }));
    } else if (name === 'expiry') {
      // Format as MM/YY
      const sanitizedValue = value.replace(/\D/g, '').slice(0, 4);
      if (sanitizedValue.length > 2) {
        setCardState(prev => ({ 
          ...prev, 
          [name]: `${sanitizedValue.slice(0, 2)}/${sanitizedValue.slice(2)}` 
        }));
      } else {
        setCardState(prev => ({ ...prev, [name]: sanitizedValue }));
      }
    } else if (name === 'cvc') {
      // Only allow numbers and limit to 3-4 digits
      const sanitizedValue = value.replace(/\D/g, '').slice(0, 4);
      setCardState(prev => ({ ...prev, [name]: sanitizedValue }));
    } else {
      setCardState(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setCardState(prev => ({ ...prev, focus: e.target.name }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep('success');
    }, 2000);
  };

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: '$14.99',
      period: 'per month',
      features: [
        'Extract text from up to 100 documents/month',
        'Basic OCR capabilities',
        'Export in TXT, DOC formats',
        'Email support'
      ]
    },
    {
      id: 'annual',
      name: 'Annual',
      price: '$149.99',
      period: 'per year',
      features: [
        'Extract text from unlimited documents',
        'Advanced OCR with handwriting support',
        'Export in all formats including PDF',
        'Priority support',
        '20% savings compared to monthly'
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50 dark:bg-primary-950">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Upgrade to DocCrunch.Ai Pro
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Unlock advanced features and process unlimited documents
          </p>
        </motion.div>

        {currentStep === 'plan' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-primary-900 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Choose a Plan
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-colors ${
                      planType === plan.id
                        ? 'border-accent-500 bg-accent-50 dark:bg-accent-900/10'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                    onClick={() => setPlanType(plan.id as PlanType)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {plan.name}
                        </h3>
                        <div className="mt-1 flex items-baseline">
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            {plan.price}
                          </span>
                          <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                            {plan.period}
                          </span>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        planType === plan.id
                          ? 'bg-accent-500 border-accent-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}>
                        {planType === plan.id && (
                          <Check className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-accent-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentStep('payment')}
                  className="px-8 py-3 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-full shadow-md transition-colors"
                >
                  Continue to Payment
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 'payment' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-primary-900 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Payment Information
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left side - Credit Card */}
                <div>
                  <div className="mb-6">
                    <CreditCardComponent
                      number={cardState.number}
                      name={cardState.name}
                      expiry={cardState.expiry}
                      cvc={cardState.cvc}
                      focused={cardState.focus as any}
                    />
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Card Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <CreditCard className="h-5 w-5 text-gray-400" />
                          </div>
                          <motion.input
                            whileFocus={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            type="text"
                            name="number"
                            placeholder="1234 5678 9012 3456"
                            value={cardState.number}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-primary-800 text-gray-900 dark:text-white"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Cardholder Name
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          transition={{ type: "spring", stiffness: 300, damping: 10 }}
                          type="text"
                          name="name"
                          placeholder="John Doe"
                          value={cardState.name}
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-primary-800 text-gray-900 dark:text-white"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Expiry Date
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            type="text"
                            name="expiry"
                            placeholder="MM/YY"
                            value={cardState.expiry}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-primary-800 text-gray-900 dark:text-white"
                            required
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            CVC
                          </label>
                          <motion.input
                            whileFocus={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300, damping: 10 }}
                            type="text"
                            name="cvc"
                            placeholder="123"
                            value={cardState.cvc}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-primary-800 text-gray-900 dark:text-white"
                            required
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          disabled={isProcessing}
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-accent-600 hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 transition-colors"
                        >
                          {isProcessing ? (
                            <div className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing...
                            </div>
                          ) : (
                            `Pay ${planType === 'monthly' ? '$14.99' : '$149.99'}`
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Right side - Order Summary */}
                <div>
                  <div className="bg-gray-50 dark:bg-primary-800/30 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                      Order Summary
                    </h3>
                    
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Package className="w-5 h-5 text-primary-500 mr-2" />
                          <span className="text-gray-700 dark:text-gray-300">
                            DocCrunch.Ai Pro - {planType === 'monthly' ? 'Monthly' : 'Annual'} Plan
                          </span>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {planType === 'monthly' ? '$14.99' : '$149.99'}
                        </span>
                      </div>
                      
                      {planType === 'annual' && (
                        <div className="flex items-center text-success-600 text-sm mt-1">
                          <Check className="w-4 h-4 mr-1" />
                          <span>Save 20% with annual billing</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                        <span className="text-gray-900 dark:text-white">
                          {planType === 'monthly' ? '$14.99' : '$149.99'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Tax</span>
                        <span className="text-gray-900 dark:text-white">$0.00</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mb-6">
                      <span className="text-lg font-medium text-gray-900 dark:text-white">Total</span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {planType === 'monthly' ? '$14.99' : '$149.99'}
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-start">
                      <Shield className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      <p>
                        Your payment information is processed securely. We do not store credit card details nor have access to your card information.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setCurrentStep('plan')}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 transition-colors"
                    >
                      &larr; Back to plans
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-primary-900 rounded-2xl shadow-xl overflow-hidden text-center p-8"
          >
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-success-100 dark:bg-success-900/30 flex items-center justify-center">
                <Check className="w-10 h-10 text-success-500" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Payment Successful!
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Thank you for upgrading to DocCrunch.Ai Pro! Your subscription is now active.
            </p>
            
            <div className="bg-gray-50 dark:bg-primary-800/30 rounded-xl p-6 max-w-md mx-auto mb-8">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Order Details
              </h3>
              
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Plan</span>
                <span className="text-gray-900 dark:text-white">
                  DocCrunch.Ai Pro - {planType === 'monthly' ? 'Monthly' : 'Annual'}
                </span>
              </div>
              
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Amount</span>
                <span className="text-gray-900 dark:text-white">
                  {planType === 'monthly' ? '$14.99' : '$149.99'}
                </span>
              </div>
              
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">Payment Method</span>
                <span className="text-gray-900 dark:text-white">
                  Card ending in {cardState.number.slice(-4)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Order ID</span>
                <span className="text-gray-900 dark:text-white">
                  #TXT{Math.floor(Math.random() * 10000000)}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/dashboard"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-accent-500 hover:bg-accent-600 text-white font-medium rounded-full shadow-md transition-colors"
              >
                Go to Dashboard
              </motion.a>
              
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-full hover:bg-gray-50 dark:hover:bg-primary-800 transition-colors"
              >
                View Receipt
              </motion.a>
            </div>
          </motion.div>
        )}

        {/* Secure Payment Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <div className="flex items-center justify-center text-gray-500 dark:text-gray-400">
            <Shield className="w-5 h-5 mr-2" />
            <span>Secure Payment Processing</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;