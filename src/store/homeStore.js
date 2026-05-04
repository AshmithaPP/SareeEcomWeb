import { create } from "zustand";

export const useHomeStore = create((set) => ({
  homeData: null,
  loading: false,
  error: null,

  fetchHomeData: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("http://localhost:5000/api/home");
      if (!res.ok) throw new Error("Failed to load home data");
      const json = await res.json();
      set({ homeData: json.data, loading: false });
    } catch (err) {
      set({ error: err.message || "Failed to load home data", loading: false });
    }
  }
}));
