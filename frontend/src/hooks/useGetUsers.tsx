import { useState } from 'react';

import { getAllUsers } from '@/services/private/user';

import { IUser } from '@/interfaces';

export const useGetUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);
    const { ok, data, error } = await getAllUsers();

    if (!ok || !data || error) {
      setError(error || 'Error al obtener los usuarios');
      setIsLoading(false);
      return;
    }

    console.log(data);
    setUsers(data);
    setIsLoading(false);
  };

  return {
    users,
    error,
    isLoading,
    getUsers,
  }
}
