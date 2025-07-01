import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axiosInstance from "./api/AxiosInstance";
import GoogleLogin from "./GoogleLogin";
import { useAuth } from "./context/UserContext";
import sikaeom from "../src/assets/sikaeom_islatambay.png";

import Register from "./Register";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setLoginDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (!loginDetails.email || !loginDetails.password) {
        alert("Please fill both fields");
        return;
      }
      const res = await axiosInstance.post("/api/auth/login", loginDetails);
      setUser(res.data.user);
      navigate("/admin-dashboard", {
        state: { message: "Login successfuly!" },
      });
      console.log(res.status);
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data.message || "Something went wrong");
      } else {
        alert("Network error or server not responding");
      }
    }
  }

  return (
    <section className="d-flex text-center justify-content-center align-items-center vh-100">
      <div className="col-md-5 col-sm-12 form-signin p-3">
        <h1 className="h3  fw-normal">Please sign in to</h1>
        <NavLink to="/home">
          <img
            className="mb-3"
            src={sikaeom}
            alt=""
            style={{ height: "6rem" }}
          />
        </NavLink>

        <form action="" onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              id="email"
              className="form-control rounded-1"
              onChange={handleChange}
              value={loginDetails.email}
              s
              name="email"
              placeholder=""
            />
            <label htmlFor="email">Email address</label>

            <div className="form-floating mb-4">
              <input
                id="password"
                type="password"
                className="form-control"
                onChange={handleChange}
                value={loginDetails.password}
                name="password"
                placeholder=""
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Log in
          </button>
          <NavLink
            to="/register"
            className="w-100 btn btn-outline-primary mt-2"
          >
            Sign up
          </NavLink>
        </form>

        <GoogleLogin />
      </div>
    </section>
  );
}

export default Login;
