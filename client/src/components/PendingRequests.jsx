import React, { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { ThumbsUp, ThumbsDown, UserCheck, Briefcase, LinkIcon } from "lucide-react";

const PendingRequests = () => {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await API.get("/user/incoming-requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data);
      } catch (err) {
        toast.error("Failed to load requests ❌");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [token]);

  const handleResponse = async (userId, action) => {
    try {
      await API.post(`/user/respond/${userId}`, { action }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Request ${action}ed ✅`);
      // Instead of removing, we can mark it as responded
      setRequests((prev) =>
        prev.map((r) =>
          r.userId._id === userId ? { ...r, status: action } : r
        )
      );
    } catch (err) {
      toast.error("Action failed ❌");
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Loading requests...</p></div>;

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="max-w-6xl mx-auto px-4 py-10 flex-grow">
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-10">
          📨 Pending Match Requests
        </h2>

        {requests.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No pending requests 🙌</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {requests.map((req) => (
              <div
                key={req.userId._id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-700 font-bold rounded-full flex items-center justify-center text-lg">
                      {req.userId.name?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-indigo-700">{req.userId.name}</h3>
                      <p className="text-sm text-gray-500">{req.userId.email}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 italic mb-2">{req.userId.bio || "No bio available"}</p>

                  {req.userId.experience && (
                    <p className="text-sm text-gray-700 mb-2 flex items-center gap-1">
                      <Briefcase className="w-4 h-4 text-gray-500" /> {req.userId.experience}
                    </p>
                  )}

                  {req.userId.portfolio && (
                    <a
                      href={req.userId.portfolio.startsWith("http") ? req.userId.portfolio : `https://${req.userId.portfolio}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 text-sm flex items-center gap-1 mb-3 hover:underline"
                    >
                      <LinkIcon className="w-4 h-4" /> View Portfolio
                    </a>
                  )}

                  <div className="mb-3">
                    <p className="text-sm font-medium text-green-600">Can Teach:</p>
                    <ul className="flex flex-wrap gap-2 mt-1">
                      {req.userId.skillsToTeach.map((s, i) => (
                        <li
                          key={i}
                          className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-5">
                    <p className="text-sm font-medium text-blue-600">Wants to Learn:</p>
                    <ul className="flex flex-wrap gap-2 mt-1">
                      {req.userId.skillsToLearn.map((s, i) => (
                        <li
                          key={i}
                          className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {req.status ? (
                  <div className="text-center text-sm font-medium py-2 rounded-lg bg-gray-100 text-gray-600 mt-3">
                    Request {req.status}
                  </div>
                ) : (
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => handleResponse(req.userId._id, "accepted")}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                    >
                      <ThumbsUp className="w-4 h-4" /> Accept
                    </button>
                    <button
                      onClick={() => handleResponse(req.userId._id, "rejected")}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                    >
                      <ThumbsDown className="w-4 h-4" /> Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingRequests;