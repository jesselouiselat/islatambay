import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import ChatBox from "./Chatbox";
import Contact from "./Contact";
import Footer from "./Footer";
import { useAuth } from "./context/UserContext";

import axiosInstance from "./api/AxiosInstance";

function Dashboard() {
  const { user, loading, logout, setUser } = useAuth();

  function handleLogout() {
    setUser(null);
    logout();
  }

  if (loading)
    return (
      <div className="d-flex ">
        <h2 className="justify-content-center align-items-center">
          Loading...
        </h2>
      </div>
    );
  if (!user) return null;

  return (
    <section id="dashboard">
      <div>
        <NavBar></NavBar>

        <div className="container p-3">
          <div className="row  align-items-center justify-content-center">
            <div className="col-12 col-md-6  order-md-0 order-1 mb-3 d-flex justify-content-center">
              <Contact />
            </div>
            <div className="col-12 col-md-6 order-md-1 m-3 order-0 d-flex justify-content-center">
              <ChatBox />
            </div>
          </div>
        </div>

        <Footer></Footer>
      </div>
    </section>
  );
}

export default Dashboard;
