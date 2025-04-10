'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Phone, ArrowLeft, Mail, Calendar } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ViewDetails({ params }) {
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const router = useRouter()
  
  const id = React.use(params).id;  // Correctly unwrap params

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Simulate API call
        const mockDetails = {
          id: id,  // Use unwrapped id here
          type: "CFS Transport",
          location: "Mumbai Port",
          description: "20ft Container Transport service from Mumbai Port to ICD",
          facilities: [
            "24/7 Security",
            "Temperature Controlled",
            "Real-time Tracking",
            "Insurance Coverage"
          ],
          pricing: {
            base: "₹45,000",
            tax: "₹8,100",
            total: "₹53,100"
          },
          availability: {
            slots: ["Morning", "Afternoon", "Evening"]
          },
          contact: {
            phone: "+91 98765 43210",
            email: "support@logistics.com"
          }
        }
        setDetails(mockDetails)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching details:', error)
        setLoading(false)
      }
    }

    fetchDetails()
  }, [id])  // Update dependency array to use unwrapped id

  const handleBookNow = () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select both date and time slot")
      return
    }
    
    const isUserLoggedIn = localStorage.getItem('user') !== null
    if (isUserLoggedIn) {
      router.push(`/booking/${id}?date=${selectedDate}&slot=${selectedSlot}`)
    } else {
      router.push('/login')
    }
  }

  const handleGoBack = () => {
    router.back()
  }

  const handleEmailClick = () => {
    window.location.href = `mailto:${details.contact.email}`
  }

  const handlePhoneClick = () => {
    window.location.href = `tel:${details.contact.phone}`
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!details) {
    return <div>No details found</div>
  }

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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left column */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Location</h2>
              <p>{details.location}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p>{details.description}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Facilities</h2>
              <ul className="list-disc list-inside">
                {details.facilities.map((facility, index) => (
                  <li key={index}>{facility}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Right column */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Pricing</h2>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-center">
                  <p className="text-gray-600 mb-6">
                    To get detailed pricing information for our services, please contact our team.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 w-full sm:w-auto">
                        Contact Us
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md p-6 mx-4 sm:mx-0">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold mb-4">Contact Information</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-2">
                        <div 
                          className="flex items-center gap-4 p-4 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={handlePhoneClick}
                        >
                          <div className="bg-blue-100 p-3 rounded-full">
                            <Phone className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Phone</p>
                            <p className="text-sm text-gray-500 break-all">{details.contact.phone}</p>
                          </div>
                        </div>
                        <div 
                          className="flex items-center gap-4 p-4 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={handleEmailClick}
                        >
                          <div className="bg-blue-100 p-3 rounded-full">
                            <Mail className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Email</p>
                            <p className="text-sm text-gray-500 break-all">{details.contact.email}</p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Select Date & Time</h2>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="relative">
                  <div className="relative inline-block w-full">
                    <DatePicker
                      selected={selectedDate}
                      onChange={date => setSelectedDate(date)}
                      minDate={new Date()}
                      dateFormat="MMMM d, yyyy"
                      className="w-full p-2 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholderText="Select date"
                      customInput={
                        <input
                          type="text"
                          className="w-full p-2 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                        />
                      }
                      customInputRef="ref"
                    />
                    <Calendar className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium mb-2">Available Slots:</p>
                  <div className="flex flex-wrap gap-2">
                    {details.availability.slots.map((slot) => (
                      <button
                        key={slot}
                        className={`px-4 py-2 rounded-full border ${
                          selectedSlot === slot 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-600'
                        }`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="bg-white p-6 rounded-lg shadow-sm mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex gap-4 w-full">
              <Button 
                variant="outline"
                className="flex-1"
                onClick={handleGoBack}
              >
                Cancel
              </Button>
              
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 flex-1"
                onClick={handleBookNow}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



















