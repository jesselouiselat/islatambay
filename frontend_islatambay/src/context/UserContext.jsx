import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/AxiosInstance";
import { useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axiosInstance.get("/api/check-auth");
        setUser(res.data.user);
        console.log(res.data.user);
      } catch (error) {
        if (error.response?.status === 401) {
          setUser(null);
        } else {
          alert(error.response?.data?.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const logout = async () => {
    try {
      const res = await axiosInstance.post("/api/logout");
      setUser(null);
      navigate("/");
      //   alert(res.data.message);
    } catch (error) {
      console.error(error);
      //   alert(error.response.data.message);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
