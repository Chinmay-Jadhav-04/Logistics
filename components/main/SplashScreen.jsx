'use client';

import { useEffect } from 'react';

const Splashscreen = ({ finishLoading }) => {
  useEffect(() => {
    // Add a delay before finishing loading
    const timer = setTimeout(() => {
      if (finishLoading) {
        finishLoading();
      }
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default Splashscreen;


