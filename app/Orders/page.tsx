"use client";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../Redux/store';
import { useRouter } from 'next/navigation';
import { fetchOrders, deleteOrder } from '@/Redux/OrderSlice/OrderRedux';
import { setLoggedIn } from '@/Redux/AuthSlice/AuthRedux';
import { FaTrash } from 'react-icons/fa';
import Link from 'next/link';

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { Orders } = useSelector((state: RootState) => state.orders);

  const isAuth = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      dispatch(setLoggedIn(true));
    } else {
      dispatch(setLoggedIn(false));
      router.replace('/Login');
    }
  };

  const handleDelete = async (orderId: string, productId: string) => {
    await dispatch(deleteOrder({ orderId, productId }));
    await dispatch(fetchOrders());
  };

  useEffect(() => {
    isAuth();
    dispatch(fetchOrders());
  }, [isLoggedIn]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Your Orders</h1>
      <Link href="/Products">
        <div className="inline-block mb-2  text-black border border-black text-lg font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-300 mt-6">
          &lt;-- Check Out More Products
        </div>
      </Link>
      <div className="space-y-4 flex flex-col items-center">
        {!Orders?._id ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          Orders?.filteredResponse.map((order: any, index: any) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4 w-full sm:w-3/4 flex flex-col items-start transition-transform transform hover:scale-105">
              <div className="flex flex-col md:flex-row items-center w-full">
                <img
                  src={`data:image/jpeg;base64,${order.productDetail.item_Image}`}
                  alt={order.productDetail.item_Name}
                  className="w-24 h-24 rounded-full border-2 border-blue-500 mr-4"
                />
                <div className="flex-1 mt-2 md:mt-0">
                  <h2 className="text-xl font-bold text-gray-800">{order.productDetail.item_Name}</h2>
                  <p className="text-gray-600">{order.productDetail.item_Description}</p>
                  <p className="text-gray-800 font-semibold">Rate: ₹{order.productDetail.item_Price}</p>
                  <p className="text-gray-800 font-semibold">Quantity: {order.Quantity}</p>
                  <p className="text-gray-800 font-semibold">Total Price: ₹{order.productDetail.item_Price * order.Quantity}</p>
                  <button
                    onClick={() => handleDelete(Orders._id, order.productDetail._id)}
                    className="flex items-center text-red-500 hover:text-red-700 mt-3"
                  >
                    <FaTrash size={20} className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;
