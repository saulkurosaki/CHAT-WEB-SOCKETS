import { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import { useUserStore } from "@/store";


export const AuthLayout = () => {
  const navigate = useNavigate();

  const { user } = useUserStore();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [])

  return (
    <div className="h-screen flex flex-col items-center justify-center p-4 bg-teal-600">
      <div className="bg-white px-6 py-8 rounded-lg shadow-md w-full max-w-md md:p-8">
        <Outlet />
      </div>
    </div>
  )
}
