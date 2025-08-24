import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, EyeOff, Mail, Lock, Shield, Stethoscope, Heart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = ({ role, onBack }) => {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const success = await login({
      email: formData.email,
      password: formData.password,
      role
    });

    if (!success) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const roleConfig = {
    admin: {
      title: 'Admin Login',
      icon: Shield,
      color: 'red',
      gradient: 'from-red-500 to-red-600',
      bgGradient: 'from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20',
      borderColor: 'border-red-200 dark:border-red-800',
      defaultEmail: 'admin@ophysio.com',
      defaultPassword: 'admin123'
    },
    doctor: {
      title: 'Doctor Login',
      icon: Stethoscope,
      color: 'green',
      gradient: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
      borderColor: 'border-green-200 dark:border-green-800',
      defaultEmail: 'doctor@ophysio.com',
      defaultPassword: 'doctor123'
    }
  };

  const config = roleConfig[role];
  const IconComponent = config.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-darkBlue-950 dark:via-darkBlue-900 dark:to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-darkBlue-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-darkBlue-800 overflow-hidden">
          {/* Header */}
          <div className={`bg-gradient-to-r ${config.gradient} p-6 text-center relative`}>
            <motion.button
              onClick={onBack}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>

            <motion.div 
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <IconComponent className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl font-display font-bold text-white mb-2">
              {config.title}
            </h1>
            <p className="text-white/80 font-sans">
              Enter your credentials to continue
            </p>
          </div>

          {/* Login Form */}
          <div className="p-6">
            {/* Demo Credentials Info */}
            <div className={`bg-gradient-to-r ${config.bgGradient} border ${config.borderColor} rounded-xl p-4 mb-6`}>
              <h4 className="font-display font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                Demo Credentials:
              </h4>
              <div className="space-y-1 text-xs font-sans text-gray-600 dark:text-darkBlue-300">
                <p><strong>Email:</strong> {config.defaultEmail}</p>
                <p><strong>Password:</strong> {config.defaultPassword}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3"
                >
                  <p className="text-red-600 dark:text-red-400 text-sm font-sans text-center">
                    {error}
                  </p>
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-darkBlue-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                    placeholder="Enter your email"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-display font-medium text-gray-700 dark:text-darkBlue-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-darkBlue-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pl-10 pr-12 py-3 rounded-xl bg-gray-50 dark:bg-darkBlue-800 border border-gray-300 dark:border-darkBlue-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white font-sans"
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-darkBlue-400 hover:text-gray-600 dark:hover:text-darkBlue-200 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                className={`w-full py-4 bg-gradient-to-r ${config.gradient} text-white rounded-xl hover:opacity-90 transition-all duration-200 font-semibold font-sans disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <IconComponent className="w-5 h-5" />
                    <span>Sign In</span>
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>

        {/* OPHYSIO Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-6"
        >
          <div className="flex items-center justify-center space-x-2">
            <img className="w-5 h-5 text-primary-500" src="/OphysioHD_logo.png" alt="Ophysio Logo"/>
            <span className="text-lg font-display font-bold text-gray-700 dark:text-darkBlue-300">
              OPHYSIO
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-darkBlue-400 font-sans mt-1">
            Professional Physiotherapy Management System
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginForm;