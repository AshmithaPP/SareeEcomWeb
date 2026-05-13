import { create } from 'zustand';

const API_BASE_URL = 'http://localhost:5000/api';

const useProductStore = create((set, get) => ({
    products: [],
    availableFilters: {},
    activeFilters: {}, // Current selections
    pagination: { current_page: 1, total_pages: 1, total_products: 0 },
    loading: false,
    error: null,

    selectedProduct: null,

    // Actions
    updateFilter: (key, value, isChecked) => {
        set((state) => {
            const currentValues = state.activeFilters[key] ? state.activeFilters[key].split(',') : [];
            let newValues;
            
            if (isChecked) {
                newValues = [...new Set([...currentValues, value])];
            } else {
                newValues = currentValues.filter(v => v !== value);
            }

            const updatedFilters = { ...state.activeFilters };
            if (newValues.length > 0) {
                updatedFilters[key] = newValues.join(',');
            } else {
                delete updatedFilters[key];
            }

            return { activeFilters: updatedFilters };
        });
    },

    setPriceRange: (min, max) => {
        set((state) => ({
            activeFilters: {
                ...state.activeFilters,
                min_price: min,
                max_price: max
            }
        }));
    },

    clearAllFilters: () => {
        set({ activeFilters: {} });
    },

    fetchProducts: async (queryParams = null) => {
        set({ loading: true, error: null });
        
        // Use provided params or fallback to store's activeFilters
        const paramsToUse = queryParams || get().activeFilters;

        // Convert object to URL query string
        const searchParams = new URLSearchParams();
        Object.entries(paramsToUse).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                searchParams.append(key, value);
            }
        });

        // Ensure default limit if not provided
        if (!searchParams.has('limit')) searchParams.append('limit', '12');

        try {
            const response = await fetch(`${API_BASE_URL}/products?${searchParams.toString()}`);
            
            if (!response.ok) {
                throw new Error(`Error fetching products: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                const IMAGE_BASE_URL = 'http://localhost:5000';
                const mappedProducts = data.products.map(p => {
                    const fullImageUrl = p.image_url ? (p.image_url.startsWith('http') ? p.image_url : `${IMAGE_BASE_URL}${p.image_url}`) : '';
                    return {
                        id: p.product_id,
                        product_id: p.product_id,
                        title: p.product_name,
                        name: p.product_name,
                        slug: p.slug,
                        image: fullImageUrl,
                        thumbnail: fullImageUrl,
                        discount: p.discount_percentage ? `${p.discount_percentage}% OFF` : null,
                        discountedPrice: `₹${parseFloat(p.price).toLocaleString('en-IN')}`,
                        price: parseFloat(p.price),
                        originalPrice: p.original_price ? `₹${parseFloat(p.original_price).toLocaleString('en-IN')}` : null,
                        discountBg: p.discount_percentage > 30 ? "#E11D48" : "#10B981",
                        rating: { average: p.rating, count: p.reviews_count },
                        stockStatus: p.stock_status
                    };
                });

                set({ 
                    products: mappedProducts, 
                    availableFilters: data.filters,
                    pagination: data.pagination,
                    loading: false 
                });
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
            // Include active filters in detail fetch so backend can pre-select correct variant
            const searchParams = new URLSearchParams();
            Object.entries(get().activeFilters).forEach(([key, value]) => {
                if (value) searchParams.append(key, value);
            });
            const qs = searchParams.toString();
            const response = await fetch(`${API_BASE_URL}/products/${slug}${qs ? '?' + qs : ''}`);
            if (!response.ok) {
                throw new Error(`Error fetching product details: ${response.statusText}`);
            }
            const data = await response.json();
            if (data.success) {
                // The backend (formatProductDetail) already prepends IMAGE_BASE_URL 
                // and structures variants/media correctly.
                set({ selectedProduct: data.data, loading: false });
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

            // Merge current specifications with variant attributes
            // Specifications is now an array: [{label, value}, ...]
            let updatedSpecs = [...(state.selectedProduct.specifications || [])];
            
            if (variant.attributes) {
                Object.entries(variant.attributes).forEach(([key, value]) => {
                    const label = key.charAt(0).toUpperCase() + key.slice(1);
                    const displayValue = typeof value === 'object' ? value.name : value;
                    
                    // Check if this spec already exists, if so update it, else add it
                    const existingIndex = updatedSpecs.findIndex(s => s.label.toLowerCase().includes(key.toLowerCase()));
                    if (existingIndex > -1) {
                        updatedSpecs[existingIndex] = { label, value: displayValue };
                    } else {
                        updatedSpecs.push({ label, value: displayValue });
                    }
                });
            }

            return {
                selectedProduct: {
                    ...state.selectedProduct,
                    selected_variant: variant,
                    specifications: updatedSpecs
                }
            };
        });
    }
}));

export default useProductStore;
