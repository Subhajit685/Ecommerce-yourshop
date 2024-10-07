import React from 'react';

function Footer() {
  return (
    <footer className="bg-white drop-shadow-md w-full py-8 z-50 relative mt-10">
      {/* Footer Container */}
      <div className="container mx-auto px-4 sm:px-20">
        {/* YourShop Logo and Tagline */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">YourShop</h1>
          <p className="text-gray-600 text-sm md:text-lg">Your One-Stop Shop for Everything</p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between">
          {/* Created By */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-center">
            <p className="text-black text-sm md:text-lg">
              Created by <span className="font-bold">@Subhajit Mondal</span>
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <img src="/gmail.svg" alt="Gmail" className="h-8" />
            <p className="text-black text-sm md:text-lg">subhajit09111999@gmail.com</p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-4 sm:space-y-0 sm:space-x-6">
          {/* GitHub Link */}
          <a href="https://github.com/Subhajit685" target="_blank" rel="noreferrer" className="flex items-center space-x-2 hover:text-blue-500">
            <img src="/github.svg" alt="GitHub" className="h-8" />
            <p className="text-sm md:text-lg hover:underline">Github</p>
          </a>

          {/* LinkedIn Link */}
          <a href="https://www.linkedin.com/in/subhajit-mondal-888129242/" target="_blank" rel="noreferrer" className="flex items-center space-x-2 hover:text-blue-500">
            <img src="/linkdin.svg" alt="LinkedIn" className="h-8" />
            <p className="text-sm md:text-lg hover:underline">LinkedIn</p>
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 text-center text-gray-500 text-xs sm:text-sm">
          <p>&copy; {new Date().getFullYear()} YourShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
