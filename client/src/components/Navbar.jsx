import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[#211C84] shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">GyaanSetu</Link>
        <div className="space-x-4 text-white font-medium text-sm md:text-base">
          <Link to="/signup" className="hover:text-gray-300">Signup</Link>
          <Link to="/login" className="hover:text-gray-300">Login</Link>
          <Link to="/profile" className="hover:text-gray-300">Profile</Link>
          <Link to="/matches" className="hover:text-gray-300">Matches</Link>
          <Link to="/requests" className="hover:text-gray-300">Requests</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
