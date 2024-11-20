
import React, { useEffect, useState } from "react";
import {REACT_APP_API_BASE_URL} from '../../ENV'


const Experimental_Video_Feed = () => {
  const [reels, setReels] = useState([])
  const getData = async () => {
    try {
      const res = await fetch(`${REACT_APP_API_BASE_URL}/upload`);
      const data = await res.json();
      console.log({ data: data.data })
      setReels(data.data);
    } catch (error) {
      console.error("Error fetching reels:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div
        className="bg-white w-full flex h-[90vh] scrollbar-hide overflow-y-auto flex-col justify-center items-center gap-[5rem]">

        {reels && reels.map((e, i) => (
          <div className="main flex h-[90vh] w-[25rem] my-[3rem]" key={i}>
            <div className="left h-full -bg-green-500 w-[3rem]">L</div>
            <div
              className="bg-slate-800 ">
              <center>
                <video
                  src={e.data.videoUrl}
                  controls
                  autoPlay
                  loop
                  muted
                  preload="none"
                  className=" top-0 -z-50 h-[90vh] w-[25rem] bg-transparent  object-cover  bg-slate-900 "
                />
              </center>

            </div>
            <div className="right h-full -bg-green-500 w-[3rem] flex justify-center items-end">
              <div className=" h-[20rem] p-5 flex flex-col justify-center items-center gap-y-6">
                <div className="bg-black w-[1rem] h-4 p-4 text-center">M</div>
                <div className="bg-black w-[1rem] h-4 p-4 text-center">M</div>
                <div className="bg-black w-[1rem] h-4 p-4 text-center">M</div>
                <div className="bg-black w-[1rem] h-4 p-4 text-center">M</div>


              </div>
            </div>
          </div>
        ))
        }

      </div>
    </>
  );
};

export default Experimental_Video_Feed;
