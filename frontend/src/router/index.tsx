import { createBrowserRouter } from "react-router-dom";

import { AuthLayout, RootLayout } from "@/components/layouts";
import { Login, Register } from "@/components/pages/auth";
import { ChatRooms } from "@/components/pages/private";

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
        path: 'chat/:id',
        element: <div>Chat Room</div>,
      },
      {
        path: 'profile',
        element: <div>Profile</div>,
      },
    ]
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
    ]
  },
]);