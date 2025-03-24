import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Hero = () => {
  const { token } = useAuth();

  return (
    <section className="min-h-[80vh] bg-gradient-to-br from-indigo-100 to-white flex flex-col items-center justify-center px-6 py-16 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="text-4xl sm:text-5xl font-bold text-blue-700 mb-4"
      >
        Welcome to <span className="text-indigo-600">GyaanSetu</span> 🚀
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-gray-700 max-w-2xl text-base sm:text-lg mb-6"
      >
        A platform to connect learners and teachers. Share what you know, learn what you love — and grow together.
      </motion.p>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap justify-center gap-4 mb-10"
      >
        <Link to="/signup">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all">
            Get Started
          </button>
        </Link>

        <Link to="/login">
          <button className="px-6 py-3 bg-white text-blue-700 border border-blue-600 rounded-xl hover:bg-blue-50 transition-all">
            Already a Member
          </button>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;
