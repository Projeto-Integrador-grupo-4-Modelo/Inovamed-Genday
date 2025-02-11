import React from "react";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function PaginaDashboardBase() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default PaginaDashboardBase;
