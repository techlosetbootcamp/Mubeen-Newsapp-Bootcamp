import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { FiUser } from 'react-icons/fi';
import { CiSearch } from 'react-icons/ci';
import { CiTextAlignRight } from "react-icons/ci";
import logo from '../assets/logo.png';

function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState<string>(''); // State for tracking active route
  const navigate = useNavigate();

  const handleRouteClick = (route: string) => {
    setActiveRoute(route);
  };

  return (
    <div className="flex items-center justify-between bg-white h-[80px] w-full px-4 md:px-20 shadow-md">
      {/* Logo */}
      <div>
        <Link to="/">
          <img src={logo} alt="Logo" width={63} height={52} />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-x-10">
        {[
          { name: 'Corona Updates', path: '/corona-updates' },
          { name: 'Politics', path: '/politics' },
          { name: 'Business', path: '/business' },
          { name: 'Sports', path: '/sports' },
          { name: 'World', path: '/world' },
          { name: 'Travel', path: '/travel' },
          { name: 'Podcasts', path: '/podcasts' },
        ].map((route) => (
          <div key={route.name} className="flex items-center gap-2">
            {activeRoute === route.name && (
              <div className="h-2 w-2 bg-red-700 rounded-full" />
            )}
            <Link
              to={route.path}
              onClick={() => handleRouteClick(route.name)}
              className={`${
                activeRoute === route.name ? 'font-bold text-gray-800' : ''
              }`}
            >
              {route.name}
            </Link>
          </div>
        ))}
      </div>

      {/* Icons */}
      <div className="flex items-center gap-5">
        {/* Other icons */}
        <MdKeyboardDoubleArrowRight size={20} className="cursor-pointer hidden md:block" />
        <FiUser size={20} className="cursor-pointer" />

        {/* Search Icon */}
        <CiSearch
          size={20}
          className="cursor-pointer"
          onClick={() => navigate('/search')}
        />

        {/* Hamburger Menu */}
        <CiTextAlignRight
          size={20}
          className="cursor-pointer md:hidden"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg p-4 z-50 w-[80%] max-w-[300px] transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
          onClick={() => setMobileMenuOpen(false)}
        >
          Close
        </button>

        {/* Menu Items */}
        <div className="flex flex-col gap-y-4 mt-10">
          {[
            { name: 'Corona Updates', path: '/corona-updates' },
            { name: 'Politics', path: '/politics' },
            { name: 'Business', path: '/business' },
            { name: 'Sports', path: '/sports' },
            { name: 'World', path: '/world' },
            { name: 'Travel', path: '/travel' },
            { name: 'Podcasts', path: '/podcasts' },
          ].map((route) => (
            <div key={route.name} className="flex items-center gap-2">
              {activeRoute === route.name && (
                <div className="h-2 w-2 bg-red-700 rounded-full" />
              )}
              <Link
                to={route.path}
                onClick={() => {
                  handleRouteClick(route.name);
                  setMobileMenuOpen(false); // Close menu on selection
                }}
                className={`${
                  activeRoute === route.name ? 'font-bold text-gray-800' : ''
                }`}
              >
                {route.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
