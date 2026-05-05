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
import MyOrders from 'pages/MyOrders'
import AboutPage from '@/features/about/pages/AboutPage'
import BlogPage from '@/features/blog/components/pages/BlogPage'
import BlogDetails from '@/features/blog/components/pages/BlogDetails'
import LoginPage from '@/features/auth/pages/LoginPage'
import ProtectedRoute from '@/components/auth/ProtectedRoute'


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product-details/:slug" element={<ProductDetailsPage />} />
      <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
      <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogDetails />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
      <Route path="/order-confirmation/:orderId?" element={<OrderConfirmationPage />} />
      <Route path="/orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />

    </Routes>
  )
}

export default AppRoutes
