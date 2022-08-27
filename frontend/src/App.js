import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './Pages/Admin/Login/AdminLogin';
// import AdminHome from './Pages/Admin/home/Home';
import Home from './Pages/User/Home/Home'
import Message from './Pages/User/Message/Message';
import UserList from './Pages/Admin/userList/userList';
import InterviewerList from './Pages/Admin/interviewerList/InterviewerList'
import Single from './Pages/Admin/single/Single';
import About from './Pages/User/About/About';
import Landing from './Pages/User/Landing/Landing';
import "react-toastify/dist/ReactToastify.css";
import InterviewRequestPage from './Pages/Interviewer/InterviewRequestPage/InterviewRequestPage';
import InterviewManagementPage from './Pages/Interviewer/InterviewManagementPage/InterviewManagementPage';
import MyPostsPage from './Pages/User/MyPostsPage/MyPostsPage';
import DashboardPage from './Pages/Interviewer/DashboardPage/DashboardPage';
import InterviewerReportPage from './Pages/Interviewer/InterviewerReportPage/InterviewerReportPage';
import InterviewerUpcomingPage from './Pages/Interviewer/UpcomingPage/InterviewerUpcomingPage';
import UserUpcomingPage from './Pages/User/UpcomingPage/UserUpcomingPage';
import UserNotificationgPage from './Pages/User/UserNotificationgPage/UserNotificationgPage';
import CompletedInterviewsPage from './Pages/User/CompletedInterviewsPage/CompletedInterviewsPage';
import FeedbackPage from './Pages/User/FeedbackPage/FeedbackPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/about' element={<About />} />
          <Route path='/home' element={<Home />} />
          <Route path='/message' element={<Message />} />
          <Route path='/requests' element={<InterviewRequestPage />} />
          <Route path='/posts' element={<MyPostsPage/>}/>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/report' element={<InterviewerReportPage />} />
          <Route path='/upcoming' element={<UserUpcomingPage />} />
          <Route path='/interviews' element={<CompletedInterviewsPage />} />
          <Route path='/feedback' element={<FeedbackPage />} />
          <Route path='/notifications' element={<UserNotificationgPage />} />
          <Route path='/upcommings' element={<InterviewerUpcomingPage />} />
          <Route path='/interview/management' element={<InterviewManagementPage />} />
        </Routes>
      </BrowserRouter>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/admin" element={ <UserList />} />
            {/* <Route index element={<Home />} /> */}
            {/* <Route path='/adminLogin' element={<Login />} /> */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/users" element={ <UserList />} />
            <Route path="/admin/users/:userId" element={<Single />} />
            <Route path="/admin/interviewers" element={<InterviewerList />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
