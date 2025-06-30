import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/UserContext";
import sikaeom from "../src/assets/sikaeom_islatambay.png";

function NavBar() {
  const { user, setUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { path: "hero", label: "Home" },
    { path: "amenities", label: "Amenities" },
    { path: "packages", label: "Packages" },
    { path: "about", label: "About" },
    { path: "contact", label: "Contact" },
  ];

  function handleNavClick(sectionId) {
    if (location.pathname === "/home" || location.pathname === "/") {
      const component = document.getElementById(sectionId);
      if (component) component.scrollIntoView({});
    } else {
      navigate(`/home#${sectionId}`);
    }
  }

  function handleLogOut() {
    setUser(null);
    logout();
  }

  return (
    <nav className="navbar border rounded-4 shadow-md navbar-expand-lg p-1 mt-2 mb-4 container-fluid bg-light sticky-top border-bottom">
      <div className="container-fluid">
        <NavLink to="/home" className="navbar-brand nav-link">
          <img src={sikaeom} alt="" style={{ height: "4rem" }} />
        </NavLink>

        <button
          type="button"
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#mainmenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainmenu">
          <ul className="navbar-nav ms-auto ">
            {navLinks.map((link, index) => (
              <li className="nav-item" key={index}>
                <button
                  to={link.path}
                  smooth="true"
                  duration={100}
                  className="nav-link btn btn-link"
                  onClick={() => handleNavClick(link.path)}
                >
                  {link.label}
                </button>
              </li>
            ))}
            {user && user.isAdmin && (
              <div className="ms-md-auto">
                <NavLink
                  to="/admin-dashboard"
                  className="btn btn-outline-success ms-4 "
                >
                  Admin Dashboard
                </NavLink>
              </div>
            )}
            <li className="ms-md-auto">
              {user ? (
                <>
                  <NavLink className="btn btn-primary ms-4" to="/dashboard">
                    My Account
                  </NavLink>
                  <button
                    className="btn btn-outline-danger ms-4"
                    onClick={handleLogOut}
                    type="button"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="btn btn-primary ms-4 me-3">
                    Log In
                  </NavLink>
                  <NavLink to="/register" className="btn btn-outline-primary">
                    Sign Up
                  </NavLink>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
