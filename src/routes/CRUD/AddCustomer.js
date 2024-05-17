import React from "react";
import { useState } from "react";
import { REACT_APP_BASE_URL } from "../../constants/url";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CiImageOn } from "react-icons/ci";
import { VscClose } from "react-icons/vsc";
import addbg from "../../assets/images/addbg.png";

const AddCustomer = () => {
  const [customerData, setCustomerData] = useState({
    username: "",
    customerName: "",
    email: "",
    customerPicture: null, // New state for storing the selected image file
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "customerPicture") {
      // Handle file input separately
      setCustomerData((prevData) => ({
        ...prevData,
        customerPicture: e.target.files[0],
      }));
    } else {
      // Handle other inputs
      setCustomerData({ ...customerData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add form validation logic here

    try {
      const formData = new FormData();
      formData.append("username", customerData.username);
      formData.append("customerName", customerData.customerName);
      formData.append("email", customerData.email);
      formData.append("customerPicture", customerData.customerPicture); // Append the image file

      if (
        !customerData.username ||
        !customerData.customerName ||
        !customerData.email
      ) {
        window.alert("Please fill all the fields.");
        return;
      }

      if (!customerData.customerPicture) {
        window.alert("Please upload an image for the Customer");
        return;
      }

      // console.log("customerData added", formData);

      await addCustomer(formData);
      navigate("/");
    } catch (error) {
      setErrors(error);

      // Handle error
      console.error("Adding Customer failed:", error);
    }
  };

  const addCustomer = async (formData, token) => {
    try {
      const response = await axios.post(
        `${REACT_APP_BASE_URL}/customer`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Adding Customer response:", response.data);
      window.alert("Customer Added Successfully.");
    } catch (error) {
      console.error("Adding Customer failed:", error);

      // Handle Adding Customer error

      throw error;
    }
  };

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back one step in history
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-800">
      <div className="mx-4 mt-12 shadow-2xl flex flex-col pb-6 bg-[#fbfcfc] min-w-[260px] max-w-[500px] rounded-2xl relative items-center">
        {/* Use a Link component for navigation */}
        <div
          className="bg-primary py-6 w-full bg-center bg-no-repeat bg-cover rounded-t-2xl"
          style={{
            backgroundImage: `url(${addbg})`,
          }}
        >
          <Link
            to="#"
            className="w-5 h-5 absolute right-3 top-3 cursor-pointer"
            onClick={handleGoBack}
          >
            <VscClose className="w-5 h-5 text-white font-bold" />
          </Link>
          <h2 className="text-center md:text-3xl  text-md font-bold font-serif text-white">
            Add a Customer
          </h2>
        </div>

        {/* AddCustomer Form */}
        <form
          className="mt-4 flex w-full flex-wrap flex-grow justify-between items-center"
          onSubmit={handleSubmit}
        >
          {/* username */}
          <div className="mb-4 w-full flex justify-center">
            <input
              maxLength={60}
              type="text"
              placeholder="Username"
              name="username"
              value={customerData.username}
              onChange={handleChange}
              className={`appearance-none border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-lg w-11/12 py-2 px-3 md:text-base text-xs leading-tight  border-secondary focus:outline-none focus:shadow-outline`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic">{errors.username}</p>
            )}
          </div>

          {/* customerName */}
          <div className="mb-4 w-full flex justify-center">
            <input
              maxLength={60}
              type="text"
              placeholder="Customer Name"
              name="customerName"
              value={customerData.customerName}
              onChange={handleChange}
              className={`appearance-none border ${
                errors.customerName ? "border-red-500" : "border-gray-300"
              } rounded-lg w-11/12 py-2 px-3 md:text-base text-xs leading-tight  border-secondary focus:outline-none focus:shadow-outline`}
            />
            {errors.customerName && (
              <p className="text-red-500 text-xs italic">
                {errors.customerName}
              </p>
            )}
          </div>

          {/* email */}
          <div className="w-full flex justify-center">
            <input
              maxLength={60}
              placeholder="Email"
              type="text"
              name="email"
              value={customerData.email}
              onChange={handleChange}
              className={`appearance-none border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg w-11/12 py-2 px-3 md:text-base text-xs leading-tight  border-secondary focus:outline-none focus:shadow-outline`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>

          <div className="mb-4 w-full justify-center flex-col items-center flex">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="customerPicture"
            >
              Customer Picture (Ratio 1:1)
            </label>
            {customerData.customerPicture ? (
              <img
                src={URL.createObjectURL(customerData.customerPicture)}
                alt="Customer"
                className="my-2 rounded-xl w-64 aspect-video self-center"
              />
            ) : (
              <div
                alt="Fallback"
                className="my-2 rounded-xl w-11/12 h-36 self-center border-dashed flex flex-col-reverse border border-secondary justify-center items-center"
              >
                <div className="text-md font-normal text-black">
                  No Image Selected
                </div>
                <div>
                  <CiImageOn className="text-6xl font-bold text-black h-30" />
                </div>
              </div>
            )}

            <input
              type="file"
              name="customerPicture"
              accept="image/*"
              onChange={handleChange}
              className="bg-white  rounded-lg w-11/12 border-secondary py-2 px-3 md:text-base text-xs leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.customerPicture && (
              <p className="text-red-500 text-xs italic">
                {errors.customerPicture}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-[#57BC90] to-primary text-white w-11/12 self-center mt-3 py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              ADD CUSTOMER
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
