import React, { useContext } from "react";
import { MdDone } from "react-icons/md";
import { IoIosLink } from "react-icons/io";
import { FaShareFromSquare } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { myContext } from "../../Context/CreateContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications
import { REACT_APP_API_BASE_URL } from "../../ENV";

const Success = ({ podcastId }) => {
  // Accept podcastId as a prop
  const { PodcastStates } = useContext(myContext);

  // Generate the podcast link
  const podcastLink = `${REACT_APP_API_BASE_URL}/podcasts/${podcastId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(podcastLink);
      toast.success("Podcast link copied to clipboard!"); // Show success toast
    } catch (error) {
      console.error("Failed to copy the link:", error);
      toast.error("Failed to copy the link."); // Show error toast
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this podcast!",
          url: window.location.href,
        });
        toast.success("Share successful!"); // Show success toast
      } catch (error) {
        console.error("Error sharing:", error);
        toast.error("Error sharing the podcast."); // Show error toast
      }
    } else {
      toast.error("Web Share API is not supported in your browser."); // Show error toast
    }
  };

  return (
    <>
      <ToastContainer /> {/* Include the ToastContainer here */}
      <div className="h-full w-full bg-white flex flex-col justify-center relative items-center">
        <RxCross2
          className="cursor-pointer absolute top-5 left-3"
          onClick={() => PodcastStates.setPodcastSubmitted(false)}
        />

        <div className="flex flex-col justify-center">
          <div className="h-[50px] flex justify-center items-center w-[50px] mx-auto border-2 border-solid border-[#6165F3] opacity-85 rounded-3xl bg-[#e1e2fd]">
            <MdDone className="text-[#333af3] text-[12px]" />
          </div>
          <h2 className="text-center py-6 text-xl font-semibold">
            Podcast Successfully <br />
            Published
          </h2>
        </div>
        <div className="flex gap-3 mt-10">
          <div className="PodcastSuccessGradient rounded-full m-0 p-0 flex justify-center items-center">
            <div className="bg-white h-[95%] rounded-full w-[99%] m-0 p-0">
              <div
                className="flex items-center PodcastSuccessGradientText justify-center gap-2 rounded-3xl w-40 h-10 cursor-pointer"
                onClick={handleCopyLink}
              >
                <IoIosLink className="text-[#69CFDD]" />
                <p>Copy link</p>
              </div>
            </div>
          </div>
          <div
            className="flex items-center justify-center gap-2 PodcastSuccessGradient rounded-3xl w-40 h-10 cursor-pointer"
            onClick={handleShare}
          >
            <FaShareFromSquare size={20} className="text-white" />
            <p className="text-white">Share</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
