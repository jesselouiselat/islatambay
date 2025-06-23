import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "./api/AxiosInstance";
import Header from "./Header";
import Packages from "./Packages";
import Amenities from "./Amenities";
import Contact from "./Contact";
import About from "./About";
import Hero from "./Hero";
import NavBar from "./NavBar";

function Home() {
  return (
    <div className="container">
      <NavBar />
      {/* {loggedIn && isAdmin ? <AdminDashboard /> : null} */}

      <Hero />
      <Header />
      <Amenities />
      <Packages />
      <Contact />
      <About />
    </div>
  );
}
export default Home;
