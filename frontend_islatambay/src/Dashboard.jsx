import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AdminUploadForm from "./AdminUploadForm";
import NavBar from "./NavBar";
import { useAuth } from "./context/UserContext";

import axiosInstance from "./api/AxiosInstance";

function Dashboard() {
  const { user, loading, logout, setUser } = useAuth();
  console.log(user);
  console.log(loading);

  function handleLogout() {
    logout();
  }

  if (loading) return <h2>Loading...</h2>;
  if (!user) return null;

  return (
    <div>
      <NavBar></NavBar>
      {user ? (
        <div>
          <h2>Welcome {user.email}</h2>
          <p>Hello!</p>
          {user.isAdmin ? <p>You are an admin</p> : null}

          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : null}
    </div>
  );
}

export default Dashboard;
