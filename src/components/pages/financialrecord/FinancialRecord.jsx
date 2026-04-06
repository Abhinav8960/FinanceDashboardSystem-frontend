import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import DashboardLayout from "../../common/DashboardLayout";
import { Link } from "react-router-dom";
import { apiUrl, token } from "../../common/Config";
import toast from "react-hot-toast";

const FinancialRecord = () => {
  const [records, setRecord] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // filter
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${apiUrl}/financial-records?page=${page}&type=${type}&status=${status}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token()}`,
          },
        },
      );
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const result = await res.json();
      if (result.status) {
        setRecord(result.data);
        setLastPage(result.meta.last_page);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteRecord = async (id) => {
    if (window.confirm("Are you sure you want to Delete the Record?")) {
      const res = await fetch(`${apiUrl}/financial-records/` + id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();
      if (result.status == true) {
        const filterrecords = records.filter((record) => record.id != id);
        setRecord(filterrecords);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [page, type, status]);

  return (
    <DashboardLayout>
      {/* Content */}
      <div className="col-lg-9">
        <div className="content-card">
          <div className="d-flex justify-content-between align-items-center">
            <p className="card-eyebrow mb-0">Financial Records</p>

            <div>
              <Link
                to={`/dashboard/financial-records/create`}
                className="btn-social-custom text-decoration-none"
                style={{ color: "var(--clr-accent)" }}
              >
                Create
              </Link>
            </div>
          </div>

          <div className="d-flex gap-2 mb-3">
            {/* TYPE FILTER */}
            <select
              className="input-custom"
              value={type}
              onChange={(e) => {
                setPage(1);
                setType(e.target.value);
              }}
            >
              <option value="">All Type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            {/* STATUS FILTER */}
            <select
              className="input-custom"
              value={status}
              onChange={(e) => {
                setPage(1);
                setStatus(e.target.value);
              }}
            >
              <option value="">All Status</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

          <div className="table-responsive">
            {loading ? (
              <span className="highlight">Loading...</span>
            ) : (
              <table className="table table-dark table-bordered align-middle custom-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {records.length === 0 && (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No records found
                      </td>
                    </tr>
                  )}
                  {records &&
                    records.map((record, index) => {
                      return (
                        <tr key={record.id}>
                          <td>{(page - 1) * 10 + index + 1}</td>
                          <td>{record.user?.name}</td>
                          <td>{record.category?.name}</td>
                          <td>{record.amount}</td>
                          <td>{record.type}</td>
                          <td>
                            <span
                              className={`badge ${record.status == 1 ? "bg-success" : "bg-danger"}`}
                            >
                              {record.status == 1 ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="d-flex gap-2">
                            <Link
                              to={`/dashboard/financial-records/view/${record.id}`}
                              className="action-btn view"
                            >
                              <FaEye />
                            </Link>

                            <Link
                              to={`/dashboard/financial-records/update/${record.id}`}
                              className="action-btn edit"
                            >
                              <FaEdit />
                            </Link>

                            <button
                              className="action-btn delete"
                              onClick={() => deleteRecord(record.id)}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            )}
          </div>

          <div className="d-flex justify-content-center gap-2 mt-3">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="btn btn-sm btn-outline-light"
            >
              Prev
            </button>

            <span className="text-white align-self-center small">
              Page {page} of {lastPage}
            </span>

            <button
              disabled={page === lastPage}
              onClick={() => setPage(page + 1)}
              className="btn btn-sm btn-outline-light"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FinancialRecord;
