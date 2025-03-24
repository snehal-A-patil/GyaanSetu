import React from "react";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-100 to-purple-100 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to GyaanSetu?</h2>
      <p className="text-gray-700 mb-6">It’s free. It’s powerful. It’s for you 💙</p>
      <Link to="/signup">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700">
          Start Now
        </button>
      </Link>
    </section>
  );
};

export default FinalCTA;
