import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  return (
    <Link
      to={props.link}
      className="bg-primary md:px-10 md:py-3 py-1 px-4 md:text-md text-xs rounded-lg font-normal text-white hover:bg-white hover:text-black transition duration-300"
    >
      {props.children}
    </Link>
  );
};

export default Button;
