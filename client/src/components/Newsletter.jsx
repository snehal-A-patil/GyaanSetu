import React from "react";
const Newsletter = () => {
    return (
      <section className="py-14 bg-blue-50">
        <div className="text-center max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Stay Updated</h2>
          <p className="text-gray-700 mb-6">Drop your email to know when we launch new features 🚀</p>
          <form className="flex flex-col sm:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-80"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    );
  };
  
  export default Newsletter;
  