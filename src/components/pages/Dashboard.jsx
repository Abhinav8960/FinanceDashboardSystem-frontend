import React, { useEffect, useState } from "react";
import SideBar from "../common/SideBar";
import { FaMoneyBillWave, FaTags, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import DashboardLayout from "../common/DashboardLayout";
import { apiUrl } from "../common/Config";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("ZorvynFinanceUserInfo"));

  const [stats, setStats] = useState({
    users: 0,
    categories: 0,
    financial_records: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${apiUrl}/dashboard`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            Accept: "application/json",
          },
        });
        const data = await res.json();

        setStats({
          users: data.users,
          categories: data.categories,
          financial_records: data.financial_records,
        });
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      }
    };

    fetchDashboard();
  }, []);
  return (
    <DashboardLayout>
      {/* Content */}
      <div className="col-lg-9">
        <div className="row">
          {/* Financial Records */}
          <div className="col-md-4">
            <Link to="/dashboard/financial-records" className="dashboard-tile">
              <FaMoneyBillWave className="tile-icon" />
              <h4>{stats.financial_records} </h4>
              <h5>Financial Records</h5>
              <p>Manage transactions</p>
            </Link>
          </div>

          {/* Categories */}
          <div className="col-md-4">
            <Link to="/dashboard/category" className="dashboard-tile">
              <FaTags className="tile-icon" />
              <h4>{stats.categories}</h4>
              <h5>Categories</h5>
              <p>Manage categories</p>
            </Link>
          </div>

          {/* Users */}
          <div className="col-md-4">
            <Link to="/dashboard/user-management" className="dashboard-tile">
              <FaUsers className="tile-icon" />
              <h4>{stats.users}</h4>
              <h5>Users</h5>
              <p>Manage users</p>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
