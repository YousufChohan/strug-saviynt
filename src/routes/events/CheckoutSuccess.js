import React from "react";
import backgroundImage from "../../assets/images/bg-example.png";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <div
      className="flex flex-col items-center justify-center w-full pb-4 pt-20 sm:h-screen bg-cover bg-no-repeat bg-center px-2 gap-6 bg-opacity-50"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <h1 className="text-primary sm:text-[80px] leading-tight text-4xl font-bold line text-center mb-[10px] ">
        Your Checkout was successful
      </h1>
      <p className="text-black sm:text-xl text-sm font-normal text-center max-w-[600px] ">
        Your Transaction has been processed successfully.
      </p>
      <Link
        to={"/"}
        className="bg-primary sm:px-10 sm:py-3 py-2 px-3 md:text-md text-xs rounded-lg font-normal text-white hover:bg-black hover:text-white transition duration-300"
      >
        Continue
      </Link>
    </div>
  );
};

export default CheckoutSuccess;
