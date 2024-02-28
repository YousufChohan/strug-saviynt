import React from "react";
import StatesData from "../components/StatesData";
import { useSelector } from "react-redux";
import stateBackground from "../assets/images/statesBackground.jpg";
import Map from "../components/Map";

const States = () => {
  const stateName = window.location.pathname.split("/").pop();
  console.log(stateName, "state name log in states page");

  const event = useSelector((state) => state.event);
  console.log("event log in states page", event);

  // Find the state data object with the same name as stateName
  const thisStateData = stateName
    ? StatesData.find((stateData) => stateData.name === stateName)
    : null;

  console.log("console log in state page", thisStateData);

  return (
    <div>
      {thisStateData ? (
        <>
          <section
            className="md:h-screen bg-contain bg-no-repeat flex flex-col justify-center items-center p-2 "
            // style={{
            //   backgroundImage: `url(${stateBackground})`,
            // }}
          >
            <div className="md:w-10/12 md:ml-48 self-center w-full flex -z-10 absolute opacity-20 justify-center items-center">
              <Map className="absolute -z-10" />
            </div>
            <h2 className="mt-48 md:mt-0 font-semibold text-primarydark text-2xl">
              {thisStateData.name}
            </h2>
            <p>{thisStateData.description}</p>
            <p className="mb-48 md:mb-0">{thisStateData.longitude}</p>
          </section>
          <section></section>
        </>
      ) : (
        <p>State not found</p>
      )}
    </div>
  );
};

export default States;
