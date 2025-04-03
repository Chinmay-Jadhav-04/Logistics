'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, ArrowRight, Star, MapPin, ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const ThreePLCard = ({ title, location, rating, description, images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      {/* Left side - Image slider */}
      <div className="relative w-full md:w-2/5 h-64">
        <img
          src={images[currentImageIndex]}
          alt={`${title} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Image navigation buttons */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <button 
            onClick={prevImage} 
            className="bg-black bg-opacity-30 text-white p-1 rounded-r-md hover:bg-opacity-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button 
            onClick={nextImage} 
            className="bg-black bg-opacity-30 text-white p-1 rounded-l-md hover:bg-opacity-50"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        {/* Image counter */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
          {currentImageIndex + 1}/{images.length}
        </div>
      </div>
      
      {/* Right side - Information */}
      <div className="p-4 flex flex-col justify-between w-full md:w-3/5">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          
          <div className="flex items-center mt-2 text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{location}</span>
          </div>
          
          <div className="flex items-center mt-2">
            {Array(5).fill(0).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
          </div>
          
          <p className="mt-3 text-sm text-gray-600">{description}</p>
        </div>
        
        <Button 
          className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white"
          onClick={() => setLoginModalOpen(true)}
        >
          View Details
        </Button>
      </div>
      
      {/* Login Dialog */}
      <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              Please log in to view detailed information about this 3PL service.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-teal-600 hover:text-teal-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <Button className="w-full bg-teal-600 hover:bg-teal-700">
              Sign in
            </Button>
            <div className="text-center text-sm">
              <span className="text-gray-600">Don't have an account?</span>{" "}
              <a href="#" className="font-medium text-teal-600 hover:text-teal-500">
                Sign up
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ThreePL  = () => {
  const [isNewsPanelOpen, setIsNewsPanelOpen] = useState(false);

  const toggleNewsPanel = () => {
    setIsNewsPanelOpen(!isNewsPanelOpen);
  };

  // 3PL services data
  const threePLServices = [
    {
      id: 1,
      title: "Integrated Supply Chain Solutions",
      location: "Multiple Locations, Pan-India",
      rating: 4.8,
      description: "End-to-end supply chain management with custom solutions for inventory, distribution, and fulfillment.",
      images: [
        "/3pl1.jpg",
        "/3pl2.jpg",
        "/3pl3.jpg",
      ]
    },
    {
      id: 2,
      title: "E-Commerce Fulfillment Center",
      location: "Bangalore, Karnataka",
      rating: 4.6,
      description: "Specialized fulfillment services for online retailers with fast processing and same-day shipping options.",
      images: [
        "/ecom1.jpg",
        "/ecom2.jpg",
        "/ecom3.jpg",
      ]
    },
    {
      id: 3,
      title: "Retail Distribution Network",
      location: "Delhi-NCR Region",
      rating: 4.3,
      description: "Strategic distribution services with multi-channel capabilities and retail compliance expertise.",
      images: [
        "/retail1.jpg",
        "/retail2.jpg",
        "/retail3.jpg",
      ]
    },
    {
      id: 4,
      title: "Value-Added Services Hub",
      location: "Chennai, Tamil Nadu",
      rating: 4.4,
      description: "Comprehensive processing services including kitting, packaging, labeling, and quality control.",
      images: [
        "/vas1.jpg",
        "/vas2.jpg",
        "/vas3.jpg",
      ]
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">3PL Services</h2>
          </div>

          <div className="flex items-center mt-4 md:mt-0 space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-700 transition-all duration-300" 
              onClick={toggleNewsPanel}
            >
              <Bell className="h-4 w-4" />
              News & Updates
            </Button>
            <Link href="#" className="flex items-center text-teal-700 font-medium hover:underline ml-4">
              VIEW ALL <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {threePLServices.map((service) => (
            <ThreePLCard 
              key={service.id}
              title={service.title}
              location={service.location}
              rating={service.rating}
              description={service.description}
              images={service.images}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreePL;