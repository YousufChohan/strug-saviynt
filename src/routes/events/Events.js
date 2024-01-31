// Import your action creator
import { fetchEvents } from "../../redux/features/EventSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import backgroundImage from "../../assets/images/pole-bg22.jpg";
import backgroundImage2 from "../../assets/images/events-bg-poles.jpg";
import EventCard from "../../components/EventCard";

export default function Events() {
  // const { userData } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);

  useEffect(() => {
    // Dispatch the fetchEvents action with the token
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <>
      <section
        className="z-10 flex flex-col items-center justify-center w-full pb-4 pt-20 sm:h-screen bg-cover bg-no-repeat bg-center px-2 gap-6 bg-opacity-50"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <h1 className="z-20 text-white sm:text-[80px] leading-tight text-4xl font-bold line text-center mb-[10px] bg-transparent bg-opacity-60 px-5 pb-3 rounded-lg">
          Events at BETI{" "}
        </h1>
        <p className="z-20 text-white sm:text-xl text-sm font-normal text-center max-w-[600px] ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exerpitationtation
        </p>
      </section>
      <section
        className="z-10 flex flex-col mt-4 items-center  w-full pb-4 pt-10 bg-cover bg-no-repeat bg-opacity-50 bg-center px-2 gap-6"
        style={{
          backgroundImage: `url(${backgroundImage2})`,
        }}
      >
        <h1 className="z-20 text-black sm:text-[80px] leading-tight text-4xl font-bold line text-center px-5 pb-3 rounded-lg">
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
