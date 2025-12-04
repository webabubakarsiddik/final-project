// src/context/LanguageContext.tsx

'use client'; // ক্লায়েন্ট কম্পোনেন্ট ডিরেক্টিভ যুক্ত করা হলো

import React, { createContext, useState, useContext, ReactNode } from 'react';
import toast from 'react-hot-toast'; 

// === ১. ট্রান্সলেশন অবজেক্টের জন্য ইন্টারফেস ===
interface Translation {
    menu: { [key: string]: string };
    button: string;
    langBn: string;
    langEn: string;
    logoAlt: string;
    more: string;
    
    // AsSunnahFoundation এর জন্য নতুন কী:
    heroTitle: string;
    heroDesc: string;
    btnKnowMore: string;
    btnActivities: string;
    donationTitle: string;
    labelFund: string;
    selectDefault: string;
    fundGeneral: string;
    fundZakat: string;
    fundFlood: string;
    labelContact: string;
    placeholderContact: string;
    tooltipContact: string;
    labelAmount: string;
    placeholderAmount: string;
    btnDonate: string;
    taxInfo: string;
    taxLink: string;
    taxHref: string;

}

// === ২. Language Context টাইপ ===
interface LanguageContextType {
    currentLang: 'bn' | 'en';
    t: Translation; 
    setLanguage: (lang: 'bn' | 'en') => void; 
}

// === ৩. ট্রান্সলেশন ডেটা (AsSunnahFoundation এর কন্টেন্ট সহ) ===
export const translations: { bn: Translation; en: Translation } = {
    bn: {
        menu: {
            home: 'হোম',
            about: 'আমাদের সম্পর্কে',
            activities: 'কার্যক্রমসমূহ',
            gallery: 'গ্যালারি',
            joinUs: 'আমাদের সাথে যুক্ত হন',
            blog: 'ব্লগ',
            notice: 'নোটিশ',
            contact: 'যোগাযোগ',
        },
        button: 'দান করুন',
        langBn: 'বাংলা',
        langEn: 'EN',
        logoAlt: 'ডি-সুন্নাহ ফাউন্ডেশন লোগো',
        more: 'আরও',

        // AsSunnahFoundation - বাংলা
        heroTitle: 'আস-সুন্নাহ ফাউন্ডেশন',
        heroDesc: 'আস-সুন্নাহ ফাউন্ডেশন একটি অরাজনৈতিক, অলাভজনক শিক্ষা, দাওয়াহ ও পূর্ণত মানবকল্যাণে নিবেদিত সেবামূলক সরকার-নিবন্ধিত প্রতিষ্ঠান। নিবন্ধন নম্বর: এস-১৩১১১/২০১৯।',
        btnKnowMore: 'আরও জানুন',
        btnActivities: 'কার্যক্রমসমূহ',
        donationTitle: 'আপনার অনুদান প্রদান করুন',
        labelFund: 'তহবিল',
        selectDefault: 'নির্বাচন করুন',
        fundGeneral: 'সাধারণ তহবিল',
        fundZakat: 'যাকাত ফান্ড',
        fundFlood: 'বন্যা দুর্গতদের সাহায্য',
        labelContact: 'মোবাইল / ইমেইল',
        placeholderContact: 'মোবাইল নম্বর / ইমেইল লিখুন',
        tooltipContact: 'আপনার সাথে যোগাযোগের জন্য এবং ডোনেশন কনফার্মেশনের জন্য',
        labelAmount: 'পরিমাণ',
        placeholderAmount: 'সংখ্যায় লিখুন',
        btnDonate: 'দান করুন',
        taxInfo: 'আস-সুন্নাহ ফাউন্ডেশনে দান করলে কর রেয়াত পাবেন।',
        taxLink: 'বিস্তারিত জানতে ক্লিক করুন।',
        taxHref: '/tax-info',
    },
    en: {
        menu: {
            home: 'Home',
            about: 'About Us',
            activities: 'Activities',
            gallery: 'Gallery',
            joinUs: 'Join Us',
            blog: 'Blog',
            notice: 'Notice',
            contact: 'Contact',
        },
        button: 'Donate',
        langBn: 'Bangla',
        langEn: 'EN',
        logoAlt: 'DE-SUNNAH FOUNDATION Logo',
        more: 'More',

        // AsSunnahFoundation - English
        heroTitle: 'As-Sunnah Foundation',
        heroDesc: 'As-Sunnah Foundation is a non-political, non-profit, government-registered organization dedicated to education, Da’wah, and total human welfare. Registration No: S-13111/2019.',
        btnKnowMore: 'Know More',
        btnActivities: 'Activities',
        donationTitle: 'Provide Your Donation',
        labelFund: 'Fund',
        selectDefault: 'Select',
        fundGeneral: 'General Fund',
        fundZakat: 'Zakat Fund',
        fundFlood: 'Flood Relief',
        labelContact: 'Mobile / Email',
        placeholderContact: 'Enter Mobile Number / Email',
        tooltipContact: 'For communication and donation confirmation',
        labelAmount: 'Amount',
        placeholderAmount: 'Enter in numbers',
        btnDonate: 'Donate',
        taxInfo: 'Donating to As-Sunnah Foundation is eligible for tax exemption.',
        taxLink: 'Click here for details.',
        taxHref: '/tax-info',
    },
};


// === ৪. Context তৈরি করা ===
export const LanguageContext = createContext<LanguageContextType>({
    currentLang: 'bn',
    t: translations.bn,
    setLanguage: () => {}, 
});

// ---

// 📦 Language Provider কম্পোনেন্ট
interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [currentLang, setCurrentLang] = useState<'bn' | 'en'>('bn');

    const setLanguage = (lang: 'bn' | 'en') => {
        setCurrentLang(lang);
        
        if (lang === 'bn') {
            toast.success('ভাষা পরিবর্তন করে বাংলা করা হলো।', { 
                position: 'top-left' 
            });
        } else {
            toast.success('Language changed to English.', { 
                position: 'top-left' 
            });
        }
    };

    const contextValue: LanguageContextType = {
        currentLang,
        t: translations[currentLang],
        setLanguage,
    };

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
};

// 🎣 কাস্টম হুক
export const useLanguage = () => useContext(LanguageContext);