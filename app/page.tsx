'use client'
import React from "react";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import NewsLetter from "./components/NewsLetter";

const Home = () => {
  return (
    <>
      <Navbar/>
      <NewsLetter />
      <Footer />
    </>
  );
};

export default Home;
