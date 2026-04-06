import React, { useEffect, useState } from "react";
import DashboardLayout from "../../common/DashboardLayout";
import { apiUrl, token } from "../../common/Config";
import toast from "react-hot-toast";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/categories`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const result = await res.json();
      if (result.status) {
        setCategories(result.data);
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

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <DashboardLayout>
        {/* Content */}
        <div className="col-lg-9">
          <div className="content-card">
            <p className="card-eyebrow">Categories</p>
            <div className="table-responsive">
              {loading ? (
                <span className="highlight">Loading...</span>
              ) : (
                <table className="table table-dark table-bordered align-middle custom-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Status</th>
                      <th>created At</th>
                    </tr>
                  </thead>

                  <tbody>
                    {categories.length === 0 && (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No categories found
                        </td>
                      </tr>
                    )}
                    {categories &&
                      categories.map((category, index) => {
                        return (
                          <tr key={category.id}>
                            <td>{index + 1}</td>
                            <td>{category.name}</td>
                            <td>
                              <span
                                className={`badge ${category.status == 1 ? "bg-success" : "bg-danger"}`}
                              >
                                {category.status == 1 ? "Active" : "Inactive"}
                              </span>
                            </td>
                            <td>
                              {new Date(category.created_at).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default Category;
