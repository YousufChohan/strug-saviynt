import React, { useState } from "react";
import backgroundImage3 from "../assets/images/aboutbetibg.png";
import axios from "axios";

export default function Check() {
  const [cricketData, setCricketData] = useState("");

  const handleRenderData = async () => {
    try {
      const response = await axios.get(
        "https://api.cricapi.com/v1/currentMatches?apikey=9a0730ef-afa7-46f1-856d-2b744e65302a&offset=0"
      );
      console.log("API Response:", response.data);
      setCricketData(response.data);
      // Handle the API response data here
    } catch (error) {
      console.error("API Error:", error);
      // Handle any errors from the API request
    }
  };

  return (
    <>
      <div
        className="flex flex-col h-screen justify-center items-center w-full px-1 bg-contain bg-no-repeat bg-bottom"
        style={{
          backgroundImage: `url(${backgroundImage3})`,
        }}
      >
        <h1 className="text-primary text-3xl font-bold text-center ">
          Cricket API Check
        </h1>
        <p className="text-m font-semibold text-center max-w-[900px] mt-5 text-gray-700">
          This page is just for checking an API response.
        </p>
        <button
          onClick={handleRenderData}
          className="mt-5 bg-primary sm:hover:text-black sm:hover:px-14 md:px-10 md:py-3 py-3 px-5 md:text-md text-xs rounded-lg font-normal text-white hover:bg-secondary hover:text-white transition-all duration-300"
        >
          Render Data
        </button>
        {cricketData && (
          <div>
            <div className="mt-5 text-black">{cricketData.data[2].name}</div>
            <div className="mt-5 text-black">
              Status: {cricketData.data[2].status}
            </div>
            <div className="mt-5 text-black">
              Venue: {cricketData.data[2].venue}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
