import React from "react";
import { useParams } from "react-router-dom";
import backgroundImage from "../../assets/images/event-bg.jpg";
import { FaCalendarAlt } from "react-icons/fa";
import { BsAlarmFill } from "react-icons/bs";
import Button from "../../components/Button";

function EventDetails() {
  const { id } = useParams();
  console.log("id:", id);

  return (
    <>
      <section
        className="z-10 flex flex-col items-center justify-center w-full pb-4 pt-20 sm:h-screen bg-cover bg-black bg-no-repeat bg-center px-2 gap-1 bg-opacity-50"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* <div className="absolute inset-0 sm:h-screen bg-black bg-opacity-50"></div> */}

        <p className="z-20 text-white sm:text-2xl text-md font-semibold text-center max-w-[600px] ">
          April 14, 2024
        </p>
        <h1 className="z-20 text-white sm:text-[80px] leading-tight text-4xl font-normal line text-center mb-[10px] bg-opacity-60 px-5 pb-3 rounded-lg">
          Event Name
        </h1>
      </section>
      <section className="flex flex-col items-center justify-center sm:my-5 my-1 px-1">
        <div className="flex sm:flex-row flex-col sm:gap-32 gap-1 gap-y-2 sm:w-10/12 w-full p-2">
          <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
            <div className="flex sm:flex-col gap-2">
              <div className="flex gap-1 sm:gap-2 items-center">
                <BsAlarmFill className="text-primary sm:text-base text-xs" />
                <p className="text-black md:text-base sm:text-xs text-[10px]">
                  Friday, April 14, 2024
                </p>
              </div>
              <div className="flex gap-1 sm:gap-2 items-center">
                <FaCalendarAlt className="text-primary sm:text-base text-xs" />
                <p className="text-black md:text-base sm:text-xs text-[10px]">
                  6:30 PM - 9:30 PM
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center w-auto flex-grow">
            <div className="flex flex-col">
              <p className="text-black sm:text-base text-xs">Price </p>
              <p className="text-primary sm:text-xl text-sm font-bold">
                $62.50 - $20.00{" "}
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
            <p className="text-xs sm:text-sm">
              Empire Convention Center 123 Energy Drive Cityville, State
            </p>
            <h2 className=" text-primary sm:text-3xl text:lg font-bold sm:my-2 my-1">
              Special Features:
            </h2>
            <p className="text-xs sm:text-sm ">
              Exclusive access to the latest technologies and products in the
              exhibition area. Opportunities for one-on-one discussions with
              industry experts. Networking sessions to connect with key
              stakeholders and decision-makers. Interactive workshops providing
              hands-on experience with cutting-edge power solutions.
            </p>
          </div>

          <div className="md:w-9/12 md:pb-3 ">
            <h2 className="text-primary sm:text-3xl text:lg font-bold sm:my-2 my-1">
              Event Overview:
            </h2>
            <p className="text-xs sm:text-sm text-justify">
              Join us at the Power Innovation Summit 2024, a flagship event
              hosted by [Company Name]. This exclusive summit brings together
              industry leaders, experts, and innovators in the field of power
              generation to discuss the latest trends, technological
              advancements, and sustainable practices shaping the future of the
              energy sector. Agenda: Day 1: Powering Tomorrow 9:00 AM - 9:30 AM:
              Registration and Networking 9:30 AM - 10:00 AM: Opening Keynote:
              "The Future of Power Generation" 10:15 AM - 11:30 AM: Panel
              Discussion: "Innovations in Renewable Energy" 11:45 AM - 1:00 PM:
              Technical Sessions: "Advanced Turbine Technologies" 1:00 PM - 2:00
              PM: Networking Lunch 2:15 PM - 3:30 PM: Workshop: "Smart Grid
              Solutions for Sustainable Power" 3:45 PM - 5:00 PM: Company
              Showcase: "Powering the Future - Our Latest Projects" 5:15 PM -
              6:00 PM: Networking Reception Day 2: Sustainability in Action 9:30
              AM - 10:00 AM: Morning Coffee and Networking 10:15 AM - 11:30 AM:
              Keynote Address: "Sustainable Practices in Power Generation" 11:45
              AM - 1:00 PM: Panel Discussion: "Environmental Impact and
              Corporate Responsibility" 1:00 PM - 2:00 PM: Networking Lunch 2:15
              PM - 3:30 PM: Roundtable Discussions: "Future Trends in Power
              Infrastructure" 3:45 PM - 4:30 PM: Awards Ceremony: "Recognizing
              Excellence in Power Innovation" 4:30 PM - 5:00 PM: Closing Remarks
              and Networking Special Features: Exclusive access to the latest
              technologies and products in the exhibition area. Opportunities
              for one-on-one discussions with industry experts. Networking
              sessions to connect with key stakeholders and decision-makers.
              Interactive workshops providing hands-on experience with
              cutting-edge power solutions. Registration: To secure your spot at
              the Power Innovation Summit 2024, register online at [event
              website] or contact our event coordinator at [contact
              email/phone]. Don't miss this opportunity to be part of shaping
              the future of power generation. We look forward to welcoming you
              to an event that promises insights, collaboration, and a vision
              for a sustainable energy future.
            </p>
          </div>
        </div>
        <div className="h-[1px] bg-gray-300 sm:w-10/12 w-full" />
      </section>
      <section className="bg-primary flex flex-col items-center justify-center sm:mt-5 mt-1 sm:pb-4 pb-1">
        <h2 className=" text-white sm:text-5xl text-lg font-bold sm:my-2 my-1">
          TICKETS
        </h2>
        <div className="bg-white rounded-xl sm:px-5 px-1 sm:py-2 py-1 flex flex-col items-center justify-center md:w-10/12">
          <h2 className=" text-black sm:text-3xl text-md font-bold sm:my-2 my-1">
            Book Now!
          </h2>
        </div>
      </section>
    </>
  );
}

export default EventDetails;
