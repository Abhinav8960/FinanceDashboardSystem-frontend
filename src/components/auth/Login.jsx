import React, { useContext, useState } from "react";
import Layout from "../common/Layout";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../common/Config";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { AuthContext } from "./AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    await fetch(`${apiUrl}/login`, {
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
          const userInfo = {
            id: result.id,
            name: result.name,
            role: result.role,
            token: result.token,
          };

          localStorage.setItem(
            "ZorvynFinanceUserInfo",
            JSON.stringify(userInfo),
          );
          login(userInfo);
          navigate("/dashboard");
        } else {
          toast.error(result.message);
        }
      });
  };

  return (
    <>
      <Layout>
        <div className="register-card">
          <p className="card-eyebrow">Welcome Back</p>
          <h1 className="card-heading">Login to your account</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="form-group-custom">
              <label className="form-label-custom">Email Address</label>
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
                  <i
                    className={`bi ${showPwd ? "bi-eye-slash" : "bi-eye"}`}
                  ></i>
                </button>
              </div>
              {errors.password && (
                <p className="text-danger small">{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button type="submit" className="btn-submit-custom">
              Login <i className="bi bi-arrow-right"></i>
            </button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Login;
