import React, { useEffect, useState } from "react";
import DashboardLayout from "../../common/DashboardLayout";
import { Link, useParams } from "react-router-dom";
import { apiUrl, token } from "../../common/Config";
import toast from "react-hot-toast";

const FinancialRecordView = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/financial-records/${id}`, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });

      const result = await res.json();

      if (result.status) {
        setRecord(result.data);
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
            <p className="card-eyebrow">Financial Records</p>

            <div className="d-flex align-items-end gap-2">
              <div>
                <Link
                  to={`/dashboard/financial-records`}
                  className="btn-social-custom text-decoration-none"
                  style={{ color: "var(--clr-accent)" }}
                >
                  Back
                </Link>
              </div>
              <div>
                {record && (
                  <Link
                    to={`/dashboard/financial-records/update/${record.id}`}
                    className="btn-social-custom text-decoration-none"
                    style={{ color: "var(--clr-accent)" }}
                  >
                    Update
                  </Link>
                )}
              </div>
            </div>
          </div>

          <h3 className="card-heading mb-3">View Record</h3>
          {loading ? (
            <span className="highlight">Loading...</span>
          ) : (
            <div className="row g-3">
              {/* User */}
              <div className="col-md-6">
                <div className="view-group">
                  <label>User</label>
                  <p>{record.user?.name || "-"}</p>
                </div>
              </div>

              {/* Category */}
              <div className="col-md-6">
                <div className="view-group">
                  <label>Category</label>
                  <p>{record.category?.name || "-"}</p>
                </div>
              </div>

              {/* Amount */}
              <div className="col-md-6">
                <div className="view-group">
                  <label>Amount</label>
                  <p>₹{record.amount}</p>
                </div>
              </div>

              {/* Type */}
              <div className="col-md-6">
                <div className="view-group">
                  <label>Type</label>
                  <p>{record.type}</p>
                </div>
              </div>

              {/* Date */}
              <div className="col-md-6">
                <div className="view-group">
                  <label>Date</label>
                  <p>{new Date(record.date).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Status */}
              <div className="col-md-6">
                <div className="view-group">
                  <label>Status</label>
                  <p>
                    {record.status == 1 ? (
                      <span className="text-success">Active</span>
                    ) : (
                      <span className="text-danger">Inactive</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          {!loading && (
            <div className="view-group mt-3">
              <label>Description</label>
              <p>{record?.description || "-"}</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FinancialRecordView;
