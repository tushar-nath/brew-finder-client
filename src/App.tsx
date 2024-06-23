import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { CoffeeShopPage } from "./components/CoffeeShopPage";
import { CartPage } from "./components/CartPage";
import { CartProvider } from "./contexts/CartContext";

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/coffee-shop/:shopId" element={<CoffeeShopPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
