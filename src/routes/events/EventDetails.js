import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BsAlarmFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import Button from "../../components/Button";
import { REACT_APP_BASE_URL } from "../../constants/url";
import axios from "axios";
import { useLocation } from "react-router-dom";
import bgExampe from "../../assets/images/bg-example.png";

function EventDetails() {
  const location = useLocation(); // Use useLocation hook

  const events = useSelector((state) => state.events.events);

  const { state } = location;
  const eventId = state?.data?._id;

  const eventData = eventId
    ? events.find((event) => event._id === eventId)
    : null;

  const [image, setImage] = useState("");

  useLayoutEffect(() => {
    if (eventData) {
      async function getEventImages() {
        try {
          const response = await axios.get(
            `${REACT_APP_BASE_URL}/files/${eventData.eventPicture[0]}/true`
          );
          setImage(
            `data:${response.headers["content-type"]};base64,${response.data}`
          );
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
      getEventImages();
    }
  }, [eventData]);

  const [ticketCount, setTicketCount] = useState(1);

  const handleIncrement = () => {
    setTicketCount(ticketCount + 1);
  };

  const handleDecrement = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
  };

  // if (!eventData) {
  //   // Handle the case where the event data is not available
  //   return (
  //     <section className="z-10 flex flex-col items-center justify-center w-full pb-4 pt-20 sm:h-screen bg-cover bg-black bg-no-repeat bg-center px-2 gap-1 bg-opacity-50">
  //       Loading...
  //     </section>
  //   );
  // }

  return (
    <>
      <section
        className="z-10 flex flex-col items-center justify-center w-full pb-4 pt-20 sm:h-screen bg-cover bg-black bg-no-repeat bg-center px-2 gap-1 bg-opacity-50"
        style={{
          backgroundImage: image ? `url("${image}")` : `url(${bgExampe})`, // Added quotes and url()
        }}
      >
        {/* <div className="absolute inset-0 sm:h-screen bg-black bg-opacity-50"></div> */}
        <div className="p-1 bg-black flex flex-col items-center justify-center rounded-xl bg-opacity-50">
          <p className="z-20 text-white sm:text-2xl text-md font-semibold text-center max-w-[600px] ">
            {eventData.dayStarts} {eventData.dateStarts} - {eventData.dayEnds}{" "}
            {eventData.dateEnds}
          </p>
          <h1 className="z-20 text-white sm:text-6xl leading-tight text-2xl font-normal line text-center mb-[10px] bg-opacity-60 px-5 pb-3 rounded-lg">
            {eventData.name}
          </h1>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center sm:my-5 my-1 px-1">
        <div className="flex sm:flex-row flex-col sm:gap-32 gap-1 gap-y-2 sm:w-10/12 w-full p-2">
          <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
            <div className="flex sm:flex-col gap-2">
              <div className="flex gap-1 sm:gap-2 items-center">
                <BsAlarmFill className="text-primary sm:text-base text-xs" />
                <p className="text-black md:text-base sm:text-xs text-[10px]">
                  {eventData.dayStarts} {eventData.dateStarts} -{" "}
                  {eventData.dayEnds} {eventData.dateEnds}
                </p>
              </div>
              <div className="flex gap-1 sm:gap-2 items-center">
                <FaCalendarAlt className="text-primary sm:text-base text-xs" />
                <p className="text-black md:text-base sm:text-xs text-[10px]">
                  {eventData.timeStarts} - {eventData.timeEnds}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center w-auto flex-grow">
            <div className="flex flex-col">
              <p className="text-black sm:text-base text-xs">Price </p>
              <p className="text-primary sm:text-xl text-sm font-bold">
                ${eventData.price}{" "}
              </p>
            </div>
            <Button>TICKETS</Button>
          </div>
        </div>
        <div className="h-[1px] bg-gray-300 sm:w-10/12 w-full" />
        <div className="flex flex-col md:flex-row-reverse sm:w-10/12 w-full px-1 md:pb-0 gap-x-3">
          <div className="md:w-3/12 md:border-l md:border-gray-300 md:pl-3  ">
            <h2 className=" text-primary sm:text-3xl text:lg font-bold sm:my-2 my-1">
              Venue:
            </h2>
            <p className="text-xs sm:text-sm">{eventData.venue} </p>
            <h2 className=" text-primary sm:text-3xl text:lg font-bold sm:my-2 my-1">
              Special Features:
            </h2>
            <p className="text-xs sm:text-sm md:pb-3">
              {eventData.specialFeatures}
            </p>
          </div>

          <div className="md:w-9/12 md:pb-3 ">
            <h2 className="text-primary sm:text-3xl text:lg font-bold sm:my-2 my-1">
              Event Overview:
            </h2>
            <p className="md:text-sm text-xs text-justify">
              {eventData.overview}
            </p>
          </div>
        </div>
        <div className="h-[1px] bg-gray-300 sm:w-10/12 w-full" />
      </section>
      <section
        id="ticket_box"
        className="bg-primary flex flex-col items-center justify-center sm:mt-5 mt-1 sm:pb-4 pb-1"
      >
        <h2 className=" text-white sm:text-5xl text-lg font-bold sm:my-2 my-1">
          TICKETS
        </h2>
        <div className="bg-white sm:gap-y-5 rounded-xl sm:px-5 px-1 sm:py-5 py-1 flex flex-col items-center justify-center w-1/2">
          <h2 className=" text-black sm:text-3xl text-md font-bold sm:my-2 my-1">
            Book Now!
          </h2>
          <div className="flex sm:mb-5 sm:flex-row flex-col gap-2 justify-between w-11/12 items-center">
            <div className="flex sm:flex-row flex-col sm:gap-2 justify-between items-center ">
              <p className="sm:text-xl text-black font-semibold">
                Standard Ticket:
              </p>
              <div id="input" className="flex  items-center">
                <button
                  className="bg-gray-200 border border-solid border-black rounded-l-lg p-2"
                  onClick={handleDecrement}
                >
                  -
                </button>
                <input
                  className="bg-gray-200 border-t border-b border-solid border-black p-2 w-9 items-center justify-center text-center"
                  value={ticketCount}
                  readOnly
                />

                <button
                  className="bg-gray-200 border border-solid border-black rounded-r-lg p-2"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
            </div>
            <p className="sm:text-xl text-black font-semibold">
              Total: ${(eventData.price * ticketCount).toFixed(2)}
            </p>
          </div>

          <Button link={"/"}>CHECKOUT NOW</Button>
        </div>
      </section>
    </>
  );
}

export default EventDetails;
