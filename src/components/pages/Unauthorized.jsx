import React, { useEffect } from "react";
import DashboardLayout from "../common/DashboardLayout";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.fromAuth) {
      toast.error("You are not authorized to perform this action");
    }

    // setTimeout(() => {
    //   navigate("/dashboard");
    // }, 1500);
  }, []);

  return (
    <DashboardLayout>
      <div className="col-lg-9">
        <div className="content-card text-center">
          <h3 className="text-danger">403 - Unauthorized</h3>
          <p className="text-white">
            You do not have permission to access this page.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="btn btn-sm btn-outline-light mt-2"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Unauthorized;
