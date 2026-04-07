import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../common/Layout";
import { AuthContext } from "../auth/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const isAuthenticated = Boolean(user);

  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center">
        <div className="content-card text-center">
          <p className="card-eyebrow">Welcome</p>

          <h1 className="card-heading">Welcome to our Site</h1>

          <p className="card-sub">Create Your Account and Start your Journey</p>

          <div className="site-header">
            <Link to="/" className="navbar-brand">
              Zorvyn<span>Finance</span>
            </Link>
          </div>
          <br />

          <hr />

          {!isAuthenticated ? (
            <div className="text-light fw-100">
              Kindly{" "}
              <Link to="/login" className="highlight">
                Login
              </Link>{" "}
              OR{" "}
              <Link to="/register" className="highlight">
                Register
              </Link>{" "}
              to access the dashboard page!
            </div>
          ) : (
            <div className="text-light fw-100">
              Welcome back,{" "}
              <span className="highlight">{user.name || "User"}</span>!
              <div className="mt-3">
                <Link to="/dashboard" className="btn btn-primary">
                  Go to Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
