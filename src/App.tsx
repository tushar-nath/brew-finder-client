import React, { useState } from "react";
import { HomePage } from "./components/HomePage";
import { CoffeeShopPage } from "./components/CoffeeShopPage";

const App: React.FC = () => {
  const [selectedShop, setSelectedShop] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedShop ? (
          <CoffeeShopPage
            shopId={selectedShop}
            onBack={() => setSelectedShop(null)}
          />
        ) : (
          <HomePage onSelectShop={setSelectedShop} />
        )}
      </div>
    </div>
  );
};

export default App;
