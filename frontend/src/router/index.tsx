import { createBrowserRouter } from "react-router-dom";

import { AuthLayout, RootLayout } from "@/components/layouts";
import { Login, Register } from "@/components/pages/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <div>Error</div>,
    children: [
      {
        index: true,
        element: <div>Chat</div>,
      },
      {
        path: 'chat-room/:id',
        element: <div>Chat Room</div>,
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