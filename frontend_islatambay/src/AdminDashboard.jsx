import NavBar from "./NavBar";
import PromoteToAdmin from "./PromoteToAdmin";
import GetUserAdmins from "./GetUserAdmins";
import RemoveAdmin from "./RemoveAdmin";
import AdminUploadForm from "./AdminUploadForm";
import axiosInstance from "./api/AxiosInstance";
import { useAuth } from "./context/UserContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const { user, loading } = useAuth();
  const [adminList, setAdminList] = useState([]);
  const [aiPrompts, setAiPrompts] = useState([]);
  const [confirmingId, setConfrimingId] = useState(null);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (!user && !user.isAdmin) {
    navigate("/");
  }

  async function addPrompts(formData) {
    try {
      const result = await axiosInstance.post("/api/ai/add-prompts", formData);
      alert(result.data.message);
    } catch (error) {
      console.error(error);
    }
  }

  async function getAiPrompts() {
    try {
      const result = await axiosInstance.get("/api/ai/get-prompts");
      setAiPrompts(result.data);
      getAiPrompts();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAiPrompts();
  }, []);

  async function handleDelete(id, title) {
    console.log(id);
    console.log(title);

    try {
      const result = await axiosInstance.delete("/api/ai/delete-prompts", {
        params: {
          id,
          title,
        },
      });
      getAiPrompts();
      alert(result.data.message);
    } catch (error) {
      console.error(error);
    }
  }

  async function refreshAdminList() {
    try {
      const res = await axiosInstance.get("/api/admin/get-admin-users");
      const usersList = res.data;
      setAdminList(usersList);
    } catch (error) {
      alert(error.response.data.message);
    }
  }
  useEffect(() => {
    refreshAdminList();
  }, []);

  return (
    <section className="">
      {user.isAdmin ? (
        <div>
          <NavBar />
          <div className="container ">
            <div className="row align-items-center justify-content-center">
              <div id="packages" className="col border p-3 rounded-4">
                <div className="pricing-header">
                  <h1 className="display-6 text-center">AI Prompts</h1>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped align-middle">
                    <thead className="table-info">
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Content</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {aiPrompts.map((prompt) => (
                        <tr key={prompt.id}>
                          <td>{prompt.title}</td>
                          <td style={{ whiteSpace: "pre-wrap" }}>
                            {prompt.content}
                          </td>
                          <td>
                            {user &&
                              user.isAdmin &&
                              confirmingId !== prompt.id && (
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => setConfrimingId(prompt.id)}
                                >
                                  Delete
                                </button>
                              )}

                            {user &&
                              user.isAdmin &&
                              confirmingId === prompt.id && (
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() =>
                                    handleDelete(prompt.id, prompt.title)
                                  }
                                >
                                  Confirm Delete
                                </button>
                              )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col">
                <AdminUploadForm
                  sectionName="aiPrompts"
                  onSubmit={(data) => addPrompts(data)}
                />
              </div>
            </div>
          </div>
          <div className="container p-0 mt-4">
            <GetUserAdmins adminList={adminList} />
            <div className="container p-0">
              <div className="row g-3">
                <div className="col">
                  <PromoteToAdmin onSuccess={refreshAdminList} />
                </div>
                <div className="col">
                  <RemoveAdmin onSuccess={refreshAdminList} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1>Not Admin</h1>
        </>
      )}
    </section>
  );
}

export default AdminDashboard;
