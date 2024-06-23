import React from "react";
import { CoffeeShop } from "../api";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface FeaturedCoffeeShopsProps {
  coffeeShops: CoffeeShop[];
  onSelectShop: (shopId: string, selectedImage: string) => void;
  images: string[];
}

export const FeaturedCoffeeShops: React.FC<FeaturedCoffeeShopsProps> = ({
  coffeeShops,
  onSelectShop,
  images,
}) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Featured coffee shops</h2>
      <div className="grid grid-cols-2 gap-4 cursor-pointer">
        {coffeeShops.map((shop, index) => (
          <div
            key={shop._id}
            className="relative rounded-lg overflow-hidden"
            onClick={() =>
              onSelectShop(shop._id, images[index % images.length])
            }
          >
            <LazyLoadImage
              src={images[index % images.length]}
              alt={shop.name}
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-2 right-2 bg-white rounded-full p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-2">
              <h3 className="font-semibold">{shop.name}</h3>
              <div className="flex items-center text-sm">
                <span className="text-yellow-500 mr-1">★</span>
                <span>{shop.rating}</span>
              </div>
              <div className="text-sm">{shop.location.address}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
