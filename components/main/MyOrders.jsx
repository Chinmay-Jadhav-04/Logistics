"use client"

import { useState } from "react"
import { Package, Search, Filter, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MyOrders() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [orders] = useState([
    {
      id: "ORD-001",
      type: "CFS Transport",
      status: "Processing",
      date: "2024-01-15",
      time: "14:30",
      from: "Mumbai Port",
      to: "Delhi Warehouse",
      details: "20ft Container Transport",
      price: "₹45,000",
      estimatedDelivery: "Jan 20, 2024"
    },
    {
      id: "ORD-002",
      type: "Land Transport",
      status: "Confirmed",
      date: "2024-01-16",
      time: "09:15",
      from: "Delhi Hub",
      to: "Noida Center",
      details: "Full Truck Load",
      price: "₹25,000",
      estimatedDelivery: "Jan 18, 2024"
    },
  ])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleStatusChange = (value) => {
    setStatusFilter(value)
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchQuery === "" || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.type.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || 
      order.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">Track and manage your logistics requests</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search orders..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="grid gap-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No orders found matching your criteria
            </div>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-teal-600">
                <CardHeader className="flex flex-row items-start md:items-center justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Package className="h-5 w-5 text-teal-600" />
                      {order.type}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      Order ID: {order.id} • {order.date} {order.time}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge 
                      variant="outline" 
                      className={
                        order.status === "Confirmed" 
                          ? "bg-green-100 text-green-700 border-green-300" 
                          : "bg-yellow-100 text-yellow-700 border-yellow-300"
                      }
                    >
                      {order.status}
                    </Badge>
                    <span className="text-lg font-semibold text-gray-900">{order.price}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                          <div>
                            <p className="text-sm text-gray-500">From</p>
                            <p className="font-medium">{order.from}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                          <div>
                            <p className="text-sm text-gray-500">To</p>
                            <p className="font-medium">{order.to}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">Estimated Delivery</p>
                        <p className="font-medium">{order.estimatedDelivery}</p>
                        <p className="text-sm text-gray-600 mt-2">{order.details}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <Button variant="link" className="text-teal-600 hover:text-teal-700 p-0">
                      View Details <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}