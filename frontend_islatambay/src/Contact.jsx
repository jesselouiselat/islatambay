import { NavLink } from "react-router-dom";
import { useAuth } from "./context/UserContext";

function Contact() {
  const { user } = useAuth();
  const socials = [
    {
      link: "https://www.facebook.com/islatambayfreediving",
      socialApp: "Facebook",
      logo: "bi-facebook",
      color: "primary",
    },
    {
      link: "https://www.instagram.com/islatambayfreediving",
      socialApp: "Instagram",
      logo: "bi-instagram",
      color: "danger",
    },
    {
      link: "https://www.tiktok.com/@islatambay.freedi",
      socialApp: "Tiktok",
      logo: "bi-tiktok",
      color: "dark",
    },
    {
      link: "https://m.me/islatambayfreediving",
      socialApp: "Messenger",
      logo: "bi-messenger",
      color: "info",
    },
  ];

  return (
    <section id="contact" className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="mb-4">Connect with Us</h2>
        <div className="row justify-content-center gap-3">
          {/* Facebook */}
          {socials.map((social, index) => (
            <div className="col-auto" key={index}>
              <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-outline-${social.color} rounded-circle p-3`}
                style={{ width: "4rem", height: "4rem" }}
              >
                <i className={`bi ${social.logo} fs-3`}></i>
              </a>
              <div className="mt-2">{social.socialApp}</div>
            </div>
          ))}
        </div>
        {!user && (
          <div className="container">
            <div className="row gap-2">
              <div className="col-12">
                <h3 className="mt-5">Log in for more support</h3>
              </div>
              <div className="col-12">
                <NavLink to="/login" className="btn btn-primary  me-3">
                  Log In
                </NavLink>
                <NavLink to="/register" className="btn btn-outline-success">
                  Sign Up
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Contact;
