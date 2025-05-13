'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  ArrowLeft,
  Calendar,
  Star,
  MapPin,
  Package,
  CheckCircle,
  Navigation,
  MessageSquare,
  Tag
} from "lucide-react";
// Dialog components removed as they're not needed for the non-logged-in view

export default function ViewDetails({ params }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const router = useRouter();

  const id = React.use(params).id;  // Correctly unwrap params

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Simulate API call
        const mockDetails = {
          id: id,
          type: "CFS Transport",
          location: "Nhava Sheva, Mumbai Port",
          description: "20ft Container Transport service from Mumbai Port to ICD. We provide top-quality container transport services with experienced drivers and modern equipment to ensure safe and timely delivery.",
          features: [
            "Transportation Services",
            "Dry Port Services",
            "Warehousing",
            "Last Mile Transportation",
            "Container Tracking",
            "24/7 Customer Support",
            "Insurance Coverage",
            "Customs Clearance"
          ],
          images: [
            "/GatewayCFS.jpg",
            "/GatewayCFS1.jpg",
            "/GatewayCFS2.jpg",
            "/GatewayCFS3.jpg",
            "/GatewayCFS4.jpg",
            "/GatewayCFS5.jpg",
            "/GatewayCFS6.jpg",
            "/GatewayCFS7.jpg",
            "/GatewayCFS8.jpg",
            "/GatewayCFS9.jpg",
            "/GatewayCFS10.jpg",
            "/GatewayCFS11.jpg",
          ],
          availability: {
            slots: ["Morning", "Afternoon", "Evening"]
          },
          contact: {
            phone: "+91 98765 43210",
            email: "support@logistics.com"
          },
          testimonials: [
            {
              name: "Anujay",
              date: "December 2024",
              rating: 5,
              comment: "Keep maintaining the same service quality. Excellent experience!",
              duration: "5 years on our platform"
            },
            {
              name: "Himanshu",
              date: "December 2024",
              rating: 5,
              comment: "It's a great place with awesome surrounding and all amenities functional",
              duration: "8 years on our platform"
            },
            {
              name: "Neha",
              date: "November 2024",
              rating: 5,
              comment: "Great service, on-time delivery and professional staff",
              duration: "6 years on our platform"
            },
            {
              name: "Anshaal Qureshi",
              date: "October 2024",
              rating: 5,
              comment: "Excellent service, will definitely use again",
              duration: "1 year on our platform"
            }
          ],
          ratings: {
            overall: 5.0,
            reliability: 5.0,
            timeliness: 5.0,
            communication: 5.0,
            value: 5.0,
            cleanliness: 4.8
          },
          tags: [
            { name: "Reliable Service", count: 6 },
            { name: "On-time Delivery", count: 5 },
            { name: "Professional Staff", count: 4 },
            { name: "Great Value", count: 3 }
          ]
        };
        setDetails(mockDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching details:', error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleBookNow = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select both date and time slot");
      return;
    }

    const isUserLoggedIn = localStorage.getItem('user') !== null;
    if (isUserLoggedIn) {
      router.push(`/booking/${id}?date=${selectedDate}&slot=${selectedSlot}`);
    } else {
      router.push('/login');
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  // Function to open Google Maps with the location
  const handleLocationClick = () => {
    // Extract location details
    const locationQuery = encodeURIComponent(details.location);
    // Open Google Maps in a new tab
    window.open(`https://www.google.com/maps/search/?api=1&query=${locationQuery}`, '_blank');
  };

  const handleShowAllPhotos = () => {
    // This would typically navigate to a photo gallery page or open a modal
    alert("Show all photos functionality would go here");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!details) {
    return <div>No details found</div>;
  }

  // Extract the first 5 images for the gallery
  const featuredImages = details.images.slice(0, 5);
  const mainImage = featuredImages[0];
  const secondaryImages = featuredImages.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{details.type}</h1>

        {/* Image Gallery - Airbnb Style */}
        <div className="relative mb-8">
          <div className="grid grid-cols-4 gap-2 h-96 rounded-lg overflow-hidden">
            {/* Main large image */}
            <div className="col-span-2 row-span-2 relative">
              <img
                src={mainImage}
                alt={`${details.type} - Main Image`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Secondary images */}
            {secondaryImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`${details.type} - Image ${index + 2}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Show all photos button */}
          <button
            onClick={handleShowAllPhotos}
            className="absolute bottom-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 text-sm font-medium"
          >
            Show all photos
          </button>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Scrollable content */}
          <div className="w-full lg:w-7/12 space-y-8">
            {/* Title and Location */}
            <div className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white">
              <h2 className="text-2xl font-semibold">{details.type}</h2>
              <div
                className="flex items-center mt-2 text-gray-600 cursor-pointer hover:text-teal-600 transition-colors"
                onClick={handleLocationClick}
                title="Click to view on Google Maps"
              >
                <MapPin className="h-5 w-5 mr-2 text-teal-600" />
                <span className="underline">{details.location}</span>
              </div>
            </div>

            {/* Description */}
            <div className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white">
              <div className="flex items-center mb-4">
                <Package className="h-6 w-6 mr-2 text-teal-600" />
                <h3 className="text-xl font-semibold">Description</h3>
              </div>
              <p className="text-gray-700">{details.description}</p>
            </div>

            {/* Features */}
            <div className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 mr-2 text-teal-600" />
                <h3 className="text-xl font-semibold">Features</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4">
                {details.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-teal-500 mr-3"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sticky Booking Box */}
          <div className="w-full lg:w-5/12">
            <div className="sticky top-8">
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Get Pricing Information</h3>
                <p className="text-gray-600 mb-6">
                  To get detailed pricing information for our services, please login to view contact details.
                </p>

                <Button
                  className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 w-full"
                  onClick={() => router.push('/login')}
                >
                  Login to View Contact Details
                </Button>

                <div className="mt-6">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-teal-600" />
                    Select Date & Time
                  </h4>
                  <div className="relative mb-4">
                    <DatePicker
                      selected={selectedDate}
                      onChange={date => setSelectedDate(date)}
                      minDate={new Date()}
                      dateFormat="MMMM d, yyyy"
                      className="w-full p-2 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholderText="Select date"
                      customInput={
                        <input
                          type="text"
                          className="w-full p-2 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent cursor-pointer"
                        />
                      }
                      customInputRef="ref"
                    />
                    <Calendar className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>

                  <div className="mb-6">
                    <p className="mb-2">Available Slots:</p>
                    <div className="flex flex-wrap gap-2">
                      {details.availability.slots.map((slot) => (
                        <button
                          key={slot}
                          className={`px-4 py-2 rounded-full border ${
                            selectedSlot === slot
                              ? 'bg-teal-600 text-white border-teal-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-teal-600'
                          }`}
                          onClick={() => setSelectedSlot(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="bg-teal-600 hover:bg-teal-700 text-white py-6 px-8 w-full"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials and Location Section (Below the slider) */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Testimonials */}
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white">
            <div className="flex items-center mb-6">
              <MessageSquare className="h-6 w-6 mr-2 text-teal-600" />
              <h3 className="text-xl font-semibold">Testimonials</h3>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="ml-1 text-lg font-semibold">{details.ratings.overall}</span>
              </div>
              <span className="mx-2">·</span>
              <span className="text-gray-700">{details.testimonials.length} reviews</span>
            </div>

            {/* Rating categories */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reliability</span>
                  <span className="text-gray-900">{details.ratings.reliability}</span>
                </div>
                <div className="h-1 bg-gray-200 rounded-full mt-1">
                  <div className="h-1 bg-teal-600 rounded-full" style={{ width: `${(details.ratings.reliability / 5) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Timeliness</span>
                  <span className="text-gray-900">{details.ratings.timeliness}</span>
                </div>
                <div className="h-1 bg-gray-200 rounded-full mt-1">
                  <div className="h-1 bg-teal-600 rounded-full" style={{ width: `${(details.ratings.timeliness / 5) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Communication</span>
                  <span className="text-gray-900">{details.ratings.communication}</span>
                </div>
                <div className="h-1 bg-gray-200 rounded-full mt-1">
                  <div className="h-1 bg-teal-600 rounded-full" style={{ width: `${(details.ratings.communication / 5) * 100}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Value</span>
                  <span className="text-gray-900">{details.ratings.value}</span>
                </div>
                <div className="h-1 bg-gray-200 rounded-full mt-1">
                  <div className="h-1 bg-teal-600 rounded-full" style={{ width: `${(details.ratings.value / 5) * 100}%` }}></div>
                </div>
              </div>
            </div>

            {/* Popular tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {details.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center">
                  <Tag className="h-3 w-3 mr-1 text-teal-600" />
                  {tag.name} · {tag.count}
                </span>
              ))}
            </div>

            {/* Testimonials list */}
            <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
              {details.testimonials.map((testimonial, index) => (
                <div key={index} className="border-b pb-6 last:border-0">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mr-4 font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-500 text-sm">{testimonial.date}</span>
                  </div>
                  <p className="mt-2">{testimonial.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white">
            <div className="flex items-center mb-6">
              <Navigation className="h-6 w-6 mr-2 text-teal-600" />
              <h3 className="text-xl font-semibold">Location</h3>
            </div>

            <div className="h-80 bg-gray-200 rounded-lg relative mb-4">
              <iframe
                title="Location Map"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '0.5rem' }}
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(details.location)}`}
                allowFullScreen
              ></iframe>
            </div>

            <div
              className="flex items-center mt-4 text-gray-700 cursor-pointer hover:text-teal-600 transition-colors justify-center"
              onClick={handleLocationClick}
            >
              <MapPin className="h-5 w-5 mr-2 text-teal-600" />
              <span className="font-medium">Click to view on Google Maps</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}