import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useCartStore from './useCartStore';

const API_URL = 'http://localhost:5000/api/wishlist';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      loading: false,

      // Helper for headers
      getHeaders: () => {
        const guestId = useCartStore.getState().guestId;
        const headers = {
          'Content-Type': 'application/json',
          'x-guest-id': guestId
        };
        const token = localStorage.getItem('token');
        if (token) headers['Authorization'] = `Bearer ${token}`;
        return headers;
      },

      fetchWishlist: async () => {
        useCartStore.getState().initGuest();
        set({ loading: true });
        try {
          const res = await fetch(API_URL, { headers: get().getHeaders() });
          const data = await res.json();
          if (data.success) {
            set({ items: data.items || [] });
          }
        } catch (err) {
          console.error("Fetch wishlist failed", err);
        } finally {
          set({ loading: false });
        }
      },

      toggleWishlist: async (productId, variantId = null) => {
        useCartStore.getState().initGuest();
        // Check if already in wishlist
        const isExist = get().items.some(item => 
          item.product_id === productId && (variantId ? item.variant_id === variantId : true)
        );

        const endpoint = isExist ? '/remove' : '/add';
        const method = isExist ? 'DELETE' : 'POST';

        try {
          const res = await fetch(`${API_URL}${endpoint}`, {
            method,
            headers: get().getHeaders(),
            body: JSON.stringify({ product_id: productId, variant_id: variantId })
          });
          const data = await res.json();
          if (data.success) {
            await get().fetchWishlist();
            return { success: true, action: isExist ? 'removed' : 'added' };
          }
          return { success: false, message: data.message };
        } catch (err) {
          console.error("Wishlist toggle failed", err);
          return { success: false, message: err.message };
        }
      },

      mergeWishlist: async () => {
        const guestId = useCartStore.getState().guestId;
        const token = localStorage.getItem('token');
        if (!token || !guestId) return;

        try {
          const res = await fetch(`${API_URL}/merge`, {
            method: 'POST',
            headers: get().getHeaders(),
            body: JSON.stringify({ guest_id: guestId })
          });
          const data = await res.json();
          if (data.success) {
            await get().fetchWishlist();
          }
        } catch (err) {
          console.error("Wishlist merge failed", err);
        }
      },

      clearWishlist: () => set({ items: [] })
    }),
    {
      name: 'wishlist-storage',
      partialize: (state) => ({ items: state.items }) // Persist items for quick UI
    }
  )
);

export default useWishlistStore;
