import { createBrowserRouter } from "react-router-dom";

import { AuthLayout, RootLayout } from "@/components/layouts";
import { Login, Register } from "@/components/pages/auth";
import { ChatRooms } from "@/components/pages/private";
import ChatRoom from "@/components/shared/ChatRoom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <div>Error</div>,
    children: [
      {
        index: true,
        element: <ChatRooms />,
      },
      {
        path: "chat/:id",
        element: <ChatRoom />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <div>Error</div>,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
