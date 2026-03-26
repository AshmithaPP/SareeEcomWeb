import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home/Home'
import ProductsPage from './pages/Products/ProductsPage'
import ProductDetailsPage from './pages/ProductDetails/ProductDetailsPage'
import WishlistPage from './pages/Wishlist/WishlistPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product-details" element={<ProductDetailsPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
