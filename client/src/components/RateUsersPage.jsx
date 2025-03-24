import React, { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import RateUserModal from "./RateUserModal";

const RateUsersPage = () => {
  const { token } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await API.get("/user/matches", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(res.data);
      } catch (err) {
        toast.error("Failed to load matches ❌");
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, [token]);

  const openRatingModal = (userId) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  if (loading) return <p className="text-center mt-10">Loading matched users...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        ⭐ Rate Your Matches
      </h2>

      {matches.length === 0 ? (
        <p className="text-center text-gray-500">No matched users to rate.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {matches.map((user) => (
            <div
              key={user._id}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-indigo-700 mb-1">{user.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{user.bio}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-green-600">Teaches:</span>{" "}
                  {user.skillsToTeach.join(", ")}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600">Wants to Learn:</span>{" "}
                  {user.skillsToLearn.join(", ")}
                </p>
              </div>
              <button
                onClick={() => openRatingModal(user._id)}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-semibold"
              >
                Rate User
              </button>
            </div>
          ))}
        </div>
      )}

      <RateUserModal
        userId={selectedUserId}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default RateUsersPage;
