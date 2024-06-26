import React, { useEffect, useState, useMemo } from "react";
import { fetchCoffeeShop, CoffeeShop } from "../api";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import BeatLoader from "react-spinners/BeatLoader";
import { LazyLoadImage } from "react-lazy-load-image-component";

//drink images
import drinkImg1 from "../assets/frappe.jpeg";
import drinkImg2 from "../assets/hotchocolate.jpeg";
import drinkImg3 from "../assets/latte.jpeg";
import drinkImg4 from "../assets/machiato.jpeg";

//food images
import foodImg1 from "../assets/cookies.jpeg";
import foodImg2 from "../assets/croissant.jpeg";
import foodImg3 from "../assets/sandwich.jpeg";
import { useCart } from "@/contexts/CartContext";

const drinkImages = [drinkImg1, drinkImg2, drinkImg3, drinkImg4];
const foodImages = [foodImg1, foodImg2, foodImg3];

const shuffleArray = (array: string[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const descriptions = [
  "A delicious blend of flavors",
  "Perfect for a refreshing break",
  "A classic favorite",
  "Rich and flavorful",
  "A delightful treat",
];

export const CoffeeShopPage: React.FC = () => {
  const { shopId } = useParams<{ shopId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedImage } = location.state || {};
  const [shop, setShop] = useState<CoffeeShop | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<
    CoffeeShop["products"]
  >([]);
  const [filteredImages, setFilteredImages] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("All");

  const { addToCart, getItemQuantity } = useCart();

  useEffect(() => {
    if (shopId) {
      fetchCoffeeShop(shopId)
        .then((shop) => {
          setShop(shop);
          setFilteredProducts(shop.products);
          setIsLoading(false);
        })
        .catch(() => {
          setError("Failed to load shop details");
          setIsLoading(false);
        });
    } else {
      setError("Shop ID is undefined");
      setIsLoading(false);
    }
  }, [shopId]);

  useEffect(() => {
    if (!shop) return;

    const images: string[] = [];
    let productsToShow = shop.products;

    if (filter !== "All") {
      productsToShow = shop.products.filter(
        (product) => product.category === filter
      );
    }

    productsToShow.forEach((product, index) => {
      switch (product.category) {
        case "Drink":
          images.push(drinkImages[index % drinkImages.length]);
          break;
        case "Food":
          images.push(foodImages[index % foodImages.length]);
          break;
        default:
          images.push(selectedImage || drinkImages[index % drinkImages.length]);
          break;
      }
    });

    setFilteredProducts(productsToShow);
    setFilteredImages(shuffleArray(images));
  }, [filter, shop, selectedImage]);

  const productDescriptions = useMemo(() => {
    return (
      shop?.products.reduce((acc, product) => {
        acc[product._id] =
          descriptions[Math.floor(Math.random() * descriptions.length)];
        return acc;
      }, {} as Record<string, string>) || {}
    );
  }, [shop]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <BeatLoader color={"#00695C"} loading={isLoading} />
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!shop) return <div>Shop not found</div>;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative">
        <LazyLoadImage
          src={selectedImage}
          alt={shop.name}
          className="w-full h-80 object-cover"
        />
        <button
          onClick={() => navigate(-1)}
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
            <button
              onClick={() => setFilter("All")}
              className={`text-gray-500 rounded-full py-2 px-4 flex items-center ${
                filter === "All" ? "bg-teal-800 text-white" : ""
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("Drink")}
              className={`text-gray-500 rounded-full py-2 px-4 flex items-center ${
                filter === "Drink" ? "bg-teal-800 text-white" : ""
              }`}
            >
              Drinks
            </button>
            <button
              onClick={() => setFilter("Food")}
              className={`text-gray-500 rounded-full py-2 px-4 flex items-center ${
                filter === "Food" ? "bg-teal-800 text-white" : ""
              }`}
            >
              Food
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {filteredProducts.map((product, index) => (
              <div
                key={product._id}
                className="flex bg-gray-100 rounded-lg p-4 shadow-md"
              >
                <LazyLoadImage
                  src={filteredImages[index]}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-600 text-sm">
                    {productDescriptions[product._id]}
                  </p>
                  <span className="font-semibold text-lg">
                    ${(product.price / 100).toFixed(2)}
                  </span>
                </div>
                <button
                  className="bg-teal-800 text-white rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={() => addToCart(product)}
                >
                  {getItemQuantity(product._id) > 0 ? (
                    <span>{getItemQuantity(product._id)}</span>
                  ) : (
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
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
