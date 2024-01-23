import React, { useState } from "react";
import { Link } from "react-router-dom";
import { VscClose } from "react-icons/vsc";
import backgroundImage from "../../assets/images/bg-example.jpg";
import axios from "axios";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // If validation passes, you can submit the form (make API call, etc.)
  };

  return (
    <>
      <div
        className="flex h-screen w-100 items-center justify-center bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="flex flex-col p-6 rounded-md bg-slate-400 w-[25rem] relative items-center ">
          {/* Use a Link component for navigation */}
          <Link
            to="/"
            className="w-5 h-5 absolute right-3 top-3 cursor-pointer"
          >
            <VscClose className="w-5 h-5 font-bold" />
          </Link>
          <h2 className="text-center font-bold text-primary">Login to BETI</h2>

          {/* Login Form */}
          <form className="mt-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`appearance-none border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              )}
            </div>

            {/* Keep me logged in (Checkbox) */}
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="form-checkbox h-4 w-4 text-primary"
                />
                <span className="ml-2 text-gray-700">Keep me logged in</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>

            {/* Sign up prompt */}
            <p className="mt-4 text-gray-700">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
