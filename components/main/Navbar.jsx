'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Bell, Info, CheckCircle, Package, FileText, Ship } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from "../ui/button";
import HeroSection from "./HeroSection";

const Navbar = ({ onSectionChange }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNewsPanelOpen, setIsNewsPanelOpen] = useState(false);
  const [showHeroInNav, setShowHeroInNav] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Show/hide navbar based on scroll direction
          setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
          setLastScrollY(currentScrollY);
          
          // Handle hero section in navbar
          const threshold = 200;
          setShowHeroInNav(currentScrollY > threshold);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleNewsPanel = () => {
    setIsNewsPanelOpen(!isNewsPanelOpen);
  };

  const closeNewsPanel = () => {
    setIsNewsPanelOpen(false);
  };

  const handleLogoClick = () => {
    router.push('/');
    setTimeout(() => {
      const cfsButton = document.querySelector('button[data-id="cfs-icd"]');
      if (cfsButton) {
        cfsButton.click();
      }
    }, 100);
  };

  return (
    <>
      <nav 
        className={`text-black py-4 px-6 bg-white sticky top-0 z-50 transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between items-center">
            <div 
              className="flex items-center space-x-4 cursor-pointer"
              onClick={handleLogoClick}
            >
              <Image
                src="/logistics logo.jpg"
                alt="Logistics Logo"
                width={40}
                height={40}
                className="rounded-full"
                priority
              />
              <span className="text-2xl font-bold">
                Green Ocean
              </span>
            </div>
            
            {showHeroInNav && (
              <div className="flex-1 mx-4 hidden md:block">
                <HeroSection 
                  isInNavbar={true} 
                  onSectionChange={onSectionChange} 
                />
              </div>
            )}

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <nav className={`w-full md:w-auto md:flex ${isMenuOpen ? 'block' : 'hidden'}`}>
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2 mt-4 md:mt-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-700 transition-all duration-300" 
                  onClick={toggleNewsPanel}
                >
                  <Bell className="h-4 w-4" />
                  <span className="flex h-4 w-4 items-center justify-center bg-red-500 text-[10px] text-white rounded-full">2</span>
                </Button>
                <Link 
                  href="/login" 
                  className="w-full md:w-auto px-4 py-2 bg-white text-teal-600 rounded-md font-medium hover:bg-gray-100 transition text-center border border-teal-600"
                  prefetch={false}
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="w-full md:w-auto px-4 py-2 bg-teal-700 text-white rounded-md font-medium hover:bg-teal-800 transition text-center"
                  prefetch={false}
                >
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </nav>

      {/* Backdrop with blur effect */}
      {isNewsPanelOpen && (
        <div 
          className="fixed inset-0 bg-white/30 backdrop-blur-md z-[45] transition-all duration-300"
          onClick={closeNewsPanel}
        />
      )}

      {/* News Panel - add some transparency and blur to match the modern look */}
      <div
        className={`fixed right-0 top-20 bottom-0 w-full max-w-md bg-white/80 backdrop-blur-sm shadow-lg border-l transform transition-transform duration-300 z-[46] overflow-y-auto ${
          isNewsPanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 className="text-lg font-semibold">News & Updates</h3>
          <Button variant="ghost" size="sm" className="rounded-full" onClick={closeNewsPanel}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Today</h4>

          <div className="mb-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-start gap-3">
              <div className="bg-teal-100 p-2 rounded-full">
                <Info className="h-4 w-4 text-teal-700" />
              </div>
              <div>
                <h5 className="font-medium">System Update</h5>
                <p className="text-sm text-gray-600">New features have been added to the CFS platform.</p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>
          </div>

          <div className="mb-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-700" />
              </div>
              <div>
                <h5 className="font-medium">Maintenance Complete</h5>
                <p className="text-sm text-gray-600">Scheduled maintenance has been completed successfully.</p>
                <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
              </div>
            </div>
          </div>

          <h4 className="text-sm font-medium text-gray-500 mb-2 mt-6">Yesterday</h4>

          <div className="mb-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <Package className="h-4 w-4 text-purple-700" />
              </div>
              <div>
                <h5 className="font-medium">New Feature Released</h5>
                <p className="text-sm text-gray-600">Check out our latest feature update for enhanced performance.</p>
                <p className="text-xs text-gray-400 mt-1">Yesterday at 4:30 PM</p>
              </div>
            </div>
          </div>

          <div className="mb-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <FileText className="h-4 w-4 text-blue-700" />
              </div>
              <div>
                <h5 className="font-medium">Documentation Updated</h5>
                <p className="text-sm text-gray-600">New documentation has been added for recent features.</p>
                <p className="text-xs text-gray-400 mt-1">Yesterday at 2:15 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
