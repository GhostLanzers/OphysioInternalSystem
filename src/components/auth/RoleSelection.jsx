import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Stethoscope, Heart } from 'lucide-react';

const RoleSelection = ({ onRoleSelect }) => {
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
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-center">
            <motion.div 
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <img src="/OphysioHD_logo.png" alt="Ophysio Logo"/>
            </motion.div>
            <h1 className="text-2xl font-display font-bold text-white mb-2">
              OPHYSIO Internal System
            </h1>
            <p className="text-primary-100 font-sans">
              Select your role to continue
            </p>
          </div>

          {/* Role Selection */}
          <div className="p-6 space-y-4">
            <motion.button
              onClick={() => onRoleSelect('admin')}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-2 border-red-200 dark:border-red-800 rounded-xl hover:border-red-300 dark:hover:border-red-700 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center group-hover:bg-red-600 transition-colors">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white">
                    Admin Login
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans">
                    System administration and management
                  </p>
                </div>
              </div>
            </motion.button>

            <motion.button
              onClick={() => onRoleSelect('doctor')}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-2 border-green-200 dark:border-green-800 rounded-xl hover:border-green-300 dark:hover:border-green-700 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:bg-green-600 transition-colors">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-lg font-display font-bold text-gray-900 dark:text-white">
                    Doctor Login
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-darkBlue-300 font-sans">
                    Patient management and consultations
                  </p>
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSelection;