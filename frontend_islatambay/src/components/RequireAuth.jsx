import { useAuth } from "../context/UserContext";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const { user, loading } = useAuth();

  console.log(user, loading);

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;

  return children;
}

export default RequireAuth;
