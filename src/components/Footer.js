import React from "react";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="flex py-10 px-2 flex-col items-center justify-center w-100 bg-black gap-5">
        <div className="group font-bold flex flex-col sm:text-5xl text-2xl text-center">
          <Link className="text-white" to={"/"}>
            BETI
          </Link>
          <span className="w-0 h-[1px] bg-white duration-400 transition-all group-hover:w-full"></span>
        </div>
        <div className="max-w-[500px] text-center text-white text-sm sm:text-lg font-normal font-['General Sans'] capitalize leading-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna
        </div>
        <div className="w-3/4 h-[1px] bg-white" />
        <div className="mt-2 sm:mt-4 sm:justify-between justify-center sm:flex sm:flex-row-reverse gap-3 sm:w-3/4">
          <div className="mb-3 flex gap-3 justify-center items-center">
            <FaFacebook className="text-white w-5 h-5" />
            <FaLinkedin className="text-white w-5 h-5" />
            <FaSquareXTwitter className="text-white w-5 h-5" />
            <FaYoutube className="text-white w-5 h-5" />
          </div>
          <p className="text-white">Copyright © All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
