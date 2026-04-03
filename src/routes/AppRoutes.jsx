import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from 'pages/Home'
import ProductsPage from 'features/products/pages/ProductsPage'
import ProductDetailsPage from 'features/products/pages/ProductDetailsPage'
import WishlistPage from 'features/wishlist/pages/WishlistPage'
import CartPage from 'features/cart/pages/CartPage'
import ContactPage from 'features/contact/pages/ContactPage'
import CheckoutPage from 'pages/CheckoutPage'
import OrderConfirmationPage from 'pages/OrderConfirmationPage'
import AboutPage from '@/features/about/pages/AboutPage'
import BlogPage from '@/features/blog/components/pages/BlogPage'
import BlogDetails from '@/features/blog/components/pages/BlogDetails'


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product-details" element={<ProductDetailsPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blogdetails" element={<BlogDetails />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/order-confirmation/:orderId?" element={<OrderConfirmationPage />} />

    </Routes>
  )
}

export default AppRoutes
