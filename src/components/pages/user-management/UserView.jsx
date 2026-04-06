import React, { useEffect, useState } from "react";
import DashboardLayout from "../../common/DashboardLayout";
import toast from "react-hot-toast";
import { apiUrl, token } from "../../common/Config";
import { Link, useParams } from "react-router-dom";

const UserView = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/user-management/${id}`, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });

      const result = await res.json();

      if (result.status) {
        setUser(result.data);
      } else {
        toast.error(result.message || "Record not found");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div className="col-lg-9">
        <div className="content-card">
          <div className="d-flex justify-content-between align-items-center">
            <p className="card-eyebrow">User Management</p>

            <div className="d-flex align-items-end gap-2">
              <div>
                <Link
                  to={`/dashboard/user-management`}
                  className="btn-social-custom text-decoration-none"
                  style={{ color: "var(--clr-accent)" }}
                >
                  Back
                </Link>
              </div>
              <div>
                {user && (
                  <Link
                    to={`/dashboard/user-management/update/${user.id}`}
                    className="btn-social-custom text-decoration-none"
                    style={{ color: "var(--clr-accent)" }}
                  >
                    Update
                  </Link>
                )}
              </div>
            </div>
          </div>
          <h3 className="card-heading mb-3">View User</h3>

          {loading ? (
            <span className="highlight">Loading...</span>
          ) : (
            <div className="row g-3">
              {/* Name */}
              <div className="col-md-6">
                <div className="view-group">
                  <label>Name</label>
                  <p>{user.name}</p>
                </div>
              </div>

              {/* Email */}
              <div className="col-md-6">
                <div className="view-group">
                  <label>Email</label>
                  <p>{user.email}</p>
                </div>
              </div>

              {/* Role */}
              <div className="col-md-6">
                <div className="view-group">
                  <label>Role</label>
                  <p>{user.role}</p>
                </div>
              </div>

              {/* Status */}
              <div className="col-md-6">
                <div className="view-group">
                  <label>Status</label>
                  <p>
                    {user.status == 1 ? (
                      <span className="text-success">Active</span>
                    ) : (
                      <span className="text-danger">Inactive</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Created At */}
              <div className="view-group mt-3">
                <label>Created At</label>
                <p>{new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserView;
