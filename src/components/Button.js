import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  return (
    <Link
      to={props.link}
      className="bg-primary px-10 py-3 rounded-lg font-normal text-white hover:bg-white hover:text-black transition duration-300"
    >
      {props.children}
    </Link>
  );
};

export default Button;
