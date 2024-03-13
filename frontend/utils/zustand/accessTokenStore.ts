import { create } from "zustand";

type AccessToken = {
  accessToken: string;
  setAccessToken: (value: string) => void;
};

export const useAccessTokenStore = create<AccessToken>((set) => ({
  accessToken: "",
  setAccessToken: (value) => set((state) => ({ accessToken: value })),
}));
