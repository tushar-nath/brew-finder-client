import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-teal-800">Find a coffee shop anywhere</h1>
      <div className="w-8 h-8 rounded-full overflow-hidden">
        <img src="/path-to-user-image.jpg" alt="User" className="w-full h-full object-cover" />
      </div>
    </header>
  );
};

export default Header;