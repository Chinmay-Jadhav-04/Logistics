'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="text-black py-4 px-6 shadow-md bg-white sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-4">
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
        
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`w-full md:w-auto md:flex ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2 mt-4 md:mt-0">
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
    </nav>
  );
};

export default Navbar;
