import { create } from "zustand";

type CurrentDateProperties = {
  currentDate: Date;
  setCurrentDate: (value: Date) => void;
};

export const useCurrentDateStore = create<CurrentDateProperties>((set) => ({
  currentDate: new Date(),
  setCurrentDate: (value: Date) => set(() => ({ currentDate: value })),
}));
