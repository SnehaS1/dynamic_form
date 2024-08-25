// src/store.js
import create from "zustand";

const useStore = create((set) => ({
  someState: "",
  reset: () => set({ someState: "" }), // Reset the state
  setSomeState: (value) => set({ someState: value }),
}));

export default useStore;
