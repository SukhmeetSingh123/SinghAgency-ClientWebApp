import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MainPageContent = () => {
  return (
    <div className="container mx-auto px-6 py-10 lg:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="hero-section-data">
          <p className="text-lg font-semibold text-blue-500 mb-2">Welcome to</p>
          <h2 className="text-4xl font-bold text-gray-800 mb-6 underline underline-offset-4">ShopSphere</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Welcome to <strong>SHOPSPHERE</strong>, the ultimate online marketplace for local shopkeepers!
            <br />
            We are proud to provide a platform where local businesses can showcase and sell their products to a wider audience, making it easier for you to shop from the comfort of your home.
            <br />
            Our mission is to empower small, local shopkeepers by bringing their stores online, allowing them to reach more customers and offer their quality products to anyone, anytime. Whether it's bolts and nuts for two-wheelers, daily essentials, or specialty items, you'll find a wide variety of products listed by trusted local sellers on our website.
            <br />
            For customers, <strong>SHOPSPHERE</strong> makes online shopping convenient, and an easy browsing experience. Now you can support your local businesses and shop for what you need without leaving your house.
            <br />
            We believe in strengthening our local economy and supporting small businesses by bridging the gap between buyers and sellers through technology. Shop now and discover what your neighborhood stores have to offer!
            <br />
            Thank you for choosing <strong>SHOPSPHERE</strong> — your one-stop shop for local products!
          </p>

          <Link href="/Products">
            <div className="inline-block  text-black border border-black text-lg font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-400 transition-all duration-300 ease-in-out transform hover:scale-105">
              Shop Now
            </div>
          </Link>
        </div>

        <div className="hero-section-image">
          <figure className="flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl w-full h-80 shadow-lg">
            <p className="text-white text-6xl font-bold italic tracking-wide drop-shadow-lg">
              SHOPSPHERE
            </p>
          </figure>
        </div>
      </div>
    </div>
  );
};

export default MainPageContent;
