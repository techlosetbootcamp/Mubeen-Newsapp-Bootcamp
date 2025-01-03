import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { CiSearch, CiTextAlignRight } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { NAVBAR_ROUTES } from "../../constants/navbarLinks.ts";
import { logo } from "../../constants/images.ts";
import useNavbar from "./useNavbar.ts";

function Navbar() {
  const {
    isMobileMenuOpen,
    setMobileMenuOpen,
    handleRouteClick,
    activeRoute,
    navigate,
  } = useNavbar();

  return (
    <div className="flex items-center justify-between md:justify-around bg-white h-[80px] w-full px-4 shadow-md">
      <div className="pr-5">
        <Link to="/">
          <img src={logo} alt="Logo" width={63} height={52} />
        </Link>
      </div>

      <div className="hidden md:flex gap-x-10">
        {NAVBAR_ROUTES.map((route) => (
          <div key={route.name} className="flex items-center gap-2">
            {activeRoute === route.name && (
              <div className="h-2 w-2 bg-red-700 rounded-full" />
            )}
            <Link
              to={route.path}
              onClick={() => handleRouteClick(route.name)}
              className={`${
                activeRoute === route.name ? "font-bold text-gray-800" : ""
              }`}
            >
              {route.name}
            </Link>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-5">
        <MdKeyboardDoubleArrowRight
          size={20}
          className="cursor-pointer hidden md:block"
        />
        <FiUser
          size={20}
          className="cursor-pointer"
          onClick={() => navigate("/profile")}
        />
        <CiSearch
          size={20}
          className="cursor-pointer"
          onClick={() => navigate("/search")}
        />
        <CiTextAlignRight
          size={20}
          className="cursor-pointer md:hidden"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        />
      </div>

      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg p-4 z-50 w-[80%] max-w-[300px] transform transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src={logo} alt="Logo" width={49} height={40} />
          </Link>
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
            onClick={() => setMobileMenuOpen(false)}
          >
            <IoCloseOutline size={35} />
          </button>
        </div>

        <div className="flex flex-col gap-y-4 mt-10">
          {NAVBAR_ROUTES.map((route) => (
            <div key={route.name} className="flex items-center gap-2">
              {activeRoute === route.name && (
                <div className="h-2 w-2 bg-red-700 rounded-full" />
              )}
              <Link
                to={route.path}
                onClick={() => {
                  handleRouteClick(route.name);
                  setMobileMenuOpen(false);
                }}
                className={`${
                  activeRoute === route.name ? "font-bold text-gray-800" : ""
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
