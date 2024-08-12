"use client";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../Redux/store';
import { useRouter } from 'next/navigation';
import { fetchOrders, deleteOrder, addOrder } from '@/Redux/OrderSlice/OrderRedux';
import { setLoggedIn } from '@/Redux/AuthSlice/AuthRedux';
import { FaTrash } from 'react-icons/fa';
import Link from 'next/link';

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { Orders } = useSelector((state: RootState) => state.orders);

  const [orderQuantities, setOrderQuantities] = useState<{ [key: string]: number }>({});
  const [quantityChangedButton, setQuantityChangedButton] = useState<{ [key: string]: boolean }>({});
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


  // const handleQuantityChange = (orderId: string, productId: string, change: number) => {
  //   const key = `${orderId}-${productId}`;
  //   const newQuantity = (orderQuantities[key] || 1) + change;
  //   if (newQuantity <= 0) return; // Prevent quantity from going below 1

  //   setOrderQuantities(prev => ({ ...prev, [key]: newQuantity }));
  //   setQuantityChangedButton(prev => ({ ...prev, [key]: true }));
  // };


  // const handleChangeQuantity=async(orderId: string, productId: string)=>{
  //   const key = `${orderId}-${productId}`;
  //   const newQuantity = (orderQuantities[`${orderId}-${productId}`] || 1) ;
  //   await dispatch(addOrder({ ProductId: productId, Quantity: newQuantity }));
  //   await dispatch(fetchOrders());
  //   setQuantityChangedButton(prev => ({ ...prev, [key]: false }));
  // }

  useEffect(() => {
    isAuth();
    dispatch(fetchOrders());
  }, [isLoggedIn]);

  useEffect(() => {
    if (Orders?.filteredResponse) {
      const initialQuantities: { [key: string]: number } = {};
      const initialQuantityChanged: { [key: string]: boolean } = {};
      Orders.filteredResponse.forEach((order: any) => {
        const key = `${order._id}-${order.productDetail._id}`;
        initialQuantities[key] = order.Quantity;
        initialQuantityChanged[key] = false;
      });
      setOrderQuantities(initialQuantities);
      setQuantityChangedButton(initialQuantityChanged);
    }
  }, [Orders]);
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Your Orders</h1>
      <Link href="/Products">
        <div className="inline-block mb-2 bg-blue-600 text-white text-lg font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 mt-6">
          &lt;-- Check Out More Products
        </div>
      </Link>
      <div className="space-y-4 flex flex-col items-center">
        {!Orders?._id ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          Orders?.filteredResponse.map((order: any, index: any) => {
            const key = `${order._id}-${order.productDetail._id}`;
            return (
              <div key={index} className="bg-white shadow-md rounded-lg p-4 w-full sm:w-3/4 flex flex-col items-start">
                <div className="flex flex-col md:flex-row items-center w-full">
                  <img
                    src={`data:image/jpeg;base64,${order.productDetail.item_Image}`}
                    alt={order.productDetail.item_Name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div className="flex-1 mt-2 md:mt-0">
                    <h2 className="text-xl font-bold">{order.productDetail.item_Name}</h2>
                    <p className="text-gray-700">{order.productDetail.item_Description}</p>
                    <p className="text-gray-800 font-semibold">Rate: ₹{order.productDetail.item_Price}</p>
                    <p className="text-gray-800 font-semibold">Quantity: {order.Quantity}</p>
                    <p className="text-gray-800 font-semibold">Total Price: ₹{order.productDetail.item_Price * order.Quantity}</p>
                    {/* <div className="flex items-center space-x-2 mt-2">
                      <div>Change Quantity:</div>
                      <button
                        onClick={() => handleQuantityChange(order._id, order.productDetail._id, -1)}
                        className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-400"
                      >
                        -
                      </button>
                      <div>
                        {orderQuantities[key] || order.Quantity}
                      </div>
                      <button
                        onClick={() => handleQuantityChange(order._id, order.productDetail._id, 1)}
                        className="bg-gray-300 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div> */}
                    {/* <div className="flex space-x-2 mt-2">
                      {quantityChangedButton[key] && (
                        <button
                          className="text-white hover:text-gray-400 bg-blue-600 p-2 rounded"
                          onClick={() => handleChangeQuantity(order._id, order.productDetail._id)}
                        >
                          Confirm Quantity
                        </button>
                      )} */}
                      <button
                        onClick={() => handleDelete(Orders._id, order.productDetail._id)}
                        className="text-red-500 hover:text-red-700 mt-3"
                      >
                        <FaTrash size={25} />
                      </button>
                    </div>
                  </div>
                </div>
              // </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Page;
