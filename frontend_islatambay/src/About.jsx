import sikaeom from "../public/sikaeom.png";
import about_bg from "../src/assets/about-bg.png";
import "./App.css";

function About(params) {
  return (
    <section id="about">
      <div
        className="px-4 py-5 my-5 text-center text-dark"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)),url(${about_bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="display-5 fw-bold">Sikeaom </h1>
        <h2 className="display-6 mb-2">Islatambay </h2>
        <img
          className="d-block mx-auto mb-4 "
          src={sikaeom}
          alt=""
          style={{ height: "8rem" }}
        />
        <div className="col-lg-6 mx-auto mt-2">
          <p className="lead mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce magna
            eros, mollis non eros at, interdum tincidunt nunc. Nulla aliquet
            ante justo. Maecenas sollicitudin vitae arcu consequat feugiat.
            Morbi ac lectus ac neque tincidunt consequat ac et neque. Sed
            viverra id mi ac mollis. Nam eget urna auctor, sodales magna sit
            amet, interdum ante. Vestibulum et fermentum enim. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit. Vivamus gravida elementum mi.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
