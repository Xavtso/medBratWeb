import { createBrowserRouter } from "react-router-dom";
import Layout from "../../components/Layout";
import Chat from "../../components/Chat";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "chat/:chatId",
        element: <Chat />,
      },
    ],
  },
]);
