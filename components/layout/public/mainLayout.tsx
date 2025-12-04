

'use client'; // ✅ এখানেও এটি যোগ করুন

import PublicFooter from "@/components/layout/public/footer";
import PublicHeader from "@/components/layout/public/header";
import { LanguageProvider } from "@/src/context/LanguageContext"; 



import { ReactNode } from "react";

function PublicMainLayout({ children }: { children: ReactNode }) {

    console.log('hello');


    return (
        <div className="flex flex-col min-h-screen">
            {/* ✅ LanguageProvider দিয়ে চাইল্ড কম্পোনেন্টগুলোকে ঘিরে দিন */}
            <LanguageProvider>
                <PublicHeader />
                <div className="flex-1 bg-gray-100">
                    {children}
                </div>
                <PublicFooter />
            </LanguageProvider>
        </div>
    );
}

export default PublicMainLayout;