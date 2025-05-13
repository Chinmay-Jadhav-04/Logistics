'use client'
import { useState, useEffect } from 'react'
import { Star, MapPin, Clock, Package, Warehouse, Award, ThumbsUp } from 'lucide-react'

const CFSPage = () => {
  const [topCFS, setTopCFS] = useState([])
  const [allCFS, setAllCFS] = useState([])

  // CFS Data
  const cfsData = [
    {
      id: 1,
      name: "EverCFS",
      rating: 4.8,
      services: 5,
      containers: 4,
      availability: true,
      turnaroundTime: 6,
      price: 1500,
      facilities: 3,
      location: "Mumbai Port",
      description: "State-of-the-art container freight station with modern facilities",
      image: "/images/cfs1.jpg"
    },
    {
      id: 2,
      name: "GreenLogix",
      rating: 4.5,
      services: 4,
      containers: 4,
      availability: true,
      turnaroundTime: 10,
      price: 1800,
      facilities: 2,
      location: "Chennai Port",
      description: "Eco-friendly CFS with advanced handling equipment",
      image: "/images/cfs2.jpg"
    },
    {
      id: 3,
      name: "SwiftCargo",
      rating: 4.2,
      services: 5,
      containers: 3,
      availability: false,
      turnaroundTime: 7,
      price: 1600,
      facilities: 3,
      location: "JNPT",
      description: "Fast and efficient container processing",
      image: "/images/cfs3.jpg"
    }
  ]

  // Determine badge type based on criteria
  const getBadgeType = (cfs, index) => {
    if (cfs.rating >= 4.5 && cfs.services >= 4 && cfs.facilities >= 3) {
      return {
        text: "Green Ocean's Choice",
        color: "bg-emerald-500",
        icon: Award
      }
    } else if (cfs.rating >= 4.2) {
      return {
        text: "Customers' Choice",
        color: "bg-blue-500",
        icon: ThumbsUp
      }
    }
    return null
  }

  // Normalize scores between 0 and 1
  const normalize = (value, max) => value / max

  // Calculate weighted score for a CFS
  const calculateScore = (cfs) => {
    const normalizedRating = normalize(cfs.rating, 5) * 0.25
    const normalizedServices = normalize(cfs.services, 5) * 0.15
    const normalizedContainers = normalize(cfs.containers, 4) * 0.10
    const availability = cfs.availability ? 0.15 : 0
    const normalizedTAT = (1 - normalize(cfs.turnaroundTime, 24)) * 0.15 // Lower is better
    const normalizedPrice = (1 - normalize(cfs.price, 2000)) * 0.10 // Lower is better
    const normalizedFacilities = normalize(cfs.facilities, 3) * 0.10

    return (
      normalizedRating +
      normalizedServices +
      normalizedContainers +
      availability +
      normalizedTAT +
      normalizedPrice +
      normalizedFacilities
    )
  }

  // Rank CFS facilities
  const rankCFS = (cfsList) => {
    return cfsList
      .map(cfs => ({
        ...cfs,
        score: calculateScore(cfs)
      }))
      .sort((a, b) => b.score - a.score)
  }

  useEffect(() => {
    const rankedCFS = rankCFS(cfsData)
    setTopCFS(rankedCFS.slice(0, 3))
    setAllCFS(rankedCFS)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Top CFS Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Top Rated CFS Facilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topCFS.map((cfs, index) => {
            const badge = getBadgeType(cfs, index)
            return (
              <div 
                key={cfs.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
              >
                <div className="relative">
                  <img 
                    src={cfs.image} 
                    alt={cfs.name}
                    className="w-full h-48 object-cover"
                  />
                  {badge && (
                    <div className={`absolute top-2 left-2 ${badge.color} text-white px-3 py-1 rounded-full flex items-center space-x-1`}>
                      <badge.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{badge.text}</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{cfs.name}</h3>
                  <div className="flex items-center mb-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <span className="ml-1">{cfs.rating}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span className="ml-1 text-gray-600">{cfs.location}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{cfs.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="ml-1">{cfs.turnaroundTime}h TAT</span>
                    </div>
                    <div className="flex items-center">
                      <Package className="w-4 h-4 text-gray-500" />
                      <span className="ml-1">{cfs.containers} Types</span>
                    </div>
                    <div className="flex items-center">
                      <Warehouse className="w-4 h-4 text-gray-500" />
                      <span className="ml-1">{cfs.facilities} Facilities</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* All CFS List */}
      <section>
        <h2 className="text-2xl font-bold mb-6">All CFS Facilities</h2>
        <div className="grid grid-cols-1 gap-4">
          {allCFS.map((cfs) => {
            const badge = getBadgeType(cfs)
            return (
              <div 
                key={cfs.id}
                className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <img 
                    src={cfs.image} 
                    alt={cfs.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="ml-4">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{cfs.name}</h3>
                      {badge && (
                        <span className={`${badge.color} text-white text-xs px-2 py-0.5 rounded-full flex items-center`}>
                          <badge.icon className="w-3 h-3 mr-1" />
                          {badge.text}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="ml-1">{cfs.rating}</span>
                      <MapPin className="w-4 h-4 ml-2" />
                      <span className="ml-1">{cfs.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Score: {cfs.score.toFixed(2)}</div>
                  <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                    View Details
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export default CFSPage
