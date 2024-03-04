import React from "react";
import StatesData from "../components/StatesData";
import { useSelector } from "react-redux";
import Map from "../components/Map";
import EventCard from "../components/EventCard";

const States = () => {
  const stateName = window.location.pathname.split("/").pop();
  // console.log(stateName, "state name log in states page");

  // const event = useSelector((state) => state.event);
  // console.log("event log in states page", event);

  //Find the state data object with the same name as stateName
  const thisStateData = stateName
    ? StatesData.find((stateData) => stateData.name === stateName)
    : null;

  const events = useSelector((state) => state.events.events);

  console.log(
    "events log in states page",
    events[0].venues[0].address.regionCode
  );

  console.log(events);

  const thisStateEvents = events
    ? events.filter((event) => {
        // Check if the event has venues and the venues array is not empty
        if (event.venues && event.venues.length > 0) {
          // Find if any venue has a matching regionCode
          const matchingVenue = event.venues.find(
            (venue) =>
              venue.address && venue.address.regionCode === thisStateData.code
          );
          // Return true if a matching venue is found
          return matchingVenue !== undefined;
        }
        // Return false if the event doesn't have venues or venues array is empty
        return false;
      })
    : [];

  console.log("this State Events", thisStateEvents);

  // let thisStateData;

  // if (stateName.length > 0) {
  //   thisStateData = StatesData.find(
  //     (stateData) => stateData.name === stateName
  //   );
  // } else {
  //   thisStateData = null;
  // }

  // console.log("console log in state page", thisStateData);

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
            <h2 className="mt-48 md:mt-0 py-3 text-transparent bg-clip-text inline-block bg-gradient-to-r from-primary to-black sm:text-6xl text:lg font-bold sm:my-2 my-1">
              The {thisStateData.name} Chapter
            </h2>

            <p className="mb-48 md:mb-0">{thisStateData.longitude}</p>
          </section>
          <section className="flex min-h-20 relative flex-col items-center justify-center px-1">
            {/* <div className="flex sm:flex-row flex-col sm:gap-32 gap-1 gap-y-2 sm:w-10/12 w-full p-2">
              <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
                <div className="flex sm:flex-col gap-2">
                  <div className="flex gap-1 sm:gap-2 items-center">
                    <FaCalendarAlt className="text-primary sm:text-base text-xs" />
                    <p className="text-black md:text-base sm:text-xs text-[10px]">
                      eventData.dayStarts eventData.dateStarts -{" "}
                      eventData.dayEnds eventData.dateEnds
                    </p>
                  </div>
                  <div className="flex gap-1 sm:gap-2 items-center">
                    <BsAlarmFill className="text-primary sm:text-base text-xs" />
                    <p className="text-black md:text-base sm:text-xs text-[10px]">
                      eventData.timeStarts - eventData.timeEnds
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between sm:gap-x-6 items-center w-auto flex-grow">
                <div className="flex flex-col">
                  <p className="text-black sm:text-base text-xs">Price </p>
                  <p className="text-primary sm:text-xl text-sm font-bold">
                    $asd
                  </p>
                </div>
                <div className="flex sm:flex-row sm:gap-3 gap-3 items-center"></div>
              </div>
            </div> */}
            <div className="h-[1px] bg-gray-300 sm:w-10/12 w-full" />
            <div className="flex flex-col md:flex-row-reverse sm:w-10/12 w-full px-1 md:pb-0 gap-x-3 text-black font-sans">
              <div className="md:w-3/12 md:border-l md:border-gray-300 md:pl-3  ">
                <h2 className="text-transparent bg-clip-text inline-block bg-gradient-to-r from-primary to-black sm:text-3xl text:lg font-bold sm:my-2 my-1">
                  Locations:
                </h2>
                {thisStateData.locations.map((location, index) => (
                  <div key={index}>{location}</div>
                ))}
                <h2 className="text-transparent bg-clip-text inline-block bg-gradient-to-r from-primary to-black sm:text-3xl text:lg font-bold sm:my-2 my-1">
                  Services:
                </h2>
                {thisStateData.services.map((service, index) => (
                  <div key={index}>{service}</div>
                ))}
              </div>

              <div className="md:w-9/12 md:pb-3 pb-2 ">
                <h2 className="text-transparent bg-clip-text inline-block bg-gradient-to-r from-primary to-black sm:text-3xl text:lg font-bold sm:my-2 my-1">
                  About the Chapter:
                </h2>
                <p className="md:text-sm text-xs text-justify whitespace-pre-line">
                  {thisStateData.description}
                </p>

                {thisStateData.details && (
                  <div>
                    <h2 className="text-transparent bg-clip-text inline-block bg-gradient-to-r from-primary to-black sm:text-3xl text:lg font-bold sm:my-2 my-1">
                      Details
                    </h2>
                    <p className="md:text-sm text-xs text-justify whitespace-pre-line">
                      {thisStateData.details}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="h-[1px] bg-gray-300 mb-2 sm:w-10/12 w-full" />
            <div className="-z-50">
              <ul className="circles opacity-35">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </section>

          <section className="z-10 flex flex-col relative items-center min-h-52 w-full pb-4 md:pt-10 bg-white bg-cover bg-no-repeat bg-center px-2 gap-6">
            <h1 className="z-20 text-transparent bg-clip-text bg-gradient-to-r from-black to-primary  font-sans sm:text-[80px] leading-tight text-4xl font-bold line text-center px-5 md:pb-3 rounded-lg">
              Events in {thisStateData.name}
            </h1>
            {thisStateEvents.length > 1 ? (
              <div className="md:my-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                {thisStateEvents.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
              </div>
            ) : (
              <h1 className="z-20 text-transparent bg-clip-text bg-gradient-to-r from-black to-primary  font-sans leading-tight text-xl font-bold line text-center px-5 md:pb-3 rounded-lg">
                There are no events currently taking place in{" "}
                {thisStateData.name}. Stay tuned for more information.
              </h1>
            )}
          </section>
        </>
      ) : (
        <section
          className="h-screen bg-contain bg-no-repeat flex flex-col justify-center items-center p-2 "
          // style={{
          //   backgroundImage: `url(${stateBackground})`,
          // }}
        >
          <div className="md:w-10/12 md:ml-48 self-center w-full flex -z-10 absolute opacity-20 justify-center items-center">
            <Map className="absolute -z-10" />
          </div>
          <p>State not found</p>
        </section>
      )}
    </div>
  );
};

export default States;
