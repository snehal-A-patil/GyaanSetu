import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Features from "./Features";
import Testimonials from "./Testimonials";
import Newsletter from "./Newsletter";
import FinalCTA from "./FinalCTA";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      
      <Hero />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Newsletter />
      <FinalCTA />
      
    </div>
  );
};

export default Home;
