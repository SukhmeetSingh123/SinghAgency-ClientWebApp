"use client";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../Redux/store';
import { fetchProducts } from '../../Redux/ProductSlice/ProductRedux';
import { Product } from '@/Redux/ProductSlice/ProductRedux';
import Link from 'next/link';

const ProductPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { Product, isLoading, isError } = useSelector((state: RootState) => state.products);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const filteredProducts = Product.filter((product) =>
    product.item_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (isError) return <div className="text-center p-4 text-red-500">Error loading products</div>;
  if (!Product) return <div className="text-center p-4">No Item Currently Present ..</div>;
  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-4 mb-8">
        <Link href="/">
          <div className="inline-block bg-blue-600 text-white text-sm md:text-lg font-semibold py-1 md:py-2 px-2 md:px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 mb-2 md:mb-0">
            &lt;-- Go Back To Home
          </div>
        </Link>
        <input
          type="text"
          placeholder="Search products..."
          className="flex-grow p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:ml-4 mb-4 md:mb-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500">No Product of such Name Found...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product: Product) => (
            <Link key={product._id} href={`/Products/${product._id}`}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer">
                {product.item_Image && (
                  <img
                    src={`https://singhagency-backened.onrender.com/${product.item_Image}`}
                    alt={product.item_Name}
                    className="w-full h-64 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">{product.item_Name}</h3>
                  <p className="text-gray-800 font-bold">₹{product.item_Price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
