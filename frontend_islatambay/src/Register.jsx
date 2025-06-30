import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import axiosInstance from "./api/AxiosInstance";
import { useAuth } from "./context/UserContext";

import GoogleLogin from "./GoogleLogin";

function Register() {
  const navigate = useNavigate();

  const [registrationDetails, setRegistrationDetails] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useAuth();

  function handleChange(event) {
    console.log(registrationDetails);

    const { name, value } = event.target;
    setRegistrationDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const res = await axiosInstance.post(
        "/api/auth/register",
        registrationDetails
      );
      console.log(res.data);
      setUser(res.data);

      navigate("/dashboard", { state: { message: "Registraion successful!" } });
    } catch (error) {
      if (error.response) {
        console.log(error);
        console.error("Error response:", error.response.data.message);
        alert(error.response.data.message); // Show user-friendly error
      } else {
        console.error("Error:", error.message);
        alert("Something went wrong");
      }
    }
  }

  return (
    <section className="d-flex text-center justify-content-center align-items-center vh-100">
      <div className="col-md-5 col-sm-12  form-signin p-3">
        <h1 className="h3  fw-normal">Please sign up to</h1>
        <h1 className="fs-bold">Sikaeom</h1>

        <form action="" onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              id="email"
              className="form-control rounded-1"
              onChange={handleChange}
              value={registrationDetails.email}
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
                value={registrationDetails.password}
                name="password"
                placeholder=""
              />
              <label for="password">Password</label>
            </div>
          </div>

          <button className="w-100 btn btn-lg btn-success" type="submit">
            Sign up
          </button>
          <NavLink to="/login" className="w-100 btn btn-outline-primary mt-2">
            Log in
          </NavLink>
        </form>

        <GoogleLogin />
      </div>
    </section>
  );
}

export default Register;
