import { create } from "zustand";

const initialValue = {
  isLogin: false,
  isWished: false,
  customFav: [],
};

const initialState = {
  ...initialValue,
  setFields: () => {},
  setClose: () => {},
};

export const useStore = create((set) => ({
  ...initialState,
  setFields: (fields) =>
    set((state) => ({
      ...state,
      ...fields,
    })),
  setClose: () => set(() => ({ ...initialValue })),
}));
