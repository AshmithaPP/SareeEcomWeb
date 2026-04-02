import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from 'pages/Home'
import ProductsPage from 'features/products/pages/ProductsPage'
import ProductDetailsPage from 'features/products/pages/ProductDetailsPage'
import WishlistPage from 'features/wishlist/pages/WishlistPage'
import CartPage from 'features/cart/pages/CartPage'
import ContactPage from 'features/contact/pages/ContactPage'


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product-details" element={<ProductDetailsPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/contact" element={<ContactPage />} />

    </Routes>
  )
}

export default AppRoutes
