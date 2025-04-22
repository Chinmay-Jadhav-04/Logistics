'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, ArrowRight, Star, MapPin, ChevronLeft, ChevronRight, Filter} from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CFSCard = ({ title, location, rating, description, images, id }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const router = useRouter();

  // Function to check if user is logged in
  const isUserLoggedIn = () => {
    return localStorage.getItem('user') !== null;
  };

  const handleBookNow = () => {
    if (isUserLoggedIn()) {
      // Add booking logic here
      router.push(`/booking/${id}`);
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleViewDetails = () => {
    // Directly navigate to details page without login check
    router.push(`/view-details/${id}`);
  };

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
        
        <div className="flex gap-4 mt-4">
          <Button 
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-6 px-8"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
          <Button 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-6 px-8"
            onClick={handleBookNow}
          >
            Book Now
          </Button>
        </div>
      </div>
      
      {/* Login Dialog - Only shown for booking */}
      <Dialog open={loginModalOpen} onOpenChange={setLoginModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              Please log in to book this CFS facility.
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

const PackagesSection = () => {
  const router = useRouter();
  const [isNewsPanelOpen, setIsNewsPanelOpen] = useState(false);
  const [locationFilter, setLocationFilter] = useState("all");
  const [tariffFilter, setTariffFilter] = useState("all");
  const [freeDaysFilter, setFreeDaysFilter] = useState("all");
  const [monthlyDuesFilter, setMonthlyDuesFilter] = useState("all");
  const [containersFilter, setContainersFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const toggleNewsPanel = () => {
    setIsNewsPanelOpen(!isNewsPanelOpen);
  };

  // Function to check if user is logged in
  const isUserLoggedIn = () => {
    // Replace this with your actual authentication check
    // For example, checking localStorage, JWT token, or session
    return localStorage.getItem('user') !== null;
  };

  // CFS facilities data
  const cfsFacilities = [
    {
      id: 1,
      title: "Mumbai CFS Terminal",
      location: "Nhava Sheva, Mumbai, Maharashtra",
      rating: 4.5,
      description: "State-of-the-art Container Freight Station with modern facilities and efficient clearance process.",
      images: [
        "/images 1.jpg",
        "/images 2.jpg",
        "/images 3.jpg",
      ],
      tariffRate: "5001-10000",
      freeDays: "15 days",
      monthlyDues: "10000-20000",
      containers: "20-50"
    },
    {
      id: 2,
      title: "Chennai Port CFS",
      location: "Chennai Port, Tamil Nadu",
      rating: 4.2,
      description: "Well-connected CFS with extensive storage space and specialized handling equipment.",
      images: [
        "/dosa.jpg",
        "/dosa1.jpg",
        "/dosa3.jpg",
      ],
      tariffRate: "10001-15000",
      freeDays: "7 days",
      monthlyDues: "15000-25000",
      containers: "1-20"
    },
    {
      id: 3,
      title: "Delhi ICD",
      location: "Tughlakabad, New Delhi",
      rating: 4.0,
      description: "Inland Container Depot with excellent rail connectivity to major ports and industrial areas.",
      images: [
        "/Momo.jpg",
        "/Momo1.jpg",
        "/Momo2.jpg",
      ],
      tariffRate: "0-5000",
      freeDays: "30 days",
      monthlyDues: "5000-10000",
      containers: "50+"
    },
    {
      id: 4,
      title: "Kolkata CFS",
      location: "Kolkata Port Area, West Bengal",
      rating: 3.8,
      description: "Strategic CFS located near the Kolkata port with customs facilities and warehousing options.",
      images: [
        "/Puchka2.0.jpg",
        "/Puchka2.jpg",
        "/Puchka3.0.jpg",
      ],
      tariffRate: "15000+",
      freeDays: "15 days",
      monthlyDues: "20000-30000",
      containers: "20-50"
    }
  ];

  // Add this function to get unique locations
  const locations = ["all", ...new Set(cfsFacilities.map(facility => facility.location))];

  // Update the filtered facilities
  const filteredFacilities = cfsFacilities.filter(facility => {
    return (locationFilter === "all" || facility.location === locationFilter) &&
           (tariffFilter === "all" || facility.tariffRate === tariffFilter) &&
           (freeDaysFilter === "all" || facility.freeDays === freeDaysFilter) &&
           (monthlyDuesFilter === "all" || facility.monthlyDues === monthlyDuesFilter) &&
           (containersFilter === "all" || facility.containers === containersFilter);
  });

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2 bg-white"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Select
              value={locationFilter}
              onValueChange={(value) => setLocationFilter(value)}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location === "all" ? "All Locations" : location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Mobile Filters Panel */}
          <div className={`${showFilters ? 'block' : 'hidden'} mt-4 bg-white p-4 rounded-lg shadow-md`}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tariff Rates
                </label>
                <select
                  value={tariffFilter}
                  onChange={(e) => setTariffFilter(e.target.value)}
                  className="w-full border rounded-md p-2"
                >
                  <option value="all">All Rates</option>
                  <option value="0-5000">₹0 - ₹5000</option>
                  <option value="5001-10000">₹5001 - ₹10000</option>
                  <option value="10001-15000">₹10001 - ₹15000</option>
                  <option value="15000+">₹15000+</option>
                </select>
              </div>
              {/* Add other filter options here */}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filter Panel - Hidden on Mobile */}
          <div className="hidden md:block w-64 bg-white p-4 rounded-lg shadow-md h-fit">
            <h3 className="text-lg font-semibold mb-4">Filter Options</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tariff Rates
                </label>
                <select
                  value={tariffFilter}
                  onChange={(e) => setTariffFilter(e.target.value)}
                  className="w-full border rounded-md p-2"
                >
                  <option value="all">All Rates</option>
                  <option value="0-5000">₹0 - ₹5000</option>
                  <option value="5001-10000">₹5001 - ₹10000</option>
                  <option value="10001-15000">₹10001 - ₹15000</option>
                  <option value="15000+">₹15000+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Free Days
                </label>
                <select
                  value={freeDaysFilter}
                  onChange={(e) => setFreeDaysFilter(e.target.value)}
                  className="w-full border rounded-md p-2"
                >
                  <option value="all">All Days</option>
                  <option value="7 days">7 Days</option>
                  <option value="15 days">15 Days</option>
                  <option value="30 days">30 Days</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Dues
                </label>
                <select
                  value={monthlyDuesFilter}
                  onChange={(e) => setMonthlyDuesFilter(e.target.value)}
                  className="w-full border rounded-md p-2"
                >
                  <option value="all">All Ranges</option>
                  <option value="Below 10000">Below ₹10000</option>
                  <option value="10000-20000">₹10000 - ₹20000</option>
                  <option value="Above 20000">Above ₹20000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Containers
                </label>
                <select
                  value={containersFilter}
                  onChange={(e) => setContainersFilter(e.target.value)}
                  className="w-full border rounded-md p-2"
                >
                  <option value="all">All Sizes</option>
                  <option value="1-20">1-20</option>
                  <option value="20-50">20-50</option>
                  <option value="50+">50+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right side - Cards */}
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">CFS/ICD Facilities</h2>
            <div className="grid grid-cols-1 gap-6">
              {filteredFacilities.map((facility) => (
                <CFSCard 
                  key={facility.id}
                  title={facility.title}
                  location={facility.location}
                  rating={facility.rating}
                  description={facility.description}
                  images={facility.images}
                  id={facility.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;


