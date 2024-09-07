import { useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import { useUserStore } from '@/store';

import { Header } from '../ui/Header';

export const RootLayout = () => {
  const navigate = useNavigate();
  
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('user', user, 'token', token);

    if (!user && !token) {
      navigate("/auth/login", { replace: true });
    }

    if (!user && token) {
      const userStorage = localStorage.getItem('user');
      if (userStorage) setUser(JSON.parse(userStorage));
    }
  }, [])

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100">
      <Header />

      <main
        className='w-full h-[calc(100vh - 64px)] flex flex-col items-center justify-center'
      >
        <Outlet />
      </main>
    </div>
  )
}
