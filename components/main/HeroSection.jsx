'use client';

import { useState } from 'react';
import { 
  Warehouse, 
  Truck, 
  Package, 
  ListFilter as Filter, 
  Home as House, 
  MapPin 
} from 'lucide-react';
import { Button } from "../ui/button";

const HeroSection = ({ onSectionChange }) => {
  const [activeService, setActiveService] = useState(null);

  const services = [
    { id: "cfs-icd", name: "CFS & ICD", icon: <Warehouse size={20}/> },
    { id: "land-transport", name: "Land Transport", icon: <Truck size={20}/> },
    { id: "3pl", name: "3PL", icon: <Package size={20}/> },
    { id: "bonded-warehouse", name: "Bonded Warehouse", icon: <House  size={20}/> },
    { id: "tracking-modal", name: "Tracking Modal", icon: <MapPin size={20}/> },
  ];

  const handleServiceClick = (serviceId) => {
    setActiveService(serviceId);
    
    if (serviceId === "cfs-icd") {
      onSectionChange('hero');
      // Find the packages section and scroll to it
      const packagesSection = document.querySelector('section.py-12.bg-gray-50');
      if (packagesSection) {
        packagesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Wait for scroll to complete, then click the CFS tab
        setTimeout(() => {
          const cfsTabTrigger = document.querySelector('[value="cfs-facilities"]');
          if (cfsTabTrigger) {
            cfsTabTrigger.click();
          }
        }, 500);
      }
    } else {
      onSectionChange(serviceId);
    }
  };

  return (
    <main className="flex-1 w-full">
      <section className="relative bg-gradient-to-r from-gray-100 to-gray-200 overflow-hidden">
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-6xl mx-auto flex justify-center">
            <div className="w-full overflow-x-auto scrollbar-hide">
              <div className="flex justify-center min-w-max px-2">
                <div className="border-2 border-white rounded-full p-4 bg-white bg-opacity-50 backdrop-blur-sm">
                  <div className="flex items-center justify-center gap-4">
                    {services.map((item) => (
                      <Button
                        key={item.id}
                        variant={activeService === item.id ? "default" : "secondary"}
                        className={`flex flex-col items-center px-3 py-2 transition-all group ${
                          activeService === item.id ? "ring-2 ring-teal-600" : ""
                        }`}
                        onClick={() => handleServiceClick(item.id)}
                      >
                        <div className="mb-1">
                          {item.icon}
                        </div>
                        <span className="text-xs font-medium">{item.name}</span>
                      </Button>
                    ))}

                    {/* Filter Button */}
                    <Button
                      key="filter"
                      variant="default"
                      className="flex flex-col items-center px-3 py-2 transition-all bg-teal-600 hover:bg-teal-700 text-white rounded-full"
                    >
                      <div className="mb-1">
                        <Filter size={20} className="text-white" />
                      </div>
                      <span className="text-xs font-medium">Filter</span>
                    </Button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
