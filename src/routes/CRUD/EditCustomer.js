import React, { useLayoutEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { VscClose } from "react-icons/vsc";
import axios from "axios";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { REACT_APP_BASE_URL } from "../../constants/url";
import { useSelector } from "react-redux";
import addbg from "../../assets/images/addbg.png";

const EditCustomer = () => {
  const location = useLocation();

  const customers = useSelector((state) => state.customers.customers);

  const { state } = location;
  const customerId = state?.data?._id;

  const customerData =
    customerId && customers.find((customer) => customer._id === customerId);

  const [editcustomerData, seteditCustomerData] = useState({
    username: customerData.username,
    email: customerData.email,
    customerName: customerData.customerName,
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
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("id", customerId);
      formData.append("customerName", editcustomerData.customerName);
      formData.append("username", editcustomerData.username);
      formData.append("email", editcustomerData.email);

      showNewPic &&
        formData.append("customerPicture", editcustomerData.customerPicture);

      if (
        !editcustomerData.customerName ||
        !editcustomerData.username ||
        !editcustomerData.email
      ) {
        window.alert("Please fill all the fields.");
        return;
      }

      if (!editcustomerData.customerPicture) {
        window.alert("Please upload an image for the Customer");
        return;
      }

      console.log("editcustomerData added", editcustomerData);

      await addCustomer(formData);
      navigate("/");
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
          },
        }
      );

      console.log("Adding Customer response:", response.data);
      window.alert("Customer Updated Successfully.");
    } catch (error) {
      console.error("Adding Customer failed:", error);

      throw error;
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="flex py-5 min-h-screen w-full items-center justify-center bg-slate-800">
        <div className="mx-4 mt-12 shadow-2xl flex flex-col pb-6 bg-[#fbfcfc] min-w-[260px] max-w-[500px] rounded-2xl relative items-center">
          {/* Use a Link component for navigation */}
          <div
            className="bg-primary py-6 w-full bg-center bg-no-repeat bg-cover rounded-t-2xl"
            style={{
              backgroundImage: `url(${addbg})`,
            }}
          >
            <Link
              to="/"
              className="w-5 h-5 absolute right-3 top-3 cursor-pointer"
              // onClick={handleGoBack}
            >
              <VscClose className="w-5 h-5 text-white font-bold" />
            </Link>
            <h2 className="text-center md:text-3xl  text-md font-bold font-serif text-white">
              Edit a Customer
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
                value={editcustomerData.username}
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
                value={editcustomerData.customerName}
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
                value={editcustomerData.email}
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
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="customerPicture"
              >
                Customer Picture (Ratio 1:1)
              </label>
              {editPicture && !showNewPic && (
                <img
                  src={editPicture}
                  alt="Customer Thumbnail"
                  className="my-2 rounded-xl w-64 aspect-video self-center"
                />
              )}
              {showNewPic && (
                <img
                  src={URL.createObjectURL(editcustomerData.customerPicture)}
                  alt="tachtpg"
                  className="my-2 rounded-xl w-64 aspect-video self-center"
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
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#57BC90] to-primary text-white w-11/12 self-center mt-3 py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              >
                UPDATE CUSTOMER
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCustomer;
