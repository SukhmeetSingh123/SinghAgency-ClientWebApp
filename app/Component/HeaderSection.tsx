import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MainPageContent = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="hero-section-data">
          <p className="text-lg font-semibold text-blue-600 mb-2">Welcome to</p>
          <h2 className="text-6xl underline font-bold text-gray-800 mb-4">Singh Agency</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            दो पहिया वाहनों के लिए बोल्ट और नट्स की दुकान:
            <br />
            "दोस्तों आपके दो पहिया वाहन के लिए हमारी विशेष दुकान!"
            <br />
            अब प्राप्त करें वो आवश्यक बोल्ट और नट्स जो आपके वाहन को बनाए और सुरक्षित रखें।
            <br />
            आपके वाहन की जरूरतों को पूरा करने के लिए हमारे पास हर प्रकार के 2 पहिया वाहनों के बोल्ट और नट्स हैं, चाहे वो स्कूटर या  मोटरसाइकिल  हों। हमारे विशेषज्ञ स्टाफ आपके सवालों का समाधान करने में खुशी महसूस करेंगे और आपको सही उत्पाद ढूंढने में मदद करेंगे।
            <br />
            वाहन की सुरक्षा और सही स्थिरता के लिए, हमारे दुकान से खरीदारी करें और आत्मविश्वास के साथ सड़कों पर निकलें! आपका सुरक्षित यातायात हमारी प्राथमिकता है।
            <br />
            "दोस्तों आपके दो पहिया वाहन के सपनों को सहारा देने में हमारी खास दुकान, एक ही छत के नीचे!"
            <br />
            आपका स्वागत है सरदार जी, नट बोल्ट वाले की दुकान पे (सिंग एजेंसी !)
            <br />
          </p>
            <div className="mb-4">
                <p className="text-lg font-semibold">Contact Us :</p>
                <p className="text-gray-700">+91 8318753549</p>
                <p className="text-gray-700">+91 9519347728</p>
            </div>

          <Link href="/Products">
            <div className="inline-block bg-blue-600 text-white text-lg font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300">Shop Now</div>
          </Link>
        </div>
        <div className="hero-section-image">
          <figure className="flex justify-center items-center">
            <Image 
            src="/assets/HeaderImage.jpg" 
            alt="Header Image" 
            className="object-cover rounded-md" 
            width={500}
            height={300} 
            />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default MainPageContent;
