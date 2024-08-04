"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser,setLoggedIn  } from '../../Redux/AuthSlice/AuthRedux';
import { RootState, AppDispatch } from '../../Redux/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const page = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, loginError } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (loginError) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loginError]);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit =async (e: FormEvent) => {
    e.preventDefault();
   const response=await dispatch(logInUser({
      Email: formData.email,
      Password: formData.password,
      navigate: router.replace
    }));

    if (logInUser.fulfilled.match(response)) {
      if (response.payload.success) {
        dispatch(setLoggedIn(true));
      }
    } 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-10">
      {showAlert && (
        <div className="absolute top-16 w-full max-w-md bg-red-500 text-white py-2 px-4 rounded text-center mx-auto">
          {loginError}
        </div>
      )}

      <div className="bg-white p-10 shadow-lg rounded-lg w-full max-w-lg ">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

            <div className="mt-6 text-center">
              <Link href="/SignUp">
                <div className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                  Don't have an account? Sign up here.
                </div>
              </Link>
            </div>

        </form>
      </div>
    </div>
  );

};

export default page;
