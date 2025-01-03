import React from "react";
import { Link } from "react-router-dom";
import { navLinks, socialMediaLinks } from "../../constants/footerLinks.ts";
import { SiNbc } from "react-icons/si";

function Footer() {
  return (
    <div className="bg-gray-900 md:w-full flex flex-col md:flex-row items-center justify-evenly gap-10 px-6 py-10 max-w-full">
      <div className="flex flex-col items-center justify-center gap-y-1">
        <SiNbc className="text-white w-[66px] h-[40px]" />
        <p className="text-gray-600 mdL:text-sm text-xs">
          Copyright © 2020 | NBC News
        </p>
      </div>

      <div className="hidden md:flex flex-col gap-y-2 text-white text-center md:text-left">
        <p className="text-sm">Privacy Policy</p>
        <p className="text-sm">Do not sell my personal info</p>
        <p className="text-sm">Terms and Services</p>
        <p className="text-sm">nbcnews.com Site map</p>
      </div>

      <div className="flex flex-col items-center justify-around gap-6 text-white">
        <div className="flex flex-col md:flex-row gap-x-10">
          {navLinks.map((link) => (
            <p key={link?.name}>{link?.name}</p>
          ))}
        </div>

        <div className="flex gap-8 md:gap-x-20">
          {socialMediaLinks.map(({ icon: Icon, href }, index) => (
            <Link
              key={index}
              to={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 cursor-pointer"
            >
              <Icon size={25} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
