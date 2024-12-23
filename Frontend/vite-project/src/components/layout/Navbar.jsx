import React from 'react';
import { Menu, X, Coins } from 'lucide-react';
import NavLink from './NavLink';
import MobileNavLink from './MobileNavLink';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const handelelogo = () => {

  console.log("Logo Clicked");

  }

  return (
    <nav className="bg-black border-b border-zinc-800 sticky top-0 z-50 backdrop-blur-lg bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Coins onClick={handelelogo} className="h-8 w-8 text-yellow-500" />
            <button onClick={handelelogo} className="ml-2 text-xl font-bold text-white">SigCoin</button>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/register">Register</NavLink>
            <NavLink href="/login">Login</NavLink>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-yellow-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black bg-opacity-95 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="/register">Register</MobileNavLink>
            <MobileNavLink href="/login">Login</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
