'use client';

import Link from 'next/link';
import { Ship } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 border-t-4 border-teal-600">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="mb-6 md:mb-0 md:w-1/3">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-teal-700 p-2 rounded-lg shadow-lg">
                <Ship className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-wide">GREEN OCEAN</span>
            </div>
            <p className="text-gray-300">
              Your trusted partner for all logistics needs. We provide comprehensive solutions for shipping, tracking,
              and supply chain management.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:w-2/3">
            <div className="border-l border-gray-700 pl-4">
              <h3 className="font-semibold mb-3 text-lg text-teal-700">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-teal-700 transition-colors duration-300">
                    CFS & ICD
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-teal-700 transition-colors duration-300">
                    Land Transport
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-teal-700 transition-colors duration-300">
                    3PL Services
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-teal-700 transition-colors duration-300">
                    Brand Warehousing
                  </Link>
                </li>
              </ul>
            </div>

            <div className="border-l border-gray-700 pl-4">
              <h3 className="font-semibold mb-3 text-lg text-teal-700">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-teal-700 transition-colors duration-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-teal-700 transition-colors duration-300">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-teal-700 transition-colors duration-300">
                    News
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-teal-700 transition-colors duration-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="border-l border-gray-700 pl-4">
              <h3 className="font-semibold mb-3 text-lg text-teal-700">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-teal-700 transition-colors duration-300">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/tracking" className="text-gray-300 hover:text-teal-700 transition-colors duration-300">
                    Track Shipment
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-teal-700 transition-colors duration-300">
                    Request Quote
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-teal-700 transition-colors duration-300">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-3 md:mb-0">&copy; SKZ-TECH {new Date().getFullYear()} All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-gray-300 hover:text-teal-700 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-300 hover:text-teal-700 transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-300 hover:text-teal-700 transition-colors duration-300">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer
