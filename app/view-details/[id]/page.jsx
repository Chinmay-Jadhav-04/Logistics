"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MapPin, Package, Calendar, Clock, IndianRupee } from 'lucide-react'

export default function ViewDetails() {
  const params = useParams()
  const [details, setDetails] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real application, fetch details from your API using the ID
    // For now, we'll simulate with mock data
    const fetchDetails = async () => {
      try {
        // Simulate API call
        const mockDetails = {
          id: params.id,
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
            nextAvailable: "2024-01-20",
            slots: ["Morning", "Afternoon", "Evening"]
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
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (!details) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-gray-600">Details not found</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Package className="h-6 w-6 text-teal-600" />
              {details.type}
            </CardTitle>
            <div className="flex items-center text-gray-600 mt-2">
              <MapPin className="h-4 w-4 mr-1" />
              {details.location}
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{details.description}</p>
              </div>

              {/* Facilities */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Facilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {details.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-600">
                      <div className="h-2 w-2 bg-teal-600 rounded-full"></div>
                      {facility}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Pricing</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base Price</span>
                      <span className="font-medium">{details.pricing.base}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (18% GST)</span>
                      <span className="font-medium">{details.pricing.tax}</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold text-teal-600">{details.pricing.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Availability</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-600" />
                    <span>Next Available: {details.availability.nextAvailable}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <span>Slots: {details.availability.slots.join(", ")}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}