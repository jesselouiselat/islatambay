import { useState, useEffect } from "react";
import axiosInstance from "./api/AxiosInstance";

function GetUserAdmins({ adminList }) {
  return (
    <section>
      <div className="card p-3">
        <div className="card-header border-0">
          <h3 className="card-title">Admin users</h3>
        </div>
        <div className="card-body border rounded-3">
          <ul className="list list-unstyled">
            {adminList.map((admin) => (
              <li key={admin.id}>{admin.email}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default GetUserAdmins;
