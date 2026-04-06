import React from "react";
import { Link } from "react-router-dom";
import Layout from "../common/Layout";

const Home = () => {
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
          <div className="text-light fw-100">
            Kindly <span className="highlight">Login</span> OR{" "}
            <span className="highlight">Register</span> to access the dashboard
            page!!
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
