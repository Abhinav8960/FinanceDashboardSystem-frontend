import Layout from "../common/Layout";
import { apiUrl } from "../common/Config";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    await fetch(`${apiUrl}/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.status == 200) {
          toast.success(result.message);
          navigate("/login");
        } else {
          const errors = result.errors;
          Object.keys(errors).forEach((field) => {
            setError(field, { message: errors[field][0] });
          });
        }
      });
  };

  return (
    <Layout>
      <div className="register-card">
        <p className="card-eyebrow">Create your account</p>
        <h1 className="card-heading">Register</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="form-group-custom">
            <label className="form-label-custom">Name</label>
            <div className="input-wrap">
              <input
                {...register("name", {
                  required: "Name is required",
                })}
                className={`input-custom ${errors.name && "is-error"}`}
                placeholder="Name"
              />
              <i className="bi bi-person input-icon"></i>
            </div>
            {errors.name && (
              <p className="text-danger small">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="form-group-custom">
            <label className="form-label-custom">Email</label>
            <div className="input-wrap">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@]+@[^@]+\.[^@]+$/,
                    message: "Invalid email",
                  },
                })}
                className={`input-custom ${errors.email && "is-error"}`}
                placeholder="test@example.com"
              />
              <i className="bi bi-envelope input-icon"></i>
            </div>
            {errors.email && (
              <p className="text-danger small">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="form-group-custom">
            <label className="form-label-custom">Password</label>
            <div className="input-wrap">
              <input
                {...register("password", {
                  required: "Password is required",
                })}
                type={showPwd ? "text" : "password"}
                className={`input-custom ${errors.password && "is-error"}`}
                placeholder="Password"
              />
              <i className="bi bi-lock input-icon"></i>

              <button
                type="button"
                className="toggle-pwd"
                onClick={() => setShowPwd(!showPwd)}
              >
                <i className={`bi ${showPwd ? "bi-eye-slash" : "bi-eye"}`}></i>
              </button>
            </div>
            {errors.password && (
              <p className="text-danger small">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group-custom">
            <label className="form-label-custom">Confirm Password</label>
            <div className="input-wrap">
              <input
                {...register("password_confirmation", {
                  required: "Confirm password is required",
                })}
                type={showConfirmPwd ? "text" : "password"}
                className={`input-custom ${
                  errors.password_confirmation && "is-error"
                }`}
                placeholder="Retype Password"
              />
              <i className="bi bi-shield-lock input-icon"></i>

              <button
                type="button"
                className="toggle-pwd"
                onClick={() => setShowConfirmPwd(!showConfirmPwd)}
              >
                <i
                  className={`bi ${showConfirmPwd ? "bi-eye-slash" : "bi-eye"}`}
                ></i>
              </button>
            </div>
            {errors.password_confirmation && (
              <p className="text-danger small">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button type="submit" className="btn-submit-custom">
            Register <i className="bi bi-arrow-right"></i>
          </button>

          {/* Login link */}
          <div className="d-flex justify-content-center py-3">
            Already have account? &nbsp;
            <Link className="text-secondary" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
