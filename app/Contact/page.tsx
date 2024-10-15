import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Feel Free to Contact Us</h2>
            <div className="mb-4">
                {/* <p className="text-lg font-semibold">Phone Numbers:</p>
                <p className="text-gray-700">+91 8318753549</p>
                <p className="text-gray-700">+91 9519347728</p> */}
            </div>
            {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3562.6615007494233!2d83.3605844752186!3d26.755176076741467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991446628555557%3A0xd4a849698a1f547d!2sSingh%20Agency!5e0!3m2!1sen!2sin!4v1722238953738!5m2!1sen!2sin"
                width="100%"
                height="450"
                className="border-0 mt-4"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
            </iframe> */}
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2145.532052949126!2d77.11498564318818!3d28.631543182417122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0351baff6933%3A0x48a94e3504dadb9e!2sGuru%20Tegh%20Bahadur%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1728976733277!5m2!1sen!2sin" 
            width="100%"
            height="450"
            className="border-0 mt-4"
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
            </iframe>

            <Link href="/">
                <div className="inline-block bg-blue-600 text-white text-lg font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 mt-6">
                    &lt;-- Go Back To Home
                    </div>
            </Link>
        </div>
    )
}

export default page
