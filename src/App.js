import React from "react";
import backgroundImage from "./assets/images/bg-example.jpg"; // Replace with the actual path to your image
import Button from "./components/Button";

export default function App() {
  return (
    <>
      <div
        className="flex flex-col items-center justify-center w-full h-screen bg-cover bg-no-repeat bg-center gap-6 bg-opacity-50"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <h1 className="text-primary text-6xl font-bold text-center ">
          Lorem Ipsum Dolor
        </h1>
        <p className="text-black text-xl font-semibold text-center w-[400px] ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation.
        </p>
        <Button>Read More</Button>
      </div>
      <div
        className="flex flex-col items-center justify-center w-full h-screen bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <h1 className="text-primary text-6xl font-bold text-center ">
          Lorem Ipsum Dolor
        </h1>
        <p className="text-black text-xl text-center w-[400px] font-semibold">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation.
        </p>
        <Button>Read More</Button>
      </div>
    </>
  );
}
