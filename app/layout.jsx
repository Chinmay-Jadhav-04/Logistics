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
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('hasVisited');
    setIsFirstVisit(!hasVisited);
    
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          {isFirstVisit && loading ? (
            <SplashScreen finishLoading={() => setLoading(false)} />
          ) : null}
          <div style={{ opacity: isFirstVisit && loading ? 0 : 1 }}>
            <Navbar />
            {children}
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

