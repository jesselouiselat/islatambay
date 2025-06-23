import { useEffect, useState } from "react";
import axiosInstance from "./api/AxiosInstance";

function PromoteToAdmin({ onSuccess }) {
  const [targetEmail, setTargetEmail] = useState("");
  const [userAdminPassword, setUserAdminPassword] = useState("");

  async function promoteUser(event) {
    event.preventDefault();
    try {
      const res = await axiosInstance.post("/api/admin/promote-user", {
        targetEmail,
        userAdminPassword,
      });
      setTargetEmail("");
      setUserAdminPassword("");
      console.log(res.data.message);
      alert(res.data.message);
      onSuccess();
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  }

  return (
    <section>
      <div className="card mt-3  p-2">
        <div className="card-header border-0">
          <h3 className="card-title">Promote user to admin</h3>
        </div>
        <form onSubmit={promoteUser}>
          <div className="form-floating">
            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              placeholder="email"
              value={targetEmail}
              onChange={(e) => setTargetEmail(e.target.value)}
            />
            <label className="form-label" htmlFor="email">
              Email to promote
            </label>
          </div>
          <div className="form-floating">
            <input
              className="form-control"
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={userAdminPassword}
              onChange={(e) => setUserAdminPassword(e.target.value)}
            />
            <label className="form-label" htmlFor="password">
              Your password
            </label>
          </div>
          <button className="btn btn-warning w-100 mt-2" type="submit">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default PromoteToAdmin;
