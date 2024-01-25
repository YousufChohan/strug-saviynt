import React from "react";
import fallbackbg from "../assets/images/pole-bg2.jpg";

const EventCard = ({ imageUrl, date, title, location, price, description }) => {
  return (
    <div className="max-w-[600px] bg-white hover:border-gray-500 hover:shadow-black hover:shadow-lg  transition duration-400 gap-2 sm:flex sm:flex-row flex-col  ">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="md:w-64 md:h-64 sm:w-48 sm:h-48 w-full h-48 object-cover"
        />
      ) : (
        <img
          src={fallbackbg}
          alt={title}
          className="md:w-64 md:h-64 sm:w-48 sm:h-48 w-full h-48 object-cover"
        />
      )}
      <div className="flex flex-col gap-3 justify-between py-1 pr-2 pl-2 sm:pl-0">
        <div className="text-black text-sm font-semibold font-['General Sans'] text-left">
          {date}
        </div>
        <div>
          <div className="text-black text-xs sm:text-base font-semibold font-['General Sans']">
            {title.length > 78 ? `${title.substring(0, 78)}...` : title}{" "}
          </div>
          <div className="text-black sm:text-sm text-xs font-normal font-['General Sans'] text-left">
            {description.length > 100
              ? `${description.substring(0, 130)}...`
              : description}{" "}
          </div>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-black sm:text-sm text-xs font-bold">{location}</p>
          <p className="text-black sm:text-md text-sm font-semibold">{price}</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
