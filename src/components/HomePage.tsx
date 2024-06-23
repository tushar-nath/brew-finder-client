import React, { useEffect, useState } from "react";
import { fetchCoffeeShops, CoffeeShop } from "../api";
import SearchBar from "./SearchBar";
import BottomNavigation from "./BottomNavigation";
import { FeaturedCoffeeShops } from "./FeaturedCoffeeShops";
import Header from "./Header";

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
      <Header />
      <SearchBar />
      <FeaturedCoffeeShops
        coffeeShops={coffeeShops}
        onSelectShop={onSelectShop}
      />
      <BottomNavigation />
    </div>
  );
};
