"use client"
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, setLoggedIn } from '../../Redux/AuthSlice/AuthRedux';
import { RootState, AppDispatch } from '../../Redux/store';
import { useRouter } from 'next/navigation';


const RegisterPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {loading,SignUpError} = useSelector((state: RootState) => state.auth);
  const [showAlert, setShowAlert] = useState(false);
  const [passwordAlert, setPasswordAlert] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: ''
  });

  useEffect(() => {
    if (SignUpError) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [SignUpError]);

  const validatePassword = (password: string, confirmPassword: string) => {
    if (password === confirmPassword) return true;
    setPasswordAlert("Oops! Your passwords don't match. Please check and try again");
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setPasswordAlert('');
    }, 2000);
    return false;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validatePassword(formData.password, formData.confirmPassword)) {
      return;
    }

    const response=await dispatch(registerUser({
      Name: formData.username,
      Email: formData.email,
      Password: formData.password,
      ContactNumber: formData.contactNumber,
      navigate: router.replace 
    }));

    if (registerUser.fulfilled.match(response)) {
      if (response.payload.success) {
        dispatch(setLoggedIn(true));
      }
    } 
  
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-10">
      {showAlert && (
        <div className="absolute top-16 w-full max-w-md bg-red-500 text-white py-2 px-4 rounded text-center mx-auto">
          {SignUpError}
        </div>
      )}
      {passwordAlert && (
        <div className="absolute top-16 w-full max-w-md bg-red-500 text-white py-2 px-4 rounded text-center mx-auto">
          {passwordAlert}
        </div>
      )}
      <div className="bg-white p-10 shadow-lg rounded-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter username"
            />
          </div>
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
              placeholder="Enter email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter contact number"
            />
          </div>
          <div className="mb-4">
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
              minLength={5}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter password"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={5}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Confirm password"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
