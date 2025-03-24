import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Profile from "./components/Profile";
import BrowseMatches from "./components/BrowseMatches";
import PendingRequests from "./components/PendingRequests";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RateUsersPage from "./components/RateUsersPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer position="top-center" autoClose={2000} />
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/matches" element={<BrowseMatches />} />
          <Route path="/requests" element={<PendingRequests />} />
          <Route path="/rate-users" element={<RateUsersPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
