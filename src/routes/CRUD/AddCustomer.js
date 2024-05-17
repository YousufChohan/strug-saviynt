import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/images/bg-example.png";
import { VscClose } from "react-icons/vsc";
import axios from "axios";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { REACT_APP_BASE_URL } from "../../constants/url";
import { useSelector } from "react-redux";
import { CiImageOn } from "react-icons/ci";

const AddCustomer = () => {
  const [customerData, setCustomerData] = useState({
    name: "",
    overview: "",
    specialFeatures: "",
    venue: "",
    price: "",
    dateStarts: "",
    dateEnds: "",
    dayStarts: "",
    dayEnds: "",
    timeStarts: "",
    timeEnds: "",
    customerPicture: null, // New state for storing the selected image file
  });

  const { userData } = useSelector((state) => state.auth);
  // console.log("token quick check", userData.token);
  // console.log("userData in header:", userData.role);
  const userRole = userData?.role || "";

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue) => {
    if (newValue.startDate) {
      // console.log("newValue.startDate:", newValue);
      const dayStarts = dayjs(newValue.startDate).format("dddd");
      const dateStarts = dayjs(newValue.startDate).format("MM/DD/YYYY");
      setCustomerData((prevData) => ({ ...prevData, dayStarts, dateStarts }));
    }

    if (newValue.endDate) {
      const dayEnds = dayjs(newValue.endDate).format("dddd");
      const dateEnds = dayjs(newValue.endDate).format("MM/DD/YYYY");
      setCustomerData((prevData) => ({ ...prevData, dayEnds, dateEnds }));
    }

    setValue(newValue);
  };

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
    e.prcustomerDefault();

    // Add form validation logic here

    try {
      const formData = new FormData();
      formData.append("name", customerData.name);
      formData.append("price", customerData.price);
      formData.append("venue", customerData.venue);

      formData.append("overview", customerData.overview);
      formData.append("specialFeatures", customerData.specialFeatures);

      formData.append("dateStarts", customerData.dateStarts);
      formData.append("dateEnds", customerData.dateEnds);

      formData.append("dayStarts", customerData.dayStarts);
      formData.append("dayEnds", customerData.dayEnds);

      formData.append("timeStarts", customerData.timeStarts);
      formData.append("timeEnds", customerData.timeEnds);

      formData.append("creatorName", "Tim");

      formData.append("customerPicture", customerData.customerPicture); // Append the image file

      if (
        !customerData.name ||
        !customerData.price ||
        !customerData.venue ||
        !customerData.overview ||
        !customerData.specialFeatures ||
        !customerData.dateStarts ||
        !customerData.dateEnds ||
        !customerData.dayEnds ||
        !customerData.dayStarts ||
        !customerData.timeEnds ||
        !customerData.timeStarts
      ) {
        window.alert("Please fill all the fields.");
        return;
      }

      if (!customerData.customerPicture) {
        window.alert("Please upload an image for the Customer");
        return;
      }

      // console.log("customerData added", formData);

      await addCustomer(formData); // Call the addCustomer function with the FormData
      navigate("/customers"); // Go back one step in history
    } catch (error) {
      setErrors(error);

      // Handle error if needed
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
            "x-auth-token": userData.token,
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
    <>
      {userRole === "Admin" ? (
        <div
          className="flex w-full items-center justify-center bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <div className="mx-4 my-24 flex flex-col py-6 md:px-6 px-2 rounded-md bg-black min-w-[260px] max-w-[50rem] relative items-center">
            {/* Use a Link component for navigation */}
            <Link
              to="#"
              className="w-5 h-5 absolute right-3 top-3 cursor-pointer"
              onClick={handleGoBack}
            >
              <VscClose className="w-5 h-5 text-secondary font-bold" />
            </Link>
            <h2 className="text-center md:text-3xl underline text-md font-bold text-secondary">
              Add an Customer
            </h2>

            {/* AddCustomer Form */}
            <form
              className="mt-4 flex w-full flex-wrap flex-grow gap-x-8 justify-between"
              onSubmit={handleSubmit}
            >
              {/* Customer Name */}
              <div className="mb-4 md:w-[30%] w-full">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Customer Name
                </label>
                <input
                  type="text"
                  name="name"
                  maxLength={100}
                  value={customerData.name}
                  onChange={handleChange}
                  className={`appearance-none border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg w-full py-2 px-3 md:text-base text-xs leading-tight border-2 border-secondary focus:outline-none focus:shadow-outline`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic">{errors.name}</p>
                )}
              </div>

              {/* venue */}
              <div className="mb-4 md:w-[30%] w-full">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="venue"
                >
                  Venue
                </label>
                <input
                  maxLength={60}
                  type="text"
                  name="venue"
                  value={customerData.venue}
                  onChange={handleChange}
                  className={`appearance-none border ${
                    errors.venue ? "border-red-500" : "border-gray-300"
                  } rounded-lg w-full py-2 px-3 md:text-base text-xs leading-tight border-2 border-secondary focus:outline-none focus:shadow-outline`}
                />
                {errors.venue && (
                  <p className="text-red-500 text-xs italic">{errors.venue}</p>
                )}
              </div>

              {/* price */}
              <div className="mb-4 md:w-[30%] w-full">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  maxLength={4}
                  max={200}
                  type="number"
                  name="price"
                  value={customerData.price}
                  onChange={handleChange}
                  className={`appearance-none border ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  } rounded-lg w-full py-2 px-3 md:text-base text-xs leading-tight border-2 border-secondary focus:outline-none focus:shadow-outline`}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs italic">{errors.price}</p>
                )}
              </div>

              {/* Overview */}
              <div className="mb-4 w-full">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="overview"
                >
                  Overview
                </label>
                <textarea
                  type="text"
                  name="overview"
                  maxLength={3000}
                  value={customerData.overview}
                  onChange={handleChange}
                  className={`appearance-none border ${
                    errors.overview ? "border-red-500" : "border-gray-300"
                  } rounded-lg w-full py-2 px-3 md:min-h-48 min-h-32 md:text-base text-xs border-2 border-secondary leading-tight focus:outline-none focus:shadow-outline`}
                />
                {errors.overview && (
                  <p className="text-red-500 text-xs italic">
                    {errors.overview}
                  </p>
                )}
              </div>

              {/* specialFeatures */}
              <div className="mb-4 w-full">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="specialFeatures"
                >
                  Special Features
                </label>
                <textarea
                  maxLength={800}
                  type="text"
                  name="specialFeatures"
                  value={customerData.specialFeatures}
                  onChange={handleChange}
                  className={`appearance-none border ${
                    errors.specialFeatures
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg w-full py-2 px-3 md:text-base text-xs md:min-h-32 min-h-24 border-2 border-secondary leading-tight focus:outline-none focus:shadow-outline`}
                />
                {errors.specialFeatures && (
                  <p className="text-red-500 text-xs italic">
                    {errors.specialFeatures}
                  </p>
                )}
              </div>

              <div className="mb-4 w-full">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="startdate"
                >
                  Customer Dates
                </label>
                <Datepicker
                  inputClassName="rounded-lg w-full py-2 px-3 md:text-base text-xs border-2 border-secondary leading-tight focus:outline-none focus:shadow-outline"
                  separator={"to"}
                  useRange={false}
                  showFooter={true}
                  displayFormat={"MM/DD/YYYY (dddd)"}
                  value={value}
                  readOnly={true}
                  // dateFormat="MM/DD/YYYY (dddd)" // Use "dddd" for day of the week
                  onChange={handleValueChange}
                  showShortcuts={true}
                />
              </div>

              <div className="w-full flex flex-col md:flex-row items-center justify-around">
                <div className="mb-4 md:w-[30%] w-full">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="starttime"
                  >
                    Customer Start Time
                  </label>
                  <div className="relative">
                    <TimePicker
                      onChange={(time) =>
                        setCustomerData((prevData) => ({
                          ...prevData,
                          timeStarts: time,
                        }))
                      }
                      value={customerData.timeStarts}
                      className="appearance-none border border-2 border-secondary bg-white rounded-lg w-full py-2 px-3 md:text-base text-sm leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>

                <div className="mb-4 md:w-[30%] w-full">
                  <label
                    className="block text-white text-sm font-bold mb-2"
                    htmlFor="endtime"
                  >
                    Customer End Time
                  </label>
                  <div className="relative">
                    <TimePicker
                      onChange={(time) =>
                        setCustomerData((prevData) => ({
                          ...prevData,
                          timeEnds: time,
                        }))
                      }
                      value={customerData.timeEnds}
                      className="appearance-none border-2 border-secondary bg-white rounded-lg w-full py-2 px-3 md:text-base text-sm leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4 w-full">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="customerPicture"
                >
                  Customer Picture (Landscape 1440 x 820)
                </label>
                {customerData.customerPicture ? (
                  <img
                    src={URL.createObjectURL(customerData.customerPicture)}
                    alt="tachtpg"
                    className="my-2 rounded-xl sm:min-w-80 w-full aspect-video self-center"
                  />
                ) : (
                  <div
                    alt="tachtpg"
                    className="my-2 rounded-xl sm:min-w-80 w-full h-36 self-center border-dashed flex flex-col-reverse border border-secondary justify-center items-center"
                  >
                    <div className="text-md font-normal text-white">
                      No Image Selected
                    </div>
                    <div>
                      <CiImageOn className="text-6xl font-bold text-white h-30" />
                    </div>
                  </div>
                )}

                <input
                  type="file"
                  name="customerPicture"
                  accept="image/*"
                  onChange={handleChange}
                  className="bg-white border rounded-lg w-full border-2 border-secondary py-2 px-3 md:text-base text-xs leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.customerPicture && (
                  <p className="text-red-500 text-xs italic">
                    {errors.customerPicture}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-secondary text-white w-full self-center mt-3 py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              >
                ADD EVENT
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col w-100 h-screen  items-center justify-center bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <h1 className="text-primary sm:text-[80px] leading-tight text-4xl font-bold line text-center mb-[10px] ">
            Not Authorized{" "}
          </h1>
          <p className="text-black sm:text-xl text-sm font-normal text-center max-w-[600px] ">
            Dear user, you are not authorised to access this page.
          </p>
        </div>
      )}
    </>
  );
};

export default AddCustomer;
