import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API_URL = 'http://localhost:5000/api/cart';

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: { items: [], summary: {} },
      guestId: null,
      loading: false,
      error: null,

      // Initialize Guest ID if not exists
      initGuest: () => {
        if (!get().guestId) {
          set({ guestId: crypto.randomUUID() });
        }
      },

      // Helper for headers
      getHeaders: () => {
        const headers = {
          'Content-Type': 'application/json',
          'x-guest-id': get().guestId
        };
        const token = localStorage.getItem('token');
        if (token) headers['Authorization'] = `Bearer ${token}`;
        return headers;
      },

      fetchCart: async () => {
        get().initGuest();
        set({ loading: true, error: null });
        try {
          const res = await fetch(API_URL, { headers: get().getHeaders() });
          const data = await res.json();
          if (data.success) {
              set({ cart: data, loading: false });
          } else {
              set({ error: data.message, loading: false });
          }
        } catch (err) {
          set({ error: err.message, loading: false });
        }
      },

      addToCart: async (productId, variantId, quantity = 1) => {
        get().initGuest();
        set({ loading: true, error: null });
        try {
          const res = await fetch(`${API_URL}/add`, {
            method: 'POST',
            headers: get().getHeaders(),
            body: JSON.stringify({ product_id: productId, variant_id: variantId, quantity })
          });
          const data = await res.json();
          if (data.success) {
            await get().fetchCart(); // Refresh cart data
            return { success: true, data: data.data };
          } else {
            set({ error: data.message, loading: false });
            return { success: false, message: data.message };
          }
        } catch (err) {
          set({ error: err.message, loading: false });
          return { success: false, message: err.message };
        }
      },

      updateQuantity: async (cartItemId, quantity) => {
        const qty = Number(quantity);
        set({ loading: true, error: null });
        try {
          const res = await fetch(`${API_URL}/update`, {
            method: 'PUT',
            headers: get().getHeaders(),
            body: JSON.stringify({ cart_item_id: cartItemId, quantity: qty })
          });
          const data = await res.json();
          if (data.success) {
            await get().fetchCart();
            return { success: true };
          } else {
            set({ error: data.message, loading: false });
            return { success: false, message: data.message };
          }
        } catch (err) {
          set({ error: err.message, loading: false });
          return { success: false, message: err.message };
        }
      },

      removeFromCart: async (cartItemId) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch(`${API_URL}/item/${cartItemId}`, {
            method: 'DELETE',
            headers: get().getHeaders()
          });
          const data = await res.json();
          if (data.success) {
            await get().fetchCart();
          } else {
            set({ error: data.message, loading: false });
          }
        } catch (err) {
          set({ error: err.message, loading: false });
        }
      },

      clearCart: async () => {
          set({ loading: true, error: null });
          try {
              const res = await fetch(`${API_URL}/clear`, {
                  method: 'DELETE',
                  headers: get().getHeaders()
              });
              const data = await res.json();
              if (data.success) {
                  set({ cart: { items: [], summary: {} }, loading: false });
              } else {
                  set({ error: data.message, loading: false });
              }
          } catch (err) {
              set({ error: err.message, loading: false });
          }
      },

      mergeCart: async () => {
        const token = localStorage.getItem('token');
        const guestId = get().guestId;
        if (!token || !guestId) return;

        set({ loading: true });
        try {
            const res = await fetch(`${API_URL}/merge`, {
                method: 'POST',
                headers: get().getHeaders(),
                body: JSON.stringify({ guest_id: guestId })
            });
            const data = await res.json();
            if (data.success) {
                await get().fetchCart();
            }
        } catch (err) {
            console.error("Merge failed", err);
        } finally {
            set({ loading: false });
        }
      },

      applyCoupon: async (code, subtotal) => {
        set({ loading: true, error: null });
        try {
          const res = await fetch('http://localhost:5000/api/coupons/validate', {
            method: 'POST',
            headers: get().getHeaders(),
            body: JSON.stringify({ code, orderAmount: subtotal })
          });
          const data = await res.json();
          if (data.success) {
            const updatedCart = { ...get().cart };
            const discount = parseFloat(data.data.discount_amount);
            const delivery = parseFloat(updatedCart.summary.delivery) || 0;
            const subtotalVal = parseFloat(updatedCart.summary.subtotal) || 0;
            
            updatedCart.summary.discount = discount;
            updatedCart.summary.total = subtotalVal + delivery - discount;
            
            set({ cart: updatedCart, loading: false });
            return { success: true, data: data.data };
          } else {
            set({ error: data.message, loading: false });
            return { success: false, message: data.message };
          }
        } catch (err) {
          set({ error: err.message, loading: false });
          return { success: false, message: err.message };
        }
      },

      fetchActiveCoupons: async () => {
        try {
          const res = await fetch('http://localhost:5000/api/coupons/active', {
            headers: get().getHeaders()
          });
          const data = await res.json();
          if (data.success) {
            return data.data;
          }
          return [];
        } catch (err) {
          console.error("Failed to fetch coupons", err);
          return [];
        }
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ guestId: state.guestId }) // Only persist guestId
    }
  )
);

export default useCartStore;
