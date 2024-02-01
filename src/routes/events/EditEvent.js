import React, { useLayoutEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/images/bg-example.png";
import { VscClose } from "react-icons/vsc";
import axios from "axios";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { REACT_APP_BASE_URL } from "../../constants/url";
import { useSelector } from "react-redux";

const EditEvent = () => {
  const location = useLocation(); // Use useLocation hook

  const events = useSelector((state) => state.events.events);

  const { state } = location;
  const eventId = state?.eventData?._id;
  //   console.log("eventId", eventId);

  const eventData = eventId && events.find((event) => event._id === eventId);

  const [editeventData, seteditEventData] = useState({
    name: eventData.name,
    overview: eventData.overview,
    specialFeatures: eventData.specialFeatures,
    venue: eventData.venue,
    price: eventData.price,
    dateStarts: eventData.dateStarts,
    dateEnds: eventData.dateEnds,
    dayStarts: eventData.dayStarts,
    dayEnds: eventData.dayEnds,
    timeStarts: eventData.timeStarts,
    timeEnds: eventData.timeEnds,
    eventPicture: eventData.eventPicture,
  });

  const [editPicture, setEditPicture] = useState("");

  useLayoutEffect(() => {
    if (
      editeventData &&
      editeventData.eventPicture &&
      editeventData.eventPicture.length > 0
    ) {
      async function getEventImages() {
        try {
          const response = await axios.get(
            `${REACT_APP_BASE_URL}/files/${editeventData.eventPicture[0]}/true`
          );
          setEditPicture(
            `data:${response.headers["content-type"]};base64,${response.data}`
          );
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
      getEventImages();
    }
  }, [editeventData]);

  //   useLayoutEffect(() => {
  //     if (editeventData) {
  //       async function getEventImages() {
  //         try {
  //           const response = await axios.get(
  //             `${REACT_APP_BASE_URL}/files/${editeventData.eventPicture[0]}/true`
  //           );
  //           setEditPicture(
  //             `data:${response.headers["content-type"]};base64,${response.data}`
  //           );
  //         } catch (error) {
  //           console.error("Error fetching image:", error);
  //         }
  //       }
  //       getEventImages();
  //     }
  //   }, [editeventData]);

  const { userData } = useSelector((state) => state.auth);
  // console.log("token quick check", userData.token);
  // console.log("userData in header:", userData.role);
  const userRole = userData?.role || "";
  //   console.log(userRole);

  const [value, setValue] = useState({
    startDate: dayjs(editeventData.dateStarts).format("YYYY-MM-DD"),
    endDate: dayjs(editeventData.dateEnds).format("YYYY-MM-DD"),
  });
  //   console.log("value:", value);
  //   console.log("editeventData.dateStarts:", editeventData.dateStarts);

  const handleValueChange = (newValue) => {
    if (newValue.startDate) {
      const dayStarts = dayjs(newValue.startDate).format("dddd");
      const dateStarts = dayjs(newValue.startDate).format("MM/DD/YYYY");
      seteditEventData((prevData) => ({ ...prevData, dayStarts, dateStarts }));
    }

    if (newValue.endDate) {
      const dayEnds = dayjs(newValue.endDate).format("dddd");
      const dateEnds = dayjs(newValue.endDate).format("MM/DD/YYYY");
      seteditEventData((prevData) => ({ ...prevData, dayEnds, dateEnds }));
    }

    setValue(newValue);
  };

  const [errors, setErrors] = useState({});
  const [showNewPic, setShowNewPic] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "eventPicture") {
      // Handle file input separately
      seteditEventData((prevData) => ({
        ...prevData,
        eventPicture: e.target.files[0],
      }));
      setShowNewPic(true);
    } else {
      // Handle other inputs
      seteditEventData({ ...editeventData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add form validation logic here

    try {
      const formData = new FormData();
      formData.append("id", eventId);

      formData.append("name", editeventData.name);
      formData.append("price", editeventData.price);
      formData.append("venue", editeventData.venue);

      formData.append("overview", editeventData.overview);
      formData.append("specialFeatures", editeventData.specialFeatures);

      formData.append("dateStarts", editeventData.dateStarts);
      formData.append("dateEnds", editeventData.dateEnds);

      formData.append("dayStarts", editeventData.dayStarts);
      formData.append("dayEnds", editeventData.dayEnds);

      formData.append("timeStarts", editeventData.timeStarts);
      formData.append("timeEnds", editeventData.timeEnds);

      formData.append("creatorName", "Tim");

      showNewPic && formData.append("eventPicture", editeventData.eventPicture); // Append the image file if new available

      if (
        !editeventData.name ||
        !editeventData.price ||
        !editeventData.venue ||
        !editeventData.overview ||
        !editeventData.specialFeatures ||
        !editeventData.dateStarts ||
        !editeventData.dateEnds ||
        !editeventData.dayEnds ||
        !editeventData.dayStarts ||
        !editeventData.timeEnds ||
        !editeventData.timeStarts
      ) {
        window.alert("Please fill all the fields.");
        return;
      }

      if (!editeventData.eventPicture) {
        window.alert("Please upload an image for the Event");
        return;
      }

      console.log("editeventData added", editeventData);

      await addEvent(formData); // Call the addEvent function with the FormData
      navigate("/events"); // Go back one step in history
    } catch (error) {
      setErrors(error);

      // Handle error if needed
      console.error("Adding Event failed:", error);
    }
  };

  const addEvent = async (formData, token) => {
    try {
      const response = await axios.post(
        `${REACT_APP_BASE_URL}/event`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": userData.token,
          },
        }
      );

      console.log("Adding Event response:", response.data);
      window.alert("Event Updated Successfully.");
      // Additional logic after successful addEvent if needed
    } catch (error) {
      console.error("Adding Event failed:", error);

      // Handle Adding Event error

      throw error;
    }
  };

  const navigate = useNavigate();

  //   const handleGoBack = () => {
  //     navigate(-1); // Go back one step in history
  //   };

  return (
    <>
      {userRole === "Admin" ? (
        <div
          className="flex w-100 items-center justify-center bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <div className="mx-4 my-24 flex flex-col py-6 md:px-6 px-2 rounded-md bg-slate-400 min-w-[260px] max-w-[50rem] relative items-center">
            {/* Use a Link component for navigation */}
            <Link
              to={"/events"}
              className="w-5 h-5 absolute right-3 top-3 cursor-pointer"
              //   onClick={handleGoBack}
            >
              <VscClose className="w-5 h-5 font-bold" />
            </Link>
            <h2 className="text-center md:text-lg text-md font-bold text-primary">
              EDIT EVENT{" "}
            </h2>

            {/* AddEvent Form */}
            <form
              className="mt-4 flex flex-wrap flex-grow gap-x-8 justify-between"
              onSubmit={handleSubmit}
            >
              {/* Event Name */}
              <div className="mb-4 md:w-[30%] w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Event Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editeventData.name}
                  onChange={handleChange}
                  className={`appearance-none border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-lg w-full py-2 px-3 md:text-base text-xs leading-tight focus:outline-none focus:shadow-outline`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic">{errors.name}</p>
                )}
              </div>

              {/* venue */}
              <div className="mb-4 md:w-[30%] w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="venue"
                >
                  Venue
                </label>
                <input
                  type="text"
                  name="venue"
                  value={editeventData.venue}
                  onChange={handleChange}
                  className={`appearance-none border ${
                    errors.venue ? "border-red-500" : "border-gray-300"
                  } rounded-lg w-full py-2 px-3 md:text-base text-xs leading-tight focus:outline-none focus:shadow-outline`}
                />
                {errors.venue && (
                  <p className="text-red-500 text-xs italic">{errors.venue}</p>
                )}
              </div>

              {/* price */}
              <div className="mb-4 md:w-[30%] w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={editeventData.price}
                  onChange={handleChange}
                  className={`appearance-none border ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  } rounded-lg w-full py-2 px-3 md:text-base text-xs leading-tight focus:outline-none focus:shadow-outline`}
                />
                {errors.price && (
                  <p className="text-red-500 text-xs italic">{errors.price}</p>
                )}
              </div>

              {/* Overview */}
              <div className="mb-4 w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="overview"
                >
                  Overview
                </label>
                <textarea
                  type="text"
                  name="overview"
                  value={editeventData.overview}
                  onChange={handleChange}
                  className={`appearance-none border ${
                    errors.overview ? "border-red-500" : "border-gray-300"
                  } rounded-lg w-full py-2 px-3 md:min-h-48 min-h-32 md:text-base text-xs leading-tight focus:outline-none focus:shadow-outline`}
                />
                {errors.overview && (
                  <p className="text-red-500 text-xs italic">
                    {errors.overview}
                  </p>
                )}
              </div>

              {/* specialFeatures */}
              <div className="mb-4 w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="specialFeatures"
                >
                  Special Features
                </label>
                <textarea
                  type="text"
                  name="specialFeatures"
                  value={editeventData.specialFeatures}
                  onChange={handleChange}
                  className={`appearance-none border ${
                    errors.specialFeatures
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg w-full py-2 px-3 md:text-base text-xs md:min-h-32 min-h-24 leading-tight focus:outline-none focus:shadow-outline`}
                />
                {errors.specialFeatures && (
                  <p className="text-red-500 text-xs italic">
                    {errors.specialFeatures}
                  </p>
                )}
              </div>

              <div className="mb-4 w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="startdate"
                >
                  Event Dates
                </label>
                <Datepicker
                  inputClassName="rounded-lg w-full py-2 px-3 md:text-base text-xs leading-tight focus:outline-none focus:shadow-outline"
                  separator={"to"}
                  useRange={false}
                  showFooter={true}
                  displayFormat={"MM/DD/YYYY (dddd)"}
                  value={value}
                  readOnly={false}
                  // dateFormat="MM/DD/YYYY (dddd)" // Use "dddd" for day of the week
                  onChange={handleValueChange}
                  showShortcuts={true}
                />
              </div>

              <div className="w-full flex flex-col md:flex-row items-center justify-around">
                <div className="mb-4 md:w-[30%] w-full">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="starttime"
                  >
                    Event Start Time
                  </label>
                  <div className="relative">
                    <TimePicker
                      onChange={(time) =>
                        seteditEventData((prevData) => ({
                          ...prevData,
                          timeStarts: time,
                        }))
                      }
                      value={editeventData.timeStarts}
                      className="appearance-none border  bg-white rounded-lg w-full py-2 px-3 md:text-base text-sm leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>

                <div className="mb-4 md:w-[30%] w-full">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="endtime"
                  >
                    Event End Time
                  </label>
                  <div className="relative">
                    <TimePicker
                      onChange={(time) =>
                        seteditEventData((prevData) => ({
                          ...prevData,
                          timeEnds: time,
                        }))
                      }
                      value={editeventData.timeEnds}
                      className="appearance-none border bg-white rounded-lg w-full py-2 px-3 md:text-base text-sm leading-tight focus:outline-none focus:shadow-outline"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4 w-full">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="eventPicture"
                >
                  Event Picture (Landscape 1440 x 820)
                </label>
                {editPicture && !showNewPic && (
                  <img
                    src={editPicture}
                    alt="Event Thumbnail"
                    className="my-2 rounded-xl sm:min-w-80 w-full aspect-video self-center "
                  />
                )}
                {showNewPic && (
                  <img
                    src={URL.createObjectURL(editeventData.eventPicture)}
                    alt="tachtpg"
                    className="my-2 rounded-xl sm:min-w-80 w-full aspect-video self-center"
                  />
                )}

                <input
                  type="file"
                  name="eventPicture"
                  accept="image/*"
                  onChange={handleChange}
                  //   value={
                  //     editeventData.eventPicture &&
                  //     editeventData.eventPicture.name
                  //   }
                  className="bg-white border rounded-lg w-full py-2 px-3 md:text-base text-xs leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.eventPicture && (
                  <p className="text-red-500 text-xs italic">
                    {errors.eventPicture}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-primary text-white w-full self-center mt-3 py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              >
                UPDATE EVENT
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col w-100 h-screen  items-center justify-center bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          <h1 className="text-primary sm:text-[80px] leading-tight text-4xl font-bold line text-center mb-[10px] ">
            Not Authorized{" "}
          </h1>
          <p className="text-black sm:text-xl text-sm font-normal text-center max-w-[600px] ">
            Dear user, you are not authorised to access this page.
          </p>
        </div>
      )}
    </>
  );
};

export default EditEvent;
