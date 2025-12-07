'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { Tally3, X } from 'lucide-react';
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
  const { currentLang, t, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const visibleMobileItems = menuItems.slice(0, 4);
  const hiddenMobileItems = menuItems.slice(4);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const MenuLink = ({ item, isMobile = false }: { item: typeof menuItems[0]; isMobile?: boolean }) => {
    const isActive = pathname === item.href;
    return (
      <Link
        key={item.key}
        href={item.href}
        onClick={() => isMobile && setMobileMenuOpen(false)}
        className={`relative block px-2 py-1 rounded text-sm font-medium transition-colors ${
          isActive ? 'text-[#008037]' : 'text-gray-700 hover:text-[#008037] hover:bg-gray-100'
        }`}
      >
        {t.menu[item.key]}

        {/* Sliding underline for desktop & mobile */}
        <span
          className={`absolute bottom-0 left-0 h-0.5 bg-[#008037] rounded transition-all duration-300 ${
            isActive ? 'w-full' : 'w-0'
          }`}
        ></span>
      </Link>
    );
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-xl' : 'bg-[#e8e9e6]'
        }`}
      >
        <Toaster />

        {/* Desktop Navbar */}
        <div className="max-w-7xl mx-auto flex items-center justify-between p-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center space-x-5 opacity-90 hover:opacity-100 transition">
            <Image src="/logo.svg" alt={t.logoAlt} width={100} height={100} className="rounded-full shadow-lg" />
          </Link>

          <nav className="hidden lg:flex space-x-1">
            {menuItems.map((item) => (
              <MenuLink key={item.key} item={item} />
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            {/* Language Toggle */}
            <div className="flex rounded-lg overflow-hidden shadow-md">
              {['bn', 'en'].map((lang) => (
                <span
                  key={lang}
                  onClick={() => setLanguage(lang as 'bn' | 'en')}
                  className={`px-3 py-2 text-sm font-bold cursor-pointer transition ${
                    currentLang === lang ? 'bg-[#008037] text-white' : 'bg-[#b3e3c8] text-gray-800 hover:bg-[#97cfb4]'
                  }`}
                >
                  {lang === 'bn' ? t.langBn : t.langEn}
                </span>
              ))}
            </div>

                {/* User Icon (Desktop Only) */}
                <div className="hidden lg:flex items-center justify-center bg-white p-2 rounded-full shadow-md cursor-pointer 
                    hover:bg-gray-100 transition-transform transform hover:scale-105 active:scale-95">
                    <span className="text-xl">👤</span>
                </div>


            {/* Donate Button */}
            <button className="bg-[#008037] hover:bg-[#00662d] text-white font-extrabold py-2 px-4 rounded-full shadow-xl transition">
              {t.button}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden relative">
          <nav className="flex justify-around p-2 border-t border-gray-300 bg-white">
            {visibleMobileItems.map((item) => (
              <MenuLink key={item.key} item={item} isMobile />
            ))}

            <div
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-xs cursor-pointer hover:text-[#008037]"
            >
              {mobileMenuOpen ? <X className="text-lg" /> : <Tally3 className="text-lg" />}
              {mobileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-lg shadow-xl p-2">
                  <span className="block text-sm font-bold p-2 text-gray-800 border-b mb-1">{t.more}</span>
                  {hiddenMobileItems.map((item) => (
                    <MenuLink key={item.key} item={item} isMobile />
                  ))}

                  {/* User Icon */}
                      <div className="flex justify-center mt-2">
                    <div className="flex items-center justify-center bg-white p-2 rounded-full shadow-md cursor-pointer 
                        hover:bg-gray-100 transition-transform transform hover:scale-105 active:scale-95">
                        <span className="text-xl">👤</span>
                    </div>
                    </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      <AsSunnahFoundation />
    </>
  );
};

export default PublicHeader;
