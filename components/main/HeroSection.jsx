'use client';

import { useState, useEffect } from 'react';
import { 
  Warehouse, 
  Truck, 
  Package, 
  Home as House, 
  ClockArrowUp,
  Bell,
  X,
  Info,
  CheckCircle
} from 'lucide-react';
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const HeroSection = ({ onSectionChange = () => {}, isInNavbar = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [isNewsPanelOpen, setIsNewsPanelOpen] = useState(false);

  // Add toggleNewsPanel function
  const toggleNewsPanel = () => {
    setIsNewsPanelOpen(!isNewsPanelOpen);
  };

  // Add closeNewsPanel function
  const closeNewsPanel = () => {
    setIsNewsPanelOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const services = [
    {
      id: "cfs-icd",
      name: "CFS & ICD",
      icon: Warehouse,
    },
    {
      id: "land-transport",
      name: "Land Transport",
      icon: Truck,
    },
    {
      id: "3pl",
      name: "3PL",
      icon: Package,
    },
    {
      id: "bonded-warehouse",
      name: "Bonded Warehouse",
      icon: House,
    },
    {
      id: "my-orders",
      name: "My Orders",
      icon: ClockArrowUp,
    },
  ];

  const handleServiceClick = (serviceId) => {
    setActiveService(serviceId);
    onSectionChange(serviceId);
  };

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden flex flex-wrap justify-center gap-4 p-4">
        {services.map((item) => (
          <button
            key={item.id}
            onClick={() => handleServiceClick(item.id)}
            className={cn(
              "flex flex-col items-center w-[calc(33.33%-1rem)] p-2 rounded-lg transition-all duration-200",
              activeService === item.id
                ? "bg-teal-50 text-teal-600"
                : "hover:bg-gray-50"
            )}
          >
            <div className={cn(
              "rounded-full p-2 mb-1",
              activeService === item.id ? "bg-teal-400" : "bg-gray-100"
            )}>
              <item.icon className={`h-5 w-5 ${activeService === item.id && 'text-white'}`} />
            </div>
            <span className="text-xs font-medium text-center">{item.name}</span>
          </button>
        ))}
      </div>

      {/* Desktop View (Original) */}
      <div className={cn(
        "hidden md:flex bg-white py-3 px-4 rounded-full mx-auto max-w-3xl justify-between items-center shadow-md border border-gray-200",
        isScrolled ? "opacity-0" : "opacity-100 transition-opacity duration-300"
      )}>
        <div className="flex justify-center space-x-12 flex-1">
          {services.map((item) => (
            <button
              key={item.id}
              onClick={() => handleServiceClick(item.id)}
              className={cn(
                "flex flex-col items-center px-1 py-1 rounded-lg transition-all duration-200",
                activeService === item.id
                  ? "text-gray-500"
                  : "hover:text-teal-500/80"
              )}
            >
              <div className={cn(
                "rounded-full p-2 mb-1",
                activeService === item.id ? "bg-teal-400" : "bg-gray-100"
              )}>
                <item.icon className={`h-5 w-5 ${activeService === item.id && 'text-white'}`} />
              </div>
              <span className="text-sm font-medium">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Fixed header that appears when scrolled (Original) */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white to-gray-50 shadow-md py-2 px-3 sm:px-6 transition-transform duration-300 backdrop-blur-sm border-b border-gray-200",
        isScrolled ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left side - Logo and Company Name */}
          <div className="flex items-center space-x-3">
            <Image
              src="/logistics logo.jpg"
              alt="Green Ocean Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-lg font-semibold text-gray-900">Green Ocean</span>
          </div>

          {/* Middle - Services */}
          <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 overflow-x-auto px-4">
            <div className="flex space-x-1 sm:space-x-2 md:space-x-3 overflow-x-auto">
              {services.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleServiceClick(item.id)}
                  className={cn(
                    "flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors flex-shrink-0",
                    activeService === item.id ? "bg-teal-500 text-white" : "hover:bg-gray-100"
                  )}
                >
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm font-medium hidden xs:block">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right side - Notification and User */}
          <div className="flex items-center space-x-4">
            <button className="relative inline-flex items-center p-2 hover:bg-gray-100 rounded-full transition-colors" onClick={toggleNewsPanel}>
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="flex h-4 w-4 items-center justify-center bg-red-500 text-[10px] text-white rounded-full ml-1">2</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:inline-block">John Doe</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add News Panel and Backdrop */}
      {isNewsPanelOpen && (
        <div 
          className="fixed inset-0 bg-white/30 backdrop-blur-md z-[45] transition-all duration-300"
          onClick={closeNewsPanel}
        />
      )}

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
          {/* News Items */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <Info className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <h4 className="font-medium">System Update</h4>
                <p className="text-sm text-gray-600">New features added to tracking system</p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
              <div>
                <h4 className="font-medium">Delivery Complete</h4>
                <p className="text-sm text-gray-600">Order #123456 has been delivered</p>
                <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
