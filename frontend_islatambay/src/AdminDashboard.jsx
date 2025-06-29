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

          <div id="packages" className="container border p-3 rounded-4">
            <div className="pricing-header">
              <h1 className="display-6 text-center">AI Prompts</h1>
            </div>
            <div className="row row-cols-1 row-cols-md-3 text-center justify-content-center">
              {aiPrompts.map((prompt) => (
                <div className="col h-100" key={prompt.id}>
                  <div className="card h-100 d-flex flex-column rounded-4 m-4 shadow-lg p-3">
                    <div className="card-header">
                      <div
                        className={`d-flex align-items-center ${
                          user && user.isAdmin
                            ? "justify-content-between"
                            : "justify-content-center"
                        }`}
                      >
                        <h5 className="p-1 mb-0 text-center">{prompt.title}</h5>{" "}
                        {user && user.isAdmin && (
                          <button
                            className="btn btn-sm btn-outline-danger"
                            type="button"
                            onClick={() => setConfrimingId(prompt.id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>

                      {confirmingId === prompt.id && (
                        <div className="mt-2">
                          <button
                            className="btn btn-danger w-100"
                            onClick={() =>
                              handleDelete(prompt.id, prompt.title)
                            }
                          >
                            Confirm Delete
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="card-body flex-grow-1">
                      <p className="card-title pricing-card-title">
                        {prompt.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <AdminUploadForm
            sectionName="aiPrompts"
            onSubmit={(data) => addPrompts(data)}
          />
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
