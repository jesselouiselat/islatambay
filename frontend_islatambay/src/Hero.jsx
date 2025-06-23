import islatambay_logo from "./assets/islatambay_logo.jpg";
import AdminUploadForm from "./AdminUploadForm";
import axiosInstance from "./api/AxiosInstance";
import { useAuth } from "./context/UserContext";

function Hero() {
  const { user, setUser, loading, logout } = useAuth();

  return (
    <section
      id="heroCarousel"
      className="carousel slide p-4 mb-4 border rounded-4 shadow-lg"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="row align-items-center g-0">
            <div className="col col-12 col-md-5 p-0">
              <div className="card border-0 text-center text-md-end">
                <div className="card-body">
                  <h3 className="card-title">
                    Islatambay: Best Resort in Binukbok
                  </h3>
                  <p className="card-text">
                    May school of jacks dito. Maganda ang mga diving spot dito
                  </p>
                </div>
              </div>
            </div>

            <div className="col col-12 col-md-7 p-0 justify-content-center ">
              <img
                className="mx-auto d-block w-75"
                src={islatambay_logo}
                alt=""
              />
            </div>
            <div className="col-8"></div>
          </div>
        </div>
      </div>

      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide-to="0"
          className="active"
        ></button>
        <button
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide-to="1"
        ></button>
        <button
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide-to="2"
        ></button>
        <button
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide-to="3"
        ></button>
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
      {user && user.isAdmin ? (
        <>
          <AdminUploadForm
            sectionName="heroes"
            onSubmit={(data) => handleSubmit(data)}
          ></AdminUploadForm>
        </>
      ) : null}
    </section>
  );
}

export default Hero;
