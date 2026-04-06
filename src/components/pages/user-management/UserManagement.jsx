import React, { useEffect, useState } from "react";
import DashboardLayout from "../../common/DashboardLayout";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { apiUrl, token } from "../../common/Config";
import toast from "react-hot-toast";

const UserManagement = () => {
  const [users, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // filter
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${apiUrl}/user-management?page=${page}&name=${name}&status=${status}`,
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
        setUser(result.data);
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

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to Delete the Record?")) {
      const res = await fetch(`${apiUrl}/user-management/` + id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      const result = await res.json();
      if (result.status == true) {
        const filteruser = users.filter((user) => user.id != id);
        setUser(filteruser);
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers();
    }, 400);

    return () => clearTimeout(delay);
  }, [page, name, status]);

  return (
    <>
      <DashboardLayout>
        {/* Content */}
        <div className="col-lg-9">
          <div className="content-card">
            <p className="card-eyebrow">User Management</p>

            <div className="d-flex gap-2 mb-3">
              {/* Name FILTER */}
              <input
                className="input-custom"
                placeholder="Name"
                value={name}
                onChange={(e) => {
                  setPage(1);
                  setName(e.target.value);
                }}
              ></input>

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
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {!loading && users.length === 0 && (
                      <tr>
                        <td colSpan="8" className="text-center">
                          No Users found
                        </td>
                      </tr>
                    )}
                    {users &&
                      users.map((user, index) => {
                        return (
                          <tr key={user.id}>
                            <td>{(page - 1) * 10 + index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                              <span
                                className={`badge ${user.status == 1 ? "bg-success" : "bg-danger"}`}
                              >
                                {user.status == 1 ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td className="d-flex gap-2">
                              <Link
                                to={`/dashboard/user-management/view/${user.id}`}
                                className="action-btn view"
                              >
                                <FaEye />
                              </Link>

                              <Link
                                to={`/dashboard/user-management/update/${user.id}`}
                                className="action-btn edit"
                              >
                                <FaEdit />
                              </Link>

                              <button
                                className="action-btn delete"
                                onClick={() => deleteUser(user.id)}
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
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="btn btn-sm btn-outline-light"
              >
                Prev
              </button>

              <span className="text-white align-self-center small">
                Page {page} of {lastPage}
              </span>

              <button
                disabled={page >= lastPage}
                onClick={() => setPage(page + 1)}
                className="btn btn-sm btn-outline-light"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default UserManagement;
