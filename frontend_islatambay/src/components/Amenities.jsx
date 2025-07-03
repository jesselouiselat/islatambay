import AdminUploadForm from "./AdminUploadForm";
import axiosInstance from "../api/AxiosInstance";
import { useAuth } from "../context/UserContext";
import { useState, useEffect } from "react";

function Amenities() {
  const { user } = useAuth();
  const [amenities, setAmenities] = useState([]);
  const [confirmingId, setConfrimingId] = useState(null);

  async function getAmenitites() {
    try {
      const result = await axiosInstance.get(
        "/api/admin/amenities/get-amenities"
      );

      setAmenities(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAmenitites();
  }, []);

  async function handlesubmit(formData) {
    try {
      const result = await axiosInstance.post(
        "/api/admin/amenities/add-amenities",
        formData
      );
      getAmenitites();
      alert(result.data.message);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id, title, public_id) {
    try {
      const result = await axiosInstance.delete(
        "/api/admin/amenities/delete-amenities",
        {
          params: {
            id,
            title,
            public_id,
          },
        }
      );
      getAmenitites();
      alert(result.data.message);
    } catch (error) {
      console.error(error);
    }
  }

  function divideAmenities(array, size) {
    const newAmenities = [];
    for (let index = 0; index < array.length; index += size) {
      newAmenities.push(array.slice(index, index + size));
    }
    console.log(newAmenities);

    return newAmenities;
  }

  return (
    <section id="amenities" className="m-0 p-10">
      <div
        id="amenitiesCarousel"
        className="carousel slide "
        data-bs-ride="carousel"
      >
        <div className="carousel-inner px-4">
          {divideAmenities(amenities, 2).map((groupArray, index) => (
            <div
              className={`carousel-item ${
                groupArray.length === 0 ? "" : "active"
              }`}
              key={index}
            >
              <div className="row row-cols-2 row-cols-md-3 align-items-stretch g-4 py-5">
                {groupArray.map((amenity) => (
                  <div className="col mx-auto" key={amenity.id}>
                    <div
                      className="card card-cover position-relative overflow-hidden text-white  rounded-5 "
                      style={{
                        paddingTop: "177.77%",
                        backgroundImage: `url(${amenity.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <div
                        className="d-flex flex-column justify-content-end position-absolute top-0 start-0 w-100 h-100 p-4"
                        style={{ background: "rgba(0,0,0,0.2)" }}
                      >
                        <h3 className="fw-bold">{amenity.title}</h3>
                        {user && user.isAdmin && (
                          <>
                            <button
                              className="btn btn-outline-danger"
                              onClick={() => setConfrimingId(amenity.id)}
                            >
                              Delete
                            </button>
                            {confirmingId === amenity.id && (
                              <button
                                className="btn btn-danger mt-3"
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    amenity.id,
                                    amenity.title,
                                    amenity.public_id
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
                ))}
              </div>
            </div>
          ))}
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
        <AdminUploadForm
          sectionName="amenities"
          onSubmit={(data) => handlesubmit(data)}
        ></AdminUploadForm>
      ) : null}
    </section>
  );
}

export default Amenities;
