import React from "react";
import { HiWifi } from "react-icons/hi";
import { FaTwitter } from "react-icons/fa";
import { FaRedditAlien } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";
import { SiNbc } from "react-icons/si";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-gray-900 md:w-full flex flex-col md:flex-row items-center justify-between gap-10 px-6 py-10 max-w-full">
      <div className="flex flex-col items-center justify-center gap-y-1">
        <SiNbc className="w-[64px] h-[40px] text-white" />
        <p className="text-gray-600 text-sm">Copyright © 2020 | NBC News</p>
      </div>

      <div className="hidden md:flex flex-col gap-y-2 text-white text-center md:text-left">
        <p className="text-sm">Privacy Policy</p>
        <p className="text-sm">Do not sell my personal info</p>
        <p className="text-sm">Terms and Services</p>
        <p className="text-sm">nbcnews.com Site map</p>
      </div>

      <div className="flex flex-col items-center justify-around gap-6 text-white">
        <div className="flex flex-col md:flex-row gap-x-10">
          <p>About</p>
          <p>Contact</p>
          <p>Careers</p>
          <p>Coupons</p>
        </div>
        <div className="flex gap-8 md:gap-x-20">
          {/* Wrap each icon with an anchor tag for navigation */}
          <Link
            to="https://www.techloset.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HiWifi size={25} className="mt-2 cursor-pointer" />
          </Link>
          <Link
            to="https://x.com/techloset"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter size={25} className="mt-2 cursor-pointer" />
          </Link>
          <Link
            to="https://www.techloset.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaRedditAlien size={25} className="mt-2 cursor-pointer" />
          </Link>
          <Link
            to="https://www.facebook.com/techloset/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdFacebook size={25} className="mt-2 cursor-pointer" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
