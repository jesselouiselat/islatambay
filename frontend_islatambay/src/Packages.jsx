import { useAuth } from "./context/UserContext";
import AdminUploadForm from "./AdminUploadForm";
import axiosInstance from "./api/AxiosInstance";
import { useEffect, useState } from "react";
import { Button } from "react-scroll";

function Packages() {
  const { user } = useAuth();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    async function getPackages() {
      try {
        const result = await axiosInstance("/api/admin/get-pacakages");
        console.log(result.data);

        setPackages(result.data);
      } catch (error) {
        console.error(error);
      }
    }
    getPackages();
  }, []);

  async function handleDelete() {}

  async function handleSubmit(formData) {
    try {
      const res = await axiosInstance.post(
        "/api/admin/upload/packages",
        formData
      );
      alert(res.data.message);
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
            <div className="card rounded-4 m-4 shadow-lg">
              <div className="card-header d-flex justify-content-center">
                <h5 className="p-1">{plan.title}</h5>
                {user && user.isAdmin && (
                  <button
                    className="btn btn-sm btn-danger ms-auto"
                    type="button"
                    onClick={handleDelete(plan.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className="card-body">
                <h3 className="card-title pricing-card-title">{plan.price}</h3>
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
