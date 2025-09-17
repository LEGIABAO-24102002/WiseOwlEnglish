import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/user/Sidebar";
import Header from "../components/user/Header";
// import RightPanel from "../components/user/RightPanel";
import "../styles/user/appLayout.css";

const UserLayout: React.FC = () => {
  return (
    <div className="app-layout">
      <aside className="app-sidebar">
        <Sidebar />
      </aside>
      <main className="app-main">
        <Header />
        <div className="app-content">
          <Outlet />
        </div>
      </main>
      {/* <aside className="app-right">
        <RightPanel />
      </aside> */}
    </div>
  );
};

export default UserLayout;
