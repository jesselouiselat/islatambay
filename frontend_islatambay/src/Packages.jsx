import { useAuth } from "./context/UserContext";
import AdminUploadForm from "./AdminUploadForm";
import axiosInstance from "./api/AxiosInstance";
import { useEffect, useState } from "react";
import package_bg from "../src/assets/package-bg.png";

function Packages() {
  const { user } = useAuth();
  const [packages, setPackages] = useState([]);
  const [confirmingId, setConfrimingId] = useState(null);

  async function getPackages() {
    try {
      const result = await axiosInstance("/api/admin/packages/get-packages");

      setPackages(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPackages();
  }, []);

  async function handleSubmit(formData) {
    try {
      const res = await axiosInstance.post(
        "/api/admin/packages/add-packages",
        formData
      );
      getPackages();
      alert(res.data.message);
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  }

  async function handleDelete(id, title) {
    try {
      const result = await axiosInstance.delete(
        "/api/admin/packages/delete-packages",
        {
          params: {
            id,
            title,
          },
        }
      );
      getPackages();
      alert(result.data.message);
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  }

  return (
    <section id="packages" className="container border p-3 rounded-4">
      <div className="pricing-header">
        <h1 className="display-6 text-center">Freediving Packages</h1>
      </div>
      <div className="row row-cols-1 row-cols-md-3 text-center justify-content-center">
        {packages.map((plan) => (
          <div className="col" key={plan.id}>
            <div
              className="card d-flex flex-column m-4 shadow-lg p-3"
              style={{
                backgroundImage: `url(${package_bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "15rem",
                height: "25rem",
                overflow: "hidden",
              }}
            >
              <div className="card-header" style={{ flexShrink: 0 }}>
                <div
                  className={`d-flex align-items-center justify-content-between`}
                >
                  <h5 className="p-1 mb-0 text-center">{plan.title}</h5>
                  {user && user.isAdmin && (
                    <button
                      className="btn btn-sm btn-outline-danger"
                      type="button"
                      onClick={() => setConfrimingId(plan.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>

                {confirmingId === plan.id && (
                  <div className="mt-2">
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => handleDelete(plan.id, plan.title)}
                    >
                      Confirm Delete
                    </button>
                  </div>
                )}
              </div>

              <div
                className="card-body"
                style={{
                  overflowY: "auto",
                  flex: "1 1 auto", // allows scroll if too long
                }}
              >
                <h3 className="card-title pricing-card-title">
                  ₱ {plan.price}
                </h3>
                <ul className="list-unstyled my-4">
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      {user && user.isAdmin && (
        <AdminUploadForm
          sectionName="packages"
          onSubmit={(data) => handleSubmit(data)}
        ></AdminUploadForm>
      )}
    </section>
  );
}

export default Packages;
