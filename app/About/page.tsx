import React from 'react'
import HeaderSection from "../Component/HeaderSection"
import Link from 'next/link';
const page = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeaderSection/>
      <Link href="/">
            <div className="inline-block  text-black border border-black text-lg font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-300">
             &lt;-- Go Back To Home
              </div>
      </Link>
    </div>
  )
}

export default page
