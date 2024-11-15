import React, { Fragment } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Components/Signup/Signup.jsx';
import Signin from './Components/Signin/Signin.jsx';
import Layout from './Pages/Layout/Layout.jsx';
import ProfilePublic from './Pages/Profile/ProfilePublic.jsx';
// import Dashboard from './Pages/Dashboard/Dashboard';
import Feed from './Pages/Feed/Feed.jsx';
import SingleVideo from './Pages/SingleVideo/SingleVideo.jsx';
import './App.css';
import Map from './Pages/Map/Map.jsx';
import Podcast from './Pages/Podcast/Podcast.jsx';
import SinglePodcastDetails from './Pages/Podcast/SinglePodcastDetails.jsx';
import Jobs from './Pages/Jobs/Jobs.jsx';
import Event from './Pages/Events/Event.jsx';
import Eventdetail from './Pages/Events/Eventdetails.jsx';
import Ticket from './Pages/Events/Ticket.jsx';
import PodcastForm from './Pages/PodcastCreation/PodcastForm.jsx';
import EventForm from './Pages/EventsCreation/EventForm.jsx';
import TicketBuyerInfo from './Pages/Events/TicketBuyerInfo.jsx';
import TicketPayment from './Pages/Events/TicketPayment.jsx';
import Ticketdetails from './Pages/Events/Ticketdetail.jsx';
import JobCreationform from './Pages/JobCreation/JobCreationform.jsx';
import SingleCategory from './Pages/Jobs/SingleCategory.jsx';
import JobDetail from './Pages/Jobs/JobDetail.jsx';
import JobApply from './Pages/Jobs/JobApply.jsx';
import Notifications from './Pages/Notifications/Notifications.jsx';
import Messages from './Pages/Messages/Messages.jsx';
import User1 from './Pages/Messages/User1.jsx';
import Settings from './Pages/Settings/Settings.jsx';
import CreateVideo from './Pages/VideoCreation/CreateVideo.jsx';
import AppliedJobs from './Pages/Settings/AppliedJobsSetting.jsx';
import MyTickets from './Pages/Settings/MyTickets.jsx';
import WatchHistory from './Pages/Settings/WatchHistory.jsx';
import PaymentMethod from './Pages/Settings/PaymentMethod/PaymentMethod.jsx';
import PaymentForm from './Pages/Settings/PaymentMethod/PaymentForm.jsx';
import MyCards from './Pages/Settings/PaymentMethod/MyCards.jsx';
import Contactaccess from './Pages/Settings/ContactAccess.jsx';
import Changepassword from './Pages/Settings/ChangePassword.jsx';
import Blocklist from './Pages/Settings/Blocklist.jsx';
import Term from './Pages/Settings/Term.jsx';
import Privacy from './Pages/Settings/Privacy.jsx';
import Zoommeeting from './Pages/Messages/CreateMeeting.jsx';
import Subscribe from './Pages/Subscribe/Subscribe.jsx';
import Filters from './Pages/VideoFilter/Filters.jsx';
import FilterPodcast from './Pages/PodcastFilter/FilterPodcast.jsx';
import FilterEvent from './Pages/EventFilter/FilterEvent.jsx';
import FilterJob from './Pages/JobsFilter/FilterJob.jsx';
import Personaldetail from './Pages/Profile/Personaldetail.jsx';
import DevicePermissions from './Pages/Settings/DevicePermissions.jsx';
import Personaldetail2 from './Pages/Profile/Personaldetail2.jsx';
import JobAppliedSuccess from './Pages/Jobs/JobAppliedSuccess.jsx';
import Header from './LandingPage/Header.jsx'
import NotFound from './Components/PageNotFound.jsx';
import PageNotFound from './Components/PageNotFound.jsx';
import WishList from './Pages/Settings/WishList.jsx';
import UserProfile from './Pages/Profile/UserProfile.jsx';
import ProfileVideos from './Pages/SingleVideo/ProfileVideos.jsx';
import Participants from './Pages/Events/Participants.jsx';
import MyCreatedJob from './Pages/Profile/MyCreatedJob.jsx';
import WatchSingle from './Pages/SingleVideo/WatchSingle.jsx';
import OnBoarding from './OnBoarding.jsx';
import MyCreatedPodcast from './Pages/Profile/MyCreatedPodcast.jsx';
import ZoomSocket from './Pages/Messages/ZoomSocket.jsx';


