import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
      <Helmet>
        <title>Zorvyn Finance</title>
      </Helmet>

      <header className="site-header">
        <nav className="navbar navbar-expand-md container py-2">
          <a className="navbar-brand" href="#">
            Zorvyn<span>Finance</span>
          </a>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
            style={{ filter: "invert(1)" }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav ms-auto align-items-md-center gap-md-2 mb-2 mb-md-0">
              {user ? (
                <>
                  <li className="nav-item ms-md-3 mt-2 mt-md-0">
                    <span className="text-white me-2">Hi, {user.name}</span>
                  </li>

                  <li className="nav-item ms-md-3 mt-2 mt-md-0">
                    <button onClick={handleLogout} className="btn-header-login">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item ms-md-3 mt-2 mt-md-0">
                    <Link to="/login" className="btn-header-login">
                      Log In
                    </Link>
                  </li>

                  <li className="nav-item ms-md-3 mt-2 mt-md-0">
                    <Link to="/register" className="btn-header-login">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
