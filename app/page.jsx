'use client';

import { useState, useEffect } from 'react';
import Splashscreen from '../components/main/SplashScreen';
import HeroSection from '@/components/main/HeroSection';
import PackagesSection from '@/components/main/PackagesSection';
import LandTransport from '@/components/main/LandTransport';
import ThreePL from '@/components/main/ThreePL';
import BondedWarehouse from '@/components/main/BondedWarehouse';
import MyOrders from '@/components/main/MyOrders';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // Simulate data loading
    const fetchData = async () => {
      try {
        // Add artificial delay to show loading screen
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Splashscreen />;
  }

  return (
    <main className="h-full w-full overflow-x-hidden">
      <div className="flex flex-col w-full">
        <HeroSection onSectionChange={setActiveSection} />
        {(activeSection === 'hero' || activeSection === 'cfs-icd') && <PackagesSection />}
        {activeSection === 'land-transport' && <LandTransport />}
        {activeSection === '3pl' && <ThreePL />}
        {activeSection === 'bonded-warehouse' && <BondedWarehouse />}
        {activeSection === 'my-orders' && <MyOrders />}
      </div>
    </main>
  );
}









