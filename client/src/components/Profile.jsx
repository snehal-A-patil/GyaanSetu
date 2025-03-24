import React, { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import Select from "react-select";

const skillOptions = [
  { value: "React", label: "React" },
  { value: "Node.js", label: "Node.js" },
  { value: "UI/UX", label: "UI/UX" },
  { value: "Java", label: "Java" },
  { value: "Python", label: "Python" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "C++", label: "C++" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Express", label: "Express" },
];

const Profile = () => {
  const { token } = useAuth();
  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: "",
    skillsToTeach: [],
    skillsToLearn: [],
    experience: "",
    portfolio: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        setUser({
          ...data,
          skillsToTeach: data.skillsToTeach || [],
          skillsToLearn: data.skillsToLearn || [],
        });
      } catch (err) {
        toast.error("Failed to load profile ❌");
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await API.post("/user/profile", user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Profile updated successfully 🎉");
    } catch (err) {
      toast.error("Failed to update profile ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-indigo-100 p-4 rounded-full">
            <UserCircleIcon className="w-12 h-12 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-indigo-700">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
            {user.experience && (
              <p className="text-sm text-gray-600 mt-2">💼 {user.experience}</p>
            )}
            {user.portfolio && (
              <a
                href={user.portfolio.startsWith("http") ? user.portfolio : `https://${user.portfolio}`}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 underline mt-1 inline-block text-sm"
              >
                🔗 View Portfolio
              </a>
            )}
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              name="bio"
              rows={3}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
              placeholder="Tell us about yourself..."
              value={user.bio}
              onChange={handleChange}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills You Can Teach</label>
              <Select
                isMulti
                name="skillsToTeach"
                options={skillOptions}
                value={skillOptions.filter((opt) => user.skillsToTeach.includes(opt.value))}
                onChange={(selected) =>
                  setUser({ ...user, skillsToTeach: selected.map((opt) => opt.value) })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills You Want to Learn</label>
              <Select
                isMulti
                name="skillsToLearn"
                options={skillOptions}
                value={skillOptions.filter((opt) => user.skillsToLearn.includes(opt.value))}
                onChange={(selected) =>
                  setUser({ ...user, skillsToLearn: selected.map((opt) => opt.value) })
                }
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
              <input
                type="text"
                name="experience"
                placeholder="e.g. 2 years in frontend"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
                value={user.experience}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio / LinkedIn URL</label>
              <input
                type="url"
                name="portfolio"
                placeholder="https://linkedin.com/in/your-profile"
                className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400"
                value={user.portfolio}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;