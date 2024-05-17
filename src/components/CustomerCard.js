import React, { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { REACT_APP_BASE_URL } from "../constants/url";
import axios from "axios";

const CustomerCard = (customer) => {
  const data = customer.customer;
  const [image, setImage] = useState("");

  // console.log("data log in customer card", data);

  useLayoutEffect(() => {
    async function getCustomerImages() {
      axios
        .get(`${REACT_APP_BASE_URL}/files/${data.customerPicture[0]}/true`)
        .then((image) => {
          setImage(
            `data:${image.headers["content-type"]};base64,${image.data}`
          );
        });
    }
    getCustomerImages();
  }, [data.customerPicture]);

  // console.log("data.title in customer card:", data.venues[0].address.region);

  return (
    <div className="w-full my-6 bg-white rounded-lg px-4 py-3 gap-3 overflow-auto flex flex-col items-center md:flex-row md:justify-between md:items-center">
      <img
        src={image}
        alt="Customer"
        className="rounded-lg min-w-24 min-h-24 w-24 h-24"
      />
      <p className="text-lg text-gray-500 ">{data.username}</p>
      <p className="text-lg underline text-[#57BC90] ">{data.customerName}</p>
      <p className="text-lg text-gray-500 ">{data.email}</p>
      <div className="flex justify-center items-center gap-3">
        <Link
          to={{
            pathname: `/editcustomer/${data._id}`,
          }}
          state={{ data }}
          className="bg-[#b0e1b7] rounded-md text-lg font-semibold text-[#008212] py-2 px-8"
        >
          Edit
        </Link>
        <Link
          to={{
            pathname: `/deletecustomer/${data._id}`,
          }}
          state={{ data }}
          className="bg-[#ef9999] rounded-md text-lg font-semibold text-[#D80000] py-2 px-8"
        >
          Delete
        </Link>
      </div>
    </div>
  );
};

export default CustomerCard;
