"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../Redux/store';
import { fetchProducts } from '../../Redux/ProductSlice/ProductRedux';
const FeaturedProducts = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { featuredProducts, isLoading, isError } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    if (isLoading) return <div className="text-center p-4">Loading...</div>;
    if (isError) return <div className="text-center p-4 text-red-500">Error loading products</div>;
    if (!featuredProducts) return <div className="text-center p-4">No Featured Item Currently Present ..</div>;
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Products</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {featuredProducts.map((product) => (
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

            <Link href="/Products">
                <div className="inline-block bg-blue-600 text-white text-lg font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 mt-8">
                    More Products &rarr;
                </div>
            </Link>
        </div>
    );
}

export default FeaturedProducts
