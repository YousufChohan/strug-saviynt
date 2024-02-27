import React, { useState } from "react";
import axios from "axios";
import { REACT_APP_BASE_URL } from "../constants/url";

const About = () => {
  const [data, SetData] = useState("");
  const [error, setError] = useState("");
  const handleAccessTokenCall = async () => {
    try {
      const response = await axios.get(`${REACT_APP_BASE_URL}/getcventdata`);

      console.log("Response:", response.data.data[0].title);
      SetData(response.data);
    } catch (error) {
      setError("Error fetching access token");
      console.error("Error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      {data ? (
        <div>
          <p>Access Token: {data.data[0].title}</p>
        </div>
      ) : (
        <div className="flex flex-col justify-center">
          <p>{error}</p>

          <button
            className="bg-primary font-medium text-white rounded-lg p-3"
            onClick={handleAccessTokenCall}
          >
            Get Access Token
          </button>
        </div>
      )}
    </div>
  );
};

export default About;
