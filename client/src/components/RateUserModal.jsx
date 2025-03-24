import React, { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const RateUserModal = ({ userId, isOpen, onClose }) => {
  const { token } = useAuth();
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRating = async () => {
    if (!stars) return toast.error("Please select stars");
    setLoading(true);
    try {
      await API.post(
        `/user/rate/${userId}`,
        { stars, feedback },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Thanks for your rating ⭐");
      onClose();
    } catch (err) {
      console.error("Rating error:", err.response || err.message);
      toast.error(err.response?.data?.msg || "Rating failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>
        <h3 className="text-xl font-bold text-indigo-700 mb-4 text-center">Rate this user</h3>

        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => setStars(s)}
              className={`text-3xl px-1 transition ${stars >= s ? "text-yellow-400" : "text-gray-300"}`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          rows="3"
          placeholder="Leave a message (optional)"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        ></textarea>

        <div className="flex justify-between items-center mt-5">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-red-500"
          >
            Cancel
          </button>
          <button
            onClick={handleRating}
            disabled={loading}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RateUserModal;
