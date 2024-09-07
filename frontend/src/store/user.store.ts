import { create } from 'zustand';

import { IUser } from '@/interfaces';

interface IUserStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user) => set((state) => ({ ...state, user })),
}));
