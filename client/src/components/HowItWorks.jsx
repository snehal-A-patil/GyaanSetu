import React from "react";
const steps = [
    { title: "1. Create Profile", desc: "Tell us what you can teach & what you want to learn." },
    { title: "2. Match With Peers", desc: "We’ll show you people who complement your skills." },
    { title: "3. Connect & Grow", desc: "Send a request, start sharing knowledge!" },
  ];
  
  const HowItWorks = () => {
    return (
      <section className="bg-white py-16 w-full">
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
          <p className="text-gray-600 mt-2">3 simple steps to GyaanSetu🤝</p>
        </div>
  
        <div className="flex flex-wrap justify-center gap-6 px-6">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-blue-50 p-6 w-full sm:w-72 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold text-blue-600">{step.title}</h3>
              <p className="mt-2 text-gray-700">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default HowItWorks;
  