'use client';

import { Inter } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";
import { AuthProvider } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import SplashScreen from '@/components/main/SplashScreen';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset loading state on route change or page refresh
    setLoading(true);

    // Optional: Add event listener for route changes if using Next.js routing
    const handleRouteChange = () => {
      setLoading(true);
    };

    window.addEventListener('beforeunload', handleRouteChange);
    
    return () => {
      window.removeEventListener('beforeunload', handleRouteChange);
    };
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          {loading ? (
            <SplashScreen finishLoading={() => setLoading(false)} />
          ) : null}
          <div style={{ opacity: loading ? 0 : 1 }}>
            <Navbar />
            {children}
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}


