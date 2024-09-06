import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const RootLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/auth/login", { replace: true });
    }
  }, [])

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Outlet />
    </div>
  )
}
