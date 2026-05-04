import { create } from 'zustand';

const API_BASE_URL = 'http://localhost:5000/api';

const useHomeStore = create((set) => ({
    homeData: null,
    loading: false,
    error: null,

    fetchHomeData: async () => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`${API_BASE_URL}/home`);
            if (!response.ok) throw new Error('Failed to fetch homepage data');
            const result = await response.json();
            if (result.success) {
                set({ homeData: result.data, loading: false });
            } else {
                set({ error: result.message, loading: false });
            }
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    }
}));

export default useHomeStore;
