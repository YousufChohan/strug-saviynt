import React from "react";
import { useParams } from "react-router-dom";
import backgroundImage from "../../assets/images/pole-bg3.jpg";

function EventDetails() {
  const { id } = useParams();
  console.log("id:", id);

  return (
    <>
      <section
        className="z-10 flex flex-col items-center justify-center w-full pb-4 pt-20 sm:h-96 bg-cover bg-no-repeat bg-center px-2 gap-6 bg-opacity-50"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <h1 className="z-20 text-primary sm:text-[80px] leading-tight text-4xl font-bold line text-center mb-[10px] bg-white bg-opacity-60 px-5 pb-3 rounded-lg">
          Event Name
        </h1>
        <p className="z-20 text-black sm:text-xl text-sm font-normal text-center max-w-[600px] ">
          Event Details
        </p>
      </section>
      <section className="z-10 flex flex-col items-center justify-center w-full bg-black pb-4 pt-20 sm:h-96 bg-cover bg-no-repeat bg-center px-2 gap-6 bg-opacity-50">
        <h1 className="z-20 text-primary sm:text-[80px] leading-tight text-4xl font-bold line text-center mb-[10px] bg-white bg-opacity-60 px-5 pb-3 rounded-lg">
          Under Development{" "}
        </h1>
        <p className="z-20 text-black sm:text-xl text-sm font-normal text-center max-w-[600px] ">
          Kindly bear with us{" "}
        </p>
      </section>
    </>
  );
}

export default EventDetails;
