import React from "react";
import "./styles/main.scss";

import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Chat />
      </div>
    </div>
  );
};

export default App;
