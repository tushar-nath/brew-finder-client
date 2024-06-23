import React from "react";

const SearchBar: React.FC = () => {
  return (
    <div className="flex mb-6">
      <input
        type="text"
        placeholder="Search"
        className="flex-grow bg-gray-100 rounded-l-full py-2 px-4 focus:outline-none"
      />
      <button className="bg-teal-800 text-white rounded-r-full p-2 w-12 flex items-center justify-center">
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
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
