// Import necessary dependencies
import React from "react";
import { Link } from "react-router-dom";
import cross from "../../assets/images/logo.png";

const Signup = () => {
  // Use the useHistory hook

  return (
    <>
      <div className="flex h-screen w-100 items-center justify-center bg-white">
        <div className="flex flex-col p-6 rounded-md bg-slate-400 w-[25rem] h-[35rem] relative items-center">
          {/* Use a Link component for navigation */}
          <Link to="/">
            <img
              src={cross}
              alt="cross button"
              className="w-5 h-5 absolute right-3 top-3 cursor-pointer"
            />
          </Link>
          <h2 className="text-center font-bold text-primary">Signup to BETI</h2>
          <h2>asdasd</h2>
        </div>
      </div>
    </>
  );
};

export default Signup;
