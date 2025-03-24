import React from "react";
import { motion } from "framer-motion";

const features = [
  { title: "Skill Matching", desc: "Get paired with people based on mutual skills.", color: "text-green-600" },
  { title: "Peer Learning", desc: "One-on-one mentorship between users.", color: "text-blue-600" },
  { title: "Free Forever", desc: "No charges. Learn and teach with passion.", color: "text-purple-600" },
];

const Features = () => {
  return (
    <section className="py-16 bg-gray-100 w-full">
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl font-bold text-gray-800">Why SkillSwap?</h2>
        <p className="text-gray-600 mt-2">Power of learning together 💡</p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 px-6">
        {features.map((f, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="bg-white shadow-md rounded-xl p-6 w-full sm:w-80 text-center"
          >
            <h3 className={`text-xl font-semibold ${f.color}`}>{f.title}</h3>
            <p className="text-gray-700 mt-2">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
