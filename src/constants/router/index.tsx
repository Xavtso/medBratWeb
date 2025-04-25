import { createBrowserRouter } from "react-router-dom";
import Layout from "../../components/Layout";
import Chat from "../../components/Chat";
import Login from "../../components/Login";
import ProtectedRoute from "../../components/ProtectedRouter";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "chat/:chatId",
        element: <Chat />,
      },
    ],
  },
]);
