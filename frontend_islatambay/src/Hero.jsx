import islatambay_logo from "./assets/islatambay_logo.jpg";
import AdminUploadForm from "./AdminUploadForm";
import axiosInstance from "./api/AxiosInstance";
import { useAuth } from "./context/UserContext";
import { useState } from "react";
import { useEffect } from "react";

function Hero() {
  const { user } = useAuth();
  const [heroes, setHeroes] = useState([]);
  const [confirmingId, setConfrimingId] = useState(null);

  async function getHeroes() {
    try {
      const result = await axiosInstance.get("/api/admin/get-heroes");
      setHeroes(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getHeroes();
  }, []);

  async function handleSubmit(formData) {
    try {
      const result = await axiosInstance.post(
        "/api/admin/upload/heroes",
        formData
      );
      getHeroes();
      alert(result.data.message);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function handleDelete(id, title, public_id) {
    console.log("Received:", id, title, public_id);

    try {
      const result = await axiosInstance.delete("/api/admin/delete-heroes", {
        params: {
          id,
          title,
          public_id,
        },
      });
      getHeroes();
      alert(result.data.message);
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
  }

  return (
    <>
      {heroes.length > 0 ? (
        <section
          id="heroCarousel"
          className="carousel slide p-4 mb-4 border rounded-4 shadow-lg"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {heroes.map((hero) => (
              <div className="carousel-item active" key={hero.id}>
                <div className="row align-items-center g-0">
                  <div className="col col-12 col-md-5 p-0">
                    <div className="card border-0 text-center text-md-end">
                      <div className="card-body">
                        <h3 className="card-title">{hero.title}</h3>
                        <p className="card-text">{hero.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="col col-12 col-md-7 p-0 justify-content-center ">
                    <img
                      className="mx-auto d-block w-75"
                      src={hero.image}
                      alt=""
                    />
                    <div className="d-flex justify-content-center align-items-center mt-4">
                      {user && user.isAdmin && (
                        <>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => setConfrimingId(hero.id)}
                          >
                            Delete
                          </button>
                          {confirmingId === hero.id && (
                            <button
                              className="btn btn-sm btn-danger ms-3"
                              type="button"
                              onClick={() =>
                                handleDelete(
                                  hero.id,
                                  hero.title,
                                  hero.public_id
                                )
                              }
                            >
                              Cofirm Delete
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-indicators">
            {heroes.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide-to={index}
                className="active"
              ></button>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </section>
      ) : null}
      {user && user.isAdmin ? (
        <>
          <AdminUploadForm
            sectionName="heroes"
            onSubmit={(data) => handleSubmit(data)}
          ></AdminUploadForm>
        </>
      ) : null}
    </>
  );
}

export default Hero;
