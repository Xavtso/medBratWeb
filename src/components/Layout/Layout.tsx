import { Outlet, useParams } from "react-router-dom";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useState } from "react";
import Skeleton from "../Skeleton";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const { chatId } = useParams<{ chatId?: string }>();

  return (
    <div className="container">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="main-content">
        <Header />
        {!chatId && <Skeleton />}
        <Outlet />
      </div>
    </div>
  );
}
