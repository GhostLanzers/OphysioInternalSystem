import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-darkBlue-900 border-t border-gray-200 dark:border-darkBlue-800 py-2">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-1 sm:space-y-0 text-xs text-black dark:text-white">
          <div className="flex items-center space-x-1">
            <span>© {currentYear} OPHYSIO. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Developed & Maintained with</span>
            <Heart className="w-2.5 h-2.5 text-red-500 fill-current" />
            <span>by <a href="https://ghostlanzers.onrender.com/" target="_blank">GHOSTLANZERS.</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
