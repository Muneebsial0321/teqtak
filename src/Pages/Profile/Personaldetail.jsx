import React, { Fragment, useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { FaArrowLeftLong } from "react-icons/fa6";
// import { fetchDetail } from "../../API";
import { REACT_APP_API_BASE_URL } from "../../ENV";
import MoreInfo from "./MoreInfo";

function Personaldetail() {
 
  const [subscriber, setSubscriber] = useState([]); 
  const [detail, setDetail] = useState({});

const location = useLocation()
const userID = location.state?.id
console.log("id from userprofile",userID )


  const getprofileDetail = async () => {
      try {
        const req = await fetch(`${REACT_APP_API_BASE_URL}/users/${userID}`) 
        const data = await req.json() 
        console.log("personal data is",data)
        setDetail(data.user);
      } catch (error) {
        console.error("Fetching data error", error);
      }
    };
    console.log("consoele",detail)
    const getUserId = () => {
    const str = document.cookie
    const userKey = str.split('=')[1];
    return userKey
  }

  const fetchSubscribers = async () => {
    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/subscribe/my/${userID}`);
      const data = await response.json();
      console.log("Fetched subscribers:", data);
      setSubscriber(data);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };
console.log("subs",subscriber)
  useEffect(() => {
    console.log("fetching user pernsal info")
    fetchSubscribers();
      getprofileDetail();
  }, []);



const saveButton = getUserId() === userID
  return (
    <Fragment>
      <div className="h-full overflow-y-auto bg-white w-full px-3" style={{ WebkitOverflowScrolling: 'touch', WebkitScrollbar: { display: 'none' }, '-msOverflowStyle': 'none', scrollbarWidth: 'none' }}>
        <div className="p-5">
          <div className="flex items-center mb-4">
            <Link to='/profile'>
              <FaArrowLeftLong size={30} className='border-2 border-black p-1 rounded-md' />
            </Link>
            <p className="text-2xl font-semibold pl-4">Personal Details</p>
          </div>
         {saveButton &&  <Link to='/personaldetail2'state={{id:detail.Users_PK, role:detail.role}} className="text-[#9595f5]">Edit Detail</Link>}
          <p className="text-lg font-semibold mt-5">Total Subscriber</p>
          <p className="text-[gray]">{subscriber.length } Subscribers</p>
          <p className="text-xl font-semibold mt-5">Description</p>
          <p className="text-[gray]">
            {detail.description ? detail.description : 'No description available.'}
          
          </p>
          <p className="text-xl font-semibold mt-5">Personal info</p>
          <div className="p-5">
  <div className="flex flex-wrap gap-4 mt-5 ">
    {/* Name field */}
    <div className="w-full sm:w-[48%] md:w-[48%] lg:w-[50%]">
      <div className="flex justify-between items-center mb-2">
        <p className="text-base font-medium">Name</p>
      </div>
      <div className="border p-2 rounded-md">
        <span>{detail.name || 'No name available.'}</span>
      </div>
    </div>
    
    {/* Work field */}
    <div className="w-full sm:w-[48%] md:w-[48%] lg:w-[45%]">
      <div className="flex justify-between items-center mb-2">
        <p className="text-base font-medium">Work</p>
      </div>
      <div className="border p-2 rounded-md md:whitespace-nowrap">
        <span>{detail.work_experience || 'No work experience available.'}</span>
      </div>
    </div>
    
    {/* Education field */}
    <div className="w-full sm:w-[48%] md:w-[48%] lg:w-[50%]">
      <div className="flex justify-between items-center mb-2">
        <p className="text-base font-medium">Education</p>
      </div>
      <div className="border p-2 rounded-md whitespace-nowrap">
        <span>{detail.education || 'No education details available.'}</span>
      </div>
    </div>
    
    {/* Location field */}
    <div className="w-full sm:w-[48%] md:w-[48%] lg:w-[45%]">
      <div className="flex justify-between items-center mb-2">
        <p className="text-base font-medium">Location</p>
      </div>
      <div className="border p-2 rounded-md whitespace-nowrap">
        <span>{detail.location || 'No location information available.'}</span>
      </div>
    </div>
  </div>
</div>


          <p className="text-xl font-semibold mt-5">More info</p>
        
          {detail.role && <MoreInfo userPk={userID} role={detail.role} />}
       
        </div>
      </div>
    </Fragment>
  );
}

export default Personaldetail;
	