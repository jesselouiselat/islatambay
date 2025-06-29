import { useEffect, useState } from "react";
import axiosInstance from "./api/AxiosInstance";

function PromoteToAdmin({ onSuccess }) {
  const [targetEmail, setTargetEmail] = useState("");
  const [showConfirmButton, setShowConfirmButton] = useState(false);

  async function promoteUser(event) {
    event.preventDefault();
    try {
      const result = await axiosInstance.post("/api/admin/promote-user", {
        targetEmail,
      });
      setTargetEmail("");
      console.log(result.data.message);
      alert(result.data.message);
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
          <h3 className="card-title">Promote User to Admin</h3>
        </div>
        <form>
          <div className="form-floating">
            <input
              className="form-control"
              type="email"
              id="email"
              name="email"
              placeholder="email"
              required
              value={targetEmail}
              onChange={(e) => setTargetEmail(e.target.value)}
            />
            <label className="form-label" htmlFor="email">
              Email to promote
            </label>
          </div>
        </form>
        <button
          className="btn btn-warning w-100 mt-2"
          type="submit"
          onClick={() => setShowConfirmButton(true)}
        >
          Submit
        </button>
        {showConfirmButton && (
          <button
            className="btn btn-success w-100 mt-2"
            type="submit"
            onClick={promoteUser}
          >
            Confirm Submit
          </button>
        )}
      </div>
    </section>
  );
}

export default PromoteToAdmin;
