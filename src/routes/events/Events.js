// Import your action creator
import { fetchEvents } from "../../redux/features/EventSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import backgroundImage from "../../assets/images/pole-bg2.jpg";
import EventCard from "../../components/EventCard";

export default function Events() {
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2NWFmYmZmNDBlYTk0YmUzODQ3MDA2YWMiLCJyb2xlIjoiQ3VzdG9tZXIifQ.WvhZavvK4gWPKYLq0kqUi6cPm1ewwKlUbwtThrB8U_4";

  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);

  useEffect(() => {
    // Dispatch the fetchEvents action with the token
    dispatch(fetchEvents({ token: token }));
  }, [dispatch, token]); // Dependency array includes 'dispatch' and 'token'

  return (
    <>
      <section
        className="z-10 flex flex-col items-center justify-center w-full pb-4 pt-20 sm:h-screen bg-cover bg-no-repeat bg-center px-2 gap-6 bg-opacity-50"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <h1 className="z-20 text-primary sm:text-[80px] leading-tight text-4xl font-bold line text-center mb-[10px] bg-white bg-opacity-60 px-5 pb-3 rounded-lg">
          Events at BETI{" "}
        </h1>
        <p className="z-20 text-white sm:text-xl text-sm font-normal text-center max-w-[600px] ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exerpitationtation
        </p>
      </section>
      <section className="z-10 flex flex-col items-center  w-full pb-4 pt-10 bg-cover bg-primary bg-no-repeat bg-center px-2 gap-6">
        <h1 className="z-20 text-white sm:text-[80px] leading-tight text-4xl font-bold line text-center px-5 pb-3 rounded-lg">
          Latest Events
        </h1>
        <div className="my-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </section>
    </>
  );
}
