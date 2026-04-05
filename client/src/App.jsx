import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from "./pages/Home";
import Layout from "./Layout";
import AdminDashboard from "./admin/AdminDashboard";
import CreateUser from "./admin/CreateUser";
import MainPart from "./admin/MainPart";
import AssignTask from "./admin/AssignTask";
import UserDashboard from "./users/userdashboard";
import UserTask from "./users/UserTask";
import UserHome from "./users/Userhome";
import UserProfile from "./users/UserProfile";
import UserMessages from "./users/UserMessages";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admindashboard" element={<AdminDashboard />}>
          <Route index element={<MainPart />} />
          <Route path="mainpart" element={<MainPart />} />
          <Route path="createuser" element={<CreateUser />} />
          <Route path="assigntask" element={<AssignTask />} />
        </Route>

        {/* User Routes */}
        <Route path="/userdashboard" element={<UserDashboard />}>
          <Route index element={<UserHome />} />
          <Route path="usertask" element={<UserTask />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="messages" element={<UserMessages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
// new code

export default App;