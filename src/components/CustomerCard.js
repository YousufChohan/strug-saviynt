import React, { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import fallbackbg from "../assets/images/pole-bg2.jpg";
import { REACT_APP_BASE_URL } from "../constants/url";
import axios from "axios";
import { FaExternalLinkAlt } from "react-icons/fa";

const CustomerCard = (customer) => {
  const data = customer.customer;
  const [image, setImage] = useState("");

  // useLayoutEffect(() => {
  //   async function getCustomerImages() {
  //     axios
  //       .get(`${REACT_APP_BASE_URL}/files/${data.customerPicture[0]}/true`)
  //       .then((image) => {
  //         setImage(
  //           `data:${image.headers["content-type"]};base64,${image.data}`
  //         );
  //       });
  //   }
  //   getCustomerImages();
  // }, [data.customerPicture]);

  // console.log("data.title in customer card:", data.venues[0].address.region);

  return (
    <div className="w-full my-6 bg-white rounded-lg px-4 py-3 md:flex flex-grow gap-3 overflow-auto md:justify-between md:items-center ">
      <img src={fallbackbg} alt="Customer Image" className="rounded-lg w-24" />
      <p className="text-lg text-gray-500 ">Jordan142</p>
      <p className="text-lg underline text-[#57BC90] ">Jordan Josepgdfg</p>
      <p className="text-lg text-gray-500 ">randomemail@email.com</p>
      <div className="flex justify-center items-center gap-3">
        <Link
          to="/"
          className="bg-[#b0e1b7] rounded-md text-lg font-semibold text-[#008212] py-2 px-8"
        >
          Edit
        </Link>
        <Link
          to="/"
          className="bg-[#ef9999] rounded-md text-lg font-semibold text-[#D80000] py-2 px-8"
        >
          Delete
        </Link>
      </div>
    </div>
  );
};

export default CustomerCard;
