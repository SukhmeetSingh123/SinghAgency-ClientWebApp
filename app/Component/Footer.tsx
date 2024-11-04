import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">ShopSphere</h2>
            <p className="text-gray-400 max-w-xs">
              Welcome to <strong>SHOPSPHERE</strong>, the ultimate online marketplace for local shopkeepers!
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mb-6 md:mb-0 text-center">
            <a href="/About" className="hover:text-gray-300 transition-colors duration-200">About Us</a>
            <a href="/Products" className="hover:text-gray-300 transition-colors duration-200">Services</a>
            <a href="/Contact" className="hover:text-gray-300 transition-colors duration-200">Contact Us</a>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} ShopSphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
