import React, { useState, useEffect, Fragment } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { Link } from "react-router-dom";
import { REACT_APP_API_BASE_URL } from "../../ENV";

function MySubscribers() { 
  const [subscribers, setSubscribers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [able, setAble] = useState(null);

  const getUserId = () => {
    const str = document.cookie;
    const userKey = str.split('=')[1];
    return userKey;
  };

  // Fetch the list of users who have subscribed to you (your followers)
  const fetchSubscribers = async () => {
    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/subscribe/my/${getUserId()}`);
      const data = await response.json();
     
      setSubscribers(data);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };

  // Fetch the list of blocked users
  const fetchBlockedUsers = async () => {
    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/block?userId=${getUserId()}`);
      const data = await response.json();
   

      setBlockedUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching blocked users:", error);
      setBlockedUsers([]);
    }
  };

 
  const blockSubscriber = async (blockedId) => {
    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/block`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: getUserId(),
          blockedId,
        }),
      });
      if (response.ok) {
        const result = await response.json();
      
        
        
        setSubscribers(prevSubscribers => 
          prevSubscribers.filter(sub => sub.subscriberId !== blockedId)
        );

       
        setBlockedUsers(prev => [...prev, { blockedId }]);
      } else {
        console.error('Failed to block user');
      }
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  
  const isBlocked = (userId) => {
    return blockedUsers.some((blockedUser) => blockedUser.blockedId === userId);
  };

  
  const deleteSubscriber = async (subscriberId) => {
    try {
      const response = await fetch(`${REACT_APP_API_BASE_URL}/subscribe/${subscriberId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const result = await response.json();
  
        
        setSubscribers(prevSubscribers => prevSubscribers.filter(sub => sub._id !== subscriberId));
      } else {
        console.error('Failed to remove subscriber');
      }
    } catch (error) {
      console.error('Error removing subscriber:', error);
    }
  };

  
  useEffect(() => {
    fetchSubscribers();
    fetchBlockedUsers();
  }, []);

  return (
    <Fragment>
      <div className="h-[80%] w-full bg-white md:h-screen lg:h-[90vh] xl:h-[90vh]">
        <div className="main h-full w-[90%] mx-4 md:w-[80%] lg:w-[60%] xl:w-[70%]">
          <p className="text-lg h-[10%] bg-white font-bold w-full z-10 flex items-center md:text-xl lg:text-xl xl:text-2xl">
            My Subscribers
          </p>
          <div className="flex flex-col justify-between md:flex-row lg:flex-row xl:flex-row text-lg md:text-xl lg:text-lg xl:text-xl font-bold">
            <h1>Total Subscribers</h1>
            <h2>{subscribers.length}</h2>
          </div>
          <div
            className="overflow-y-auto h-[550px] "
            style={{
              WebkitOverflowScrolling: "touch",
              WebkitScrollbar: { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {subscribers.map((subsc) => (
              <div key={subsc._id} className="flex items-center justify-between py-3 mt-2 border-b mb-5">
                <div className="flex items-center gap-3">
                  <Link to="/userprofile">
                    <img
                      src={subsc.user?.picUrl ? subsc.user.picUrl : 'placeholder.jpg'}
                      alt=""
                      className={`h-[40px] w-[40px] lg:h-[50px] lg:w-[50px] rounded-full ${subsc.user.role === 'investor' ? 'border-2 border-red-600' : 
                          subsc.user.role === 'entrepreneur' ? 'border-2 border-blue-600' : ''}`}
                    />
                  </Link>
                  <div>
                    <p className="text-sm md:text-base lg:text-lg xl:text-xl opacity-75">
                      {subsc.user?.name || 'Unknown'}
                    </p>
                    <p>
                      <Link to="##" className="text-xs md:text-sm lg:text-base xl:text-lg opacity-75">
                        {subsc.linkText}
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <CiMenuKebab
                    className="text-base md:text-lg lg:text-xl xl:text-2xl cursor-pointer"
                    onClick={() => setAble(able === subsc._id ? null : subsc._id)}
                  />
                  {able === subsc._id && (
                    <div
                      className="absolute right-0 w-[200px] md:w-[250px] lg:w-[200px] xl:w-[200px] cursor-pointer px-3 py-2 z-30 bg-white shadow-lg border max-[425px]:w-[150px]"
                      onClick={() => setAble(able === subsc._id ? null : subsc._id)}
                    >
                      <p
                        className="text-sm md:text-base lg:text-lg xl:text-xl opacity-75 mb-5 cursor-pointer"
                        onClick={() => {
                          const blockedId = subsc.user.Users_PK; 
                          if (!isBlocked(blockedId)) {
                            blockSubscriber(blockedId);
                          }
                        }}
                      >
                        {isBlocked(subsc.user.Users_PK) ? "Blocked" : "Block"}
                      </p>
                      <p
                        className="text-sm md:text-base lg:text-lg xl:text-xl text-red-500 mb-5 cursor-pointer"
                        onClick={() => deleteSubscriber(subsc._id)} // Call deleteSubscriber with the subscriber's ID
                      >
                        Remove
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default MySubscribers;
