import NavBar from "./NavBar";
import PromoteToAdmin from "./PromoteToAdmin";
import GetUserAdmins from "./GetUserAdmins";
import RemoveAdmin from "./RemoveAdmin";
import axiosInstance from "./api/AxiosInstance";
import { useAuth } from "./context/UserContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [adminList, setAdminList] = useState([]);
  const { user, loading, setUser, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (!user && !user.isAdmin) {
    navigate("/");
  }

  async function refreshAdminList() {
    try {
      const res = await axiosInstance.get("/api/admin/get-admin-users");
      const usersList = res.data;
      console.log(usersList);
      setAdminList(usersList);
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  }
  useEffect(() => {
    refreshAdminList();
  }, []);

  return (
    <section className="container">
      {user.isAdmin ? (
        <div>
          <NavBar />

          <GetUserAdmins adminList={adminList} />

          <PromoteToAdmin onSuccess={refreshAdminList} />
          <RemoveAdmin onSuccess={refreshAdminList} />
        </div>
      ) : (
        <h1>Not Admin</h1>
      )}
    </section>
  );
}

export default AdminDashboard;
