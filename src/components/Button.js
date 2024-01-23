import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  return (
    <Link
      to={props.link}
      className="bg-primary px-4 py-2 rounded-xl font-normal text-white"
    >
      {props.children}
    </Link>
  );
};

export default Button;
