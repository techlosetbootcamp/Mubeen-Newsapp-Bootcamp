import React from "react";
import { CiViewTable } from "react-icons/ci";

const Header: React.FC = () => {
    return (
        <div className="bg-white w-full h-[54px] flex items-center justify-between px-4">
            <div className="flex gap-x-5 font-semibold">
                <a href="/">Latest Stories</a>
                <a href="/">Opinion</a>
                <a href="/">Health</a>
            </div>
            <CiViewTable size={20} />
        </div>
    );
};

export default Header;
