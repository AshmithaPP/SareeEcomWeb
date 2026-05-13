import { create } from 'zustand';

const API_BASE_URL = 'http://localhost:5000/api';

const useBlogStore = create((set) => ({
    blogs: [],
    selectedBlog: null,
    loading: false,
    error: null,
    pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
    },

    fetchBlogs: async (params = {}) => {
        set({ loading: true, error: null });
        try {
            const { page = 1, limit = 10, category = '' } = params;
            const queryParams = new URLSearchParams({ page, limit, category }).toString();
            
            const response = await fetch(`${API_BASE_URL}/blogs?${queryParams}`);
            if (!response.ok) throw new Error('Failed to fetch blogs');
            const result = await response.json();
            
            if (result.success) {
                set({ 
                    blogs: result.data, 
                    pagination: result.pagination,
                    loading: false 
                });
            } else {
                set({ error: result.message, loading: false });
            }
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    fetchBlogBySlug: async (slug) => {
        set({ loading: true, error: null, selectedBlog: null });
        try {
            const response = await fetch(`${API_BASE_URL}/blogs/${slug}`);
            if (!response.ok) throw new Error('Failed to fetch blog');
            const result = await response.json();
            if (result.success) {
                set({ selectedBlog: result.data, loading: false });
            } else {
                set({ error: result.message, loading: false });
            }
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    // Alias for compatibility
    fetchBlogById: (id) => useBlogStore.getState().fetchBlogBySlug(id)
}));

export default useBlogStore;
