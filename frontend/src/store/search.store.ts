import { create } from 'zustand';

interface ISearchStore {
  search: string;
  setSearch: (value: string) => void;
}

export const useSearchStore = create<ISearchStore>((set) => ({
  search: '',
  setSearch: (value) => set((state) => ({ ...state, search: value })),
}));
