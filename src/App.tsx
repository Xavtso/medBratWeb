import React from "react";
import "./styles/main.scss";

import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import {  RouterProvider } from "react-router-dom";
import { router } from "./constants/router";

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
