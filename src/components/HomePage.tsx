import React, { useEffect, useState } from "react";
import { fetchCoffeeShops, CoffeeShop } from "../api";
import SearchBar from "./SearchBar";
import BottomNavigation from "./BottomNavigation";
import { FeaturedCoffeeShops } from "./FeaturedCoffeeShops";
import { Header } from "./Header";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Import your images
import img1 from "../assets/blake-verdoorn-gM-RfQsZK98-unsplash.jpg";
import img2 from "../assets/kris-atomic-3b2tADGAWnU-unsplash.jpg";
import img3 from "../assets/nafinia-putra-Kwdp-0pok-I-unsplash.jpg";
import img4 from "../assets/patrick-tomasso-GXXYkSwndP4-unsplash.jpg";
import img5 from "../assets/petr-sevcovic-qE1jxYXiwOA-unsplash.jpg";
import img6 from "../assets/ruben-ramirez-xhKG01FN2uk-unsplash.jpg";
import img7 from "../assets/sincerely-media-VNsdEl1gORk-unsplash.jpg";
import img8 from "../assets/matiinu-ramadhan-i3vmGDN_Fzg-unsplash.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

export const HomePage: React.FC = () => {
  const [coffeeShops, setCoffeeShops] = useState<CoffeeShop[]>([]);
  const [filteredCoffeeShops, setFilteredCoffeeShops] = useState<CoffeeShop[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCoffeeShops()
      .then((shops) => {
        setCoffeeShops(shops);
        setFilteredCoffeeShops(shops);
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to load coffee shops");
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    const filtered = coffeeShops.filter(
      (shop) =>
        shop.name.toLowerCase().includes(lowercaseQuery) ||
        shop.location.address.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredCoffeeShops(filtered);
  };

  const handleSelectShop = (shopId: string, selectedImage: string) => {
    navigate(`/coffee-shop/${shopId}`, { state: { selectedImage } });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <motion.div
      className="bg-gray-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header />
      <SearchBar
        coffeeShops={coffeeShops}
        onSearch={handleSearch}
        onSelectShop={handleSelectShop}
        images={images}
      />
      <FeaturedCoffeeShops
        coffeeShops={filteredCoffeeShops}
        onSelectShop={handleSelectShop}
        images={images}
      />
      <BottomNavigation />
    </motion.div>
  );
};
