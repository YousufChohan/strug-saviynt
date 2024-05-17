import React, { useLayoutEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

const EditCustomer = () => {
  const location = useLocation(); // Use useLocation hook

  const customers = useSelector((state) => state.customers.customers);

  const { state } = location;
  const customerId = state?.customerData?._id;
  //   console.log("customerId", customerId);

  const customerData =
    customerId && customers.find((customer) => customer._id === customerId);

  const [editcustomerData, seteditCustomerData] = useState({
    name: customerData.name,
    overview: customerData.overview,
    specialFeatures: customerData.specialFeatures,
    venue: customerData.venue,
    price: customerData.price,
    dateStarts: customerData.dateStarts,
    dateEnds: customerData.dateEnds,
    dayStarts: customerData.dayStarts,
    dayEnds: customerData.dayEnds,
    timeStarts: customerData.timeStarts,
    timeEnds: customerData.timeEnds,
    customerPicture: customerData.customerPicture,
  });

  const [editPicture, setEditPicture] = useState("");

  useLayoutEffect(() => {
    if (
      editcustomerData &&
      editcustomerData.customerPicture &&
      editcustomerData.customerPicture.length > 0
    ) {
      async function getCustomerImages() {
        try {
          const response = await axios.get(
            `${REACT_APP_BASE_URL}/files/${editcustomerData.customerPicture[0]}/true`
          );
          setEditPicture(
            `data:${response.headers["content-type"]};base64,${response.data}`
          );
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
      getCustomerImages();
    }
  }, [editcustomerData]);

  //   useLayoutEffect(() => {
  //     if (editcustomerData) {
  //       async function getCustomerImages() {
  //         try {
  //           const response = await axios.get(
  //             `${REACT_APP_BASE_URL}/files/${editcustomerData.customerPicture[0]}/true`
  //           );
  //           setEditPicture(
  //             `data:${response.headers["content-type"]};base64,${response.data}`
  //           );
  //         } catch (error) {
  //           console.error("Error fetching image:", error);
  //         }
  //       }
  //       getCustomerImages();
  //     }
  //   }, [editcustomerData]);

  const { userData } = useSelector((state) => state.auth);
  // console.log("token quick check", userData.token);
  // console.log("userData in header:", userData.role);
  const userRole = userData?.role || "";
  //   console.log(userRole);

  const [value, setValue] = useState({
    startDate: dayjs(editcustomerData.dateStarts).format("YYYY-MM-DD"),
    endDate: dayjs(editcustomerData.dateEnds).format("YYYY-MM-DD"),
  });
  //   console.log("value:", value);
  //   console.log("editcustomerData.dateStarts:", editcustomerData.dateStarts);

  const handleValueChange = (newValue) => {
    if (newValue.startDate) {
      const dayStarts = dayjs(newValue.startDate).format("dddd");
      const dateStarts = dayjs(newValue.startDate).format("MM/DD/YYYY");
      seteditCustomerData((prevData) => ({
        ...prevData,
        dayStarts,
        dateStarts,
      }));
    }

    if (newValue.endDate) {
      const dayEnds = dayjs(newValue.endDate).format("dddd");
      const dateEnds = dayjs(newValue.endDate).format("MM/DD/YYYY");
      seteditCustomerData((prevData) => ({ ...prevData, dayEnds, dateEnds }));
    }

    setValue(newValue);
  };

  const [errors, setErrors] = useState({});
  const [showNewPic, setShowNewPic] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "customerPicture") {
      // Handle file input separately
      seteditCustomerData((prevData) => ({
        ...prevData,
        customerPicture: e.target.files[0],
      }));
      setShowNewPic(true);
    } else {
      // Handle other inputs
      seteditCustomerData({
        ...editcustomerData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.prcustomerDefault();

    // Add form validation logic here

    try {
      const formData = new FormData();
      formData.append("id", customerId);

      formData.append("name", editcustomerData.name);
      formData.append("price", editcustomerData.price);
      formData.append("venue", editcustomerData.venue);

      formData.append("overview", editcustomerData.overview);
      formData.append("specialFeatures", editcustomerData.specialFeatures);

      formData.append("dateStarts", editcustomerData.dateStarts);
      formData.append("dateEnds", editcustomerData.dateEnds);

      formData.append("dayStarts", editcustomerData.dayStarts);
      formData.append("dayEnds", editcustomerData.dayEnds);

      formData.append("timeStarts", editcustomerData.timeStarts);
      formData.append("timeEnds", editcustomerData.timeEnds);

      formData.append("creatorName", "Tim");

      showNewPic &&
        formData.append("customerPicture", editcustomerData.customerPicture); // Append the image file if new available

      if (
        !editcustomerData.name ||
        !editcustomerData.price ||
        !editcustomerData.venue ||
        !editcustomerData.overview ||
        !editcustomerData.specialFeatures ||
        !editcustomerData.dateStarts ||
        !editcustomerData.dateEnds ||
        !editcustomerData.dayEnds ||
        !editcustomerData.dayStarts ||
        !editcustomerData.timeEnds ||
        !editcustomerData.timeStarts
      ) {
        window.alert("Please fill all the fields.");
        return;
      }

      if (!editcustomerData.customerPicture) {
        window.alert("Please upload an image for the Customer");
        return;
      }

      console.log("editcustomerData added", editcustomerData);

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
      window.alert("Customer Updated Successfully.");
      // Additional logic after successful addCustomer if needed
    } catch (error) {
      console.error("Adding Customer failed:", error);

      // Handle Adding Customer error

      throw error;
    }
  };

  const navigate = useNavigate();

  //   const handleGoBack = () => {
  //     navigate(-1); // Go back one step in history
  //   };

  return (
    <>
      {userRole === "Admin" ? (
        <div
          className="flex w-100 items-center justify-center bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <div className="mx-4 my-24 flex flex-col py-6 md:px-6 px-2 rounded-md bg-slate-400 min-w-[260px] max-w-[50rem] relative items-center">
            {/* Use a Link component for navigation */}
            <Link
              to={"/customers"}
              className="w-5 h-5 absolute right-3 top-3 cursor-pointer"
              //   onClick={handleGoBack}
            >
              <VscClose className="w-5 h-5 font-bold" />
            </Link>
            <h2 className="text-center md:text-lg text-md font-bold text-primary">
              EDIT EVENT{" "}
            </h2>

            {/* AddCustomer Form */}
            <form
              className="mt-4 flex flex-wrap flex-grow gap-x-8 justify-between"
              onSubmit={handleSubmit}
            >
              {/* Customer Name */}
              <div className="mb-4 md:w-[30%] w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Customer Name
                </label>
                <input
                  maxLength={100}
                  type="text"
                  name="name"
                  value={editcustomerData.name}
                  onChange={handleChange}
                  className={`appearance-none border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg w-full py-2 px-3 md:text-base text-xs leading-tight focus:outline-none focus:shadow-outline`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic">{errors.name}</p>
                )}
              </div>

              {/* venue */}
              <div className="mb-4 md:w-[30%] w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="venue"
                >
                  Venue
                </label>
                <input
                  maxLength={60}
                  type="text"
                  name="venue"
                  value={editcustomerData.venue}
                  onChange={handleChange}
                  className={`appearance-none border ${
                    errors.venue ? "border-red-500" : "border-gray-300"
                  } rounded-lg w-full py-2 px-3 md:text-base text-xs leading-tight focus:outline-none focus:shadow-outline`}
                />
                {errors.venue && (
                  <p className="text-red-500 text-xs italic">{errors.venue}</p>
                )}
              </div>

              {/* price */}
              <div className="mb-4 md:w-[30%] w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  maxLength={10}
                  type="number"
                  name="price"
                  value={editcustomerData.price}
                  onChange={handleChange}
                  className={`appearance-none border ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  } rounded-lg w-full py-2 px-3 md:text-base text-xs leading-tight focus:outline-none focus:shadow-outline`}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs italic">{errors.price}</p>
                )}
              </div>

              {/* Overview */}
              <div className="mb-4 w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="overview"
                >
                  Overview
                </label>
                <textarea
                  maxLength={3000}
                  type="text"
                  name="overview"
                  value={editcustomerData.overview}
                  onChange={handleChange}
                  className={`appearance-none border ${
                    errors.overview ? "border-red-500" : "border-gray-300"
                  } rounded-lg w-full py-2 px-3 md:min-h-48 min-h-32 md:text-base text-xs leading-tight focus:outline-none focus:shadow-outline`}
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
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="specialFeatures"
                >
                  Special Features
                </label>
                <textarea
                  maxLength={800}
                  type="text"
                  name="specialFeatures"
                  value={editcustomerData.specialFeatures}
                  onChange={handleChange}
                  className={`appearance-none border ${
                    errors.specialFeatures
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg w-full py-2 px-3 md:text-base text-xs md:min-h-32 min-h-24 leading-tight focus:outline-none focus:shadow-outline`}
                />
                {errors.specialFeatures && (
                  <p className="text-red-500 text-xs italic">
                    {errors.specialFeatures}
                  </p>
                )}
              </div>

              <div className="mb-4 w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="startdate"
                >
                  Customer Dates
                </label>
                <Datepicker
                  inputClassName="rounded-lg w-full py-2 px-3 md:text-base text-xs leading-tight focus:outline-none focus:shadow-outline"
                  separator={"to"}
                  useRange={false}
                  showFooter={true}
                  displayFormat={"MM/DD/YYYY (dddd)"}
                  value={value}
                  readOnly={false}
                  // dateFormat="MM/DD/YYYY (dddd)" // Use "dddd" for day of the week
                  onChange={handleValueChange}
                  showShortcuts={true}
                />
              </div>

              <div className="w-full flex flex-col md:flex-row items-center justify-around">
                <div className="mb-4 md:w-[30%] w-full">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="starttime"
                  >
                    Customer Start Time
                  </label>
                  <div className="relative">
                    <TimePicker
                      onChange={(time) =>
                        seteditCustomerData((prevData) => ({
                          ...prevData,
                          timeStarts: time,
                        }))
                      }
                      value={editcustomerData.timeStarts}
                      className="appearance-none border  bg-white rounded-lg w-full py-2 px-3 md:text-base text-sm leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>

                <div className="mb-4 md:w-[30%] w-full">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="endtime"
                  >
                    Customer End Time
                  </label>
                  <div className="relative">
                    <TimePicker
                      onChange={(time) =>
                        seteditCustomerData((prevData) => ({
                          ...prevData,
                          timeEnds: time,
                        }))
                      }
                      value={editcustomerData.timeEnds}
                      className="appearance-none border bg-white rounded-lg w-full py-2 px-3 md:text-base text-sm leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4 w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="customerPicture"
                >
                  Customer Picture (Landscape 1440 x 820)
                </label>
                {editPicture && !showNewPic && (
                  <img
                    src={editPicture}
                    alt="Customer Thumbnail"
                    className="my-2 rounded-xl sm:min-w-80 w-full aspect-video self-center "
                  />
                )}
                {showNewPic && (
                  <img
                    src={URL.createObjectURL(editcustomerData.customerPicture)}
                    alt="tachtpg"
                    className="my-2 rounded-xl sm:min-w-80 w-full aspect-video self-center"
                  />
                )}

                <input
                  type="file"
                  name="customerPicture"
                  accept="image/*"
                  onChange={handleChange}
                  //   value={
                  //     editcustomerData.customerPicture &&
                  //     editcustomerData.customerPicture.name
                  //   }
                  className="bg-white border rounded-lg w-full py-2 px-3 md:text-base text-xs leading-tight focus:outline-none focus:shadow-outline"
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
                className="bg-primary text-white w-full self-center mt-3 py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              >
                UPDATE EVENT
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

export default EditCustomer;
