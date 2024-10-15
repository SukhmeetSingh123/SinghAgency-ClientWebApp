import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">ShopSphere</h2>
            <p className="text-gray-400">
            Welcome to <strong>SHOPSPHERE</strong>, the ultimate online marketplace for local shopkeepers!
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mb-4 md:mb-0">
            <a href="/About" className="hover:text-gray-400">About Us</a>
            <a href="/Products" className="hover:text-gray-400">Services</a>
            <a href="/Contact" className="hover:text-gray-400">Contact Us</a>
            {/* <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a> */}
          </div>
        </div>
        {/* <div className="text-gray-400">To Have Your Own WebSite Contact On :- +91 9116290699</div> */}
        <div className="text-center text-gray-500 mt-4">
          &copy; {new Date().getFullYear()} ShopSphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