const App = () => {
  const token = localStorage.getItem('authtoken');
console.log("Authent", token);
  return (
    <Fragment>
      <Routes>
        {/* Login and Signup Routes  public routes*/}
        <Route path="/" element={<Header/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/bording" element={<OnBoarding/>} />
        <Route path="/signin" element={<Signin />} />
        <Route path='/notfound' element={token ?<NotFound />: <Navigate to="/signup"/> } />

        {/* Routes with Layout private routes */}
        <Route element={token ? <Layout /> : <Navigate to="/signup"/> }>
      
        {/* <Route path='/search'element={<Search/>} /> */}
          <Route path="/videos" element={token ?<Feed /> : <Navigate to="/signup"/>} />
          <Route path="/video/:src" element={token ?<SingleVideo /> :<Navigate to="/signup"/>} />
          <Route path="/profilevideos/:src" element={token ?<ProfileVideos /> :<Navigate to="/signup"/>} />
          <Route path='/watchhistory/:src' element={token ?<WatchSingle /> :<Navigate to="/signup"/> } />
          {/* <Route path="/ProfileVideo/:src" element={<ProfileVideo />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/profile" element={token ?<ProfilePublic /> :<Navigate to="/signup"/>} />
          <Route path="/userprofile" element={token ?<UserProfile /> :<Navigate to="/signup"/>} />
          <Route path="/personaldetails" element={token ?<Personaldetail /> :<Navigate to="/signup"/>} />
          <Route path="/personaldetail2" element={token ?<Personaldetail2 /> :<Navigate to="/signup"/>} />
          <Route path="/notifications" element={token ?<Notifications /> :<Navigate to="/signup"/>} />

          <Route path="/messages/" element={token ?<Messages /> :<Navigate to="/signup"/>}>
            <Route path="user1" element={token ? <User1 /> :<Navigate to="/signup"/>} />
          </Route>
          <Route path="/createmeeting" element={token ?<Zoommeeting /> :<Navigate to="/signup"/>} />
          <Route path="/map" element={token ?<Map /> :<Navigate to="/signup"/>} />
          <Route path="/subscribe" element={token ?<Subscribe /> :<Navigate to="/signup"/>} />
          <Route path="/settings" element={token ?<Settings /> :<Navigate to="/signup"/>} />
          <Route path="/podcast" element={token ?<Podcast /> :<Navigate to="/signup"/>} />
          <Route path="/podcastdetails/" element={token ?<SinglePodcastDetails /> :<Navigate to="/signup"/>} />
          <Route path="/mypodcasts/" element={token ?<MyCreatedPodcast /> :<Navigate to="/signup"/>} />
          <Route path="/events" element={token ?<Event /> :<Navigate to="/signup"/>} />
          <Route path="/eventdetail" element={token ?<Eventdetail /> :<Navigate to="/signup"/>} />
          <Route path='/participants' element={token ?<Participants /> :<Navigate to="/signup"/>} />
          <Route path="/ticket" element={token ?<Ticket /> :<Navigate to="/signup"/>} />
          <Route path="/createpodcast" element={token ?<PodcastForm /> :<Navigate to="/signup"/>} />
          <Route path="/createevent" element={token ?<EventForm /> :<Navigate to="/signup"/>} />
          <Route path="/ticketbuyer" element={token ?<TicketBuyerInfo /> :<Navigate to="/signup"/>} />
          <Route path="/ticketpayment" element={token ?<TicketPayment /> :<Navigate to="/signup"/>} />
          <Route path="/ticketdetails" element={token ?<Ticketdetails /> :<Navigate to="/signup"/>} />
          <Route path="/createjob" element={token ?<JobCreationform /> :<Navigate to="/signup"/>} />
          <Route path="/singlecategory" element={token ?<SingleCategory /> :<Navigate to="/signup"/>} />
          <Route path="/jobdetail" element={token ?<JobDetail /> :<Navigate to="/signup"/>} />
          <Route  path='/mycreatedjob' element={token ?<MyCreatedJob /> :<Navigate to="/signup"/>}/>
          <Route path="/jobapply" element={token ?<JobApply /> :<Navigate to="/signup"/>} />
          <Route path='/jobapplysuccess' element={token ?<JobAppliedSuccess /> :<Navigate to="/signup"/>}/>
          <Route path="/createVideo" element={ token ?<CreateVideo /> :<Navigate to="/signup"/>} />
          <Route path="/filters" element={token ?<Filters /> :<Navigate to="/signup"/>} />
          <Route path="/filterpodcast" element={token ?<FilterPodcast /> :<Navigate to="/signup"/>} />
          <Route path="/filterevent" element={ token ?<FilterEvent /> :<Navigate to="/signup"/>} />
          <Route path="/filterjob" element={token ?<FilterJob /> :<Navigate to="/signup"/>} />
          <Route path="/jobs" element={token ?<Jobs /> :<Navigate to="/signup"/>} />
    {/* Redirect to 404 Page if no matching route is found */}
    <Route path="*" element={token ?<PageNotFound /> :<Navigate to="/signup"/>} />

          {/* SETTINGS ROUTES private routes*/}
          <Route path="/appliedjobs" element={token ?<AppliedJobs /> :<Navigate to="/signup"/>} />
          <Route path="/devicepermission" element={token ? <DevicePermissions /> :<Navigate to="/signup"/>} />
          <Route path="/mytickets" element={token ?<MyTickets /> :<Navigate to="/signup"/>} />
          <Route path="/watchhistory" element={token ?<WatchHistory /> :<Navigate to="/signup"/>} />
          <Route path="/paymentmethod" element={ token ? <PaymentMethod /> :<Navigate to="/signup"/>} />
          <Route path="/paymentform" element={ token ? <PaymentForm /> :<Navigate to="/signup"/>} />
          <Route path="/mycards" element={ token ? <MyCards /> :<Navigate to="/signup"/>} />
          <Route path="/contactaccess" element={token ? <Contactaccess /> :<Navigate to="/signup"/>} />
          <Route path="/changepassword" element={token ?<Changepassword /> :<Navigate to="/signup"/>} />
          <Route path="/blocklist" element={token ? <Blocklist /> :<Navigate to="/signup"/>} />
          <Route path="/terms" element={token ? <Term /> :<Navigate to="/signup"/>} />
          <Route path="/privacy" element={token ? <Privacy /> :<Navigate to="/signup"/>} />
          <Route path="/wishlist" element={token ? <WishList /> :<Navigate to="/signup"/>}/>
          <Route path="/zoom" element={token ? <ZoomSocket/> :<Navigate to="/signup"/>}/>
        </Route>

   
      </Routes>


    </Fragment>
  );
};

export default App;