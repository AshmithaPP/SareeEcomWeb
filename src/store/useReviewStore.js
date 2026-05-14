import { create } from 'zustand';
import { API_BASE } from '@/config/api';


const API_BASE_URL = API_BASE;

const useReviewStore = create((set, get) => ({
    reviews: [],
    totalReviews: 0,
    averageRating: 0,
    ratingDistribution: [
        { star: 5, count: 0 },
        { star: 4, count: 0 },
        { star: 3, count: 0 },
        { star: 2, count: 0 },
        { star: 1, count: 0 }
    ],
    loading: false,
    summaryLoading: false,
    error: null,
    page: 1,
    hasMore: true,

    fetchReviewSummary: async (productId) => {
        set({ summaryLoading: true, error: null });
        try {
            const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews/summary`);
            if (!response.ok) throw new Error("Failed to fetch summary");
            
            const data = await response.json();
            const summaryData = data.data || data; // Handle nested data or flat object
            
            // Handle breakdown mapping with support for both camelCase and snake_case
            const breakdown = summaryData.ratingBreakdown || summaryData.rating_breakdown || {};
            const distribution = [5, 4, 3, 2, 1].map(star => ({
                star,
                count: Number(breakdown[star] || breakdown[String(star)] || 0)
            }));

            set({
                averageRating: parseFloat(summaryData.averageRating ?? summaryData.average_rating ?? 0),
                totalReviews: Number(summaryData.totalReviews ?? summaryData.total_reviews ?? 0),
                ratingDistribution: distribution,
                summaryLoading: false
            });
        } catch (err) {
            set({ error: err.message, summaryLoading: false });
        }
    },

    fetchReviews: async (productId, page = 1, limit = 10, refresh = false) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews?page=${page}&limit=${limit}`);
            if (!response.ok) throw new Error("Failed to fetch reviews");
            
            const data = await response.json();
            const reviewsData = data.data || data;
            const newReviews = reviewsData.reviews || (Array.isArray(reviewsData) ? reviewsData : []);
            
            set(state => ({
                reviews: refresh ? newReviews : [...state.reviews, ...newReviews],
                loading: false,
                page: page,
                hasMore: newReviews.length === limit
            }));
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    submitReview: async (productId, reviewData, token = null) => {
        set({ loading: true, error: null });
        try {
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch(`${API_BASE_URL}/products/${productId}/reviews`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(reviewData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to submit review");
            }

            const data = await response.json();
            if (data.success || data.message) {
                set({ loading: false });
                // Refresh summary and list
                get().fetchReviewSummary(productId);
                get().fetchReviews(productId, 1, 10, true);
                return { success: true };
            }
            return { success: false, error: "Submission failed" };
        } catch (err) {
            set({ error: err.message, loading: false });
            return { success: false, error: err.message };
        }
    }
}));

export default useReviewStore;
