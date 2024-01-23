import React, { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import { LuMenu } from "react-icons/lu";
import Button from "./Button";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div
      className={`justify-between flex px-16 py-4 text-center items-center fixed w-full transition ${
        scrolled
          ? "bg-gray-400 duration-500 ease-in"
          : "bg-transparent duration-500 ease-out"
      }`}
    >
      <LuMenu
        className={`font-semibold text-4xl transition ${
          scrolled
            ? "text-white duration-500 ease-in"
            : "text-black duration-500 ease-out"
        }`}
      />
      {/* <img src={logo} alt="Logo" className="max-w-[120px] h-8" /> */}
      <p className="font-bold text-white text-5xl text-center">LOGO</p>
      <div className="sm:block hidden">
        <Button link={"/signup"}>JOIN BETI</Button>
      </div>
    </div>
  );
};

export default Header;
