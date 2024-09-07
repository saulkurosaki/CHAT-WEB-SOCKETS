import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button'

import { useUserStore } from '@/store';

export const ChatRooms = () => {
  const navigate = useNavigate();

  const { setUser } = useUserStore();

  const handleLogout = () => {
    setUser(null);
    navigate("/auth/login", { replace: true });
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center text-teal-600">Chats - Bienvenido</h1>

      <Button onClick={() => navigate("/chat/1")}>Chat 1</Button>

      <Button onClick={handleLogout}>Logout</Button>
    </>
  )
}
