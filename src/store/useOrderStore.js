import { create } from 'zustand';

const useOrderStore = create((set) => ({
  orderDetails: null,
  loading: false,
  error: null,

  fetchOrderDetails: async (orderId) => {
    set({ loading: true, error: null });
    
    // Simulating API call as in the original mock
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockOrderData = {
          orderId: orderId || "KS12345",
          orderDate: "12 Feb 2026",
          paymentMethod: "UPI / Card",
          totalAmount: "₹24,999",
          product: {
            type: "Pure Hand-Woven",
            name: "Royal Maroon Kanchipuram Silk",
            quantity: 1,
            price: "₹24,999",
            image: "/src/assets/images/products/maroon-saree.jpg"
          },
          delivery: {
            customerName: "Ananya Iyer",
            address: "Villa 42, Heritage Enclave,\nKoramangala 4th Block,\nBengaluru, Karnataka - 560034",
            phone: "+91 98765 43210",
            estimatedArrival: "Feb 15 – Feb 17",
            packagingNote: "Your saree will be securely packed in a premium heritage box to preserve silk quality."
          }
        };
        
        set({ orderDetails: mockOrderData, loading: false });
        resolve(mockOrderData);
      }, 1500);
    });
  }
}));

export default useOrderStore;
