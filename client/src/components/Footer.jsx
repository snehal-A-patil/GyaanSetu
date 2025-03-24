import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#211C84] text-gray-300 mt-auto shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <h3 className="text-xl font-bold text-indigo-400 mb-3">GyaanSetu</h3>
          <p className="text-sm text-gray-400">
            A bridge of knowledge connecting curious minds. Empowering learners and teachers to grow together.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-white">Explore</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-indigo-400">Home</Link></li>
            <li><Link to="/profile" className="hover:text-indigo-400">Profile</Link></li>
            <li><Link to="/matches" className="hover:text-indigo-400">Matches</Link></li>
            <li><Link to="/requests" className="hover:text-indigo-400">Requests</Link></li>
            <li><Link to="/rate-users" className="hover:text-indigo-400">Ratings</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-white">Resources</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:text-indigo-400">Blog</a></li>
            <li><a href="#" className="hover:text-indigo-400">Help Center</a></li>
            <li><a href="#" className="hover:text-indigo-400">Community</a></li>
            <li><a href="#" className="hover:text-indigo-400">Careers</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2 text-white">Connect With Us</h4>
          <div className="flex gap-4 text-gray-400 mt-2">
            <a href="#" className="hover:text-indigo-400"><Facebook /></a>
            <a href="#" className="hover:text-indigo-400"><Twitter /></a>
            <a href="#" className="hover:text-indigo-400"><Instagram /></a>
            <a href="#" className="hover:text-indigo-400"><Linkedin /></a>
          </div>
        </div>

      </div>
      <div className="text-center text-xs py-4 bg-[#211C84] border-t border-indigo-900 text-gray-500">
        © {new Date().getFullYear()} GyaanSetu. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
