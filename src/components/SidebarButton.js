import React from "react";
import { Link } from "react-router-dom";

const SidebarButton = (props) => {
  return (
    <Link
      to={props.link}
      className="flex justify-start items-center bg-primarydark md:px-6 px-2 py-2 md:py-4 gap-2 shadow-xl rounded-2xl"
    >
      <img src={props.image} alt="Logo" className="md:w-8 w-4" />
      <p className="sm:block hidden  sm:text-sm md:text-xl text-white font-semibold font-lato truncate">
        {props.text}
      </p>
    </Link>
  );
};

export default SidebarButton;
