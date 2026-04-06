import React, { useEffect, useState } from "react";
import DashboardLayout from "../../common/DashboardLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiUrl, token } from "../../common/Config";
import toast from "react-hot-toast";

const FinancialRecordUpdate = () => {
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

  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/financial-records/${id}`, {
        headers: { Authorization: `Bearer ${token()}` },
      });

      const result = await res.json();

      if (result.status) {
        const r = result.data;

        setUsers(result.users);
        setCategories(result.categories);

        setValue("user_id", r.user_id);
        setValue("category_id", r.category_id);
        setValue("amount", r.amount);
        setValue("type", r.type);
        setValue("date", r.date?.split("T")[0]);
        setValue("status", r.status);
        setValue("description", r.description);
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
      const res = await fetch(`${apiUrl}/financial-records/${id}`, {
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
          <div className="d-flex justify-content-between align-items-center">
            <p className="card-eyebrow">Financial Records</p>

            <div>
              <Link
                to={`/dashboard/financial-records`}
                className="btn-social-custom text-decoration-none"
                style={{ color: "var(--clr-accent)" }}
              >
                Back
              </Link>
            </div>
          </div>
          <h3 className="card-heading mb-3">Edit Record</h3>
          {loading ? (
            <span className="highlight">Loading...</span>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-3">
                {/* USER */}
                <div className="col-md-6">
                  <div className="form-group-custom">
                    <label className="form-label-custom">User</label>
                    <select
                      {...register("user_id", { required: "User is required" })}
                      className={`input-custom ${errors.user_id && "is-invalid"}`}
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

                {/* CATEGORY */}
                <div className="col-md-6">
                  <div className="form-group-custom">
                    <label className="form-label-custom">Category</label>
                    <select
                      {...register("category_id", {
                        required: "Category is required",
                      })}
                      className={`input-custom ${errors.category_id && "is-invalid"}`}
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

                {/* AMOUNT */}
                <div className="col-md-6">
                  <div className="form-group-custom">
                    <label className="form-label-custom">Amount</label>
                    <input
                      type="number"
                      {...register("amount", {
                        required: "Amount is required",
                      })}
                      className={`input-custom ${errors.amount && "is-invalid"}`}
                    />
                  </div>
                </div>

                {/* TYPE */}
                <div className="col-md-6">
                  <div className="form-group-custom">
                    <label className="form-label-custom">Type</label>
                    <select {...register("type")} className="input-custom">
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>
                </div>

                {/* DATE */}
                <div className="col-md-6">
                  <div className="form-group-custom">
                    <label className="form-label-custom">Date</label>
                    <input
                      type="date"
                      {...register("date")}
                      className="input-custom"
                    />
                  </div>
                </div>

                {/* STATUS */}
                <div className="col-md-6">
                  <div className="form-group-custom">
                    <label className="form-label-custom">Status</label>
                    <select {...register("status")} className="input-custom">
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
                  </div>
                </div>

                {/* DESCRIPTION */}
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
                Update Record
              </button>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FinancialRecordUpdate;
