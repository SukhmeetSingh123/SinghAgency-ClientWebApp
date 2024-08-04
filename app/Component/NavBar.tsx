"use client"
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/Redux/store';
import { setLoggedIn  } from '../../Redux/AuthSlice/AuthRedux';
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(setLoggedIn(false))
    localStorage.removeItem('authToken')
  };
  const isAuth=()=>{
    const token=  localStorage.getItem('authToken');
    if(token){
      dispatch(setLoggedIn(true))
    }else{
      dispatch(setLoggedIn(false))
    }
  }
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    isAuth()
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-800 h-20 flex items-center p-0 m-0 relative">
      <div className="container mx-auto flex justify-between items-center h-full px-4">
        <div className="text-2xl text-white font-medium italic ml-4">Singh Agency</div>
        <div className="hidden md:flex space-x-4">
          <Link href="/">
            <div className="text-white hover:text-gray-400">Home</div>
          </Link>
          <Link href="/About">
            <div className="text-white hover:text-gray-400">About</div>
          </Link>
          <Link href="/Products">
            <div className="text-white hover:text-gray-400">All Products</div>
          </Link>
          <Link href="/Contact">
            <div className="text-white hover:text-gray-400">Contact Us</div>
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/Orders">
                <div className="text-white hover:text-gray-400 flex items-center">
                  <FaShoppingCart className="w-6 h-6 mr-2" />
                  Orders
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 hover:bg-red-700 px-4 py-1 rounded focus:outline-none"
              >
                LogOut
              </button>
            </>
          ) : (
            <Link href="/Login">
              <div className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded focus:outline-none">Login</div>
            </Link>
          )}
        </div>
        <div className="md:hidden relative">
          <button
            onClick={toggleDropdown}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10"
            >
              <Link href="/" onClick={toggleDropdown}>
                <div className="block px-4 py-2 text-white hover:bg-gray-700">Home</div>
              </Link>
              <Link href="/About" onClick={toggleDropdown}>
                <div className="block px-4 py-2 text-white hover:bg-gray-700">About</div>
              </Link>
              <Link href="/Products" onClick={toggleDropdown}>
                <div className="block px-4 py-2 text-white hover:bg-gray-700">All Products</div>
              </Link>
              <Link href="/Contact" onClick={toggleDropdown}>
                <div className="block px-4 py-2 text-white hover:bg-gray-700">Contact Us</div>
              </Link>
              {isLoggedIn ? (
            <>
              <Link href="/Orders">
                <div className="text-white hover:text-gray-400 flex items-center">
                  <FaShoppingCart className="w-6 h-6 mr-2" />
                  Orders
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 m-2 hover:bg-red-700 px-4 py-1 rounded focus:outline-none"
              >
                LogOut
              </button>
            </>
          ) : (
            <Link href="/Login">
              <div className="text-white m-2 bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded focus:outline-none">Login</div>
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
