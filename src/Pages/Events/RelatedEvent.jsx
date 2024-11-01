import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoBookmarkOutline } from "react-icons/io5";
// import Image from './Img2.png';
import { FaRegShareFromSquare } from "react-icons/fa6";
import { fetchEvent } from "../../API";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'; // Import toast components
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { REACT_APP_API_BASE_URL } from "../../ENV";

const API_BASE_URL = REACT_APP_API_BASE_URL;

const RelatedEvent = () => {
  const [newcard, setNewCard] = useState([]);
const location = useLocation()
const filteredData = location.state?.filteredData
  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchEvent(); // Use the function from api.js
        console.log(result);
        setNewCard(result.data);
      } catch (error) {
        console.error("Fetching data error", error);
      }
    };
    if(filteredData && filteredData.length > 0){
      setNewCard(filteredData)
    }else(
      getData()
    )
  
  }, [filteredData]);

  const handleShare = async (e) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this event!",
          url: window.location.href,
        });
        toast.success('Event link shared successfully!'); // Notify on success
      } catch (error) {
        console.error('Error sharing:', error);
        toast.error('Error sharing the event link.'); // Notify on error
      }
    } else {
      toast.error('Web Share API is not supported in your browser.'); // Notify if not supported
    }
  };

  const handleSaveToWishlist = async (eventId) => {
    const user_id = getUserId(); // Function to get user ID from cookies
    try {
      const response = await axios.post(`${API_BASE_URL}/wishlist`, {
        wishItemType: 'event',
        wishItemId: eventId,
        userId: user_id,
      });
      console.log('Wishlist item saved:', response.data);
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
    <div className="mt-3 flex flex-wrap gap-1 w-[93%] mx-auto">
      <ToastContainer /> {/* Include ToastContainer for notifications */}
      {newcard.map((data, i) => (
        <div key={i} className="m-0 text-white md:w-[32%] w-[48.4%] h-[42vh] relative">
          <img
            src={data.eventCoverUrl ? data.eventCoverUrl : "/loading.jpg"}
            alt="Card Img2"
            className="h-full w-full rounded-lg cursor-pointer"
          />
          <IoBookmarkOutline 
            className="absolute lg:right-2 lg:top-4 lg:text-2xl cursor-pointer top-2 right-1" 
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering on parent elements
              handleSaveToWishlist(data._id); // Pass the event ID
            }} 
          />
          <div className="w-full absolute bottom-1">
            <div className="SVTBottom w-[95%] mx-auto lg:px-3 lg:py-2 rounded-lg px-1">
              <small className="block lg:text-xl">{data.eventTitle}</small>
              <p className="text-xs py-2">{data.eventDate}</p>
              {/* <p className="text-sm lg:pb-2">{data.eventLocation}</p> */}
              <div className="flex items-center mb-1">
                <Link
                  to="/eventdetail"
                  state={{ id: data._id }}
                  className="me-2 md:px-5 lg:py-2 py-[3px] JobButtonBgBlur md:w-auto w-[70%] text-sm text-white rounded-full text-center"
                >
                  Buy tickets
                </Link>
                <button 
                  className="md:px-7 lg:py-2 py-[3px] flex justify-center w-[30%] md:w-auto JobButtonBgBlur text-xs text-white rounded-full" 
                  onClick={handleShare}
                >
                  <FaRegShareFromSquare className=" text-lg " />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RelatedEvent;
