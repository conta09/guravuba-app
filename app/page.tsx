'use client'
import React from "react";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import NewsLetter from "./components/NewsLetter";
import HeaderSlider from "./components/HeaderSlider";
import Featured from "./components/Featured";
const Home = () => {
  return (
    <>
      <Navbar/>
      <div className="px-6 md:px-16 lg:px-32">
      <div className="py-5">
        <HeaderSlider />
      </div>
      <Featured />
      <NewsLetter />
      </div>
      <Footer />
    </>
  );
};

export default Home;
