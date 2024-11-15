import React, { useState, useEffect } from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import EventFilters from "./EventFilters";
import { fetchEvent } from "../../API";
import RelatedEvent from "./RelatedEvent";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'; // Import toast components
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { useLocation } from "react-router-dom";
import { REACT_APP_API_BASE_URL } from "../../ENV";

const API_BASE_URL = REACT_APP_API_BASE_URL;

const CardComponent = ({ title, imgSrc, onSave }) => (
  <div className="lg:h-[30vh] h-[25vh] lg:w-[12vw] md:w-[15vw] sm:w-[20vw] w-[50%] relative cursor-pointer m-0 text-white  max-[375px]:w-[48.4%] max-[320px]:w-[65.4%]">
    <img
      className="h-full w-full rounded-lg object-cover"
      src={imgSrc ? imgSrc : "/loading.jpg"}
      alt="Card Img"
    />
    <div className="absolute inset-0 flex justify-between ShadedBG rounded-lg">
      <h5 className="text-sm ps-2 absolute bottom-2 w-[93%] overflow-hidden whitespace-nowrap text-ellipsis">{title}</h5>
      <IoBookmarkOutline 
        className="absolute lg:right-2 lg:top-4 lg:text-2xl cursor-pointer top-2 right-1" 
        onClick={onSave} // Call the save function passed as prop
      />
    </div>
  </div>
);

function Event() {
  const [newcard, setNewCard] = useState([]);
  const [filterLoopData, setFilterLoopData] = useState([]);
  const location = useLocation();
  const filteredData = location.state?.filteredData;

  useEffect(() => {
    const getData = async () => {
      try {
        const cachedData = localStorage.getItem('eventData');
        if (cachedData) {
          setFilterLoopData(JSON.parse(cachedData)); // Use cached event data
        } else {
          const result = await fetchEvent();
          setFilterLoopData(result.data);
          localStorage.setItem('eventData', JSON.stringify(result.data)); // Cache the event data
        }
      } catch (error) {
        console.error("Fetching data error", error);
      }
    };

    // Check for filteredData passed from location state
    if (filteredData && filteredData.length > 0) {
      setNewCard(filteredData);
    } else {
      getData(); // Fetch event data if no filterData exists
    }

  }, [filteredData]);

  const handleSaveToWishlist = async (eventId) => {
    const user_id = getUserId(); // Function to get user ID from cookies
    try {
      const response = await axios.post(`${API_BASE_URL}/wishlist`, {
        wishItemType: 'event',
        wishItemId: eventId,
        userId: user_id,
      });
      toast.success('Event saved to wishlist!'); // Notify on success
    } catch (error) {
      console.error('Error saving to wishlist:', error);
      toast.error('Could not save to wishlist. Please try again.'); // Notify on error
    }
  };

  const getUserId = () => {
    const str = document.cookie;
    const userKey = str.split("=")[1];
    return userKey;
  };

  return (
    <div className="h-full w-full">
      <ToastContainer />
      <div className="w-full h-[10%]">
        <EventFilters data={{newcard ,setFilterLoopData}} />
      </div>
      <div className="h-[89%] bg-white mt-1 w-full overflow-y-scroll Podcast_Top_Videos">
        <h3 className="text-xl font-bold my-3 w-[95%] mx-auto">
          Suggested Events
        </h3>
        <div className="h-full w-[95%] mx-auto">
          <div className="flex w-full overflow-x-scroll gap-1 Podcast_Top_Videos">
            {filterLoopData.length > 0 ? (
              filterLoopData.map((data, i) => (
                <CardComponent
                  key={i}
                  title={data.eventTitle}
                  imgSrc={data.eventCoverUrl || "loading.jpg"}
                  onSave={(e) => {
                    e.stopPropagation();
                    handleSaveToWishlist(data._id);
                  }}
                />
              ))
            ) : "No Filter Result Match"}
          </div>
          <RelatedEvent data={{setNewCard, setFilterLoopData, filterLoopData}} />
          <br />
        </div>
      </div>
    </div>
  );
}

export default Event;
