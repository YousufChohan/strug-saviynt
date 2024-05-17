import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { REACT_APP_BASE_URL } from "../../constants/url";
import axios from "axios";
import { VscClose } from "react-icons/vsc";
import Bin from "../../assets/images/bin.png";

const DeleteCustomer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { state } = location;
  const customerId = state?.data?._id;

  const deleteCustomer = async () => {
    try {
      await axios.delete(`${REACT_APP_BASE_URL}/customer?id=${customerId}`, {
        headers: {},
      });

      // Redirect to the customers page after successful deletion
      window.alert("Customer Deleted");
      navigate("/"); // Correct use of navigate
    } catch (error) {
      console.error("There is an error deleting customer:", error);
      window.alert("There was an error deleting the customer.");
    }
  };

  return (
    <>
      <div className="flex p-5 min-h-screen w-full items-center justify-center bg-slate-800">
        <div className="mx-4 md:mt-12 shadow-2xl flex flex-col gap-4 pb-6 bg-[#fbfcfc] max-w-[500px] rounded-2xl relative items-center">
          {/* Use a Link component for navigation */}
          <div className="bg-white py-6 w-full bg-center bg-no-repeat bg-cover rounded-t-2xl">
            <Link
              to="/"
              className="w-5 h-5 absolute right-3 top-3 cursor-pointer"
              // onClick={handleGoBack}
            >
              <VscClose className="w-5 h-5 text-black font-bold" />
            </Link>
          </div>
          <img alt="bin" src={Bin} className="md:w-24 w-16" />
          <p className="font-semibold font-lato text-lg">Are you sure?</p>
          <p className="font-lato text-md text-center w-6/12">
            Do you really want to delete this customer? This process can not be
            undone.
          </p>
          <div className="flex justify-center items-center gap-3">
            <Link
              to="/"
              className="bg-[#A5A5AF] rounded-md text-lg font-semibold text-white py-2 px-8"
            >
              Cancel
            </Link>
            <button
              onClick={deleteCustomer}
              className="bg-[#D80000] rounded-md text-lg font-semibold text-[#fff] py-2 px-8"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteCustomer;
