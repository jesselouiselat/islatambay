import sikaeom from "../src/assets/sikaeom_islatambay.png";
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
        <img className="mb-3" src={sikaeom} alt="" style={{ height: "6rem" }} />
        <div className="col-lg-6 mx-auto mt-2">
          <p className="lead mb-4">
            ISLATAMBAY FREEDIVING is a beginner-friendly freediving experience
            based in BinukboK, Bauan, Batangas. We offer safe and fun
            breath-hold diving sessions for all ages, whether you're a complete
            beginner, a kid, or just someone curious about the ocean. Our team
            provides hands-on guidance and personalized coaching in a calm,
            protected marine sanctuary. You’ll explore vibrant coral reefs, swim
            alongside sea turtles, and experience the freedom of the underwater
            world in just one breath. We keep things relaxed, welcoming, and
            always focused on making freediving simple, safe, and memorable.
            Sessions are held at Sikaeom Camp & Dive Resort and include all
            gear, boat transfers, and coaching. Just bring yourself and we’ll
            take care of the rest.{" "}
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
