'use client';

import { Inter } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/main/Navbar";
import AuthenticatedNavbar from "@/components/main/AuthenticatedNavbar";
import Footer from "@/components/main/Footer";
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import SplashScreen from '@/components/main/SplashScreen';
import { Toaster } from 'sonner'
import ChatBot from '@/components/main/ChatBot';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

function MainLayout({ children }) {
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      setIsLoading(false);
    }
  }, [loading]);

  if (isLoading) {
    return <SplashScreen finishLoading={() => setIsLoading(false)} />;
  }

  return (
    <div style={{ opacity: isLoading ? 0 : 1 }}>
      {user ? <AuthenticatedNavbar /> : <Navbar />}
      {children}
      <Footer />
      <ChatBot />
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          <MainLayout>{children}</MainLayout>
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}

