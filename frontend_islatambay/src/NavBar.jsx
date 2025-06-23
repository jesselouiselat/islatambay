import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import { useAuth } from "./context/UserContext";

function NavBar() {
  const navigate = useNavigate();
  const { user, setUser, loading, logout } = useAuth();
  const navLinks = [
    { path: "home", label: "Home" },
    { path: "about", label: "About" },
    { path: "amenities", label: "Amenities" },
    { path: "packages", label: "Packages" },
    { path: "contact", label: "Contact" },
  ];

  function handleLogOut() {
    logout();
  }

  return (
    <nav className="navbar border rounded-4 shadow-md navbar-expand-lg p-3 mt-2 mb-4 container-fluid bg-light sticky-top border-bottom">
      <div className="container-fluid">
        <NavLink to="/home" className="navbar-brand nav-link">
          Sikaeom
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
                <Link
                  to={link.path}
                  smooth={true}
                  duration={100}
                  className="nav-link"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="ms-md-auto">
              {user ? (
                <button
                  className="btn btn-outline-danger ms-4"
                  onClick={handleLogOut}
                  type="button"
                >
                  Log Out
                </button>
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
