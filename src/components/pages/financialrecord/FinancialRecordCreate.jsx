import React, { useEffect, useState } from "react";
import DashboardLayout from "../../common/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiUrl, token } from "../../common/Config";
import toast from "react-hot-toast";

const FinancialRecordCreate = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const fetchData = async () => {
    try {
      const [userRes, catRes] = await Promise.all([
        fetch(`${apiUrl}/user-management`, {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        }),
        fetch(`${apiUrl}/categories`, {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        }),
      ]);

      const userData = await userRes.json();
      const catData = await catRes.json();

      if (userData.status) setUsers(userData.data);
      if (catData.status) setCategories(catData.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${apiUrl}/financial-records`, {
        method: "POST",
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
        navigate("/dashboard/financial-records");
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
          <p className="card-eyebrow">Financial Records</p>
          <h3 className="card-heading mb-3">Add New Record</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-group-custom">
                  <label className="form-label-custom">Username</label>
                  <select
                    {...register("user_id", { required: "User is required" })}
                    className={`input-custom ${errors.user_id ? "is-invalid" : ""}`}
                  >
                    <option value="">Select User</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                  {errors.user_id && (
                    <p className="text-danger small">
                      {errors.user_id.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group-custom">
                  <label className="form-label-custom">Category</label>
                  <select
                    {...register("category_id", {
                      required: "Category is required",
                    })}
                    className={`input-custom ${errors.category_id ? "is-invalid" : ""}`}
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  {errors.category_id && (
                    <p className="text-danger small">
                      {errors.category_id.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group-custom">
                  <label className="form-label-custom">Amount</label>
                  <input
                    type="number"
                    {...register("amount", { required: "Amount is required" })}
                    className={`input-custom ${errors.amount ? "is-invalid" : ""}`}
                  />
                  {errors.amount && (
                    <p className="text-danger small">{errors.amount.message}</p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group-custom">
                  <label className="form-label-custom">Type</label>
                  <select
                    {...register("type", { required: "Type is required" })}
                    className={`input-custom ${errors.type ? "is-invalid" : ""}`}
                  >
                    <option value="">Select</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                  {errors.type && (
                    <p className="text-danger small">{errors.type.message}</p>
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group-custom">
                  <label className="form-label-custom">Date</label>
                  <input
                    type="date"
                    {...register("date", { required: "Date is required" })}
                    className={`input-custom ${errors.date ? "is-invalid" : ""}`}
                  />
                </div>
                {errors.date && (
                  <p className="text-danger small">{errors.date.message}</p>
                )}
              </div>

              <div className="col-md-12">
                <div className="form-group-custom">
                  <label className="form-label-custom">Description</label>
                  <textarea
                    {...register("description")}
                    className="input-custom"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-submit-custom w-100 mt-3">
              Save Record
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FinancialRecordCreate;
