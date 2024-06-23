import React from 'react';

const CoffeeShopDetails: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img src="/path-to-coffee-shop-image.jpg" alt="Coffee Shop" className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">Haus Coffee</h2>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="font-semibold">4.4</span>
          <span className="text-gray-500 ml-1">429 reviews</span>
        </div>
        <p className="text-gray-600 mb-4">San Francisco, CA</p>
        <div className="flex space-x-4 mb-6">
          <button className="bg-teal-800 text-white rounded-full py-2 px-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Coffee
          </button>
          <button className="text-gray-500 rounded-full py-2 px-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
            Drinks
          </button>
          <button className="text-gray-500 rounded-full py-2 px-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Food
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gray-100 rounded-lg p-4">
            <div className="flex items-center">
              <img src="/path-to-cafe-mocha-image.jpg" alt="Café mocha" className="w-16 h-16 object-cover rounded-lg mr-4" />
              <div>
                <h3 className="font-semibold">Café mocha</h3>
                <p className="text-gray-600 text-sm">A chocolate-flavored warm beverage that is a variant of a café latte</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="font-semibold mr-2">$3.00</span>
              <button className="bg-teal-800 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          </div>
          {/* Add more menu items here */}
        </div>
      </div>
    </div>
  );
};

export default CoffeeShopDetails;