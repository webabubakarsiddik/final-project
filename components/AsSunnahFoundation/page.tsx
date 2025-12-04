// components/AsSunnahFoundation/page.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdInfoOutline } from 'react-icons/md';
// ✅ useLanguage হুকটি ইম্পোর্ট করুন
import { useLanguage } from '@/src/context/LanguageContext'; // সঠিক পাথ ব্যবহার করা হলো


const AsSunnahFoundation: React.FC = () => {
    // ✅ Context থেকে ট্রান্সলেশন অবজেক্ট (t) নিন
    const { t } = useLanguage(); 

    return (
        <div className="relative font-sans">
            {/* Hero Section */}
            <div className="relative h-[80vh] w-full overflow-hidden">
                {/* Background Image */}
                <Image
                    src='/hero-bg.jpg' 
                    alt={t.logoAlt} 
                    fill
                    priority
                    className="absolute z-0 object-cover filter brightness-[0.4]"
                />
                {/* Overlay Pattern (Optional) */}
                <div
                    className="absolute inset-0 z-10 bg-black opacity-20 mix-blend-overlay"
                    style={{
                        backgroundImage: 'url(/)', 
                        backgroundSize: '150px',
                        backgroundRepeat: 'repeat',
                    }}
                ></div>

                {/* Content */}
                <div className="relative z-20 container mx-auto px-4 md:px-6 h-full flex flex-col justify-center text-white">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            {t.heroTitle}
                        </h1>
                        <p className="text-lg md:text-xl mb-8 max-w-3xl leading-relaxed opacity-90">
                            {t.heroDesc}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/about" // মেনু থেকে সরাসরি href ব্যবহার করা নিরাপদ নয়, তাই হার্ডকোড রাখা হলো।
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded transition duration-300 text-center"
                            >
                                {t.btnKnowMore}
                            </Link>
                            <Link
                                href="/activities"
                                className="bg-transparent hover:bg-white/10 text-white font-bold py-3 px-8 rounded border-2 border-white transition duration-300 text-center"
                            >
                                {t.btnActivities}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Donation Form Section */}
            <div className="bg-[#F4C76E] py-16 relative">
                <div
                    className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: 'url(/hero-bg.jpg)', 
                        backgroundSize: '150px',
                        backgroundRepeat: 'repeat',
                    }}
                ></div>

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-900">
                        {t.donationTitle}
                    </h2>

                    <div className="bg-white/20 backdrop-blur-sm p-6 md:p-10 rounded-xl shadow-sm max-w-5xl mx-auto">
                        <div className="flex flex-wrap items-end justify-center gap-6">
                            {/* Fund Selection */}
                            <div className="flex-1 min-w-[280px]">
                                <label
                                    className="block text-left text-gray-800 text-base font-semibold mb-3"
                                    htmlFor="fund"
                                >
                                    {t.labelFund} <span className="text-red-600">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        id="fund"
                                        className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            {t.selectDefault}
                                        </option>
                                        <option value="general">{t.fundGeneral}</option>
                                        <option value="zakat">{t.fundZakat}</option>
                                        <option value="flood">{t.fundFlood}</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                                        <svg
                                            className="fill-current h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Input */}
                            <div className="flex-1 min-w-[280px]">
                                <label
                                    className=" text-left text-gray-800 text-base font-semibold mb-3 flex items-center"
                                    htmlFor="contact"
                                >
                                    {t.labelContact} <span className="text-red-600">*</span>
                                    <MdInfoOutline
                                        className="ml-2 text-gray-600 cursor-help text-lg"
                                        title={t.tooltipContact}
                                    />
                                </label>
                                <input
                                    type="text"
                                    id="contact"
                                    placeholder={t.placeholderContact}
                                    className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-4 px-5 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            {/* Amount Input */}
                            <div className="flex-1 min-w-[280px]">
                                <label
                                    className="block text-left text-gray-800 text-base font-semibold mb-3"
                                    htmlFor="amount"
                                >
                                    {t.labelAmount} <span className="text-red-600">*</span>
                                </label>
                                <div className="flex items-center border border-gray-300 rounded-lg shadow-sm bg-white overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
                                    <span className="px-5 py-4 bg-gray-100 text-gray-600 border-r border-gray-300 font-medium">
                                        ৳
                                    </span>
                                    <input
                                        type="number"
                                        id="amount"
                                        placeholder={t.placeholderAmount}
                                        min="1"
                                        className="appearance-none w-full py-4 px-5 text-gray-700 leading-tight focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex-none w-full md:w-auto mt-4 md:mt-0">
                                <button className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 px-10 rounded-lg transition duration-300 text-lg shadow-md">
                                    {t.btnDonate}
                                </button>
                            </div>
                        </div>
                    </div>

                    <p className="text-base text-gray-900 mt-8 text-center font-medium">
                        {t.taxInfo}{' '}
                        <Link
                            href={t.taxHref}
                            className="text-green-800 hover:text-green-900 underline font-semibold"
                        >
                            {t.taxLink}
                        </Link>
                    </p>
                </div>
            </div>

            {/* Floating Chat/Support Icon (অপরিবর্তিত) */}
            <button
                aria-label="Chat Support"
                className="fixed bottom-6 right-6 bg-green-600 text-white p-4 rounded-full shadow-2xl hover:bg-green-700 transition duration-300 z-50 group"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-7 w-7 group-hover:scale-110 transition-transform"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                </svg>
            </button>
        </div>
    );
};

export default AsSunnahFoundation;