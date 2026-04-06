import React, { useEffect, useState } from "react";
import DashboardLayout from "../../common/DashboardLayout";
import { apiUrl, token } from "../../common/Config";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const UserUpdate = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/user-management/${id}`, {
        headers: { Authorization: `Bearer ${token()}` },
      });

      const result = await res.json();

      if (result.status) {
        const r = result.data;
        setValue("name", r.name);
        setValue("email", r.email);
        setValue("role", r.role);
        setValue("status", r.status);
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

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${apiUrl}/user-management/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.status) {
        toast.success(result.message);
        navigate("/dashboard/user-management");
      } else {
        if (result.errors) {
          Object.keys(result.errors).forEach((field) => {
            setError(field, {
              type: "server",
              message: result.errors[field][0],
            });
          });
        }
        toast.error(result.message || "Validation error");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="col-lg-9">
        <div className="content-card">
          <div className="d-flex justify-content-between align-items-center">
            <p className="card-eyebrow">User Management</p>

            <div>
              <Link
                to={`/dashboard/user-management`}
                className="btn-social-custom text-decoration-none"
                style={{ color: "var(--clr-accent)" }}
              >
                Back
              </Link>
            </div>
          </div>
          <h3 className="card-heading mb-3">Update User</h3>
          {loading ? (
            <span className="highlight">Loading...</span>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Row 1 */}
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-group-custom">
                    <label className="form-label-custom">Name</label>
                    <input
                      {...register("name", {
                        required: "Name is required",
                      })}
                      type="text"
                      className={`input-custom ${errors.name && "is-invalid"}`}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group-custom">
                    <label className="form-label-custom">Email</label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                      })}
                      type="email"
                      name="email"
                      className={`input-custom ${errors.email && "is-invalid"}`}
                    />
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-group-custom">
                    <label className="form-label-custom">Password</label>
                    <input
                      {...register("password")}
                      type="password"
                      name="password"
                      className={`input-custom ${errors.password && "is-invalid"}`}
                      placeholder="Leave blank to keep same"
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group-custom">
                    <label className="form-label-custom">
                      Confirm Password
                    </label>
                    <input
                      {...register("password_confirmation")}
                      type="password"
                      name="password_confirmation"
                      className={`input-custom ${errors.password_confirmation && "is-invalid"}`}
                    />
                  </div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-group-custom">
                    <label className="form-label-custom">Role</label>
                    <select {...register("role")} className="input-custom">
                      <option value={"admin"}>Admin</option>
                      <option value={"analyst"}>Analyst</option>
                      <option value={"viewer"}>viewer</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group-custom">
                    <label className="form-label-custom">Status</label>
                    <select {...register("status")} className="input-custom">
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="btn-submit-custom mt-3">
                Update User
              </button>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserUpdate;
