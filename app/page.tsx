'use client'
import React from "react";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import NewsLetter from "./components/NewsLetter";
import Auth from "./components/Auth";

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
