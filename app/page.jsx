'use client';

import { useState } from 'react';
import HeroSection from '@/components/main/HeroSection';
import PackagesSection from '@/components/main/PackagesSection';
import LandTransport from '@/components/main/LandTransport';
import ThreePL from '@/components/main/ThreePL';
import BondedWarehouse from '@/components/main/BondedWarehouse';
import MyOrders from '@/components/main/MyOrders';

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <main className="h-full w-full overflow-x-hidden">
      <div className="flex flex-col w-full">
        <HeroSection onSectionChange={setActiveSection} />
        {activeSection === 'hero' && <PackagesSection />}
        {activeSection === 'land-transport' && <LandTransport />}
        {activeSection === '3pl' && <ThreePL />}
        {activeSection === 'bonded-warehouse' && <BondedWarehouse />}
        {activeSection === 'My-Orders' && <MyOrders />}
      </div>
    </main>
  );
}




