import React, { useRef } from "react";
// import backgroundImage from "./assets/images/bg-example.png";
import backgroundImage2 from "./assets/images/pole-bg.png"; // Replace with the actual path to your image
// import Button from "./components/Button";
import grid1 from "../src/assets/images/grid1.png";
import grid2 from "../src/assets/images/grid2.png";
import grid3 from "../src/assets/images/grid3.png";
import grid4 from "../src/assets/images/grid4.png";
import grid5 from "../src/assets/images/grid5.png";
import grid6 from "../src/assets/images/grid6.png";
import intro from "../src/assets/images/intro.png";
import { ToastContainer } from "react-toastify";
// import { useSelector } from "react-redux";
import Map from "./components/Map";

export default function App() {
  const cardsWrapperRef = useRef(null);

  // const handleReadMoreClick = () => {
  //   // Scroll to the cards-wrapper div when "Read More" is clicked
  //   cardsWrapperRef.current.scrollIntoView({ behavior: "smooth" });
  // };

  // const { userData } = useSelector((state) => state.auth);

  return (
    <>
      {/* <div
        className="flex flex-col items-center justify-center w-full pb-4 pt-20 sm:h-screen bg-cover bg-no-repeat bg-center px-2 gap-6 bg-opacity-50"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <h1 className="text-primary sm:text-[80px] leading-tight text-4xl font-bold line text-center mb-[10px] ">
          Lorem Ipsum Dolor
        </h1>
        <p className="text-black sm:text-xl text-sm font-normal text-center max-w-[600px] ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exerpitationtation
        </p>
        <button
          onClick={handleReadMoreClick}
          className="bg-primary md:px-10 md:py-3 py-2 px-4 md:text-md text-sm rounded-lg font-normal text-white hover:bg-white hover:text-black transition duration-300"
        >
          Read More
        </button>
      </div> */}
      <section className="flex bg-white md:flex-row flex-col-reverse items-center w-full px-1 md:pb-12 gap-x-4">
        <div className="md:w-4/12 2-full">
          <h1 className="text-primary text-3xl font-bold text-center md:text-right">
            Welcome to BETI
          </h1>
          <h2 className="text-black text-1xl font-bold text-center md:text-right">
            Where Power is Collaborating{" "}
          </h2>
          <p className="text-black text-sm md:ml-20 font-semibold mt-2 text-center md:text-right">
            Join us in a dynamic community, uniting strengths to drive progress
            and shape a brighter future together.{" "}
          </p>
        </div>
        <div className="md:w-8/12 md:ml-0 w-full flex justify-center items-center">
          <Map />
        </div>
      </section>

      <div
        ref={cardsWrapperRef}
        className="flex flex-col items-center w-full my-5 md:mt-5 px-1"
      >
        <div className="h-[1px] bg-gray-300 sm:w-10/12 mb-2 w-full" />

        <h1 className="text-primary text-3xl font-bold text-center ">
          About BETI
        </h1>
        <p className="text-m font-semibold text-center max-w-[900px] mt-5 text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation.sdf
        </p>
        <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-2/3">
          {/* Column 1 */}
          <div className="border border-gray-500 hover:-translate-y-2 hover:shadow-primary hover:shadow-lg shadow-md shadow-gray-500 rounded-lg transition duration-400  p-4 gap-3 flex-col flex items-center sm:items-baseline">
            <div className="Group8  h-16 ">
              <img src={grid1} alt="Engineering Solutions" />
            </div>
            <div className="text-black text-base font-semibold font-['General Sans']">
              System Perspective
            </div>
            <div className=" text-black  text-sm font-normal font-['General Sans text-center sm:text-left	']">
              Emphasizing a holistic approach to project management and
              engineering solutions.
            </div>
          </div>

          {/* Column 2 */}
          <div className="border border-gray-500 hover:-translate-y-2 hover:shadow-primary hover:shadow-lg shadow-md shadow-gray-500 rounded-lg transition duration-400  p-4 gap-3 flex-col flex items-center sm:items-baseline">
            <div className="Group8  h-16 ">
              <img src={grid2} alt="Engineering Solutions" />
            </div>
            <div className="text-black text-base font-semibold font-['General Sans'] 	">
              Agility:
            </div>
            <div className=" text-black  text-sm font-normal font-['General Sans'] text-center sm:text-left">
              Rapid adaptation to changing market demands and technological
              advancements.
            </div>
          </div>

          {/* Column 3 */}
          <div className="border border-gray-500 hover:-translate-y-2 hover:shadow-primary hover:shadow-lg shadow-md shadow-gray-500 rounded-lg transition duration-400  p-4 gap-3 flex-col flex items-center sm:items-baseline">
            <div className="Group8  h-16 ">
              <img src={grid3} alt="Engineering Solutions" />
            </div>
            <div className="text-black text-base font-semibold font-['General Sans'] 	">
              New Innovation:
            </div>
            <div className=" text-black  text-sm font-normal font-['General Sans'] text-center sm:text-left">
              Commitment to pioneering cutting-edge technologies and
              methodologies.{" "}
            </div>
          </div>

          {/* Column 4 */}
          <div className="border border-gray-500 hover:-translate-y-2 hover:shadow-primary hover:shadow-lg shadow-md shadow-gray-500 rounded-lg transition duration-400  p-4 gap-3 flex-col flex items-center sm:items-baseline">
            <div className="Group8  h-16 ">
              <img src={grid4} alt="Engineering Solutions" />
            </div>
            <div className="text-black text-base font-semibold font-['General Sans'] text-center sm:text-left	">
              Process Excellence:{" "}
            </div>
            <div className=" text-black  text-sm font-normal font-['General Sans'] text-center sm:text-left">
              Continuous improvement in all operational processes for optimal
              efficiency.{" "}
            </div>
          </div>

          {/* Column 5 */}
          <div className="border border-gray-500 hover:-translate-y-2 hover:shadow-primary hover:shadow-lg shadow-md shadow-gray-500 rounded-lg transition duration-400  p-4 gap-3 flex-col flex items-center sm:items-baseline">
            <div className="Group8  h-16 ">
              <img src={grid5} alt="Engineering Solutions" />
            </div>
            <div className="text-black text-base font-semibold font-['General Sans'] text-center sm:text-left	">
              Ecosystem Innovation:
            </div>
            <div className=" text-black  text-sm font-normal font-['General Sans'] text-center sm:text-left">
              Collaborative innovation within the business ecosystem, including
              partners.{" "}
            </div>
          </div>

          {/* Column 6 */}
          <div className="border border-gray-500 shadow-md shadow-gray-500 hover:-translate-y-2 hover:shadow-primary hover:shadow-lg rounded-lg transition duration-400  p-4 gap-3 flex-col flex items-center sm:items-baseline">
            <div className="Group8  h-16 ">
              <img src={grid6} alt="Engineering Solutions" />
            </div>
            <div className="text-black text-base font-semibold font-['General Sans'] text-center sm:text-left	">
              Community & Co-Creation:{" "}
            </div>
            <div className=" text-black  text-sm font-normal font-['General Sans'] text-center sm:text-left">
              Engaging with communities and stakeholders for shared value
              creation.{" "}
            </div>
          </div>
          {/* Grid closing div below this comment  */}
        </div>
        <p className="text-m font-semibold text-center max-w-[900px] mt-5 text-gray-700 mt-20">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation.
        </p>
      </div>
      <div className="flex flex-col items-center w-full bg-primary sm:py-20 py-5 sm:px-10 px-3 gap-3">
        <div className=" text-center text-secondary text-4xl font-semibold font-['General Sans']">
          About SANPEC
        </div>
        <div className=" text-center text-white text-base font-normal font-['General Sans'] max-w-[700px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation.
        </div>
        <img
          className="sm:mt-20 rounded-2xl"
          src={intro}
          alt="Introduction to BETI (SANPEC)"
        />
        <div className="Rectangle95  bg-white rounded-lg" />
      </div>
      <div
        className="flex flex-col sm:py-14 sm:px-5 py-4 w-full bg-cover bg-no-repeat bg-center px-4 gap-6 bg-opacity-50"
        style={{
          backgroundImage: `url(${backgroundImage2})`,
        }}
      >
        <div>
          <div className="text-sky-900 sm:text-4xl text-2xl font-semibold mb-2 font-['General Sans']">
            Mission
          </div>
          <div className="text-black max-w-[500px] text-opacity-80 font-normal sm:text-base text-xs font-['General Sans']">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation.
          </div>
        </div>
        {/* 2nd Heading */}
        <div className="md:self-end md:justify-end">
          <div className="text-sky-900 sm:text-4xl text-2xl font-semibold mb-2 font-['General Sans']">
            Vision
          </div>
          <div className="text-black max-w-[500px] text-opacity-80 font-normal sm:text-base text-xs font-['General Sans']">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation.Lorem ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation.
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
