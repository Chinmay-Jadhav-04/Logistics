'use client';

import { useState, useEffect } from 'react';
import { 
  Warehouse, 
  Truck, 
  Package, 
  ListFilter as Filter, 
  Home as House, 
  MapPin, 
  ClockArrowUp
} from 'lucide-react';
import { Button } from "../ui/button";

const HeroSection = ({ onSectionChange }) => {
  const [activeService, setActiveService] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  
  // Add scroll event listener to detect when to make the section sticky
  useEffect(() => {
    const handleScroll = () => {
      // Get the height of the navbar (adjust this value if needed)
      const navbarHeight = 72; // Approximate height of your navbar
      
      // Make the hero section sticky when scrolled past a certain point
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { id: "cfs-icd", name: "CFS & ICD", icon: <Warehouse size={20}/> },
    { id: "land-transport", name: "Land Transport", icon: <Truck size={20}/> },
    { id: "3pl", name: "3PL", icon: <Package size={20}/> },
    { id: "bonded-warehouse", name: "Bonded Warehouse", icon: <House size={20}/> },
    { id: "My-Orders", name: "My Orders", icon: <ClockArrowUp size={20}/> },
  ];

  const handleServiceClick = (serviceId) => {
    setActiveService(serviceId);
    onSectionChange(serviceId);

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
    <section 
      className={`w-full bg-gradient-to-r from-gray-100 to-gray-200 overflow-hidden transition-all duration-300 z-[40]
        ${isSticky ? 'fixed top-0 left-0 shadow-md py-2' : 'relative py-8'}`}
      style={{ 
        top: isSticky ? '64px' : '0',
        transform: isSticky ? 'translateY(0)' : 'translateY(0)'
      }}
    >
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto flex justify-center">
          <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="flex justify-center min-w-max px-2">
              <div className={`border-2 border-white rounded-full p-2 bg-white bg-opacity-50 backdrop-blur-sm
                ${isSticky ? 'scale-95' : ''}`}>
                <div className="flex items-center justify-center gap-3">
                  {services.map((item) => (
                    <Button
                      key={item.id}
                      variant="secondary"
                      className={`flex flex-col items-center px-3 py-2 transition-all group ${
                        activeService === item.id ? "bg-white text-teal-600" 
                          : "bg-white text-gray-600 hover:text-teal-600"
                      } ${isSticky ? 'scale-95' : ''}`}
                      onClick={() => handleServiceClick(item.id)}
                    >
                      <div className={`mb-1 ${activeService === item.id ? "text-teal-600" : "text-gray-600 group-hover:text-teal-600"}`}>
                        {item.icon}
                      </div>
                      <span className="text-xs font-medium">{item.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
