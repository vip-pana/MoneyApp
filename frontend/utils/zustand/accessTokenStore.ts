import { create } from "zustand";

type HeadersType = {
  Authorization: string;
};

type AccessToken = {
  headers: HeadersType;
  setHeaders: (value: string) => void;
};

export const useAccessTokenStore = create<AccessToken>((set) => ({
  headers: { Authorization: "" },
  setHeaders: (value) =>
    set(() => ({
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })),
}));
