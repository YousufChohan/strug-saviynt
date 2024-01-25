import React from "react";
import backgroundImage from "../assets/images/pole-bg2.jpg";
import EventCard from "../components/EventCard";
// import Button from "../components/Button";

export default function Events() {
  const dummyData = [
    {
      imageUrl: "https://placekitten.com/250/200",
      title: "Digital Transformation Summit",
      description:
        "Join us for a summit on leveraging technology to transform business processes and operations.",
      date: "Mon, APR 09, 7:00 PM",
      location: "Tech Hub, San Francisco, CA",
      price: "$25",
    },
    {
      imageUrl: "https://placekitten.com/200/200",
      title: "Agile Development Workshop",
      description:
        "Learn about implementing Agile methodologies to enhance software development practices.",
      date: "Tue, APR 10, 6:30 PM",
      location: "Agile Center, Silicon Valley, CA",
      price: "$30",
    },
    {
      imageUrl: "https://placekitten.com/550/200",
      title: "Data Analytics Conference",
      description:
        "Explore the power of data and gain insights to drive informed decision-making.",
      date: "Wed, APR 11, 6:00 PM",
      location: "Data Plaza, Palo Alto, CA",
      price: "$20",
    },
    {
      imageUrl: "https://placekitten.com/350/200",
      title: "Cloud Solutions Seminar",
      description:
        "Discover the benefits of utilizing cloud computing services for scalability and efficiency.",
      date: "Thu, APR 12, 5:30 PM",
      location: "Cloud Tower, Mountain View, CA",
      price: "$35",
    },
    {
      imageUrl: "https://placekitten.com/450/200",
      title: "Ecosystem Innovation Forum",
      description:
        "Participate in collaborative innovation within the business ecosystem with partners and suppliers.",
      date: "Fri, APR 13, 7:30 PM",
      location: "Innovation Hub, San Jose, CA",
      price: "$45",
    },
    {
      imageUrl: "https://placekitten.com/230/200",
      title: "Cybersecurity Workshop",
      description:
        "Learn about securing digital assets and protecting against cyber threats and attacks.",
      date: "Sat, APR 14, 4:00 PM",
      location: "SecureTech Center, Santa Clara, CA",
      price: "$50",
    },
  ];
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
          {dummyData.map((data, index) => (
            <EventCard key={index} {...data} />
          ))}
        </div>
      </section>
    </>
  );
}
