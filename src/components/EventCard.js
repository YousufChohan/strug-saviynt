import React, { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import fallbackbg from "../assets/images/pole-bg2.jpg";
import { REACT_APP_BASE_URL } from "../constants/url";
import axios from "axios";
import { FaExternalLinkAlt } from "react-icons/fa";

const EventCard = (event) => {
  const data = event.event;
  const [image, setImage] = useState("");

  // useLayoutEffect(() => {
  //   async function getEventImages() {
  //     axios
  //       .get(`${REACT_APP_BASE_URL}/files/${data.eventPicture[0]}/true`)
  //       .then((image) => {
  //         setImage(
  //           `data:${image.headers["content-type"]};base64,${image.data}`
  //         );
  //       });
  //   }
  //   getEventImages();
  // }, [data.eventPicture]);

  // console.log("data.title in event card:", data.venues[0].address.region);

  return (
    <a
      // to={{
      //   pathname: `/events/${data._id}`,
      // }}
      // state={{ data }}
      href={data._links.summary.href}
      target="_blank"
      rel="noopener noreferrer"
      className="cardwrapper p-3 hover:-translate-y-1 max-w-[600px] rounded-md bg-transparent hover:bg-herobg text-black border border-gray-300 hover:shadow-gray-400 hover:shadow-lg transition duration-400 gap-2 sm:flex sm:flex-row flex-col"
    >
      {/* {image ? (
        <img
          src={image}
          alt={data.name}
          className="md:w-64 md:h-64 sm:w-48 sm:h-48 w-full h-48 object-cover sm:rounded-l-md sm:rounded-bl-md"
        />
      ) : (
        <img
          src={fallbackbg}
          alt={data.name}
          className="md:w-64 md:h-64 sm:w-48 sm:h-48 w-full h-48 object-cover"
        />
        // <div className="md:w-64 md:h-64 sm:w-48 sm:h-48 w-full h-48 object-cover flex justify-center items-center ">
        //   <p className="text-center">{data.title}</p>
        // </div>
      )} */}
      <div className="flex flex-col flex-grow gap-3 justify-between py-1 pr-2 pl-2 sm:pl-0">
        <div className="text-sm flex justify-between font-semibold font-['General Sans'] text-primary text-left">
          <p>
            {data.start.substring(0, 10)} to {data.end.substring(0, 10)}
          </p>
          <FaExternalLinkAlt />
        </div>
        <div className="flex flex-col md:gap-2 gap-1">
          <div className="text-xs  sm:text-base font-semibold font-['General Sans'] break-after-all ">
            {data.title.length > 78
              ? `${data.title.substring(0, 78)}...`
              : data.title}{" "}
          </div>
          <div className="flex flex-col gap-[1px]">
            <div className="sm:text-sm text-xs font-normal font-['General Sans'] text-left break-all">
              Type:{" "}
              {data.category.name.length > 25
                ? `${data.category.name.substring(0, 25)}...`
                : data.category.name}{" "}
            </div>
            <div className="sm:text-sm text-xs font-normal font-['General Sans'] text-left break-all">
              Format:{" "}
              {data.format.length > 25
                ? `${data.format.substring(0, 25)}...`
                : data.format}{" "}
            </div>
            <div className="sm:text-sm text-xs font-normal font-['General Sans'] text-left break-all">
              Timezone:{" "}
              {data.timezone.length > 25
                ? `${data.timezone.substring(0, 25)}...`
                : data.timezone}{" "}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-end sm:gap-3">
          <p className="sm:text-sm text-primary text-xs font-medium">
            {data.venues[0].address.region.length > 25
              ? `${data.venues[0].address.region.substring(0, 25)}...`
              : data.venues[0].address.region}
            {", "}
            {data.venues[0].address.country.length > 25
              ? `${data.venues[0].address.country.substring(0, 25)}...`
              : data.venues[0].address.country}
          </p>
          <p className="sm:text-md text-sm text-secondary font-semibold">
            {data.eventStatus}
          </p>
        </div>
      </div>
    </a>
  );
};

export default EventCard;
