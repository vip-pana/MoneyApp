import { create } from "zustand";

type FooType = {
  count: number;
  increment: (num: number) => void;
  decrement: () => void;
};

export const useFooStore = create<FooType>((set) => ({
  count: 0,
  increment: (num: number) => {
    set((state) => ({ count: state.count + num }));
  },
  decrement: () => {
    set({ count: -1 });
  },
}));
