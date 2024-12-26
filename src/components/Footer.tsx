import React from 'react';
import { HiWifi } from "react-icons/hi";
import { FaTwitter } from "react-icons/fa";
import { FaRedditAlien } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";
import logo from "../assets/logo.png";

function Footer() {
    return (
        <div className="bg-gray-900 md:w-full flex flex-col md:flex-row items-center justify-between gap-10 px-6 py-10 max-w-full">
            {/* Logo Section */}
            <div className="flex flex-col items-center justify-center gap-y-4">
                <img src={logo} alt="logo" className="md:w-[109px] md:h-[77px] w-[59px] h-[47px]" />
                <p className="text-gray-600 text-sm">Copyright © 2020 | NBC News</p>
            </div>

            {/* Privacy Policy Section */}
            <div className="hidden md:flex flex-col gap-y-2 text-white text-center md:text-left">
                <p className="text-sm">Privacy Policy</p>
                <p className="text-sm">Do not sell my personal info</p>
                <p className="text-sm">Terms and Services</p>
                <p className="text-sm">nbcnews.com Site map</p>
            </div>

            {/* Social Media Icons Section */}
            <div className="flex flex-col items-center justify-around gap-6 text-white">
                <div className="flex flex-col md:flex-row gap-x-10">
                    <p>About</p>
                    <p>Contact</p>
                    <p>Careers</p>
                    <p>Coupons</p>
                </div>
                <div className="flex gap-8 md:gap-x-20">
                    <HiWifi size={25} className="mt-2 cursor-pointer" />
                    <FaTwitter size={25} className="mt-2 cursor-pointer" />
                    <FaRedditAlien size={25} className="mt-2 cursor-pointer" />
                    <MdFacebook size={25} className="mt-2 cursor-pointer" />
                </div>
            </div>
        </div>
    );
}

export default Footer;
