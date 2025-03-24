import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ananya Joshi",
    feedback: "I taught C++ and learned UI/UX — amazing experience!",
    avatar: "🧑‍💻",
  },
  {
    name: "Rahul Verma",
    feedback: "Matched with a React mentor — gamechanger!",
    avatar: "👨‍🏫",
  },
  {
    name: "Fatima Sheikh",
    feedback: "Best place to share knowledge 💡",
    avatar: "👩‍🎓",
  },
  {
    name: "Karan Mehta",
    feedback: "Built confidence by teaching others!",
    avatar: "👨‍💻",
  },
  {
    name: "Simran Shah",
    feedback: "Positive community & great matches!",
    avatar: "👩‍💼",
  },
];

const Testimonials = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;

    const autoScroll = () => {
      if (scrollContainer) {
        scrollAmount += 1;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 1;
        }
      }
    };

    const interval = setInterval(autoScroll, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#211C84] py-20 px-4 sm:px-10">
      <h2 className="text-4xl font-bold text-center text-white mb-10">
        💬 What Our Users Say
      </h2>

      <div ref={scrollRef} className="w-full overflow-hidden">
        <motion.div
          className="flex w-max gap-6"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <motion.div
              key={i}
              className="bg-white shadow-lg rounded-xl w-[300px] h-[250px] p-6 shrink-0 flex flex-col justify-between hover:shadow-2xl transition"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-5xl mb-3">{t.avatar}</div>
              <p className="text-gray-800 italic">“{t.feedback}”</p>
              <h4 className="mt-3 font-semibold text-indigo-700 text-right">
                — {t.name}
              </h4>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
