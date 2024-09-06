import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button'

export const Chats = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/login", { replace: true });
  }

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <h1 className="text-2xl font-bold mb-4 text-center text-teal-600">Chats - Bienvenido</h1>

      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}
