import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import AddItems from "./AddItems/AddItems";

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <Outlet></Outlet>
        {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
         */}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <Link to="/dashboard/add">Add items</Link>
          </li>
          <li>
            <Link to="/dashboard/items">Manage Items</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
