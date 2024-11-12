import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useLocation, useNavigate, } from 'react-router-dom';
import {REACT_APP_API_BASE_URL} from '../../ENV'

// const socket = io.connect('http://localhost:5000'); // Adjust to your server URL
const socket = io.connect(REACT_APP_API_BASE_URL); // Adjust to your server URL

const ZoomSocket = () => {
    
    const location = useLocation()
    const [authUrl, setAuthUrl] = useState(null);
    const [meetingUrls, setMeetingUrls] = useState({ startUrl: '', joinUrl: '' });
    const [accessToken, setAccessToken] = useState(''); // Retrieve and set this token as needed
    console.log({lco:location.search.split("=")[1]})
    // setAccessToken(location.search.split("=")[1])`
  const roomId = 'your-room-id'; // Set your room ID here or retrieve dynamically

  useEffect(() => {
    socket.emit('zoomAuth', { roomId });
    socket.on('receiveAuthUrl', (url) => {
      setAuthUrl(url);
      console.log("Received Auth URL:", {url});
      location.search.split("=")[1] &&  requestMeeting()
    });

    // Listen for the meeting URLs sent by the server
    socket.on('receive_url', (data) => {
      setMeetingUrls({ startUrl: data.sender, joinUrl: data.joiner });
      console.log("Received Meeting URLs:", {data});
      window.location.href = data.sender
    });

    return () => {
      socket.off('receiveAuthUrl');
      socket.off('receive_url');
    };
  }, [roomId]);

  // Function to request a new meeting URL
  const requestMeeting = () => {
    console.log("req meeting",location.search.split("=")[1])
    socket.emit('sendMeetingUrl', location.search.split("=")[1]);
    // socket.emit('sendMeetingUrl', accessToken);
  };

  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      {/* <h1>Zoom Authorization and Meeting {accessToken && accessToken}</h1> */}

      {authUrl ? (
        <div className='px-8 py-3 rounded-3xl bg-blue-600 hover:bg-blue-900 text-white '>
          <a href={authUrl} target="_blank" rel="noopener noreferrer">
            Start metting
          </a>
        </div>
      ) : (
        <p>Loading authorization URL...</p>
      )}

      <button onClick={requestMeeting}>
        Request New Meeting {location.search.split("=")[1]}
      </button>

      {meetingUrls.startUrl  ||  meetingUrls.joinUrl && (
        <div>
          <h2>Meeting Links</h2>
          <p><strong>Host Link:</strong> <a href={meetingUrls.startUrl} target="_blank" rel="noopener noreferrer">{meetingUrls.startUrl}</a></p>
          <p><strong>Participant Link:</strong> <a href={meetingUrls.joinUrl} target="_blank" rel="noopener noreferrer">{meetingUrls.joinUrl}</a></p>
        </div>
      )}
    </div>
  );
};

export default ZoomSocket;
