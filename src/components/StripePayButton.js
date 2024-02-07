import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { REACT_APP_BASE_URL } from "../constants/url";

const PayButton = (props) => {
  const { userData } = useSelector((state) => state.auth);
  // const price = props.items.price * props.qty;

  const handleCheckout = () => {
    // console.log("items log in handlecheckout function", props.items);
    axios
      .post(`${REACT_APP_BASE_URL}/create-checkout-session`, {
        items: props.items,
        userId: userData._id,
        qty: props.qty,
        // image: props.image,
        price: props.items.price,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        } else {
          console.error("Unexpected response from server:", res.data);
        }
      })
      .catch((err) => {
        window.alert(
          "There was an error in processing to checkout. Sorry for the inconvenience. Please try again later"
        );
        console.error("Error during checkout (API not hit):", err.message);
      });
  };

  return (
    <>
      <button
        className="bg-primary sm:hover:text-black sm:hover:px-14 md:px-10 md:py-3 py-3 px-5 md:text-md text-xs rounded-lg font-normal text-white hover:bg-secondary hover:text-white transition-all duration-300"
        onClick={() => handleCheckout()}
      >
        BUY NOW
      </button>
    </>
  );
};

export default PayButton;
