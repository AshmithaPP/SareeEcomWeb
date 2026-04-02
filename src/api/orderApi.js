/**
 * Mock API service for Order related data.
 * This can be easily replaced with a real API call using axios or fetch.
 */

export const fetchOrderDetails = async (orderId) => {
  return new Promise((resolve, reject) => {
    // Simulate API delay
    setTimeout(() => {
      // Simulate successful API response
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
          image: "/src/assets/images/products/maroon-saree.jpg" // Placeholder for product image
        },
        delivery: {
          customerName: "Ananya Iyer",
          address: "Villa 42, Heritage Enclave,\nKoramangala 4th Block,\nBengaluru, Karnataka - 560034",
          phone: "+91 98765 43210",
          estimatedArrival: "Feb 15 – Feb 17",
          packagingNote: "Your saree will be securely packed in a premium heritage box to preserve silk quality."
        }
      };

      // To simulate an error, you can uncomment the line below:
      // reject(new Error("Failed to fetch order details. Please try again."));

      resolve(mockOrderData);
    }, 1500); // 1.5s delay
  });
};
