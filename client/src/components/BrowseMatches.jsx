// ✅ Updated BrowseMatches.jsx to restrict chat to accepted requests only
import React, { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { MessageSquare } from "lucide-react";
import ChatBox from "./ChatBox"; // 💬 Import ChatBox
import * as jwt_decode from "jwt-decode"; // ✅ FIXED: Import all as object for ESM support

const BrowseMatches = () => {
  const { token } = useAuth();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requested, setRequested] = useState({});
  const [selectedMatch, setSelectedMatch] = useState(null); // 💬 for Chat

  // 🔐 Decode user ID safely from token
  let userId = null;
  try {
    userId = jwt_decode.default(token)?.id;
  } catch (e) {
    userId = null;
  }

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

  const handleRequest = async (matchId) => {
    try {
      await API.post(`/user/request/${matchId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequested((prev) => ({ ...prev, [matchId]: true }));
      toast.success("Match request sent 🎯");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Request failed ❌");
    }
  };

  const handleMessage = (user) => {
    setSelectedMatch(user); // Set the selected user for chat
  };

  if (loading) return <p className="text-center mt-10">Loading matches...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">Suggested Matches</h2>

      {/* Chat Box Modal */}
      {selectedMatch && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[95%] max-w-2xl relative">
            <button
              onClick={() => setSelectedMatch(null)}
              className="absolute top-2 right-3 text-sm text-gray-500 hover:text-red-600"
            >
              ✖ Close
            </button>
            <h3 className="text-lg font-semibold mb-4 text-indigo-700">Chat with {selectedMatch.name}</h3>
            <ChatBox
              currentUserId={userId}
              selectedUser={selectedMatch}
              token={token}
            />
          </div>
        </div>
      )}

      {matches.length === 0 ? (
        <p className="text-center text-gray-500">No matches found yet 😢</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((user) => {
            const isChatAllowed = user.matchRequests?.some(
              (r) => r.userId === userId && r.status === "accepted"
            );

            const isRequestSent = user.matchRequests?.some(
              (r) => r.userId === userId
            );

            return (
              <div key={user._id} className="bg-white shadow rounded-xl p-6 border">
                <h3 className="text-xl font-semibold text-indigo-700">{user.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{user.bio}</p>
                <div className="mb-2">
                  <p className="font-bold">Can Teach:</p>
                  <ul className="flex flex-wrap gap-2 mt-1">
                    {user.skillsToTeach.map((s, i) => (
                      <li
                        key={i}
                        className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mb-2">
                  <p className="font-bold">Wants to Learn:</p>
                  <ul className="flex flex-wrap gap-2 mt-1">
                    {user.skillsToLearn.map((s, i) => (
                      <li
                        key={i}
                        className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleRequest(user._id)}
                    disabled={isRequestSent || requested[user._id]}
                    className={`flex-1 py-2 rounded-lg font-semibold text-white transition ${
                      isRequestSent || requested[user._id]
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                  >
                    {(isRequestSent || requested[user._id]) ? "Request Sent ✅" : "Send Request"}
                  </button>

                  {isChatAllowed && (
                    <button
                      onClick={() => handleMessage(user)}
                      className="bg-gray-100 hover:bg-gray-200 transition p-2 rounded-lg text-indigo-600"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BrowseMatches;
