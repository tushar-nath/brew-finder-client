import React, { useEffect, useState } from "react";
import { fetchCoffeeShops, CoffeeShop } from "../api";
import img1 from "../assets/blake-verdoorn-gM-RfQsZK98-unsplash.jpg";
import img2 from "../assets/kris-atomic-3b2tADGAWnU-unsplash.jpg";
import img3 from "../assets/nafinia-putra-Kwdp-0pok-I-unsplash.jpg";
import img4 from "../assets/patrick-tomasso-GXXYkSwndP4-unsplash.jpg";
import img5 from "../assets/petr-sevcovic-qE1jxYXiwOA-unsplash.jpg";
import img6 from "../assets/ruben-ramirez-xhKG01FN2uk-unsplash.jpg";
import img7 from "../assets/sincerely-media-VNsdEl1gORk-unsplash.jpg";
import img8 from "../assets/matiinu-ramadhan-i3vmGDN_Fzg-unsplash.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

const shuffleArray = (array: string[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

interface CoffeeShopPageProps {
  shopId: string;
  onBack: () => void;
}

export const CoffeeShopPage: React.FC<CoffeeShopPageProps> = ({
  shopId,
  onBack,
}) => {
  const [shop, setShop] = useState<CoffeeShop | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);

  useEffect(() => {
    setShuffledImages(shuffleArray(images));
  }, []);

  useEffect(() => {
    fetchCoffeeShops()
      .then((shops) => {
        const selectedShop = shops.find((s) => s._id === shopId);
        if (selectedShop) {
          setShop(selectedShop);
        } else {
          setError("Shop not found");
        }
        setIsLoading(false);
      })
      .catch(() => {
        setError("Failed to load shop details");
        setIsLoading(false);
      });
  }, [shopId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!shop) return <div>Shop not found</div>;

  const imageIndex = shopId.charCodeAt(0) % shuffledImages.length;
  const shopImage = shuffledImages[imageIndex];

  return (
    <div className="relative">
      <img
        src={shopImage}
        alt={shop.name}
        className="w-full h-80 object-cover"
      />
      <button
        onClick={onBack}
        className="absolute top-4 left-4 bg-white rounded-full p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{shop.name}</h2>
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="font-semibold">{shop.rating}</span>
        </div>
        <p className="text-gray-600 mb-4">{shop.location.address}</p>
        <div className="flex space-x-4 mb-6">
          <button className="text-gray-500 rounded-full py-2 px-4 flex items-center">
            Drinks
          </button>
          <button className="text-gray-500 rounded-full py-2 px-4 flex items-center">
            Food
          </button>
        </div>
        <div className="space-y-4">
          {shop.products.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between bg-gray-100 rounded-lg p-4"
            >
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.category}</p>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">
                  ${(product.price / 100).toFixed(2)}
                </span>
                <button className="bg-teal-800 text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
