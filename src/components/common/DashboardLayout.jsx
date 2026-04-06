import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main-content">
        <div className="">
          <div className="row">
            {/* Sidebar */}
            <div className="col-lg-3">
              <SideBar />
            </div>
            {children}
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default DashboardLayout;
