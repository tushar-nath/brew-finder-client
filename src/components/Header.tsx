import React from "react";
import ProfilePicture from "../assets/pfp.jpeg";

export const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center mb-6 pt-8">
      <h1 className="text-2xl font-bold text-teal-800">
        Find a coffee shop anywhere
      </h1>
      <div className="w-10 h-10 rounded-full overflow-hidden cursor-pointer">
        <img src={ProfilePicture} alt="Profile" />
      </div>
    </header>
  );
};
