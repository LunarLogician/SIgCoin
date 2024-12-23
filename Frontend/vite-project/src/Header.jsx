import React, { useState } from "react";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="text-2xl font-bold">MyLogo</div>

          <div className=" md:flex space-x-4">
            <a href="#" className="hover:bg-blue-700 px-3 py-2 rounded-md">Home</a>
            <a href="#" className="hover:bg-blue-700 px-3 py-2 rounded-md">About</a>
            <a href="#" className="hover:bg-blue-700 px-3 py-2 rounded-md">Services</a>
            <a href="#" className="hover:bg-blue-700 px-3 py-2 rounded-md">Contact</a>
          </div>

          </div>
          </div>
    </nav>
  );
}

export default Header;
