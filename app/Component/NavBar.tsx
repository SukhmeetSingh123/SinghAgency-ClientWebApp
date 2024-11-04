"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/store';
import { setLoggedIn } from '../../Redux/AuthSlice/AuthRedux';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    dispatch(setLoggedIn(false));
    localStorage.removeItem('authToken');
  };

  const checkAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    dispatch(setLoggedIn(!!token));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/About", label: "About" },
    { href: "/Products", label: "All Products" },
    { href: "/Contact", label: "Contact Us" }
  ];

  return (
    <nav className="bg-gray-800 h-20 flex items-center relative">
      <div className="container mx-auto flex justify-between items-center h-full px-4">
        <div className="text-2xl text-white font-medium italic">ShopSphere</div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="text-white hover:text-gray-400">{link.label}</div>
            </Link>
          ))}
          {isLoggedIn ? (
            <>
              <Link href="/Orders">
                <div className="text-white hover:text-gray-400 flex items-center">
                  <FaShoppingCart className="w-6 h-6 mr-2" /> Orders
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 hover:bg-red-700 px-4 py-1 rounded focus:outline-none"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link href="/Login">
              <div className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded focus:outline-none">
                Login
              </div>
            </Link>
          )}
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden relative">
          <button onClick={toggleDropdown} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          {isOpen && (
            <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                  <div className="block px-4 py-2 text-white hover:bg-gray-700">{link.label}</div>
                </Link>
              ))}
              {isLoggedIn ? (
                <>
                  <Link href="/Orders" onClick={() => setIsOpen(false)}>
                    <div className="block px-4 py-2 text-white hover:bg-gray-700 flex items-center">
                      <FaShoppingCart className="w-5 h-5 mr-2" /> Orders
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded focus:outline-none"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <Link href="/Login" onClick={() => setIsOpen(false)}>
                  <div className="block px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded focus:outline-none">
                    Login
                  </div>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
