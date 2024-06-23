import React, { useState, useEffect, useRef } from "react";
import { CoffeeShop } from "../api";

interface SearchBarProps {
  coffeeShops: CoffeeShop[];
  onSearch: (query: string) => void;
  onSelectShop: (shopId: string, selectedImage: string) => void;
  images: string[];
}
const SearchBar: React.FC<SearchBarProps> = ({
  coffeeShops,
  onSearch,
  onSelectShop,
  images,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredShops, setFilteredShops] = useState<CoffeeShop[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const lowercaseQuery = searchQuery.toLowerCase();
    const filtered = coffeeShops.filter(
      (shop) =>
        shop.name.toLowerCase().includes(lowercaseQuery) ||
        shop.location.address.toLowerCase().includes(lowercaseQuery)
    );
    setFilteredShops(filtered);
    setShowDropdown(searchQuery.length > 0 && filtered.length > 0);
  }, [searchQuery, coffeeShops]);

  const handleSearch = () => {
    onSearch(searchQuery);
    setShowDropdown(false);
  };

  const handleSelectShop = (shop: CoffeeShop, index: number) => {
    const selectedImage = images[index % images.length];
    onSelectShop(shop._id, selectedImage);
    setSearchQuery("");
    setShowDropdown(false);
  };

  return (
    <div className="relative mb-6">
      <div className="flex">
        <input
          type="text"
          placeholder="Search coffee shops"
          className="flex-grow bg-gray-200 rounded-l-full py-2 px-4 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          className="bg-teal-800 text-white rounded-r-full p-2 w-12 flex items-center justify-center"
          onClick={handleSearch}
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {filteredShops.map((shop, index) => (
            <div
              key={shop._id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectShop(shop, index)}
            >
              <h3 className="font-semibold">{shop.name}</h3>
              <p className="text-sm text-gray-600">{shop.location.address}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
