import React, { useEffect, useState } from "react";
import { fetchCoffeeShops, CoffeeShop } from "../api";
import SearchBar from "./SearchBar";
import BottomNavigation from "./BottomNavigation";
import { FeaturedCoffeeShops } from "./FeaturedCoffeeShops";
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";

export const HomePage: React.FC = () => {
  const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <SearchBar />
      <FeaturedCoffeeShops
        coffeeShops={coffeeShops}
        onSelectShop={(id) => navigate(`/coffee-shop/${id}`)}
      />
      <BottomNavigation />
    </div>
  );
};
