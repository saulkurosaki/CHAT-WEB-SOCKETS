import { useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import { useUserStore } from '@/store';

import { Header } from '../ui/Header';

export const RootLayout = () => {
  const navigate = useNavigate();
  
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!user && !token) {
      navigate("/auth/login", { replace: true });
    }

    if (!user && token) {
      const userStorage = localStorage.getItem('user');
      if (userStorage) setUser(JSON.parse(userStorage));
    }
  }, []);

  return (
    <div className="w-full h-full bg-gray-200">
      <div className="w-full h-screen max-w-[1440px] flex flex-col mx-auto">
        <Header />

        <main
          className='w-full h-[calc(100vh - 64px)] flex flex-col items-center justify-center overflow-auto'
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
