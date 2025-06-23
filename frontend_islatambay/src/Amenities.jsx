import sikaeom_1 from "./assets/sikaeom_1.jpg";
import AdminUploadForm from "./AdminUploadForm";
import { useAuth } from "./context/UserContext";

function Amenities() {
  const { user } = useAuth();

  return (
    <section className="m-0 p-10">
      <div
        id="amenitiesCarousel"
        className="carousel slide "
        data-bs-ride="carousel"
      >
        <div className="carousel-inner px-4">
          <div className="carousel-item active">
            <div className="row row-cols-2 row-cols-md-3 align-items-stretch g-4 py-5">
              <div className="col mx-auto">
                <div
                  className="card card-cover position-relative overflow-hidden text-white bg-dark rounded-5 shadow-lg"
                  style={{
                    paddingTop: "177.77%",
                    backgroundImage: `url(${sikaeom_1})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div
                    className="d-flex flex-column justify-content-end position-absolute top-0 start-0 w-100 h-100 p-4"
                    style={{ background: "rgba(0,0,0,0.2)" }}
                  >
                    <h3 className="fw-bold">
                      Sikaeom: The best diving resort in Binukbok
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col mx-auto">
                <div
                  className="card card-cover position-relative overflow-hidden text-white bg-dark rounded-5 shadow-lg"
                  style={{
                    paddingTop: "177.77%",
                    backgroundImage: `url(${sikaeom_1})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div
                    className="d-flex flex-column justify-content-end position-absolute top-0 start-0 w-100 h-100 p-4"
                    style={{ background: "rgba(0,0,0,0.2)" }}
                  >
                    <h3 className="fw-bold">
                      Sikaeom: The best diving resort in Binukbok
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col mx-auto">
                <div
                  className="card card-cover position-relative overflow-hidden text-white bg-dark rounded-5 shadow-lg"
                  style={{
                    paddingTop: "177.77%",
                    backgroundImage: `url(${sikaeom_1})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div
                    className="d-flex flex-column justify-content-end position-absolute top-0 start-0 w-100 h-100 p-4"
                    style={{ background: "rgba(0,0,0,0.2)" }}
                  >
                    <h3 className="fw-bold">
                      Sikaeom: The best diving resort in Binukbok
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item ">
            <div className="row row-cols-2 row-cols-md-3 align-items-stretch g-4 py-5">
              <div className="col mx-auto">
                <div
                  className="card card-cover position-relative overflow-hidden text-white bg-dark rounded-5 shadow-lg"
                  style={{
                    paddingTop: "177.77%",
                    // backgroundImage: `url(${sikaeom_1})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div
                    className="d-flex flex-column justify-content-end position-absolute top-0 start-0 w-100 h-100 p-4"
                    style={{ background: "rgba(0,0,0,0.2)" }}
                  >
                    <h3 className="fw-bold">
                      Sikaeom: The best diving resort in Binukbok
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col mx-auto">
                <div
                  className="card card-cover position-relative overflow-hidden text-white bg-dark rounded-5 shadow-lg"
                  style={{
                    paddingTop: "177.77%",
                    // backgroundImage: `url(${sikaeom_1})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div
                    className="d-flex flex-column justify-content-end position-absolute top-0 start-0 w-100 h-100 p-4"
                    style={{ background: "rgba(0,0,0,0.2)" }}
                  >
                    <h3 className="fw-bold">
                      Sikaeom: The best diving resort in Binukbok
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="carousel-control-prev"
          data-bs-target="#amenitiesCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          type="button"
          className="carousel-control-next"
          data-bs-target="#amenitiesCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {user && user.isAdmin ? (
        <AdminUploadForm sectionName="amenities"></AdminUploadForm>
      ) : null}
    </section>
  );
}

export default Amenities;
