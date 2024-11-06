import React, { Fragment } from "react";
import { FaAngleDown } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";

function Map() {
  return (
    <Fragment>
      <section className="h-full w-full relative">
        <div className="absolute w-full flex justify-between items-center">
          <p className=" flex items-center mt-3 font-bold VideosBgBlured rounded-lg">
            <IoArrowBack className="ms-2 me-1  cursor-pointer w-[20px]" />
            Map
          </p>

          <p className="flex items-center bg-neutral-300 px-3 mt-3 text-sm py-1 font-light VideosBgBlured rounded-lg">
            All
            <FaAngleDown className="ms-3 font-light" />
          </p>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13905.812481163062!2d71.67993085!3d29.38629795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393b90c4d0cdc659%3A0xb02df35bb4a88ce6!2sBahawal%20Victoria%20Hospital!5e0!3m2!1sen!2s!4v1719232646197!5m2!1sen!2s"
          className="h-full w-full"
          title="Unique Title for the Video"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </Fragment>
  );
}

export default Map;


// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import { Icon } from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { getDistance } from "geolib"; 

// const Map = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearbyUsers, setNearbyUsers] = useState([]);
  
  
//   const usersData = [
//     { id: 1, lat: 41.730610, lng: -74.935242, image: "/placeholder.jpg" },
//     { id: 2, lat: 42.732610, lng: -72.937242, image: "/placeholder.jpg" },
//     { id: 3, lat: 40.725610, lng: -73.925242, image: "/placeholder.jpg" },
    
//   ];


//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const currentUserLocation = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };
//         setUserLocation(currentUserLocation);

        
//         const nearby = usersData.filter((user) => {
//           const distance = getDistance(
//             { latitude: currentUserLocation.lat, longitude: currentUserLocation.lng },
//             { latitude: user.lat, longitude: user.lng }
//           );
//           return distance <= 5000; 
//         });
//         setNearbyUsers(nearby);
//       });
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   }, []);

  
//   const userIcon = new Icon({
//     iconUrl: "/placeholder.jpg", // User icon image
//     iconSize: [30, 30], // Adjust size
//     iconAnchor: [25, 40], // Align icon
//   });

//   return (
//     <div className="w-full h-full">
//       {userLocation ? (
//         <MapContainer
//           center={userLocation}
//           zoom={15}
//           style={{ width: "100%", height: "100%" }}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />

//           {/* User's own marker */}
//           <Marker position={userLocation} icon={userIcon}>
//             <Popup>
//               <div className="flex flex-col items-center space-y-2">
//                 <img
//                   src="/placeholder.jpg" 
//                   alt="Current User"
//                   className="w-24 h-24 rounded-full"
//                 />
//                 <p>Your Location</p>
//               </div>
//             </Popup>
//           </Marker>

//           {/* Nearby users' markers */}
//           {nearbyUsers.map((user) => (
//             <Marker key={user.id} position={{ lat: user.lat, lng: user.lng }} icon={userIcon}>
//               <Popup>
//                 <div className="flex flex-col items-center space-y-2">
//                   <img
//                     src={user.image}
//                     alt={`User ${user.id}`}
//                     className="w-24 h-24 rounded-full"
//                   />
//                   <p>Nearby User {user.id}</p>
//                 </div>
//               </Popup>
//             </Marker>
//           ))}
//         </MapContainer>
//       ) : (
//         <div className="flex justify-center items-center w-full h-full">
//           <p>Loading location...</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Map;
