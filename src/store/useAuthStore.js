import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),

    setAuth: (user, token) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', user.id || user.user_id);
        set({ user, token, isAuthenticated: true });
    },

    logout: async () => {
        const { user } = get();
        const userId = user?.id || user?.user_id || localStorage.getItem('user_id');

        try {
            if (userId) {
                await fetch('http://localhost:5000/api/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_id: userId }),
                });
            }
        } catch (error) {
            console.error('Logout API error:', error);
        } finally {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('user_id');
            localStorage.removeItem('wishlistItems');
            localStorage.removeItem('cartItems');
            set({ user: null, token: null, isAuthenticated: false });
        }
    },

    checkAuth: () => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        if (token && user) {
            set({ user, token, isAuthenticated: true });
        } else {
            set({ user: null, token: null, isAuthenticated: false });
        }
    }
}));

export default useAuthStore;
