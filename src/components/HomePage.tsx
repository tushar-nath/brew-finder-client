import React, { useEffect, useState } from "react";
import { fetchCoffeeShops, CoffeeShop } from "../api";
import SearchBar from "./SearchBar";
import BottomNavigation from "./BottomNavigation";
import { FeaturedCoffeeShops } from "./FeaturedCoffeeShops";

interface HomePageProps {
  onSelectShop: (shopId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectShop }) => {
  const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCoffeeShops()
      .then((shops) => {
        setCoffeeShops(shops);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to load coffee shops");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 pb-16">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-teal-800">
          Find a coffee shop anywhere
        </h1>
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src="/path-to-user-image.jpg"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
      </header>
      <SearchBar />
      <FeaturedCoffeeShops
        coffeeShops={coffeeShops}
        onSelectShop={onSelectShop}
      />
      <BottomNavigation />
    </div>
  );
};
