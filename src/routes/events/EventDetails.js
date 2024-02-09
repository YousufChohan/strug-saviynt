import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { BsAlarmFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { REACT_APP_BASE_URL } from "../../constants/url";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bgExampe from "../../assets/images/bg-example.png";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import PayButton from "../../components/StripePayButton";
import TicketsBG from "../../assets/images/ticketsbg.png";

function EventDetails() {
  const location = useLocation(); // Use useLocation hook

  const events = useSelector((state) => state.events.events);

  const { state } = location;
  const eventId = state?.data?._id;

  const eventData = eventId
    ? events.find((event) => event._id === eventId)
    : null;

  const [image, setImage] = useState("");

  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

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
    if (ticketCount < 10) {
      setTicketCount(ticketCount + 1);
    }
  };

  const handleDecrement = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
  };

  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.auth);
  const userRole = userData?.role || ""; // Set an initial value for userRole

  const handleDelete = () => {
    // Use window.confirm to show a confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (confirmed) {
      // User clicked OK in the confirmation dialog
      deleteEvent();
    } else {
      // User clicked Cancel
      console.log("Deletion has been canceled");
    }
  };

  const deleteEvent = async () => {
    try {
      await axios.delete(`${REACT_APP_BASE_URL}/event?id=${eventId}`, {
        headers: {
          "x-auth-token": userData.token,
        },
      });

      // Redirect to the events page after successful deletion
      navigate("/events");
      window.alert("Event Deleted");
    } catch (error) {
      console.error("Error deleting event:", error);
      window.alert("There was an error deleting the event.");
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

  const handleReadMoreClick = () => {
    // Scroll to the cards-wrapper div when "Read More" is clicked
    ticketsWrapperRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const ticketsWrapperRef = useRef(null);

  return (
    <>
      <section
        className="z-10 flex flex-col items-center justify-center w-full pb-4 pt-20 sm:h-screen bg-cover bg-black bg-no-repeat bg-center px-2 gap-1 bg-opacity-50"
        style={{
          backgroundImage: image ? `url("${image}")` : `url(${bgExampe})`, // Added quotes and url()
        }}
      >
        {/* <div className="absolute inset-0 sm:h-screen bg-black bg-opacity-50"></div> */}
        <div className="sm:py-2 sm:px-2 py-1 px-1 bg-black flex flex-col items-center justify-center rounded-xl bg-opacity-50">
          <p className="z-20 text-white sm:text-2xl text-md font-semibold text-center max-w-[600px] ">
            {eventData.dayStarts} {eventData.dateStarts} - {eventData.dayEnds}{" "}
            {eventData.dateEnds}
          </p>
          <h1 className="z-20 text-white sm:text-6xl leading-tight text-2xl font-normal line text-center mb-[10px] bg-opacity-60 px-5 pb-3 rounded-lg">
            {eventData.name}
          </h1>
        </div>
      </section>
      <section className="flex min-h-20 relative flex-col items-center justify-center px-1">
        <div className="flex sm:flex-row flex-col sm:gap-32 gap-1 gap-y-2 sm:w-10/12 w-full p-2">
          <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
            <div className="flex sm:flex-col gap-2">
              <div className="flex gap-1 sm:gap-2 items-center">
                <FaCalendarAlt className="text-primary sm:text-base text-xs" />
                <p className="text-black md:text-base sm:text-xs text-[10px]">
                  {eventData.dayStarts} {eventData.dateStarts} -{" "}
                  {eventData.dayEnds} {eventData.dateEnds}
                </p>
              </div>
              <div className="flex gap-1 sm:gap-2 items-center">
                <BsAlarmFill className="text-primary sm:text-base text-xs" />
                <p className="text-black md:text-base sm:text-xs text-[10px]">
                  {eventData.timeStarts} - {eventData.timeEnds}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between sm:gap-x-6 items-center w-auto flex-grow">
            <div className="flex flex-col">
              <p className="text-black sm:text-base text-xs">Price </p>
              <p className="text-primary sm:text-xl text-sm font-bold">
                ${eventData.price}{" "}
              </p>
            </div>
            <div className="flex sm:flex-row sm:gap-3 gap-3 items-center">
              {userRole === "Admin" && (
                <div className="text-primary flex sm:flex-row sm:gap-3 gap-2 md:text-3xl text-xl">
                  <MdDelete
                    onClick={handleDelete}
                    className="cursor-pointer hover:-translate-y-1 hover:text-secondary transition-all duration-300"
                  />
                  <Link
                    to={{
                      pathname: `/editevent/${eventData._id}`,
                    }}
                    state={{ eventData }}
                  >
                    <FaRegEdit className="cursor-pointer hover:-translate-y-1 hover:text-secondary transition-all duration-300" />
                  </Link>
                  {/* <button
                    onClick={handleDelete}
                    className="bg-black md:px-10 md:py-3 py-1 px-2 md:text-md text-xs rounded-lg font-normal text-white hover:bg-white hover:text-black transition duration-300"
                  >
                    DELETE
                  </button> */}
                </div>
              )}
              <button
                onClick={handleReadMoreClick}
                className="bg-gradient-to-r from-primary to-black sm:px-10 hover:-translate-y-1 sm:py-3 py-2 px-3 md:text-md text-xs rounded-lg font-normal text-white hover:bg-secondary hover:text-white transition duration-300"
              >
                TICKETS
              </button>
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-gray-300 sm:w-10/12 w-full" />
        <div className="flex flex-col md:flex-row-reverse sm:w-10/12 w-full px-1 md:pb-0 gap-x-3 text-black font-sans">
          <div className="md:w-3/12 md:border-l md:border-gray-300 md:pl-3  ">
            <h2 className="text-transparent bg-clip-text inline-block bg-gradient-to-r from-primary to-black sm:text-3xl text:lg font-bold sm:my-2 my-1">
              Venue:
            </h2>
            <p className="text-xs sm:text-sm">{eventData.venue} </p>
            <h2 className="text-transparent bg-clip-text inline-block bg-gradient-to-r from-primary to-black sm:text-3xl text:lg font-bold sm:my-2 my-1">
              Special Features:
            </h2>
            <p className="text-xs sm:text-sm md:pb-3">
              {eventData.specialFeatures}
            </p>
          </div>

          <div className="md:w-9/12 md:pb-3 pb-2 ">
            <h2 className="text-transparent bg-clip-text inline-block bg-gradient-to-r from-primary to-black sm:text-3xl text:lg font-bold sm:my-2 my-1">
              Event Overview:
            </h2>
            <p className="md:text-sm text-xs text-justify">
              {eventData.overview}
            </p>
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
      <section
        id="ticket_box"
        ref={ticketsWrapperRef}
        className="bg-primary bg-contain bg-no-repeat bg-bottom md:bg-top md:bg-cover flex flex-col items-center justify-center sm:pb-4 pb-1"
        style={{
          backgroundImage: `url(${TicketsBG})`,
        }}
      >
        <h2 className=" text-white sm:text-5xl text-lg sm:my-2 my-1 font-thin">
          TICKETS
        </h2>
        <div className="bg-white sm:gap-y-5 gap-y-3 rounded-xl sm:px-5 px-1 sm:py-5 py-1 flex flex-col items-center justify-center sm:w-8/12 w-1/2">
          <h2 className=" text-black sm:text-3xl text-md font-thin sm:my-2 my-1">
            Checkout
          </h2>
          <div className="flex sm:mb-5 md:flex-row flex-col gap-2 justify-between w-11/12 items-center">
            <div className="flex sm:flex-row flex-col sm:gap-2 justify-between items-center ">
              <p className="sm:text-xl text-black text-center font-semibold">
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
              {ticketCount > 9 && (
                <p className="sm:text-md text-xs text-black sm:ml-2 text-center font-semibold">
                  You cannot buy more than 10 tickets at once.
                </p>
              )}
            </div>

            <p className="sm:text-xl text-black font-semibold">
              Total: ${(eventData.price * ticketCount).toFixed(2)}
            </p>
          </div>
          <PayButton items={eventData} qty={ticketCount} image={image} />
          {/* <Button link={"/"}>CHECKOUT NOW</Button> */}
        </div>
      </section>
    </>
  );
}

export default EventDetails;
