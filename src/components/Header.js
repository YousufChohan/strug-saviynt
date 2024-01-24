import React, { useState, useEffect } from "react";
import { LuMenu } from "react-icons/lu";
import { VscClose } from "react-icons/vsc";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/AuthSlice";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sidemenu, setSideMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div
      className={`justify-between flex px-2 py-4 sm:px-16 text-center items-center fixed w-full transition ${
        scrolled
          ? "bg-black duration-500 ease-in"
          : "bg-transparent duration-500 ease-out"
      }`}
    >
      <p
        className={`font-bold  text-5xl text-center ${
          scrolled
            ? " text-white duration-500 ease-in"
            : " text-black duration-500 ease-out"
        }`}
      >
        LOGO
      </p>
      <ul className="justify-normal gap-4 text-lg font-bold text-white sm:flex hidden">
        <li
          className={`hover:bg-primary px-3 py-1 rounded-xl transition duration-300 ${
            scrolled
              ? " text-white duration-500 ease-in"
              : " text-black duration-500 ease-out"
          }`}
        >
          Home
        </li>
        <li
          className={`hover:bg-primary px-3 py-1 rounded-xl transition duration-300 ${
            scrolled
              ? " text-white duration-500 ease-in"
              : " text-black duration-500 ease-out"
          }`}
        >
          {" "}
          Events
        </li>
      </ul>

      {sidemenu ? (
        <VscClose
          className={`font-semibold sm:hidden block text-4xl transition ${
            scrolled
              ? "text-white duration-500 ease-in"
              : "text-black duration-500 ease-out"
          }`}
          onClick={() => setSideMenu(!sidemenu)}
        />
      ) : (
        <LuMenu
          className={`font-semibold sm:hidden block text-4xl transition ${
            scrolled
              ? "text-white duration-500 ease-in"
              : "text-black duration-500 ease-out"
          }`}
          onClick={() => setSideMenu(!sidemenu)}
        />
      )}

      {sidemenu && (
        <ul className="absolute w-40 top-16 right-0 px-4 py-2 bg-white justify-normal gap-4 text-lg font-bold text-white sm:hidden block">
          <li className="hover:bg-primary px-3 py-1 text-black rounded-xl transition duration-300">
            Home
          </li>
          <li className="hover:bg-primary px-3 py-1 text-black rounded-xl transition duration-300">
            Events
          </li>
          {!userData ? (
            <li className="hover:bg-primary px-3 py-1 text-black rounded-xl transition duration-300">
              <Link to={"/signup"}>JOIN BETI</Link>
            </li>
          ) : (
            <li className="hover:bg-primary px-3 py-1 text-black rounded-xl transition duration-300">
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      )}
      <div className="sm:block hidden">
        {!userData ? (
          <Button link={"/signup"}>JOIN BETI</Button>
        ) : (
          <button onClick={handleLogout}>
            <Button>LOGOUT</Button>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
