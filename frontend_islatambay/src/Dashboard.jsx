import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import ChatBox from "./Chatbox";
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
        <ChatBox></ChatBox>
      </div>
    </section>
  );
}

export default Dashboard;
