import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-10">
      <div className="flex items-center gap-4">
        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p className="py-4 text-center text-xs md:text-sm text-gray-500">
          Copyright 2025 © greatstack.dev All Right Reserved.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
          <FaFacebook size={20} />
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
          <FaTwitter size={20} />
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
          <FaInstagram size={20} />
        </a>
      </div>
    </div>
  );
};

export default Footer;