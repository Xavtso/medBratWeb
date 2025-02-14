import { Outlet } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";

export default function Layout() {
  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
