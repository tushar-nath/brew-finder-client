import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { CoffeeShopPage } from "./components/CoffeeShopPage";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coffee-shop/:shopId" element={<CoffeeShopPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
