"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpecificProduct } from '@/Redux/ProductSlice/ProductRedux';
import { addOrder, fetchOrders } from '@/Redux/OrderSlice/OrderRedux';
import { RootState, AppDispatch } from '@/Redux/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FinalOrderPopUp from '../../Component/finalOrderPopUp';

const Page = ({ params }: any) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { specificProduct, isLoading, isError } = useSelector((state: RootState) => state.products);
  const { Orders } = useSelector((state: RootState) => state.orders);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [product, setProduct] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [quantity, setQuantity] = useState(1); // Default quantity
  const [alreadyAddedQuantity, setAlreadyAddedQuantity] = useState(0); // Default quantity
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchSpecificProduct(params.id as string));
      dispatch(fetchOrders());
    }
  }, [params.id,dispatch]);

  useEffect(() => {
    if (specificProduct) {
      setProduct(specificProduct);
    }
  }, [specificProduct]);

  const handleOrderNowButton = () => {
    if (!isLoggedIn) {
      router.replace('/Login');
    } else {
      if (Orders?.filteredResponse) {
        const existingOrder = Orders.filteredResponse.find(order => order.productDetail._id === params.id);
         if (existingOrder) {
          setAlreadyAddedQuantity(existingOrder.Quantity);
        } else {
          setAlreadyAddedQuantity(0);
        }
      }
      setIsPopupOpen(true);
    }
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleOrder = () => {
    dispatch(addOrder({ ProductId: params.id, Quantity: quantity + alreadyAddedQuantity }));
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      router.replace('/Orders');
    }, 500);
    setIsPopupOpen(false);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (isError) return <div className="text-center p-4 text-red-500">Error loading product</div>;
  if (!product) return <div className="text-center p-4">Product not found</div>;

  return (
    <>
     {showAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2  bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
          Order Placed Successfully
        </div>
      )}
      <Link href="/Products">
        <div className="inline-block bg-blue-600 text-white text-lg font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 ml-2 mt-2">
          &lt;-- More Products
        </div>
      </Link>
      <div className="container mx-auto px-4 py-8 flex flex-col items-center min-h-screen">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl w-full flex flex-col md:flex-row items-center">
          {product.item_Image && (
            <div className="w-full md:w-1/2 h-auto">
              <img
                src={`data:image/jpeg;base64,${product.item_Image}`}
                alt={product.item_Name}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <div className="p-8 md:w-1/2 w-full flex flex-col items-start">
            <h1 className="text-3xl font-bold mb-4">{product.item_Name}</h1>
            <p className="text-gray-800 font-bold text-2xl mb-2">₹{product.item_Price}</p>
            <p className="text-gray-700 mb-4">{product.item_Description}</p>
            <div className="flex items-center mb-4">
              <div
                className={`w-4 h-4 rounded-full mr-2 ${product.featured_Item ? "bg-green-500" : ""}`}
              ></div>
              <p className="text-gray-600">
                {product.featured_Item ? "Featured : Yes" : ""}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center">
          <div className="flex items-center mb-4">
            <button onClick={decreaseQuantity} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">-</button>
            <span className="mx-4 text-xl">{quantity}</span>
            <button onClick={increaseQuantity} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">+</button>
          </div>
          <button onClick={handleOrderNowButton}>
            <div className="inline-block bg-blue-600 text-white text-sm md:text-lg font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">
              Order Now
            </div>
          </button>
        </div>
      </div>
      {isPopupOpen && (
        <FinalOrderPopUp
          product={product}
          quantity={quantity}
          alreadyAddedQuantity={alreadyAddedQuantity}
          onClose={handlePopupClose}
          onOrder={handleOrder}
        />
      )}
     
    </>
  );
};

export default Page;
