import { useState } from "react";

function AdminUploadForm({ sectionName, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [features, setFeatures] = useState([""]);
  const [price, setPrice] = useState(0);

  // ============ HANDLE ALL FUNCTIONS FOR FEATURE INPUT  ============

  function handleFeatureChange(index, value) {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  }

  function addFeature() {
    setFeatures([...features, ""]);
  }

  function removeFeature(index) {
    setFeatures(
      features.filter((feature, featureIndex) => featureIndex !== index)
    );
  }

  // ================================================================

  // ============ HANDLE SUBMIT OF ALL FORMS WITH INPUTS ============

  // fix this if staements
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();

    if (
      sectionName === "heroes" ||
      sectionName === "amenities" ||
      sectionName === "aiPrompts"
    ) {
      formData.append("title", title);
      if (sectionName === "heroes" || sectionName === "aiPrompts") {
        formData.append("description", description);
      }
      formData.append("image", image);
    }

    if (sectionName === "packages") {
      formData.append("title", title);
      formData.append("price", price);
      features.forEach((f, i) => formData.append(`features[${i}]`, f));
    }

    onSubmit(formData);

    setTitle("");
    setDescription("");
    setFeatures([""]);
    setImage(null);
    setPrice(0);
  }

  // ================================================================

  return (
    <section>
      {sectionName === "aiPrompts" && (
        <div className="container p-0">
          <div className="card col-md-12   p-3">
            <h4 className="mb-3">Upload new AI Prompts</h4>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label className="form-label mb-1" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label mb-1" htmlFor="content">
                  Content
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-outline-primary w-100 mt-3"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}

      {sectionName === "heroes" && (
        <div className="card col-md-7 mx-auto mb-3 mt-4 p-3">
          <h4 className="mb-3">Upload new Hero</h4>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label mb-1" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label mb-1" htmlFor="description">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label mb-1" htmlFor="image">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-primary w-100 mt-3"
            >
              Add
            </button>
          </form>
        </div>
      )}

      {sectionName === "amenities" && (
        <div className="card col-md-7 mx-auto mb-3 mt-4 p-3">
          <h4 className="mb-3">Upload new Amenity</h4>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label mb-1" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label mb-1" htmlFor="image">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-primary w-100 mt-3"
            >
              Add
            </button>
          </form>
        </div>
      )}
      {sectionName === "packages" && (
        <div className="card col-md-7 mx-auto mb-3 mt-4 p-3">
          <h4 className="mb-3">Upload new Package</h4>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label mb-1" htmlFor="title">
                Package Name
              </label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label mb-1" htmlFor="price">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                value={price}
                step="0.01"
                min="0"
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                required
              />
            </div>
            <div className="container ">
              <label className="form-label">Package Features</label>
              {features.map((feature, index) => (
                <div key={index} className="d-flex mb-2">
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder={`Feature ${index + 1}`}
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                  />
                  <button
                    className="btn btn-sm btn-outline-danger"
                    type="button"
                    onClick={() => removeFeature(index)}
                  >
                    X
                  </button>
                </div>
              ))}
              <div className="d-flex justify-content-center ">
                <button
                  className="btn btn-success  "
                  type="button"
                  onClick={addFeature}
                >
                  +
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-outline-primary w-100 mt-3"
            >
              Add
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

export default AdminUploadForm;

/* 
        <div className="container ">
          <label className="form-label">Package Features</label>
          {features.map((feature, index) => (
            <div key={index} className="d-flex mb-2">
              <input
                type="text"
                className="form-control me-2"
                placeholder={`Feature ${index + 1}`}
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
              />
              <button
                className="btn btn-sm btn-outline-danger"
                type="button"
                onClick={() => removeFeature(index)}
              >
                X
              </button>
            </div>
          ))}
          <div className="d-flex justify-content-center ">
            <button
              className="btn btn-success  "
              type="button"
              onClick={addFeature}
            >
              +
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-outline-primary w-100 mt-3">
          Add
        </button>
      </form>
    </div>
  );
} */
