import { create } from 'zustand';

const API_BASE_URL = 'http://localhost:5000/api';

const useProductStore = create((set) => ({
    products: [],
    loading: false,
    error: null,

    selectedProduct: null,

    fetchProducts: async ({ page = 1, limit = 12 } = {}) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`${API_BASE_URL}/products?page=${page}&limit=${limit}`);
            
            if (!response.ok) {
                throw new Error(`Error fetching products: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                // Map API data to Frontend format
                const mappedProducts = data.data.map(p => ({
                    id: p.product_id,
                    title: p.name,
                    slug: p.slug,
                    image: p.thumbnail,
                    discount: p.price.discountPercentage > 0 ? `${p.price.discountPercentage}% OFF` : null,
                    discountedPrice: `₹${parseFloat(p.price.sellingPrice).toLocaleString('en-IN')}`,
                    originalPrice: p.price.mrp ? `₹${parseFloat(p.price.mrp).toLocaleString('en-IN')}` : null,
                    discountBg: p.price.discountPercentage > 30 ? "#E11D48" : "#10B981",
                    rating: p.rating,
                    stockStatus: p.stockStatus
                }));
                set({ products: mappedProducts, loading: false });
            } else {
                set({ error: "Failed to fetch products", loading: false });
            }
        } catch (err) {
            set({ error: err.message || "An error occurred", loading: false });
        }
    },

    fetchProductBySlug: async (slug) => {
        set({ loading: true, error: null, selectedProduct: null });
        try {
            const response = await fetch(`${API_BASE_URL}/products/${slug}`);
            if (!response.ok) {
                throw new Error(`Error fetching product details: ${response.statusText}`);
            }
            const data = await response.json();
            if (data.success) {
                // Ensure product_id is consistently available
                const mappedProduct = {
                    ...data.data,
                    product_id: data.data.product_id || data.data.id
                };
                set({ selectedProduct: mappedProduct, loading: false });
            } else {

                set({ error: "Failed to fetch product details", loading: false });
            }
        } catch (err) {
            set({ error: err.message || "An error occurred", loading: false });
        }
    },

    setSelectedVariant: (variantId) => {
        set((state) => {
            if (!state.selectedProduct) return state;
            const variant = state.selectedProduct.variants.find(v => v.variant_id === variantId);
            if (!variant) return state;

            // Sync specifications with variant attributes
            const newSpecs = { ...(state.selectedProduct.specifications || {}) };
            if (variant.attributes) {
                Object.entries(variant.attributes).forEach(([key, value]) => {
                    // Capitalize key for better label (size -> Size)
                    const label = key.charAt(0).toUpperCase() + key.slice(1);
                    // For objects like color: { name: 'red', code: '#...' }, use the name
                    newSpecs[label] = typeof value === 'object' ? value.name : value;
                });
            }

            return {
                selectedProduct: {
                    ...state.selectedProduct,
                    selectedVariant: variant,
                    specifications: newSpecs
                }
            };
        });
    }
}));

export default useProductStore;
