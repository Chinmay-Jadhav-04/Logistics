'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Menu, 
  X, 
  Bell, 
  User, 
  Package, 
  UserPlus, 
  Users, 
  HelpCircle, 
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from "../ui/button";
import HeroSection from "./HeroSection";
import { useAuth } from '@/context/AuthContext';

const AuthenticatedNavbar = ({ onSectionChange }) => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNewsPanelOpen, setIsNewsPanelOpen] = useState(false);
  const [showHeroInNav, setShowHeroInNav] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY === 0) {
            setShowHeroInNav(false);
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY) {
            setShowHeroInNav(true);
            setIsVisible(false);
          } else if (currentScrollY > 0) {
            setShowHeroInNav(true);
            setIsVisible(true);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.user-dropdown')) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const dropdownItems = [
    { icon: User, label: 'My Profile', href: '/profile' },
    { icon: Package, label: 'My Orders', href: '/my-orders' },
    { icon: UserPlus, label: 'Become a Member', href: '/membership' },
    { icon: Users, label: 'Refer Someone', href: '/refer' },
    { icon: HelpCircle, label: 'Help Center', href: '/help' },
  ];

  return (
    <>
      <nav 
        className={`text-black py-4 px-6 bg-white w-full z-50 transition-opacity duration-300 ${
          showHeroInNav ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between items-center">
            {/* Logo */}
            <div 
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => router.push('/')}
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

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-700 transition-all duration-300" 
                onClick={() => setIsNewsPanelOpen(true)}
              >
                <Bell className="h-4 w-4" />
                <span className="flex h-4 w-4 items-center justify-center bg-red-500 text-[10px] text-white rounded-full">2</span>
              </Button>

              {/* User Dropdown */}
              <div className="relative user-dropdown">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2"
                  onClick={toggleDropdown}
                >
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center">
                    <span className="text-teal-700 font-medium">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <span className="hidden md:block">{user?.name || 'User'}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </Button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu">
                      {dropdownItems.map((item, index) => (
                        <Link
                          key={index}
                          href={item.href}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeDropdown}
                        >
                          <item.icon className="h-4 w-4 mr-3" />
                          {item.label}
                        </Link>
                      ))}
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2">
            {dropdownItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-4 w-4 mr-3" />
                {item.label}
              </Link>
            ))}
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthenticatedNavbar;