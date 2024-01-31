import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { VscClose } from "react-icons/vsc";
import backgroundImage from "../../assets/images/bg-example.png";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/AuthSlice";

// import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  // Move the useSelector hook outside the handleLogin function
  // const authState = useSelector((state) => state.auth);
  // const { userData } = authState;

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const handleLogin = async () => {
    try {
      // Form validation
      if (!formData.email || !formData.password) {
        window.alert("Please enter your Email and Password.");
        return;
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        window.alert("Please enter a valid email address.");
        return;
      }

      // // Password length validation
      // if (formData.password.length < 6) {
      //   window.alert("Password must be at least 6 characters long.");
      //   return;
      // }

      const params = {
        email: formData.email,
        password: formData.password,
      };

      // console.log("Login Params:", params);

      // Dispatch the login action
      dispatch(login(params))
        .then((userData) => {
          // Check if login was successful
          if (userData.type === "login/fulfilled") {
            // Login successful, navigate to the home page
            navigate("/");
          } else {
            // Login failed, show an alert
          }
        })
        .catch((error) => {
          setErrors(error);
          console.error("Login has failed:", error);

          // Display an alert for login error
          window.alert("Login failed due to incorrect Email or Password.");

          // Handle login error
        });
    } catch (error) {
      setErrors(error);
      console.error("Login failed 22:", error);

      // Display an alert for login error
      window.alert("Login failed due to incorrect Email or Password.");

      // Handle login error
    }
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-2); // Go back one step in history
  };

  return (
    <>
      <div
        className="flex h-screen w-100 items-center justify-center bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="mx-4 flex flex-col p-6 rounded-md bg-slate-400 w-[25rem] relative items-center ">
          {/* Use a Link component for navigation */}
          <Link
            to="#"
            className="w-5 h-5 absolute right-3 top-3 cursor-pointer"
            onClick={handleGoBack}
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
            {/* <div className="mb-4">
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
            </div> */}

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
