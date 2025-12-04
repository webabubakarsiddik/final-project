
'use client'; 

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import AsSunnahFoundation from '@/components/AsSunnahFoundation/page';
import { useLanguage } from '@/src/context/LanguageContext';


const menuItems = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { key: 'activities', href: '/activities' },
    { key: 'gallery', href: '/gallery' },
    { key: 'joinUs', href: '/join-us' },
    { key: 'blog', href: '/blog' },
    { key: 'notice', href: '/notice' },
    { key: 'contact', href: '/contact' },
];

const PublicHeader: React.FC = () => {
    // ✅ ২. useLanguage হুক ব্যবহার করে প্রয়োজনীয় মানগুলো নিন
    const { currentLang, t, setLanguage } = useLanguage();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // 🌟 ভাষা পরিবর্তন ফাংশনে টোস্ট যুক্ত করা হলো (Context এর setLanguage ফাংশন ব্যবহার করে)
    const handleToggleLanguage = (lang: 'bn' | 'en') => {
        setLanguage(lang); // Context এর ফাংশন কল করা হলো

        if (lang === 'bn') {
            toast.success('ভাষা পরিবর্তন করে বাংলা করা হলো।', { 
                position: 'top-right' 
            });
        } else {
            toast.success('Language changed to English.', { 
                position: 'top-right' 
            });
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const visibleMobileItems = menuItems.slice(0, 4);
    const hiddenMobileItems = menuItems.slice(4);

    return (
        <>
            <header className="bg-[#e8e9e6] shadow-xl sticky top-0 z-50">
            <Toaster /> 

            {/* navbar-content (Desktop/Tablet) */}
            <div className="max-w-7xl mx-auto flex items-center justify-between p-3 sm:px-6 lg:px-8">
                
                {/* ১. বামদিকের লোগো এরিয়া */}
                <Link href="/" className="flex items-center space-x-5 transition duration-200 opacity-90 hover:opacity-100">
                    <Image
                        src="/logo.svg" 
                        alt={t.logoAlt}
                        width={100} 
                        height={100} 
                        className="rounded-full shadow-lg"
                    />
                </Link>

                {/* ২. মাঝখানের মেনু আইটেম (Desktop) */}
                <nav className="hidden lg:flex main-menu space-x-1 xl:space-x-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.key} 
                                href={item.href}
                                className={`
                                    text-gray-700 text-sm font-medium transition duration-200 px-3 py-2 rounded-lg 
                                    whitespace-nowrap hover:bg-gray-200 hover:text-[#008037] hover:font-semibold
                                    ${isActive 
                                        ? 'text-[#008037] font-extrabold'
                                        : ''}
                                `}
                            >
                                {t.menu[item.key]}
                            </Link>
                          
                        );
                    })}
                </nav>

                {/* ৩. ডানদিকের ইউটিলিটি এবং অ্যাকশন বাটন */}
                <div className="flex items-center space-x-3 sm:space-x-4">
                    {/* ভাষা পরিবর্তন টগল (ডেস্কটপে) */}
                    <div className="flex rounded-lg overflow-hidden shadow-md">
                        {/* বাংলা বাটন */}
                        <span 
                            onClick={() => handleToggleLanguage('bn')}
                            className={`
                                text-sm font-bold py-2 px-3 cursor-pointer transition 
                                ${currentLang === 'bn' 
                                    ? 'bg-[#008037] text-white shadow-inner' 
                                    : 'bg-[#b3e3c8] text-gray-800 hover:bg-[#97cfb4]'
                                }
                            `}
                        >
                            {t.langBn}
                        </span>
                        {/* EN বাটন */}
                        <span 
                            onClick={() => handleToggleLanguage('en')}
                            className={`
                                text-sm font-bold py-2 px-3 cursor-pointer border-l border-gray-200 transition 
                                ${currentLang === 'en' 
                                    ? 'bg-[#008037] text-white shadow-inner' 
                                    : 'bg-white text-gray-800 hover:bg-gray-50'
                                }
                            `}
                        >
                            {t.langEn}
                        </span>
                    </div>
                    
                    {/* ব্যবহারকারী আইকন */}
                    <div className="bg-white p-2 rounded-full shadow-md cursor-pointer transition duration-150 hover:bg-gray-100 transform hover:scale-105 active:scale-95">
                        <span className="text-xl text-gray-600">👤</span>
                    </div>

                    {/* অ্যাকশন বাটন - দান করুন */}
                    <button className="bg-[#008037] hover:bg-[#00662d] text-white font-extrabold text-base py-2 px-4 rounded-full shadow-xl transition duration-300 transform active:scale-95">
                        {t.button}
                    </button>
                </div>
            </div>
            
            {/* ছোট স্ক্রিনের জন্য (Mobile Menu Area) */}
            <div className="lg:hidden relative"> 
                <nav className="main-menu flex justify-around p-2 border-t border-gray-300 bg-white">
                    {/* মোবাইল মেনু: প্রথম ৪টি আইটেম */}
                    {visibleMobileItems.map((item) => {
                        const isActive = pathname === item.href; 

                        return (
                            <Link
                                key={item.key}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`
                                    text-gray-700 text-xs font-medium transition duration-200 px-1.5 py-2 whitespace-nowrap
                                    ${isActive 
                                        ? 'text-[#008037] font-extrabold border-b-2 border-[#008037]'
                                        : 'hover:text-[#008037]'}
                                `}
                            >
                                {t.menu[item.key]}
                            </Link>
                        );
                    })}
                    
                    {/* থ্রি ডট মেনু বাটন */}
                    <div 
                        onClick={toggleMobileMenu} 
                        className={`
                            text-gray-700 text-xs font-medium transition duration-200 px-1.5 py-2 cursor-pointer relative
                            ${isMobileMenuOpen ? 'text-[#008037] font-extrabold' : 'hover:text-[#008037]'}
                        `}
                    >
                        {isMobileMenuOpen ? (
                            <span className="text-sm font-extrabold">✕</span>
                        ) : (
                            <span className="text-lg font-extrabold">⋮</span>
                        )}
                        
                        {/* ড্রপডাউন মেনু */}
                        {isMobileMenuOpen && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10 p-2"> 
                                <span className="block text-sm font-bold p-2 text-gray-800 border-b mb-1">{t.more}</span>
                                {hiddenMobileItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <Link
                                            key={item.key}
                                            href={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`
                                                block text-sm px-2 py-1 rounded transition duration-150 whitespace-nowrap
                                                ${isActive 
                                                    ? 'bg-[#008037] text-white font-bold' 
                                                    : 'text-gray-700 hover:bg-gray-100 hover:text-[#008037]'}
                                            `}
                                        >
                                            {t.menu[item.key]}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </nav>
            </div>
            </header>
            <AsSunnahFoundation/>
        </>

    );
};

export default PublicHeader;